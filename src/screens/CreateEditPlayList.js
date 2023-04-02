import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../redux/alertSlice";
import { SetUser } from "../redux/userSlice";
import { SetEditPlaylist, SetSelectedPlaylist } from "../redux/songsSlice";
import Player from "../components/Player";
import { MdArrowBack } from "react-icons/md";
import { API_ENDPOINT } from "../utils/api_config";

const CreateEditPlayList = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const navigate = useNavigate();
  const { allSongs, editPlaylist } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editPlaylist) {
      setSelectedSongs(editPlaylist.songs);
      setPlaylistName(editPlaylist.name);
    }
  }, []);

  const selectedUnselectSong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id))
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    else setSelectedSongs([...selectedSongs, song]);
  };

  const onEdit = async () => {
    if (selectedSongs.length === 0)
      toast.error("Please select atleast 1 song in playlist");
    else {
      try {
        dispatch(ShowLoading());
        const response = await axios.patch(
          `${API_ENDPOINT}/users/playlist`,
          {
            name: playlistName,
            songs: selectedSongs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          dispatch(SetUser(response.data.data));
          dispatch(SetEditPlaylist(null));
          dispatch(
            SetSelectedPlaylist({
              name: "All Songs",
              songs: allSongs,
            })
          );
          toast.success("Playlist Updated");
          setPlaylistName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  const onAdd = async () => {
    if (playlistName.trim().length === 0)
      toast.error("Please add name for the playlist");
    else if (selectedSongs.length === 0)
      toast.error("Please select atleast 1 song in playlist");
    else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `${API_ENDPOINT}/users/playlist`,
          {
            name: playlistName,
            songs: selectedSongs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          dispatch(SetUser(response.data.data));
          toast.success("Playlist created");
          setPlaylistName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <MdArrowBack className="text-2xl" onClick={() => navigate("/")} />
        <h1 className="text-2xl text-gray-500">Create Playlist</h1>
      </div>
      <div className="flex justify-between mt-5">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          disabled={editPlaylist !== null}
          className="w-96 p-2"
          placeholder="Playlist Name"
        />
        <button
          className="text-white bg-orange-400 p-2 rounded w-24"
          onClick={() => {
            editPlaylist ? onEdit() : onAdd();
          }}
        >
          Save
        </button>
      </div>
      <div className="mt-10">
        <h1 className="text-xl text-gray-700">
          Songs Selected - {selectedSongs.length}
        </h1>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {allSongs?.map((song, index) => {
            const isSelected = selectedSongs.find((s) => s._id === song._id);
            return (
              <div
                className={`flex items-center justify-between cursor-pointer p-3 border border-gray-300 shadow-md ${
                  isSelected && "border border-orange-500 border-4"
                }`}
                onClick={() => selectedUnselectSong(song)}
                key={song._id}
              >
                <div>
                  <h1>{song.title}</h1>
                  <h1>
                    {song.artist} - {song.album} - {song.year}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default CreateEditPlayList;
