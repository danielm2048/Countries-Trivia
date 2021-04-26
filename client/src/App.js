import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import TriviaPage from "./components/TriviaPage";
import EndgamePage from "./components/EndgamePage";
import NotFound from "./components/NotFound";

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

	return (
		<div className="App">
			<Header player={player} />
			<div className="body">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route path="/login" component={Login} />
					<EndgameRoute path="/end-game" component={EndgamePage} />
					<GameRoute path="/game" component={TriviaPage} />
					<Route path="/404" component={NotFound} />
					<Redirect to="/404" />
				</Switch>
			</div>
		</div>
	);
};

export default App;
