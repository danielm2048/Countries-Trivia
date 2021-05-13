import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearState } from "../reducers/playerReducer";
import { StyledLink } from "../style/StyledLink";
import { StyledButton } from "../style/StyledButton";
import HomeLink from "../components/HomeLink";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<HomeLink />
			<StyledLink to="/login">Have an account? Click here to login!</StyledLink>
			{isError && <h2 style={{ color: "red" }}>{errorMessage}!</h2>}
			<form
				onSubmit={registerPlayer}
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
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

				<StyledButton type="submit">Register</StyledButton>
			</form>
		</div>
	);
};

export default Register;
