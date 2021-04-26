import styled from "styled-components";

export const Option = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px;
	width: 40%;
	cursor: pointer;
	label {
		width: 100%;
		padding: 15px;
		font-size: 22px;
		color: ${(props) => (props.selected ? "white" : "black")};
		border: 2px solid;
		border-color: ${(props) =>
			props.showAnswer ? "green" : props.showMistake ? "red" : "none"};
		border-radius: 5px;
		background-color: ${(props) =>
			props.showAnswer
				? "green"
				: props.showMistake
				? "red"
				: props.selected
				? "blue"
				: "white"};
	}

	input {
		display: none;
	}
`;
