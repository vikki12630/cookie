import axios, { axiosPrivate } from "./axiosInstance";
import { useAppDispatch, useAppSelector } from "../reduxAuth_Slices/store";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { setAccessToken } from "../reduxAuth_Slices/userSlice";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const useAxiosPrivate = () => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((data) => data.user.accessToken);

  const refresh = async () => {
    const config = {
      withCredentials: true,
    };
    const response = await axios.get("/user/refreshaccesstoken", config);
    const token = response?.data.accessToken;

    dispatch(setAccessToken(token));
    return response;
  };

  axiosPrivate.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  axiosPrivate.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const previousRequest = error.config as CustomAxiosRequestConfig;

      if (
        error?.isAxiosError &&
        previousRequest !== undefined &&
        !previousRequest._retry
      ) {
        previousRequest._retry = true;
        try {
          const newAccessToken = await refresh();
          // console.log(newAccessToken);
          previousRequest.headers.Authorization = `Bearer ${newAccessToken?.data.accessToken}`
          return axiosPrivate(previousRequest)
        } catch (error) {
          console.error(error);
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default useAxiosPrivate;
