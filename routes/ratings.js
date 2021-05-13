const router = require("express").Router();
const { Rating, Player } = require("../models");

const authorizePlayer = require("../middleware/authMiddleware");

router.post("/", authorizePlayer, async (req, res) => {
	const { ratings } = req.body;
	const { userId } = req.user;

	ratings.map(async (item) => {
		await Rating.create(
			{
				questionId: item.questionId,
				playerId: userId,
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
