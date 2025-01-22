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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import { removeUser } from "../../Store/Slices/userSlice";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { persistor } from "../../Store/Store";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming user info is stored in Redux

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    console.log("Before logout local storage:", localStorage);
    dispatch(logout());
    dispatch(removeUser());
    persistor.purge();
    localStorage.clear(); // Clear all local storage items
    console.log("After logout local storage:", localStorage);
    navigate("/");
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {/* Large Screen Layout */}
      {isLargeScreen && (
        <div className="fixed top-0 left-0 h-screen w-60 bg-white shadow-lg flex flex-col justify-between">
          {/* Top Section: Menu Items */}
          <ul className="flex flex-col space-y-4 p-4 overflow-y-auto">
            <SidebarItem icon={FaHome} label="Home" path="/home" type="full" />
            <SidebarItem
              icon={FaSearch}
              label="Search"
              path="/search"
              type="full"
            />
            <SidebarItem
              icon={FaCompass}
              label="Explore"
              path="/explore"
              type="full"
            />
            <SidebarItem
              icon={FaEnvelope}
              label="Messages"
              path="/messages"
              type="full"
            />
            <SidebarItem
              icon={FaHeart}
              label="Notifications"
              path="/notifications"
              type="full"
            />
            <SidebarItem
              icon={FaPlusSquare}
              label="Create"
              path="/create"
              type="full"
            />
            <SidebarItem
              icon={FaUser}
              label="Profile"
              path="/user-profile"
              type="full"
              profilePicture={user.profilePicture}
            />
          </ul>

          {/* Bottom Section: Logout */}
          <ul className="p-4">
            <SidebarItem
              icon={FaSignOutAlt}
              label="Logout"
              onClick={handleLogout}
              type="full"
            />
          </ul>
        </div>
      )}

      {/* Tablet Layout */}
      {isTablet && (
        <div className="fixed top-0 left-0 h-screen w-20 bg-white shadow-lg flex flex-col justify-between">
          {/* Top Section: Menu Items */}
          <ul className="flex flex-col space-y-4 p-2 overflow-y-auto">
            <SidebarItem icon={FaHome} label="Home" path="/home" type="icons" />
            <SidebarItem
              icon={FaSearch}
              label="Search"
              path="/search"
              type="icons"
            />
            <SidebarItem
              icon={FaCompass}
              label="Explore"
              path="/explore"
              type="icons"
            />
            <SidebarItem
              icon={FaEnvelope}
              label="Messages"
              path="/messages"
              type="icons"
            />
            <SidebarItem
              icon={FaHeart}
              label="Notifications"
              path="/notifications"
              type="icons"
            />
            <SidebarItem
              icon={FaPlusSquare}
              label="Create"
              path="/create"
              type="icons"
            />
            {/* Modified SidebarItem for Tablet */}
            <SidebarItem
              icon={FaUser}
              label="Profile"
              path="/user-profile"
              type="icons"
              profilePicture={user.profilePicture}
              isTablet={true} // Pass isTablet prop to SidebarItem
            />
          </ul>

          {/* Bottom Section: Logout */}
          <ul className="p-4">
            <SidebarItem
              icon={FaSignOutAlt}
              label="Logout"
              onClick={handleLogout}
              type="icons"
            />
          </ul>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 w-full p-2 bg-white border-t flex justify-around">
            <Link to="/home">
              <FaHome className="text-2xl text-gray-800" />
            </Link>
            <Link to="/search">
              <FaSearch className="text-2xl text-gray-800" />
            </Link>
            <Link to="/user-profile">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-2xl text-gray-800" />
              )}
            </Link>
          </div>

          {/* Top-right notification and message icons */}
          <div className="relative">
          <div className=" fixed top-0 right-0 flex space-x-4 p-4">
            <Link to="/notifications">
              <FaHeart className="text-2xl text-gray-800" />
            </Link>
            <Link to="/messages">
              <FaEnvelope className="text-2xl text-gray-800" />
            </Link>
          </div>
          </div>
        </>
      )}
    </>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  path,
  type,
  onClick,
  profilePicture,
  isTablet,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <li
      className="flex items-center space-x-4 cursor-pointer text-[15px] text-gray-800 px-5 py-2 hover:bg-gray-100 rounded-md"
      onClick={handleClick}
    >
      <div className="flex items-center">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className={`w-7 h-7 rounded-full object-cover ${
              isTablet ? "mr-10" : ""
            }`}
          />
        ) : (
          <Icon className="text-2xl" />
        )}
        {type === "full" && <span className="ml-2">{label}</span>}
      </div>
    </li>
  );
}

export default Navbar;
