import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayer } from "../reducers/playerReducer";
import globe2 from "../images/globe2.gif";

const Login = ({ history }) => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	const loginPlayer = async (e) => {
		e.preventDefault();

		dispatch(setPlayer(name));

		history.push("/");
	};

	return (
		<div>
			<img style={{ height: 300 }} src={globe2} alt="logo" />
			<h1 className="login-header">Country Quiz</h1>
			<form onSubmit={loginPlayer}>
				<input
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter your name "
				/>
				<button type="submit">Submit name</button>
			</form>
		</div>
	);
};

export default Login;
