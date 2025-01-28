import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { logout } from "../Store/Slices/authSlice";
import { removeUser } from "../Store/Slices/userSlice";

// Connect to the server
const socket = io("http://localhost:4000");

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const userStatus = useSelector((state) => state.user?.status);


  useEffect(() => {
    socket.on("user-blocked", (data) => {
      const storedUserId = localStorage.getItem("userId");
      if (data.userId === storedUserId) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("userId");
        
        dispatch(removeUser());
        dispatch(logout());

        localStorage.setItem("logout", Date.now());

        navigate("/login");
      }
    });

    return () => {
      socket.off("user-blocked");
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "logout") {
        console.log("Logout event detected");
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  if (!auth || userStatus === "BLOCKED") {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default ProtectedRoute;
