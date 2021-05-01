import { Box } from "../style/BoxTimer";

const QuestionTimer = ({ question, timer }) => {
	return (
		<div style={{ margin: "0 auto", width: 600 }}>
			{timer <= 0 ? (
				<h1>{question.fullQuestion}</h1>
			) : (
				<Box questionId={question.id} timer={timer}>
					<h1>{question.fullQuestion}</h1>
				</Box>
			)}
		</div>
	);
};

export default QuestionTimer;
