import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  allSongs: null,
  currentSong: null,
  currentSongIndex: null,
  selectedPlaylist: null,
  editPlaylist: null,
  isPlaying: false,
  currentTime: 0,
};

export const songSlice = createSlice({
  name: "songs",
  initialState: INITIAL_STATE,
  reducers: {
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    SetSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    SetEditPlaylist: (state, action) => {
      state.editPlaylist = action.payload;
    },
    SetisPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    SetCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const {
  SetAllSongs,
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
  SetEditPlaylist,
  SetisPlaying,
  SetCurrentTime,
} = songSlice.actions;
