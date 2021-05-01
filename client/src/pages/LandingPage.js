import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import globe2 from "../images/globe2.gif";

import axios from "axios";

import Scoreboard from "../components/Scoreboard";

const LandingPage = ({ history }) => {
	const [scoreBoard, setScoreBoard] = useState();

	const player = useSelector((state) => state.player);

	const startGame = () => {
		if (player.name) {
			history.push("/game");
		} else {
			history.push("/login");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("/api/players/score-board");
			setScoreBoard(data);
		};
		fetchData();

		return () => {
			setScoreBoard();
		};
	}, []);

	return (
		<div>
			<img style={{ height: 300 }} src={globe2} alt="logo" />
			<h1 className="login-header">Country Quiz</h1>
			<br />
			<div className="ex2 draw"></div>
			<button onClick={startGame}>Start Game</button>
			<Scoreboard data={scoreBoard} />
		</div>
	);
};

export default LandingPage;
