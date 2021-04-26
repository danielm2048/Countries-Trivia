const router = require("express").Router();
const { Rating, Player } = require("../models");

router.post("/:playerId", async (req, res) => {
	const { playerId } = req.params;
	const { ratings } = req.body;

	ratings.map(async (item) => {
		await Rating.create(
			{
				questionId: item.questionId,
				playerId,
				rating: item.rating,
			},
			{ fields: ["questionId", "playerId", "rating"] }
		);
	});
});

router.get("/:questionId", async (req, res) => {
	const { questionId } = req.params;

	const ratings = await Rating.findAll({
		where: { questionId },
		include: Player,
	});

	let sumPlayerScore = 0;

	const totalPlayersRating = ratings.reduce((accu, curr) => {
		const playerScore = curr["Player"].dataValues.score;
		sumPlayerScore += playerScore;

		const playerRating = playerScore * curr.dataValues.rating;
		return (accu += playerRating);
	}, 0);

	res.json(totalPlayersRating / sumPlayerScore);
});

module.exports = router;
