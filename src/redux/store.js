import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { songSlice } from "./songsSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  alerts: alertsSlice.reducer,
  songs: songSlice.reducer,
});

export default configureStore({
  reducer: rootReducer,
});
