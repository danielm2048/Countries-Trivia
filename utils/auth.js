require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
	const accessToken = jwt.sign(
		{ userId: user.id, email: user.email, name: user.name },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "5min",
		}
	);

	return accessToken;
};

const createRefreshToken = (user) => {
	const refreshToken = jwt.sign(
		{ userId: user.id, email: user.email, name: user.name },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return refreshToken;
};

const sendTokens = (res, accessToken, refreshToken) => {
	res.cookie("access-token", accessToken, {
		expires: new Date(Date.now() * 1000 * 60 * 5),
		httpOnly: true,
		path: "/api/users/",
		//secure: true
	});

	res.cookie("refresh-token", refreshToken, {
		expires: new Date(Date.now() * 1000 * 60 * 60 * 24 * 7),
		httpOnly: true,
		path: "/api/users/",
		//secure: true
	});
};

module.exports = {
	createAccessToken,
	createRefreshToken,
	sendTokens,
};
