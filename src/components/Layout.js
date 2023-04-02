import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(LogoutUser());
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleClickOnName = async () => {
    if (user && user?.isadmin) navigate("/admin");
  };

  return (
    <div className="main">
      <div className="header flex justify-between p-5 items-center shadow">
        <div className="text-3xl text-gray-700 font-bold">MY MUSE</div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl cursor-pointer" onClick={handleClickOnName}>
            {" "}
            {user?.name.toUpperCase()}
          </h1>
          <FiLogOut className="text-xl" onClick={handleLogout} />
        </div>
      </div>
      <div className="content m-10">{children}</div>
    </div>
  );
};

export default Layout;
