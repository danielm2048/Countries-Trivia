import "./App.css";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { loadUser, removeUser, clearState } from "./reducers/playerReducer";

import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TriviaPage from "./pages/TriviaPage";
import EndgamePage from "./pages/EndgamePage";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";

const GameRoute = ({ component: Component, ...rest }) => {
	const player = useSelector((state) => state.player);

	return (
		<Route
			{...rest}
			render={(props) =>
				player.name ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/", state: { from: props.location } }} />
				)
			}
		/>
	);
};

const EndgameRoute = ({ component: Component, ...rest }) => {
	const player = useSelector((state) => state.player);

	return (
		<Route
			{...rest}
			render={(props) =>
				player.name && player.strikes === 3 ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/", state: { from: props.location } }} />
				)
			}
		/>
	);
};

const App = () => {
	const player = useSelector((state) => state.player);
	const dispatch = useDispatch();

	axios.defaults.headers.common[
		"authorization"
	] = `bearer ${player.accessToken}`;

	axios.defaults.withCredentials = true;

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			if (
				error.response.status === 403 &&
				originalRequest.url.includes("api/players/token")
			) {
				dispatch(removeUser());
				return Promise.reject(error);
			} else if (error.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;
				const res = await axios.post("/api/players/token");

				if (res.status === 200) {
					dispatch(loadUser(res.data));
				}
				return axios(originalRequest);
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		dispatch(loadUser());

		return () => {
			dispatch(clearState());
		};
	}, [dispatch]);

	if (player.isFetching) {
		return <Loader />;
	}

	return (
		<>
			<div className="ripple-background">
				<div className="circle xxlarge shade1"></div>
				<div className="circle xlarge shade2"></div>
				<div className="circle large shade3"></div>
				<div className="circle mediun shade4"></div>
				<div className="circle small shade5"></div>
			</div>
			<div className="App">
				<Header player={player} />
				<div className="main">
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<EndgameRoute path="/end-game" component={EndgamePage} />
						<GameRoute path="/game" component={TriviaPage} />
						<Route path="/404" component={NotFound} />
						<Redirect to="/404" />
					</Switch>
				</div>
			</div>
		</>
	);
};

export default App;
