import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addToPlayerScore,
	incrementStrikes,
	rateQuestion,
	resetGame,
} from "../reducers/playerReducer";

import Loader from "./Loader";
import QuestionOptions from "./QuestionOptions";
import Rating from "./Rating";

const TriviaPage = ({ history }) => {
	const [question, setQuestion] = useState();
	const [counter, setCounter] = useState(1);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [timer, setTimer] = useState(20);
	const [rating, setRating] = useState(0);

	const player = useSelector((state) => state.player);
	const dispatch = useDispatch();

	const submitAnswer = () => {
		if (submitted) {
			if (rating) {
				dispatch(rateQuestion({ questionId: question.id, rating }));
			}

			if (player.strikes === 3) {
				history.push("/end-game");
			}

			setSubmitted(false);
			setSelected();
			setTimer(20);
			setRating(0);
			setCounter((prevState) => prevState + 1);
		} else {
			if (selected) {
				setSubmitted(true);
				setTimer(-1);
				if (question.answer !== selected) {
					dispatch(incrementStrikes());
				} else {
					dispatch(addToPlayerScore(timer * 10));
				}
			}
		}
	};

	useEffect(() => {
		dispatch(resetGame());
	}, [dispatch]);

	useEffect(() => {
		const generateQuestion = async () => {
			setLoading(true);
			const { data } = await axios.get(
				`/api/questions/generate?saved=${counter % 3 === 0}`
			);
			setLoading(false);
			setQuestion(data);
		};
		generateQuestion();
	}, [counter]);

	useEffect(() => {
		let interval = null;

		interval = setInterval(() => setTimer((prevState) => prevState - 1), 1000);

		if (timer <= 0) {
			clearInterval(interval);
			setSubmitted(true);

			if (timer === 0) {
				dispatch(incrementStrikes());
			}
		}

		return () => clearInterval(interval);
	}, [timer, dispatch, history]);

	if (loading || !question) {
		return <Loader />;
	}

	console.log("This is the answer: ", question.answer);

	return (
		<div>
			<div>
				<p>
					Question Number: {counter} | Score: {player.score} | Strikes:{" "}
					{player.strikes} | Time Left: <strong>{timer}</strong>
				</p>

				<div style={{ width: 600 }}>
					<h1>{question.fullQuestion}</h1>
				</div>

				{timer === 0 && (
					<h3>Time's up, Maybe try a bit less slowly next time!</h3>
				)}
			</div>

			<QuestionOptions
				question={question}
				selected={selected}
				setSelected={setSelected}
				submitted={submitted}
			/>

			{submitted && (
				<div>
					<h3>If you want you can rate this question here 👇</h3>
					<Rating rating={rating} setRating={setRating} />
				</div>
			)}

			<button onClick={submitAnswer}>
				{submitted
					? player.strikes === 3
						? "Finish Game"
						: "Next Question!"
					: "Submit Answer"}
			</button>
		</div>
	);
};

export default TriviaPage;
