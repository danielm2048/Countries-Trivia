import styled from "styled-components";

export const Box = styled.div`
	border: 10px solid black;
	padding: 2rem 1rem;
	min-height: 3em;
	border-image: url("data:image/svg+xml;version=${props => props.questionId};charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 20s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:388%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2322318a' /%3E%3Cstop offset='25%25' stop-color='%232839ce' /%3E%3Cstop offset='50%25' stop-color='%234566c0' /%3E%3Cstop offset='100%25' stop-color='%235790e6' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E")
		1;
`;