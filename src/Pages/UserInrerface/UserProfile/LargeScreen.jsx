import { useDispatch } from "react-redux";
import axiosInstance from "../../../Axios/axios";
import { toast } from "sonner";
import { setUser } from "../../../Store/Slices/userSlice";
import Swal from "sweetalert2";
import defaultImage from "../../../assets/imageProject/camera.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import ToasterHot from "../../Common/ToasterHot";

function LargeScreenProfile({ user, posts }) {
    const dispatch = useDispatch();
  console.log(user)
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
  
          toast.success("Profile picture updated successfully!");
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
      <div className="flex flex-col items-center w-full mt-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-24 mr-32">
          {/* Profile Picture or Upload Button */}
          {!user.profilePicture || user.profilePicture === "defaultImage" ? (
            <div className="relative">
              {/* Default image or Upload button */}
              <img
                src={defaultImage}
                alt="Default Profile"
                className="w-36 h-36 object-cover rounded-full"
              />
              <label className="absolute bottom-0 right-0 cursor-pointer bg-gray-200 p-1 rounded-full">
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
              src={user.profilePicture || defaultImage} // Fallback to defaultImage if no profile picture
              alt={`${user.username}'s profile`}
              className="w-36 h-36 object-cover rounded-full"
            />
          )}
    
          <div className="ml-6">
            {/* User Info */}
            <div className="flex space-x-6">
              {/* Helo ID Display or Add Button */}
              {user.helo_id ? (
                <h2 className="font-bold text-lg lg:text-2xl">{user.helo_id}</h2>
              ) : (
                <button
                  className="text-sm px-3 py-1 border bg-orange-500 rounded-lg"
                  onClick={handleAddHeloId}
                >
                  Add Helo ID
                </button>
              )}
    
              <div className="flex space-x-4 mt-2">
                <button className="px-8 py-1 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
                  Edit
                </button>
                <button className="px-8 py-1 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
                  Share
                </button>
              </div>
            </div>
    
            <div className="flex space-x-12 mt-4">
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{posts.length || 0}</span>
                <span className="text-sm text-gray-500">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{user.followersCount || 0}</span>
                <span className="text-sm text-gray-500">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xl">{user.followingCount || 0}</span>
                <span className="text-sm text-gray-500">Following</span>
              </div>
            </div>
          </div>
        </div>
    
        {/* Optional Bio or Description */}
        <div className="w-full mt-4">
          {user.bio && <p className="text-lg text-gray-600">{user.bio}</p>}
        </div>
    
        {/* Posts Section */}
        
        <ToasterHot/>
      </div>
    );
    
  }

  export default LargeScreenProfile;