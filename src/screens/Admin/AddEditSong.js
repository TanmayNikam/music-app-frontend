import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";
import { SetAllSongs } from "../../redux/songsSlice";
import { API_ENDPOINT } from "../../utils/api_config";

const AddEditSong = ({ match }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const songId = searchParams.get("id");
  const dispatch = useDispatch();
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    duration: "",
    file: "",
  });

  const fileTypes = ["MP3"];
  useEffect(() => {
    if (user && !user?.isadmin) navigate("/");
  }, []);

  const handleInputChange = (name) => (event) => {
    setSong({ ...song, [name]: event.target.value });
  };

  const handleFileChange = (file) => {
    setSong({ ...song, file: file });
  };

  const editSong = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/songs/${searchParams.get("id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setSong(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (songId && songId !== "") {
      editSong();
    }
  }, []);

  const onEditSong = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => formData.append(key, song[key]));
      formData.append("_id", songId);
      const response = await axios.patch(`${API_ENDPOINT}/admin/songs`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song Edited Successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  const onAddSong = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => formData.append(key, song[key]));
      const response = await axios.post(`${API_ENDPOINT}/admin/songs`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Song Added Successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <MdArrowBack className="text-2xl" onClick={() => navigate("/admin")} />
        <h1 className="text-3xl">Add Song</h1>
      </div>
      <div className="flex flex-col gap-3 w-1/3 mt-4">
        <input
          type="text"
          placeholder="Title"
          value={song.title}
          onChange={handleInputChange("title")}
          className="p-3"
        />
        <input
          type="text"
          placeholder="Artist"
          value={song.artist}
          onChange={handleInputChange("artist")}
          className="p-3"
        />
        <input
          type="text"
          placeholder="Album"
          value={song.album}
          onChange={handleInputChange("album")}
          className="p-3"
        />
        <input
          type="text"
          placeholder="Year"
          value={song.year}
          onChange={handleInputChange("year")}
          className="p-3"
        />
        <input
          type="text"
          placeholder="Duration"
          value={song.duration}
          onChange={handleInputChange("duration")}
          className="p-3"
        />
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
        />
        {song.file && <h1 className="text-gray-500 ">{song.file.name}</h1>}
        <div className="flex justify-end">
          {songId && songId !== "" ? (
            <button
              className="text-white bg-orange-500 py-2 px-10 max-w-max"
              onClick={onEditSong}
            >
              Edit Song
            </button>
          ) : (
            <button
              className="text-white bg-orange-500 py-2 px-10 max-w-max"
              onClick={onAddSong}
            >
              Add Song
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEditSong;
