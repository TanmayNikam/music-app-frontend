import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";

const AdminHome = () => {
  const navigate = useNavigate();
  const addEditSong = () => {
    navigate("/admin/add-edit-song");
  };
  const { user } = useSelector((state) => state.user);
  const { allSongs } = useSelector((state) => state.songs);
  const [songSelectedForEdit, setSongSelectedForEdit] = useState(false);
  useEffect(() => {
    if (user && !user?.isadmin) navigate("/");
  }, []);

  return (
    <div>
      <MdArrowBack
        className="text-2xl mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex justify-between">
        <h1 className="text-3xl text-gray-700">All Songs</h1>
        <button
          className="text-white bg-orange-500 py-2 px-7"
          onClick={addEditSong}
        >
          Add Song
        </button>
      </div>
      <div className="mt-10">
        <table className="w-full">
          <thead className="w-full bg-gray-200">
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSongs?.map((song) => (
              <tr key={song._id}>
                <td className="w-96">{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.year}</td>
                <td>{song.duration}</td>
                <td>
                  <AiOutlineEdit
                    className="text-3xl cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/add-edit-song?id=${song._id}`)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
