import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    LogoutUser: (state) => {
      state = INITIAL_STATE;
    }
  },
});

export const { SetUser, LogoutUser } = userSlice.actions;
