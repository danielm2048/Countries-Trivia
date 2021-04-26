import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";

export default configureStore({
	reducer: { player: playerReducer },
});
