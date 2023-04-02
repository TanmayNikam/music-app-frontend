import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader";
import { Toaster } from "react-hot-toast";
import AdminHome from "./screens/Admin/AdminHome";
import AddEditSong from "./screens/Admin/AddEditSong";
import CreateEditPlayList from "./screens/CreateEditPlayList";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            exact
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
            exact
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
            exact
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
            exact
          />
          <Route
            path="/admin/add-edit-song"
            element={
              <PrivateRoute>
                <AddEditSong />
              </PrivateRoute>
            }
            exact
          />
          <Route
            path="/create-edit-playlist"
            element={
              <PrivateRoute>
                <CreateEditPlayList />
              </PrivateRoute>
            }
            exact
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
