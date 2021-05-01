import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearState } from "../reducers/playerReducer";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { isSuccess, isError, errorMessage } = useSelector(
		(state) => state.player
	);

	const dispatch = useDispatch();

	const registerPlayer = (e) => {
		e.preventDefault();

		dispatch(signup({ name, email, password }));
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
			<Link to="/login">Already a user? Click here to login!</Link>
			{isError && <h2>{errorMessage}</h2>}
			<form
				style={{ display: "flex", flexDirection: "column" }}
				onSubmit={registerPlayer}
			>
				<label htmlFor="name">Enter Name:</label>
				<input
					name="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter Your Name..."
				/>

				<label htmlFor="email">Enter Email:</label>
				<input
					name="email"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter Your Email..."
				/>

				<label htmlFor="password">Enter Password:</label>
				<input
					name="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Select Password..."
				/>

				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
