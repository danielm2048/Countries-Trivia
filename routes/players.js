const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorizePlayer = require("../middleware/authMiddleware");

const { Player } = require("../models");
const {
	createAccessToken,
	createRefreshToken,
	sendTokens,
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
		},
		{ fields: ["name", "email", "password"] }
	);

	const accessToken = createAccessToken(newPlayer);
	const refreshToken = createRefreshToken(newPlayer);
	sendTokens(res, accessToken, refreshToken);

	res.json(newPlayer);
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
	sendTokens(res, accessToken, refreshToken);

	res.json(player);
});

router.post("/logout", (req, res) => {
	sendTokens(res, "", "");
});

router.post("/token", (req, res) => {
	const refreshToken = req.headers["authorization"];

	if (!refreshToken) {
		return res.status(401).json("Refresh token is required");
	}

	try {
		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		const accessToken = createAccessToken(payload);

		sendTokens(res, accessToken, refreshToken);
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
