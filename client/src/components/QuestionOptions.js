import { Option } from "../style/TriviaInput";

const QuestionOptions = ({ question, selected, setSelected, submitted }) => {
	return (
		<div className="question-options">
			{question.options.map((option, i) => (
				<Option
					key={i}
					selected={option === selected}
					showAnswer={option === question.answer && submitted}
					showMistake={
						option === selected && option !== question.answer && submitted
					}
				>
					<label htmlFor={i} className="questionOption">
						{option}
					</label>
					<input
						id={i}
						type="radio"
						name="option"
						value={option}
						onChange={(e) => setSelected(e.target.value)}
					/>
				</Option>
			))}
		</div>
	);
};

export default QuestionOptions;
