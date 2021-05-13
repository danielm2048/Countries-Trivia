import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/playerReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserCircle, LogOut } from "@styled-icons/boxicons-regular";
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
			<span className="login">
				{player.name ? (
					<HeaderActions>
						<strong>Hello {player.name}</strong>
						<LogOut
							title="logout"
							size="40"
							color="#115d80"
							onClick={logout}
							style={{ cursor: "pointer" }}
						/>
					</HeaderActions>
				) : (
					<HeaderActions>
						<strong>Please login</strong>
						<Link to="/login">
							<UserCircle title="login" size="40" color="#115d80" />
						</Link>
					</HeaderActions>
				)}
			</span>
		</div>
	);
};

export default Header;
