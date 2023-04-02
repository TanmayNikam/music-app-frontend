import React, { useEffect, Fragment } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetAllSongs } from "../redux/songsSlice";
import { ShowLoading, HideLoading } from "../redux/alertSlice";
import SongsList from "../components/SongsList";
import PlayList from "../components/PlayList";
import Player from "../components/Player";

const Home = () => {
  const dispatch = useDispatch();

  // const getAllSongs = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.get("/api/songs", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     dispatch(SetAllSongs(response.data.data));
  //     dispatch(HideLoading());
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllSongs();
  // }, []);

  return (
    <>
      <div className="flex gap-5">
        <div className="w-1/2">
          <SongsList />
        </div>
        <div className="w-1/2">
          <PlayList />
        </div>
      </div>
      <Player />
    </>
  );
};

export default Home;
