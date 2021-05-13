import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

import Scoreboard from "../components/Scoreboard";
import { StyledButton } from "../style/StyledButton";
import HomeLink from "../components/HomeLink";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<HomeLink />
			<StyledButton onClick={startGame}>Start Game</StyledButton>
			<Scoreboard data={scoreBoard} />
		</div>
	);
};

export default LandingPage;
