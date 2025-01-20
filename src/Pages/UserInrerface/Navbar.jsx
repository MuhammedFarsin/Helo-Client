import { FaHome, FaSearch, FaCompass, FaEnvelope, FaHeart, FaPlusSquare, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import { removeUser } from "../../Store/Slices/userSlice";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { persistor } from "../../Store/Store";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    console.log('Before logout local storage:', localStorage); 
    dispatch(logout());
    dispatch(removeUser());
    persistor.purge();
    localStorage.clear(); // Clear all local storage items
    console.log('After logout local storage:', localStorage);
    navigate("/");
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <>
      {(isTablet || isLargeScreen) && (
        <div className={`bg-white border-r ${isTablet ? "w-20" : "w-60"}`}>
          <div className={`fixed top-0 left-0 h-screen w-${isTablet ? '20' : '60'} bg-white shadow-lg flex flex-col justify-between`}>
            {/* Top Section: Menu Items */}
            <ul className="flex flex-col space-y-4 p-4 overflow-y-auto">
              <SidebarItem icon={FaHome} label="Home" path="/home" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaSearch} label="Search" path="/search" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaCompass} label="Explore" path="/explore" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaEnvelope} label="Messages" path="/messages" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaHeart} label="Notifications" path="/notifications" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaPlusSquare} label="Create" path="/create" type={isLargeScreen ? "full" : "icons"} />
              <SidebarItem icon={FaUser} label="Profile" path="/user-profile" type={isLargeScreen ? "full" : "icons"} />
            </ul>

            {/* Bottom Section: Logout */}
            <ul className="p-4">
              <SidebarItem icon={FaSignOutAlt} label="Logout" onClick={handleLogout} type={isLargeScreen ? "full" : "icons"} />
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Bottom navigation */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around">
            <Link to="/home">
              <FaHome className="text-2xl text-gray-800" />
            </Link>
            <Link to="/search">
              <FaSearch className="text-2xl text-gray-800" />
            </Link>
            <Link to="/profile">
              <FaUser className="text-2xl text-gray-800" />
            </Link>
          </div>

          {/* Top-right notification and message icons */}
          <div className="fixed top-0 right-0 flex space-x-4 p-4">
            <Link to="/notifications">
              <FaHeart className="text-2xl text-gray-800" />
            </Link>
            <Link to="/messages">
              <FaEnvelope className="text-2xl text-gray-800" />
            </Link>
          </div>
        </>
      )}
    </>
  );
}

function SidebarItem({ icon: Icon, label, path, type, onClick }) {
  const navigate = useNavigate(); // Add useNavigate hook

  const handleClick = () => {
    if (onClick) {
      onClick(); // If onClick is passed, execute it (e.g., logout)
    }
    if (path) {
      navigate(path); // Navigate to the path programmatically
    }
  };

  return (
    <li className="flex items-center space-x-4 cursor-pointer text-[15px] text-gray-800 px-5 py-2 hover:bg-gray-100 rounded-md" onClick={handleClick}>
      <div className="flex items-center">
        <Icon className="text-1xl" />
        {type === "full" && <span className="ml-2">{label}</span>}
      </div>
    </li>
  );
}

export default Navbar;
