import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useMediaQuery } from "react-responsive";

// Component for large screens
function LargeScreenProfile({ user, posts }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-md shadow-md mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 p-8">
          <ProfileImage user={user} />
          <ProfileInfo user={user} posts={posts} />
        </div>
        <PostsSection posts={posts} />
      </div>
      <LogoutButton />
    </div>
  );
}

// Component for medium (tablet) screens
function TabletScreenProfile({ user, posts }) {
  return (
    <div className="flex-1 flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-md shadow-md mt-8 p-6">
        <div className="flex flex-col items-center justify-between mb-4">
          <ProfileImage user={user} size="md:w-32 md:h-32" />
          <ProfileInfo user={user} posts={posts} />
        </div>
        <PostsSection posts={posts} />
      </div>
      <LogoutButton />
    </div>
  );
}

// Component for small (mobile) screens
function MobileScreenProfile({ user, posts }) {
  return (
    <div className="flex flex-col items-center w-full px-4 mt-4"> 
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-4">
        <div className="flex flex-col items-center mb-4">
          <ProfileImage user={user} size="w-24 h-24" />
          <ProfileInfo user={user} posts={posts} />
        </div>
        <PostsSection posts={posts} />
      </div>
      <LogoutButton />
    </div>
  );
}

// Profile Image component
function ProfileImage({ user, size = "w-40 h-40" }) {
  return (
    <div className={`flex justify-center mb-4 ${size}`}>
      <img
        src={user.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        className={`rounded-full object-cover border border-gray-300 ${size}`}
      />
    </div>
  );
}

// Profile Information component
function ProfileInfo({ user, posts }) {
  return (
    <div className="text-center lg:text-left">
      <h2 className="font-bold text-xl lg:text-3xl mb-2">{user.lastName || "Username"}</h2>
      <p className="text-gray-600 mb-4">{user.bio || "Bio not available"}</p>
      <div className="flex justify-center space-x-8">
        <p><span className="font-bold">{posts.length}</span> posts</p>
        <p><span className="font-bold">43k</span> followers</p>
        <p><span className="font-bold">17</span> following</p>
      </div>
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
              <img src={post.imgSrc} alt={`post-${post.id}`} className="w-full h-40 object-cover rounded-md" />
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
      <div className={`bg-gray-100 h-full ${isMobileScreen ? "w-0" : "w-16 sm:w-20 md:w-24 lg:w-64"} flex-shrink-0`}>
        <Navbar />
      </div>

      {/* Responsive Main Content */}
      <div className={`flex-1 bg-white ${isMobileScreen ? "px-0" : "px-4"}`}> {/* No padding on mobile */}
        {isLargeScreen && <LargeScreenProfile user={user} posts={posts} />}
        {isTabletScreen && <TabletScreenProfile user={user} posts={posts} />}
        {isMobileScreen && <MobileScreenProfile user={user} posts={posts} />}
      </div>
    </div>
  );
}

export default UserProfile;