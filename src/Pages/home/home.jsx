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

function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/4 p-5 bg-white border-r">
        <Sidebar />
      </div>

      {/* Main Feed */}
      <div className="flex-1 p-5 overflow-y-auto">
        <Feed />
      </div>

      {/* Footer with specific icons for mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around lg:hidden">
        <FaHome className="text-2xl text-gray-800" />
        <FaSearch className="text-2xl text-gray-800" />
        <FaUser className="text-2xl text-gray-800" />
      </div>

      {/* Right corner icons for mobile */}
      <div className="fixed top-0 right-0 p-3 flex space-x-4 lg:hidden">
        <FaEnvelope className="text-xl text-gray-800" />
        <FaHeart className="text-xl text-gray-800" />
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col space-y-4">
      <ul className="space-y-5">
        {/* Sidebar for large screens */}
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaHome />
          <span className="hidden lg:block">Home</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaSearch />
          <span className="hidden lg:block">Search</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaCompass />
          <span className="hidden lg:block">Explore</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaEnvelope />
          <span className="hidden lg:block">Messages</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaHeart />
          <span className="hidden lg:block">Notifications</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaPlusSquare />
          <span className="hidden lg:block">Create</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800">
          <FaUser />
          <span className="hidden lg:block">Profile</span>
        </li>
        <li
          className="flex items-center space-x-2 cursor-pointer text-lg text-gray-800"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span className="hidden lg:block">Logout</span>
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
