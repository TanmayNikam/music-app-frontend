import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import Layout from "./Layout";
import { SetAllSongs, SetSelectedPlaylist } from "../redux/songsSlice";
import { API_ENDPOINT } from "../utils/api_config";

const PrivateRoute = ({ children }) => {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allSongs, selectedPlayList } = useSelector((state) => state.songs);

  const [readyToRender, setReadyToRender] = useState(false);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`${API_ENDPOINT}/users/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) dispatch(SetUser(response.data.user));
      else alert(response.data.message);
      setReadyToRender(true);
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
      localStorage.removeItem("token");
      setReadyToRender(true);
      navigate("/login");
    }
  };

  const getAllSongs = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`${API_ENDPOINT}/songs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(SetAllSongs(response.data.data));
      if (!selectedPlayList)
        dispatch(
          SetSelectedPlaylist({ name: "All Songs", songs: response.data.data })
        );
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === null) getUser();
    if (allSongs === null) getAllSongs();
  }, []);
  return <Fragment>{readyToRender && <Layout>{children}</Layout>}</Fragment>;
};

export default PrivateRoute;
