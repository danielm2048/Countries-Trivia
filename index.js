require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 5000;

const questionRouter = require("./routes/questions");
const playerRouter = require("./routes/players");
const ratingRouter = require("./routes/ratings");

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(helmet());

app.use("/api/questions", questionRouter);

app.use("/api/players", playerRouter);

app.use("/api/ratings", ratingRouter);

app.listen(PORT, () => {
	console.log("Server is running 🚀");
});
