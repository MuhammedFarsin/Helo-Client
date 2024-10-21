import Navbar from "./Navbar";
// import { PlusCircleIcon } from "@heroicons/react/solid"; // Uncomment this if you want to use the PlusCircleIcon for "No posts yet."
import { useSelector } from "react-redux";

function UserProfile() {
  // Fetch user data from Redux store
  const user = useSelector((state) => state.user);

  const posts = []; 

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
          {/* Profile Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
            <img src={user.profilePicture} alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{user.lastName || "Username"}</h2>
                <p className="text-sm text-gray-600">{user.bio || "Bio not available"}</p>
              </div>
            </div>
            <div className="text-right flex justify-between">
              <p className="text-lg font-bold">{posts.length} posts</p>
              <p className="text-lg font-bold">43k followers</p> {/* Hardcoded, replace with dynamic data if available */}
              <p className="text-lg font-bold">17 following</p> {/* Hardcoded, replace with dynamic data if available */}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
            Edit Profile
          </button>

          {/* Posts Section */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id}>
                  <img
                    src={post.imgSrc}
                    alt={`post-${post.id}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-48 col-span-3">
                {/* <PlusCircleIcon className="w-16 h-16 text-gray-400" /> Uncomment if using Heroicons */}
                <p className="text-gray-400 mt-2">No posts yet. Add one!</p>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button className="mt-6 text-red-500 font-semibold hover:text-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
