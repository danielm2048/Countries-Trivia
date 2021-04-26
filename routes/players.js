const router = require("express").Router();
const { Player } = require("../models");

router.post("/signup", async (req, res) => {
	const { userName, score } = req.body;

	const newPlayer = await Player.create(
		{
			name: userName,
			score,
		},
		{ fields: ["name", "score"] }
	);

	res.json(newPlayer);
});

router.put("/update-score/:id", async (req, res) => {
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
