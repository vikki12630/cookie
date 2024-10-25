import axios from "./axiosInstance";
import  { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../reduxAuth_Slices/store";
import { setLoadingPageReload } from "../reduxAuth_Slices/loadingSlice";
import {
  logout,
  setAccessToken,
  setAuthStatus,
  updateUserData,
} from "../reduxAuth_Slices/userSlice";

/* 
@login function
@post request
*/

const handleLogin = async (
  dispatch: AppDispatch,
  identifier: string,
  password: string,
  navigate: NavigateFunction
) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(
      "/user/login",
      { identifier, password },
      config
    );
    // console.log(response);
    if (response.data.error) {
      return;
    }
    dispatch(setAuthStatus(true));
    dispatch(setAccessToken(response.data.accessToken));
    dispatch(updateUserData(response.data.userData));
    navigate("/");
  } catch (error) {
    // console.error("Error logging in:", error);
    return error;
  }
};

/* 
@get current user function
@get request
*/
const getCurrentUser = async (
  axiosPrivate: AxiosInstance,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  try {
    const response = await axiosPrivate.get("/user/getcurrentuser");
    // console.log(response);
    dispatch(setAuthStatus(true));
    dispatch(updateUserData(response.data.userData));
    dispatch(setLoadingPageReload(false));
    navigate("/");
  } catch (error) {
    dispatch(setLoadingPageReload(false));
    console.log(error);
  }
};

/* 
@user logout
@post request
*/

const handleLogout = async (
  axiosPrivate: AxiosInstance,
  dispatch: AppDispatch
) => {
  try {
    const response = await axiosPrivate.post("/user/logout");
    console.log(response);
    dispatch(logout());
  } catch (error) {
    return error;
  }
};

/* 
@search user function
@get request
*/

const searchUser = async (axiosPrivate: AxiosInstance, searchInput: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(searchInput);
    const response = await axiosPrivate.get(
      `/user/searchuser?search=${searchInput}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export { handleLogin, getCurrentUser, handleLogout, searchUser };
