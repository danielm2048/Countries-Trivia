import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearState } from "../reducers/playerReducer";
import { StyledLink } from "../style/StyledLink";
import { StyledButton } from "../style/StyledButton";
import HomeLink from "../components/HomeLink";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<HomeLink />
			<StyledLink to="/register">
				Not a user? Click here to register!
			</StyledLink>
			{isError && <h2 style={{ color: "red" }}>{errorMessage}!</h2>}
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
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

				<StyledButton type="submit">Login</StyledButton>
			</form>
		</div>
	);
};

export default Login;
