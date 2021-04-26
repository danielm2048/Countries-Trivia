import styled, { keyframes } from "styled-components";

export const Modal = styled.div`
	display: ${(props) => (props.open ? "block" : "none")};
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
	padding-top: 60px;
`;

const zoom = keyframes`
  from {
    transform: scale(0)
  } 
  to {
    transform: scale(1)
  }
`;

export const ModalContent = styled.div`
	position: relative;
	background-color: #fefefe;
	margin: 5% auto 15% auto;
	border: 1px solid #888;
	width: 70%;
	animation: ${zoom} 0.6s;
	padding: 50px 100px;
`;

export const Close = styled.span`
	position: absolute;
	right: 25px;
	top: 0;
	color: #000;
	font-size: 35px;
	font-weight: bold;

	&:hover,
	&:focus {
		color: blue;
		cursor: pointer;
	}
`;
