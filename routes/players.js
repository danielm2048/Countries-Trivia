const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authorizePlayer = require("../middleware/authMiddleware");

const { Player } = require("../models");
const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require("../utils/auth");

router.post("/signup", async (req, res) => {
	const { email, userName, password } = req.body;

	if (!email || !userName || !password) {
		return res.status(401).json("Please enter all fields");
	}

	const player = await Player.findOne({ where: { email } });
	if (player) {
		return res.status(401).json("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newPlayer = await Player.create(
		{
			name: userName,
			email,
			password: hashedPassword,
			score: 0,
		},
		{ fields: ["name", "email", "password", "score"] }
	);

	const accessToken = createAccessToken(newPlayer);
	const refreshToken = createRefreshToken(newPlayer);
	sendRefreshToken(res, refreshToken);

	res.json({ player: newPlayer, accessToken });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(401).json("Please enter all fields!");
	}

	const player = await Player.findOne({ where: { email } });
	if (!player) {
		return res.status(404).json("Player was not found!");
	}

	const match = await bcrypt.compare(password, player.password);
	if (!match) {
		return res.status(409).json("Password is incorrect");
	}

	const accessToken = createAccessToken(player);
	const refreshToken = createRefreshToken(player);
	sendRefreshToken(res, refreshToken);

	res.json({ player, accessToken });
});

router.post("/logout", (req, res) => {
	sendRefreshToken(res, "");
	res.json({ loggedOut: true });
});

router.post("/token", cookieParser(), (req, res) => {
	const refreshToken = req.cookies["refresh-token"];

	if (!refreshToken) {
		return res.status(403).json("Refresh token is required");
	}

	try {
		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		const accessToken = createAccessToken(payload);

		sendRefreshToken(res, refreshToken);
		res.json(accessToken);
	} catch (err) {
		console.log(err);
		res.status(403).json("Refresh token is invalid");
	}
});

router.put("/update-score/:id", authorizePlayer, async (req, res) => {
	const { id } = req.params;
	const { score } = req.body;
	const updated = await Player.update(
		{ score },
		{ where: { id }, returning: true, plain: true }
	);
	res.json(updated);
});

router.get("/score-board", async (req, res) => {
	const highScorers = await Player.findAll({
		order: [["score", "DESC"]],
		limit: 20,
	});

	res.json(highScorers);
});

module.exports = router;
