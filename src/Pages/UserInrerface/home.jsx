import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  const user = useSelector((state) => state.user)
  console.log(user)
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />
      
      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
        <div>
          hi { user.username } || {user.lastName } welcome...
        </div>
      </div>
    </div>
  );
}

export default Layout;
