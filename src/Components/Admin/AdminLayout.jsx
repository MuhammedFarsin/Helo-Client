import React from 'react'
import AdminNavbar from "../../Pages/AdminInterface/AdminNavbar"
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    return (
      <div className="flex">
        {/* Sidebar/Navbar */}
        <AdminNavbar />
  
        {/* Main Content */}
        <div className="flex-1 ml-60 p-4"> {/* Adjust `ml-60` based on Navbar width */}
        <Outlet />
        </div>
      </div>
    );
  };

export default React.memo(AdminLayout)
