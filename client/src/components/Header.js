import { Link } from "react-router-dom";
import { UserCircle } from "@styled-icons/boxicons-regular";
import country_quiz_logo from "../images/country_quiz_logo.png";
const Header = ({ player }) => {
	return (
		<div className="header">
			<Link to="/">
				<img style={{ height: 100 }} src={country_quiz_logo} alt="logo" />
			</Link>
			<span className="login">
				{player.name ? (
					<span style={{ color: "#115d80", fontSize: "20px" }}>
						Hello {player.name}
						<UserCircle size="50" color="#115d80" />
					</span>
				) : (
					<span style={{ color: "#115d80", fontSize: "15px" }}>
						Please login
						<Link to="/login">
							<UserCircle title="login" size="50" color="#115d80" />
						</Link>
					</span>
				)}
			</span>
		</div>
	);
};

export default Header;
