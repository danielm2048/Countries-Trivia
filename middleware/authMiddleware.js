require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorizePlayer = (req, res, next) => {
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json("Token is required");
	}

	try {
		const payload = jwt.verify(token, proccess.env.ACCESS_TOKEN_SECRET);

		req.user = payload;
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).json("Token is invalid");
	}
};

module.exports = authorizePlayer;
