const router = require("express").Router();
const Sequelize = require("sequelize");
const { Country, Question, QuestionTemplate } = require("../models");

const authorizePlayer = require("../middleware/authMiddleware");

const shuffleOptions = (options) => {
	let currentIndex = options.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = options[currentIndex];
		options[currentIndex] = options[randomIndex];
		options[randomIndex] = temporaryValue;
	}

	return options;
};

router.get("/generate", authorizePlayer, async (req, res) => {
	const { saved } = req.query;
	if (saved === "true") {
		const question = await Question.findOne({
			order: Sequelize.literal("rand()"),
		});
		const template = await question.getQuestionTemplate();
		if (template.type === 1) {
			const gameData = {
				id: question.id,
				fullQuestion: template.question,
				options: shuffleOptions([
					question.answer,
					question.option_1,
					question.option_2,
					question.option_3,
				]),
				answer: question.answer,
			};

			return res.json(gameData);
		} else if (template.type === 2) {
			const fullQuestion = template.question.replace(
				" X?",
				` ${question.countryX}?`
			);

			const gameData = {
				id: question.id,
				fullQuestion,
				options: shuffleOptions([
					question.answer,
					question.option_1,
					question.option_2,
					question.option_3,
				]),
				answer: question.answer,
			};

			return res.json(gameData);
		} else {
			let fullQuestion = template.question.replace(
				" X ",
				` ${question.countryX} `
			);
			fullQuestion = fullQuestion.replace(" Y?", ` ${question.countryY}?`);
			const gameData = {
				id: question.id,
				fullQuestion,
				options: shuffleOptions([question.answer, question.option_1]),
				answer: question.answer,
			};

			return res.json(gameData);
		}
	}

	let rand = Math.floor(Math.random() * 20 + 1);

	const template = await QuestionTemplate.findOne({ where: { id: rand } });
	const countries = await Country.findAll({
		raw: true,
		attributes: ["Country", `${template.relevantColumn}`],
	});

	let relevantColumns = countries.map(
		(country) => country[template.relevantColumn]
	);
	relevantColumns = new Set(relevantColumns);
	relevantColumns = Array.from(relevantColumns);

	if (template.type === 1) {
		let options = {};
		let answerKey;
		for (let i = 0; i < 4; i++) {
			let option;
			do {
				rand = Math.floor(Math.random() * countries.length);

				if (countries[rand][template.relevantColumn] && !options[rand]) {
					option = countries[rand];
					options[rand] = option;
				}
			} while (!option);
		}

		let check = template.desc ? Infinity : -Infinity;
		for (const key in options) {
			const columnData = parseFloat(
				options[key][template.relevantColumn].replace(/,/g, "")
			);
			if (template.desc) {
				if (columnData < check) {
					check = columnData;
					answerKey = key;
				}
			} else {
				if (columnData > check) {
					check = columnData;
					answerKey = key;
				}
			}
		}

		const finalAnswer = options[answerKey];
		delete options[answerKey];
		options = Object.values(options);

		const question = await Question.create(
			{
				questionTemplateId: template.id,
				answer: finalAnswer["Country"],
				option_1: options[0]["Country"],
				option_2: options[1]["Country"],
				option_3: options[2]["Country"],
			},
			{
				fields: [
					"questionTemplateId",
					"answer",
					"option_1",
					"option_2",
					"option_3",
				],
			}
		);

		const gameData = {
			id: question.id,
			fullQuestion: template.question,
			options: shuffleOptions([
				question.answer,
				question.option_1,
				question.option_2,
				question.option_3,
			]),
			answer: question.answer,
		};
		res.json(gameData);
	} else if (template.type === 2) {
		rand = Math.floor(Math.random() * countries.length);
		let options = {};
		let countryX;

		do {
			rand = Math.floor(Math.random() * countries.length);
			if (countries[rand][template.relevantColumn]) countryX = countries[rand];
		} while (!countryX);

		for (let i = 0; i < 3; i++) {
			let option;
			do {
				rand = Math.floor(Math.random() * relevantColumns.length);

				if (
					relevantColumns[rand] &&
					!options[rand] &&
					relevantColumns[rand] !== countryX[template.relevantColumn]
				) {
					option = relevantColumns[rand].replace(/,/g, "");
					options[rand] = option;
				}
			} while (!option);
		}

		options = Object.values(options);

		const question = await Question.create(
			{
				questionTemplateId: template.id,
				countryX: countryX["Country"],
				answer: countryX[template.relevantColumn].replace(/,/g, ""),
				option_1: options[0],
				option_2: options[1],
				option_3: options[2],
			},
			{
				fields: [
					"questionTemplateId",
					"countryX",
					"answer",
					"option_1",
					"option_2",
					"option_3",
				],
			}
		);

		const fullQuestion = template.question.replace(
			" X?",
			` ${question.countryX}?`
		);
		const gameData = {
			id: question.id,
			fullQuestion,
			options: shuffleOptions([
				question.answer,
				question.option_1,
				question.option_2,
				question.option_3,
			]),
			answer: question.answer,
		};
		res.json(gameData);
	} else {
		let countryX;

		do {
			rand = Math.floor(Math.random() * countries.length);
			if (countries[rand][template.relevantColumn]) countryX = countries[rand];
		} while (!countryX);

		let countryY;

		do {
			rand = Math.floor(Math.random() * countries.length);
			if (
				countries[rand][template.relevantColumn] &&
				countries[rand]["Country"] !== countryX["Country"]
			) {
				countryY = countries[rand];
			}
		} while (!countryY);

		const relevantX = parseFloat(
			countryX[template.relevantColumn].replace(/,/g, "")
		);

		const relevantY = parseFloat(
			countryY[template.relevantColumn].replace(/,/g, "")
		);

		const question = await Question.create(
			{
				questionTemplateId: template.id,
				countryX: countryX["Country"],
				countryY: countryY["Country"],
				answer: relevantX > relevantY ? "Yes" : "No",
				option_1: relevantX < relevantY ? "Yes" : "No",
			},
			{
				fields: [
					"questionTemplateId",
					"countryX",
					"countryY",
					"answer",
					"option_1",
				],
			}
		);
		let fullQuestion = template.question.replace(
			" X ",
			` ${question.countryX} `
		);
		fullQuestion = fullQuestion.replace(" Y?", ` ${question.countryY}?`);

		const gameData = {
			id: question.id,
			fullQuestion,
			options: ["Yes", "No"],
			answer: relevantX > relevantY ? "Yes" : "No",
		};
		res.json(gameData);
	}
});

module.exports = router;
