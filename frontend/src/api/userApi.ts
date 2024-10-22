import { AppDispatch } from "../reduxAuth_Slices/store";
import { setAccessToken, setAuthStatus, updateUserData } from "../reduxAuth_Slices/userSlice";
import axios from "./axiosInstance";


const handleLogin = async (dispatch: AppDispatch,identifier: string, password: string) => {

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
    dispatch(setAuthStatus(true))
    dispatch(setAccessToken(response.data.accessToken))
    dispatch(updateUserData(response.data.userData));
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export { handleLogin };
