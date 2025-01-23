import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../Axios/axios";
import { useEffect } from "react";
import { setUser } from "../../Store/Slices/userSlice";
import Swal from "sweetalert2";
import { useMediaQuery } from "react-responsive";

function Homepage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Media Queries for different screen sizes
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(`/user-details/${user._id}`);
          if (response.status === 200 && response.data.usersInfo) {
            dispatch(setUser(response.data.usersInfo));

            // Prompt for Helo ID if missing
            if (!response.data.usersInfo.helo_id) {
              promptHeloId();
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const promptHeloId = async () => {
      const { value: heloId } = await Swal.fire({
        text: "Enter your Helo ID",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      });

      if (heloId) {
        try {
          const response = await axiosInstance.patch("/update-user-helo_id", {
            heloId,
            userId: user._id,
          });
          console.log(response.data);
          dispatch(setUser({ ...user, helo_id: heloId }));
          Swal.fire("Success", "Your ID has been updated!", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            "There was an error updating your ID",
            "error",
            error
          );
        }
      }
    };
    
    fetchUserDetails();
  }, [user, dispatch]);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Render Navbar */}
      <Navbar />

      {/* Check for Helo ID */}
      {user && !user.helo_id && (
        <div className="p-5 text-center bg-yellow-200">
          <p>
            It seems like you haven’t set your Helo ID yet. Please enter it
            below.
          </p>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </div>
        {/* Profile Sidebar */}
        {isLargeScreen && (
          <div className="w-64 flex-shrink-0 p-5 bg-white shadow-lg h-full">
            <div className="flex flex-col space-y-6 items-center overflow-y-auto max-h-[300px]">
              {/* Profile Picture and Helo ID */}
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-14 h-14 object-cover rounded-full border-4 border-gray-200"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              )}
              <span className="text-xl font-semibold">
                {user.helo_id || "Loading..."}
              </span>

              {/* Add up to 9 user details here */}
              {/* Example: Repeat this for each user */}
              <div className="text-sm text-gray-600">User 1</div>
              <div className="text-sm text-gray-600">User 2</div>
              <div className="text-sm text-gray-600">User 3</div>
              {/* Repeat for other users */}
            </div>
          </div>
        )}
      </div>

      {/* Tablet Layout */}
      {isTablet && (
        <div className="flex flex-row flex-1">
          <div className="w-20 flex-shrink-0"></div>
          <div className="flex-1 p-5 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-5 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
