require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const questionRouter = require("./routes/questions");
const playerRouter = require("./routes/players");
const ratingRouter = require("./routes/ratings");

app.use(express.json());

app.use("/api/questions", questionRouter);

app.use("/api/players", playerRouter);

app.use("/api/ratings", ratingRouter);

app.listen(PORT, () => {
	console.log("Server is running 🚀");
});
