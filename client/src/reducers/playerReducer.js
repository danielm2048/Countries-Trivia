import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
	name: "player",
	initialState: {
		name: "",
		score: 0,
		strikes: 0,
		ratings: [],
	},
	reducers: {
		setPlayer: (state, action) => {
			state.name = action.payload;
		},
		addToPlayerScore: (state, action) => {
			state.score += action.payload;
		},
		incrementStrikes: (state) => {
			state.strikes += 1;
		},
		rateQuestion: (state, action) => {
			// payload is an object with question id and rating
			state.ratings.push(action.payload);
		},
		resetGame: (state) => {
			state.score = 0;
			state.strikes = 0;
		},
	},
});

export const {
	setPlayer,
	addToPlayerScore,
	incrementStrikes,
	rateQuestion,
	resetGame,
} = playerSlice.actions;

export default playerSlice.reducer;
