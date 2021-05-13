import { Link } from "react-router-dom";
import country_quiz_logo from "../images/country_quiz_logo.png";

const HomeLink = () => {
	return (
		<Link to="/">
			<img style={{ height: 200 }} src={country_quiz_logo} alt="logo" />
		</Link>
	);
};

export default HomeLink;
