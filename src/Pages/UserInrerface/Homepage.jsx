import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../Axios/axios";
import { useEffect } from "react";
import { setUser } from "../../Store/Slices/userSlice"; // Add your action to set the user data
import Swal from "sweetalert2"; // Import SweetAlert2

function Homepage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user.id) {
          const response = await axiosInstance.get(`/user-details/${user.id}`);
          console.log(response.data);
          if (response.status === 200 && response.data.usersInfo) {
            dispatch(setUser(response.data.usersInfo));

            // Check if helo_id is missing and prompt the user to add it
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
            userId: user.id,
          });

          console.log(response.data);
          dispatch(setUser({ ...user, helo_id: heloId }));

          Swal.fire("Success", "Your ID has been updated!", "success");
        } catch (error) {
          Swal.fire("Error", "There was an error updating your ID", "error",error);
        }
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
            <p>
              Hi {user.username} {user.lastName} || welcome...
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
