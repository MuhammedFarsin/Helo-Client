import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/authSlice";
import { removeUser } from "../../Store/Slices/userSlice";
import { persistor } from "../../Store/Store";
import { useMediaQuery } from "react-responsive";
import {
  FaTachometerAlt,  // Dashboard symbol
  FaUsers,          // Users symbol
  FaChartLine,      // Reports symbol
  FaAd,             // Ads symbol
  FaSignOutAlt,     // Logout symbol
} from "react-icons/fa";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const user = useSelector((state) => state.user); // Assuming user info is stored in Redux
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    dispatch(removeUser());
    persistor.purge();
    localStorage.clear(); // Clear all local storage items
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
            <SidebarItem icon={FaTachometerAlt} label="Dashboard" path="/admin/dashboard" type="full" />
            <SidebarItem icon={FaUsers} label="Users" path="/admin/users" type="full" />
            <SidebarItem icon={FaChartLine} label="Reports" path="/admin/reports" type="full" />
            <SidebarItem icon={FaAd} label="Ads" path="/admin/ads" type="full" />
          </ul>

          {/* Bottom Section: Logout */}
          <ul className="p-4">
            <SidebarItem icon={FaSignOutAlt} label="Logout" onClick={handleLogout} type="full" />
          </ul>
        </div>
      )}

      {/* Tablet Layout */}
      {isTablet && (
        <div className="fixed top-0 left-0 h-screen w-20 bg-white shadow-lg flex flex-col justify-between">
          {/* Top Section: Menu Items */}
          <ul className="flex flex-col space-y-4 p-2 overflow-y-auto">
            <SidebarItem icon={FaTachometerAlt} label="Dashboard" path="/dashboard" type="icons" />
            <SidebarItem icon={FaUsers} label="Users" path="/users" type="icons" />
            <SidebarItem icon={FaChartLine} label="Reports" path="/reports" type="icons" />
            <SidebarItem icon={FaAd} label="Ads" path="/ads" type="icons" />
          </ul>

          {/* Bottom Section: Logout */}
          <ul className="p-4">
            <SidebarItem icon={FaSignOutAlt} label="Logout" onClick={handleLogout} type="icons" />
          </ul>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 w-full p-2 bg-white border-t flex justify-around">
            <SidebarItem icon={FaTachometerAlt} label="Dashboard" path="/dashboard" type="icons" />
            <SidebarItem icon={FaUsers} label="Users" path="/users" type="icons" />
            <SidebarItem icon={FaChartLine} label="Reports" path="/reports" type="icons" />
            <SidebarItem icon={FaAd} label="Ads" path="/ads" type="icons" />
          </div>

          {/* Top-right notification and message icons */}
          <div className="relative">
            <div className=" fixed top-0 right-0 flex space-x-4 p-4">
              <SidebarItem icon={FaSignOutAlt} label="Logout" onClick={handleLogout} type="icons" />
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
        <Icon className="text-2xl" />
        {type === "full" && <span className="ml-2">{label}</span>}
      </div>
    </li>
  );
}

export default AdminNavbar;
