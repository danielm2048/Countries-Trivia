import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/playerReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserCircle } from "@styled-icons/boxicons-regular";
import country_quiz_logo from "../images/country_quiz_logo.png";
import { HeaderActions } from "../style/HeaderActions";

const Header = ({ player }) => {
	const dispatch = useDispatch();

	const logout = async () => {
		const res = await axios.post("/api/players/logout");

		if (res.data.loggedOut) {
			dispatch(removeUser());
		}
	};

	return (
		<div className="header">
			<Link to="/">
				<img style={{ height: 100 }} src={country_quiz_logo} alt="logo" />
			</Link>
			<span className="login">
				{player.name ? (
					<HeaderActions>
						<strong>Hello {player.name}</strong>
						<button onClick={logout}>Logout</button>
					</HeaderActions>
				) : (
					<HeaderActions>
						<strong>Please login</strong>
						<Link to="/login">
							<UserCircle title="login" size="50" color="#115d80" />
						</Link>
					</HeaderActions>
				)}
			</span>
		</div>
	);
};

export default Header;
