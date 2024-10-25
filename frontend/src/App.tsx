import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "./api/userApi";
import useAxiosPrivate from "./api/interceptorUseAxiosPrivate";
import { useAppDispatch } from "./reduxAuth_Slices/store";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthLayout from "./layout/AuthLayout";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import ProfilePage from "./pages/ProfilePage";
import Search from "./pages/Search";

function App() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser(axiosPrivate, dispatch, navigate);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
