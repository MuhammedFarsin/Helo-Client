import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid"; // Heroicons for the plus icon

function UserProfile() {
  const user = useSelector((state) => state.user);
  const posts = []; // Example posts array

  return (
    <div className="min-h-screen flex flex-col">
      {/* Include the Navbar */}
      <Navbar />

      {/* User Profile Content */}
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-md shadow-md mt-5">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6 p-4">
            
            {/* Profile Image */}
            <div className="flex justify-center mb-4 md:mb-0">
              <img
                src={user.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="rounded-full object-cover border border-gray-300
                w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"  // Responsive image size
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left md:ml-10 lg:ml-60">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-4">
                <h2 className="font-bold text-lg md:text-2xl lg:text-3xl">
                  {user.lastName || "Username"}
                </h2>
                <button className="ml-0 md:ml-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 mt-2 md:mt-0">
                  Edit Profile
                </button>
              </div>

              {/* User Bio */}
              <p className="text-gray-600 text-sm md:text-base lg:text-lg mt-2">
                {user.bio || "Bio not available"}
              </p>

              {/* User Stats */}
              <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-8 mt-4">
                <p className="text-sm md:text-base lg:text-lg font-semibold">
                  <span className="font-bold">{posts.length}</span> posts
                </p>
                <p className="text-sm md:text-base lg:text-lg font-semibold">
                  <span className="font-bold">43k</span> followers
                </p>
                <p className="text-sm md:text-base lg:text-lg font-semibold">
                  <span className="font-bold">17</span> following
                </p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <PlusCircleIcon className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-gray-400 cursor-pointer" />
                <p className="text-gray-400 mt-2">No posts yet. Add one!</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
                  Add Post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button className="mt-6 text-red-500 font-semibold hover:text-red-600 text-sm md:text-base lg:text-lg">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
