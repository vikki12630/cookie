import axios from "axios";

const BASE_URL = String(import.meta.env.VITE_COOKIE_BACKEND_URL)

export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});