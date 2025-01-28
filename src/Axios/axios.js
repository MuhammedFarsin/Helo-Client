import axios from "axios"; 
//AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axiosInstance.post("/refresh-token", { refreshToken });

          localStorage.setItem("accessToken", data.accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";  

          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; 
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;

export const googleAuth = (code) => {
  return axiosInstance.get(`/auth/google?code=${code}`);
};
