import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearState } from "../reducers/playerReducer";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { isSuccess, isError, errorMessage } = useSelector(
		(state) => state.player
	);
	const dispatch = useDispatch();

	const loginPlayer = async (e) => {
		e.preventDefault();

		dispatch(login({ email, password }));
	};

	useEffect(() => {
		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (isSuccess) {
			history.push("/");
		}
		if (isError) {
			console.log(errorMessage);
		}
	}, [isSuccess, isError, errorMessage, history]);

	return (
		<div>
			<h1 className="login-header">Country Quiz</h1>
			<Link to="/register">Not a user? Click here to register!</Link>
			{isError && <h2>{errorMessage}</h2>}
			<form
				style={{ display: "flex", flexDirection: "column" }}
				onSubmit={loginPlayer}
			>
				<label htmlFor="email">Enter email:</label>
				<input
					id="email"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email..."
				/>

				<label htmlFor="password">Enter password: </label>
				<input
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter your password..."
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
