import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetSelectedPlaylist } from "../redux/songsSlice";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { SetEditPlaylist } from "../redux/songsSlice";
import axios from "axios";
import { SetUser } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { API_ENDPOINT } from "../utils/api_config";

const PlayList = () => {
  const { user } = useSelector((state) => state.user);
  const { allSongs, selectedPlaylist } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPlaylists = [
    { name: "All Songs", songs: allSongs },
    ...user.playlists,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.delete(`${API_ENDPOINT}/users/playlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { name },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Playlist Deleted");
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs?.length > 0)
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
  }, [selectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-gray-500">Your Playlists</h1>
        <button
          className="text-white bg-orange-400 p-2 rounded"
          onClick={() => navigate("/create-edit-playlist")}
        >
          Create Playlist
        </button>
      </div>
      <div className="grid grid-cols-3 mt-10 gap-3">
        {allPlaylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              className={`flex flex-col gap-3 shadow border p-3 cursor-pointer ${
                isSelected && "border-orange-500 border-4"
              }`}
              onClick={() => {
                dispatch(SetSelectedPlaylist(playlist));
              }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl">{playlist?.name}</h1>
                {playlist.name !== "All Songs" && (
                  <AiOutlineEdit
                    className="text-xl"
                    onClick={() => {
                      dispatch(SetEditPlaylist(playlist));
                      navigate("/create-edit-playlist");
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <h1 className="text-xl">{playlist?.songs?.length} Songs</h1>
                {playlist.name !== "All Songs" && (
                  <AiOutlineDelete
                    className="text-xl"
                    onClick={() => onDelete(playlist?.name)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayList;
