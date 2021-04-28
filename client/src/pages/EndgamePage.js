import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const EndgamePage = ({ history }) => {
	const player = useSelector((state) => state.player);

	const startNewGame = () => {
		history.push("/game");
	};

	useEffect(() => {
		const createNewUser = async () => {
			const { data } = await axios.post("/api/players/signup", {
				userName: player.name,
				score: player.score,
			});

			await axios.post(`/api/ratings/${data.id}`, {
				ratings: player.ratings,
			});
		};
		createNewUser();
	}, [player.name, player.score, player.ratings]);

	return (
		<div>
			<h1>Seems like you couldn't handle us... 💁‍♂️</h1>
			<h2>Your final score is: {player.score} </h2>
			<h5>Why won't you try again ?</h5>
			<button onClick={startNewGame}>Start new game</button>
		</div>
	);
};

export default EndgamePage;
