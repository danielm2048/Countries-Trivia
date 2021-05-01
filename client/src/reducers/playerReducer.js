import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const signup = createAsyncThunk(
	"player/signup",
	async ({ name, email, password }, thunkAPI) => {
		try {
			const res = await axios.post("/api/players/signup", {
				userName: name,
				email,
				password,
			});

			if (res.status === 200) {
				return res.data;
			} else {
				return thunkAPI.rejectWithValue(res.data);
			}
		} catch (err) {
			console.log("Error", err.response.data);
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const login = createAsyncThunk(
	"player/login",
	async ({ email, password }, thunkAPI) => {
		try {
			const res = await axios.post("/api/players/login", { email, password });

			if (res.status === 200) {
				return res.data;
			} else {
				return thunkAPI.rejectWithValue(res.data);
			}
		} catch (err) {
			console.log("Error", err.response.data);
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const loadUser = createAsyncThunk(
	"player/loadUser",
	async (_, thunkAPI) => {
		const res = await axios.post("/api/players/token");

		if (res.status === 200) {
			return res.data;
		} else {
			return thunkAPI.rejectWithValue();
		}
	}
);

export const playerSlice = createSlice({
	name: "player",
	initialState: {
		id: null,
		name: "",
		score: 0,
		strikes: 0,
		ratings: [],
		accessToken: "",
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
	},
	reducers: {
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
		removeUser: (state) => {
			state.id = null;
			state.name = "";
			state.score = 0;
			state.strikes = 0;
			state.ratings = [];
			state.accessToken = "";
		},
		clearState: (state) => {
			state.isSuccess = false;
			state.isFetching = false;
			state.isError = false;
			state.errorMessage = "";
		},
	},
	extraReducers: {
		[signup.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.id = action.payload.player.id;
			state.name = action.payload.player.name;
			state.accessToken = action.payload.accessToken;
		},
		[signup.pending]: (state) => {
			state.isFetching = true;
		},
		[signup.rejected]: (state, action) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		[login.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = true;
			state.id = action.payload.player.id;
			state.name = action.payload.player.name;
			state.accessToken = action.payload.accessToken;
		},
		[login.pending]: (state) => {
			state.isFetching = true;
		},
		[login.rejected]: (state, action) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.isFetching = false;
			state.isSuccess = true;
			const { userId, name } = jwtDecode(action.payload);
			state.id = userId;
			state.name = name;
			state.accessToken = action.payload;
		},
		[loadUser.pending]: (state) => {
			state.isFetching = true;
		},
		[loadUser.rejected]: (state) => {
			state.isFetching = false;
		},
	},
});

export const {
	addToPlayerScore,
	incrementStrikes,
	rateQuestion,
	resetGame,
	removeUser,
	clearState,
} = playerSlice.actions;

export default playerSlice.reducer;
