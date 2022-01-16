import axios from "axios";
const path = "http://127.0.0.1:8000/api/";
const axiosInstance = axios.create({
  baseURL: path,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
export default axiosInstance;
