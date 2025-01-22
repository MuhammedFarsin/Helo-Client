import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import axiosInstance from "../../Axios/axios"; // Make sure to import your axios instance
import ToasterHot from "../Common/ToasterHot";
import { toast } from "sonner";
import defaultImage from "../../assets/imageProject/camera.jpg";
import { setUser } from "../../Store/Slices/userSlice";

// Component for large screens

function LargeScreenProfile({ user, posts }) {
  return (
    <div className="flex flex-col items-center w-full px-12 mt-8">
      {/* Profile Section */}
      {/* <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center justify-between"> */}
        <div className="flex items-center space-x-24 mr-32">
          {/* Profile Picture */}
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-36 h-36 object-cover rounded-full"
          />
          <div className="ml-6">
            {/* User Info */}
            <div className="flex space-x-6">
              <span className="font-bold text-3xl">{user.helo_id}</span>
              <div className="flex space-x-4 mt-2">
                <button className="px-6 py-2 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
                  Edit
                </button>
                <button className="px-6 py-2 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
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
      {/* </div> */}

      {/* Posts Section */}
      <PostsSection posts={posts} />

      {/* Logout Button */}
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}


// Component for medium (tablet) screens
function TabletScreenProfile({ user, posts }) {
  return (
    <div className="flex flex-col items-center w-full px-8 mt-8">
      {/* Profile Section */}
      {/* <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"> */}
      {/* Profile Header */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {/* Profile Picture */}
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-36 h-36 object-cover rounded-full"
          />
          <div className="ml-4">
            {/* User Info */}
            <div className="flex space-x-4 mt-2 ml-10">
              <span className="font-bold text-2xl">{user.helo_id}</span>
              <button className="px-8 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
                Edit
              </button>
              <button className="px-8 bg-gray-300 text-black rounded-md font-semibold hover:bg-gray-400 transition duration-300">
                Share
              </button>
            </div>

            <div className="flex space-x-8 mt-2 ml-10">
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
        </div>

        {/* Edit and Share Buttons */}
        <div className="flex space-x-4"></div>
      </div>

      {/* Optional Bio or Description */}
      {user.bio && <p className="mt-4 text-sm text-gray-600">{user.bio}</p>}
      {/* </div> */}

      <PostsSection posts={posts} />

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
}

// Component for small (mobile) screens
function MobileScreenProfile({ user, posts }) {
  return (
    <div className="flex flex-col items-center w-full px-4 mt-4">
      {/* <div className="w-full max-w-md bg-white rounded-md shadow-md p-5"> */}
      <span className="font-bold text-lg mr-80">{user.helo_id}</span>

      <div className="flex items-center">
        {/* Profile Picture */}
        <img
          src={user.profilePicture}
          alt={`${user.username}'s profile`}
          className="w-20 h-20 object-cover rounded-full mt-3 mr-20"
        />
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
      {/* Posts Section */}
      <PostsSection posts={posts} />
      <LogoutButton />
    </div>
    // </div>
  );
}
// Profile Information component
function ProfileInfo({ user, posts }) {
  const dispatch = useDispatch();
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
          userId: user.id,
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

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      formData.append("userId", user.id);

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

        console.log(response.data);
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        toast.error("Error updating profile picture", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-4 py-6">
      {/* Profile Image */}
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-8 relative">
        <ProfileImage user={user} size="w-24 h-24 lg:w-32 lg:h-32" />

        {/* Conditionally render the profile picture update button */}
        {(user.profilePicture === defaultImage || !user.profilePicture) && (
          <label className="absolute bottom-0 right-0 cursor-pointer bg-gray-200 p-1 rounded-full">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <PlusCircleIcon className="w-6 h-6 text-gray-600" />
          </label>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Username and Edit Profile */}
          <div className="flex items-center space-x-3 mb-2">
            {user.helo_id ? (
              <>
                <h2 className="font-bold text-lg lg:text-2xl">
                  {user.helo_id}
                </h2>
              </>
            ) : (
              <button
                className="text-sm px-3 py-1 border bg-orange-500 rounded-lg"
                onClick={handleAddHeloId}
              >
                Add Helo ID
              </button>
            )}
          </div>

          {/* Bio Section */}
          <div>
            <p className="text-gray-600">{user.lastName || "@your_ID"}</p>
            <p className="text-gray-600 mt-2">
              {user.bio || "Chill with your Bio..."}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-6 mt-4 lg:mt-0 text-center lg:text-left">
          <p className="mb-2 lg:mb-0">
            <span className="font-bold">{posts.length || 11}</span> posts
          </p>
          <p className="mb-2 lg:mb-0">
            <span className="font-bold">43k</span> followers
          </p>
          <p className="mb-2 lg:mb-0">
            <span className="font-bold">17</span> following
          </p>
        </div>
      </div>
    </div>
  );
}

// Profile Image component
function ProfileImage({ user, size = "w-50 h-50" }) {
  console.log(user);
  return (
    <div className={`flex items-center justify-start mb-4 ${size}`}>
      <img
        src={user.profilePicture || defaultImage}
        alt="Profile"
        className={`rounded-full object-cover border border-gray-300 ${size}`}
      />
    </div>
  );
}

// Posts Section component
function PostsSection({ posts }) {
  return (
    <div className="mt-8">
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <img
                src={post.imgSrc}
                alt={`post-${post.id}`}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white font-bold">Likes: {post.likes}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-48">
          <PlusCircleIcon className="w-12 h-12 text-gray-400 cursor-pointer" />
          <p className="text-gray-400 mt-2">No posts yet. Add one!</p>
        </div>
      )}
    </div>
  );
}

// Logout Button component
function LogoutButton() {
  return (
    <button className="mt-6 text-red-500 font-semibold hover:text-red-600">
      Logout
    </button>
  );
}

function UserProfile() {
  const user = useSelector((state) => state.user);
  const posts = []; // Placeholder posts array

  // Media queries for different screen sizes
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isTabletScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="min-h-screen flex">
      {/* Always render the Navbar */}
      <div
        className={`bg-gray-100 h-full ${
          isMobileScreen ? "w-0" : "w-16 sm:w-20 md:w-24 lg:w-64"
        } flex-shrink-0`}
      >
        <Navbar />
      </div>

      {/* Responsive Main Content */}
      <div className={`flex-1 bg-white ${isMobileScreen ? "px-0" : "px-4"}`}>
        {isLargeScreen && <LargeScreenProfile user={user} posts={posts} />}
        {isTabletScreen && <TabletScreenProfile user={user} posts={posts} />}
        {isMobileScreen && <MobileScreenProfile user={user} posts={posts} />}
      </div>
      <ToasterHot />
    </div>
  );
}

export default UserProfile;
