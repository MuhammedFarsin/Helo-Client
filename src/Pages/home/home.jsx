import {
  FaHome,
  FaSearch,
  FaCompass,
  FaEnvelope,
  FaHeart,
  FaPlusSquare,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";
import { useMediaQuery } from 'react-responsive';

function Home() {
  // Define media queries
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="flex h-screen">
      {/* Sidebar for Tablets (md) and Large Screens (lg) */}
      {isTablet || isLargeScreen ? (
        <div className={`p-9 bg-white border-r ${isTablet ? "w-20" : "w-1/4"}`}>
          <Sidebar type={isLargeScreen ? "full" : "icons"} />
        </div>
      ) : null}

      {/* Main Feed */}
      <div className="flex-1 p-5 overflow-y-auto">
        <Feed />
      </div>

      {/* Footer with specific icons for mobile (hidden on tablets and large screens) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around">
          <FaHome className="text-2xl text-gray-800" />
          <FaSearch className="text-2xl text-gray-800" />
          <FaUser className="text-2xl text-gray-800" />
        </div>
      )}

      {/* Right corner icons for mobile (hidden on tablets and large screens) */}
      {isMobile && (
        <div className="fixed top-0 right-0 p-3 flex space-x-4">
          <FaEnvelope className="text-xl text-gray-800" />
          <FaHeart className="text-xl text-gray-800" />
        </div>
      )}
    </div>
  );
}

function Sidebar({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={`flex flex-col space-y-4 ${type === "icons" ? "w-20" : "w-60"}`}>
      <ul className="space-y-5">
        {/* Home */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaHome size={24} />
          {type === "full" && <span className="hidden lg:inline">Home</span>}
        </li>
        {/* Search */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaSearch size={24} />
          {type === "full" && <span className="hidden lg:inline">Search</span>}
        </li>
        {/* Explore */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaCompass size={24} />
          {type === "full" && <span className="hidden lg:inline">Explore</span>}
        </li>
        {/* Messages */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaEnvelope size={24} />
          {type === "full" && <span className="hidden lg:inline">Messages</span>}
        </li>
        {/* Notifications */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaHeart size={24} />
          {type === "full" && <span className="hidden lg:inline">Notifications</span>}
        </li>
        {/* Create */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaPlusSquare size={24} />
          {type === "full" && <span className="hidden lg:inline">Create</span>}
        </li>
        {/* Profile */}
        <li className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800">
          <FaUser size={24} />
          {type === "full" && <span className="hidden lg:inline">Profile</span>}
        </li>
        {/* Logout */}
        <li
          className="flex items-center justify-center lg:justify-start space-x-2 cursor-pointer text-lg text-gray-800"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={24} />
          {type === "full" && <span className="hidden lg:inline">Logout</span>}
        </li>
      </ul>
    </div>
  );
}

function Feed() {
  return (
    <div className="flex flex-col space-y-6">
      <Post
        user="lewishamilton"
        image="https://yourimageurl.com/image1.jpg"
        caption="Ayrton Senna, meu ídolo!"
      />
      <Post
        user="kurzgesagt"
        image="https://yourimageurl.com/image2.jpg"
        caption="String Theory - The universe explained!"
      />
    </div>
  );
}

function Post({ user, image, caption }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">@{user}</h3>
      </div>
      <img className="w-full rounded-lg" src={image} alt={user} />
      <p className="mt-3 text-gray-600">{caption}</p>
    </div>
  );
}

export default Home;
