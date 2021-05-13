import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: #1d0bbb;
	font-size: 18px;

	&:hover {
		font-weight: bold;
		color: #910986;
	}
`;
