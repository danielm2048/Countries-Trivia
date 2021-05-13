import styled from "styled-components";

export const StyledButton = styled.button`
	/* color: #e22525; */
	color: #fff;
	transition: all 0.5s;
	position: relative;
	line-height: 50px;
	height: 50px;
	width: 250px;
	margin: 10px 0;
	background: none;
	border: none;
	outline: none;
	font-size: 16px;
	cursor: pointer;
	font-family: "Nanum Gothic", sans-serif;
	font-weight: 600;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(255, 255, 255, 0.1);
		transition: all 0.3s;
	}
	&:hover::before {
		opacity: 0;
		transform: scale(0.5, 0.5);
	}
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		opacity: 0;
		transition: all 0.3s;
		border: 1px solid rgba(255, 255, 255, 0.5);
		transform: scale(1.2, 1.2);
	}
	&:hover::after {
		opacity: 1;
		transform: scale(1, 1);
	}
`;

export const StyledBordersButton = styled.button`
	/* color: #e22525; */
	color: #fff;
	transition: all 0.5s;
	position: relative;
	line-height: 50px;
	height: 50px;
	width: 250px;
	margin: 10px 0;
	background: none;
	border: none;
	outline: none;
	font-size: 16px;
	cursor: pointer;
	font-family: "Nanum Gothic", sans-serif;
	font-weight: 600;

	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		opacity: 0;
		transition: all 0.3s;
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-top-style: solid;
		border-bottom-style: solid;
		border-top-color: rgba(255, 255, 255, 0.5);
		border-bottom-color: rgba(255, 255, 255, 0.5);
		transform: scale(0.1, 1);
	}

	&:hover::before {
		opacity: 1;
		transform: scale(1, 1);
	}
	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		transition: all 0.3s;
		background-color: rgba(255, 255, 255, 0.1);
	}
	&:hover::after {
		opacity: 0;
		transform: scale(0.1, 1);
	}
`;
