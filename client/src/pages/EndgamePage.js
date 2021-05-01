import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../reducers/playerReducer";
import axios from "axios";

const EndgamePage = ({ history }) => {
	const player = useSelector((state) => state.player);
	const dispatch = useDispatch();

	const startNewGame = () => {
		dispatch(resetGame());

		history.push("/game");
	};

	useEffect(() => {
		const updateScore = async () => {
			await axios.put(`/api/players/update-score/${player.id}`, {
				score: player.score,
			});

			await axios.post(`/api/ratings/${player.id}`, {
				ratings: player.ratings,
			});
		};
		updateScore();
	}, [player.id, player.score, player.ratings]);

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
