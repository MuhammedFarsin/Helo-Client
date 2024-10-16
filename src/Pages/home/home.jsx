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
import { useMediaQuery } from "react-responsive";

function Home() {
  // Define media queries
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="flex h-screen">
      {/* Sidebar for Tablets (md) and Large Screens (lg) */}
      {isTablet || isLargeScreen ? (
        <div className={`bg-white border-r ${isTablet ? "w-20" : "w-60"}`}>
          <Sidebar type={isLargeScreen ? "full" : "icons"} />
        </div>
      ) : null}

      {/* Main Feed */}
      <div className="flex-1 p-5 overflow-y-auto">
        <Feed />
      </div>

      {/* Suggested Users for Large Screens */}
      {isLargeScreen && (
        <div className="w-1/4 p-5 border-l bg-white">
          <SuggestedUsers />
        </div>
      )}

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
    <div className={`fixed top-0 left-0 h-screen w-${type === 'icons' ? '20' : '60'} bg-white shadow-lg flex flex-col justify-between`}>
      {/* Top Section: Menu Items */}
      <ul className="flex flex-col space-y-4 p-4 overflow-y-auto">
        <SidebarItem icon={FaHome} label="Home" type={type} />
        <SidebarItem icon={FaSearch} label="Search" type={type} />
        <SidebarItem icon={FaCompass} label="Explore" type={type} />
        <SidebarItem icon={FaEnvelope} label="Messages" type={type} />
        <SidebarItem icon={FaHeart} label="Notifications" type={type} />
        <SidebarItem icon={FaPlusSquare} label="Create" type={type} />
        <SidebarItem icon={FaUser} label="Profile" type={type} />
      </ul>

      {/* Bottom Section: Logout */}
      <ul className="p-4">
        <SidebarItem icon={FaSignOutAlt} label="Logout" type={type} onClick={handleLogout} />
      </ul>
    </div>
  );
}


// SidebarItem Component for reuse
function SidebarItem({ icon: Icon, label, type, onClick }) {
  return (
    <li
      className="flex items-center space-x-4 cursor-pointer text-lg text-gray-800 px-5 py-2 hover:bg-gray-100 rounded-md"
      onClick={onClick}
    >
      {/* Icon */}
      <span >
        <Icon />
      </span>
      {/* Label */}
      {type === "full" && <span className="hidden lg:inline">{label}</span>}
    </li>
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

function SuggestedUsers() {
  const users = [
    { name: "elonmusk", avatar: "https://yourimageurl.com/avatar1.jpg" },
    { name: "billgates", avatar: "https://yourimageurl.com/avatar2.jpg" },
    { name: "jeffbezos", avatar: "https://yourimageurl.com/avatar3.jpg" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Suggested Users</h3>
      {users.map((user) => (
        <div
          key={user.name}
          className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user.avatar}
            alt={user.name}
          />
          <span className="text-gray-800">@{user.name}</span>
          <button className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-lg">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
