import React, { useState } from "react";
import { validateEmail } from "../utils/helpers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { toast } from "react-hot-toast";
import { API_ENDPOINT } from "../utils/api_config";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUser = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const loginUser = async () => {
    if (user.email === "" || user.password === "")
      toast.error("Please Fill every field");
    else if (!validateEmail(user.email)) toast.error("Enter valid Email Id");
    else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(`${API_ENDPOINT}/users/login`, user);
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.data);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
        dispatch(HideLoading());
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 w-96 p-5 shadow border">
          <h1 className="text-3xl font-bold text-gray-700">
            Welcome To My Muse
          </h1>
          <hr />
          <input
            type="text"
            placeholder="Email"
            className="p-2"
            onChange={handleChangeUser("email")}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2"
            onChange={handleChangeUser("password")}
          />
          <button className="primary" onClick={loginUser}>
            Log In
          </button>
          <Link to="/signup" className="text-gray-600 underline text-center">
            Click here to Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
