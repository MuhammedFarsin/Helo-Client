// Dashboardpage.jsx
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function Dashboardpage() {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 p-6 overflow-y-auto ml-60"> {/* Adjust margin-left */}
        <Outlet />
      </div>
      <h2>Dashboard page</h2>
    </div>
  );
}

export default Dashboardpage;
