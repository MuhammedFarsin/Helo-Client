import axios from "axios"; 
// import { baseURL } from "../Config/config";
//AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log('this is the token i need',token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const googleAuth = (code) => {
  return axiosInstance.get(`/auth/google?code=${code}`);
};
