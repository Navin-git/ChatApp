import axios from "axios";
const path = "https://warm-badlands-28984.herokuapp.com/api/";
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
