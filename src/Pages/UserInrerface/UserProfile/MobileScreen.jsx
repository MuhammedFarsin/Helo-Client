import { useDispatch } from "react-redux";
import axiosInstance from "../../../Axios/axios";
import { toast } from "sonner";
import { setUser } from "../../../Store/Slices/userSlice";
import Swal from "sweetalert2";
import defaultImage from "../../../assets/imageProject/camera.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import ToasterHot from "../../Common/ToasterHot";

function MobileScreenProfile({ user, posts }) {
    const dispatch = useDispatch();
  
    const handleProfilePictureChange = async (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const formData = new FormData();
        formData.append("profilePicture", file);
        formData.append("userId", user._id);
  
        try {
          const response = await axiosInstance.patch(
            "/update-profile-picture",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          const updatedUser = response.data;
          console.log(updatedUser);
  
          dispatch(
            setUser({ ...user, profilePicture: updatedUser.profilePicture })
          );
  
          ToasterHot.success("Profile picture updated successfully!");
        } catch (error) {
          toast.error("Error updating profile picture", error.message);
        }
      }
    };
    const handleAddHeloId = async () => {
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
            error.message
          );
        }
      }
    };
    return (
      <div className="flex flex-col items-center w-full px-4 mt-4">
        {user.helo_id ? (
          <span className="font-bold text-lg mr-80">{user.helo_id}</span>
        ) : (
          <button
            className="text-sm px-3 py-1 border bg-orange-500 rounded-lg mr-80"
            onClick={handleAddHeloId}
          >
            Add Helo ID
          </button>
        )}
        {/* <div className="w-full max-w-md bg-white rounded-md shadow-md p-5"> */}
        
  
        <div className="flex items-center">
          {/* Profile Picture */}
          {user.profilePicture === "defaultImage" || !user.profilePicture ? (
            <div className="relative">
            {/* Default image or Upload button */}
            <img
              src={defaultImage}
              alt="Default Profile"
              className="w-24 h-24 object-cover rounded-full mt-3 mr-20"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer bg-gray-200 p-1 rounded-full mr-16">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <PlusCircleIcon className="w-6 h-6 text-gray-600" />
            </label>
          </div>
          ) : (
            <img
              src={user.profilePicture || defaultImage}
              alt={`${user.username}'s profile`}
              className="w-24 h-24 object-cover rounded-full mt-3 mr-20"
            />
          )}
          {/* User Info */}
          <div className="flex flex-col items-start">
            {/* User Helo ID */}
            <span className="font-bold text-lg">{user.username}</span>
            {/* Stats Section */}
            <div className="flex space-x-8 mt-2">
              <div className="flex flex-col items-center">
                <span className="font-bold">{posts.length || 0}</span>
                <span className="text-sm text-gray-500">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold">{user.followersCount || 0}</span>
                <span className="text-sm text-gray-500">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold">{user.followingCount || 0}</span>
                <span className="text-sm text-gray-500">Following</span>
              </div>
            </div>
          </div>
  
          {/* Optional Bio or Description */}
          {user.bio && <p className="mt-4 text-sm text-gray-600">{user.bio}</p>}
        </div>
        <div className="flex space-x-4 mt-2 ml-32">
          <button className="px-12 py-2 bg-gray-300 text-black rounded-full font-semibold hover:bg-gray-400 transition duration-300">
            Edit
          </button>
          <button className="px-12 py-2 bg-gray-300 text-black rounded-full font-semibold hover:bg-gray-400 transition duration-300">
            Share
          </button>
        </div>
       <ToasterHot/>
      </div>
      // </div>
    );
  }
export default MobileScreenProfile  