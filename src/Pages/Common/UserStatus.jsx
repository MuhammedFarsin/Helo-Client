import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import { logout } from "../../Store/Slices/authSlice";
import { removeUser } from "../../Store/Slices/userSlice";
function UserStatus() {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axiosInstance.get("/check-user-status"); 
        if (response.data.status === "BLOCKED") {
            localStorage.removeItem("accessToken");
          dispatch(logout()); // Log out the user
          dispatch(removeUser());
          localStorage.clear();
          navigate("/login"); // Redirect to the login page
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      }
    };

    checkStatus();
  }, [dispatch, navigate, user]);
}

export default UserStatus
