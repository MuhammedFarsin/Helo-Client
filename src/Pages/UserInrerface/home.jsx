import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../Axios/axios";
import { useEffect } from "react";
import { setUser } from "../../Store/Slices/userSlice";  // Add your action to set the user data

function Layout() {
  const user = useSelector((state) => state.user);
  console.log(user.id)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user.id) {
          const response = await axiosInstance.get(`/user-details/${user.id}`);
          console.log(response.data);
          if (response.status === 200 && response.data.usersInfo) {
            dispatch(setUser(response.data.usersInfo));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [user, dispatch]);
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />
      
      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
        <div>
          {/* Display user details if available */}
          {user.username ? (
            <p>Hi {user.username} {user.lastName} || welcome...</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Layout;
