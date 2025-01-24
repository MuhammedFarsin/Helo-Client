import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axiosInstance from "../../Axios/axios"; // Import your axios instance
import AdminNavbar from "./AdminNavbar";
import Swal from "sweetalert2"; // Import SweetAlert2

function ListUser() {
  const [users, setUsers] = useState([]);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/get-users");
        console.log(response);
        const users = response.data;
        if (response.data && response.data) {
          setUsers(users);
        } else {
          console.error("No user found in response");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId, status) => {
    try {
      const response = await axiosInstance.put(`/admin/update-user-status/${userId}`, { status });
      setUsers(users.map(user => user._id === userId ? response.data : user));
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const confirmBlockUser = (userId, status) => {
    const action = status === "ACTIVE" ? "Block" : "Unblock";
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action.toLowerCase()} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleBlockUser(userId, status === "ACTIVE" ? "BLOCKED" : "ACTIVE");
        Swal.fire({
          title: `${action}ed!`,
          text: `User has been ${action.toLowerCase()}ed.`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex">
      <AdminNavbar />

      {/* Main Content Area */}
      <div
        className={`${
          isLargeScreen ? "ml-60" : isTablet ? "ml-20" : "ml-0"
        } flex-1 p-6 overflow-y-auto`}
      >
        <h2 className="text-xl font-semibold mb-4">Users list</h2>

        {/* Large Screen Layout */}
        {isLargeScreen && (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left w-64">User</th>
                <th className="border-b p-2 text-left w-32">Followers</th>
                <th className="border-b p-2 text-left w-32">Status</th>
                <th className="border-b p-2 text-left w-48">Created on</th>
                <th className="border-b p-2 text-left w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => !user.isAdmin)
                .map((user) => (
                  <tr key={user._id}>
                    <td className="border-b p-2 w-64">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <p className="font-semibold">{user.helo_id}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b p-2 w-32">{user.followers}</td>
                    <td className="border-b p-2 w-32">
                      <span className={`${user.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-semibold px-2.5 py-0.5 rounded`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="border-b p-2 w-48">{user.createdOn}</td>
                    <td className="border-b p-2 w-32">
                      <button
                        onClick={() => confirmBlockUser(user._id, user.status)}
                        className={`${
                          user.status === "ACTIVE"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        } px-4 py-2 rounded-md transition-colors duration-200`}
                      >
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Tablet Layout */}
        {isTablet && (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left w-48">User</th>
                <th className="border-b p-2 text-left w-24">Followers</th>
                <th className="border-b p-2 text-left w-24">Status</th>
                <th className="border-b p-2 text-left w-36">Created on</th>
                <th className="border-b p-2 text-left w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => !user.isAdmin)
                .map((user) => (
                  <tr key={user._id}>
                    <td className="border-b p-2 w-48">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <p className="font-semibold">{user.helo_id}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b p-2 w-24">{user.followers}</td>
                    <td className="border-b p-2 w-24">
                      <span className={`${user.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-semibold px-2.5 py-0.5 rounded`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="border-b p-2 w-36">{user.createdOn}</td>
                    <td className="border-b p-2 w-24">
                      <button
                        onClick={() => confirmBlockUser(user._id, user.status)}
                        className={`${
                          user.status === "ACTIVE"
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        } px-3 py-1 rounded-md transition-colors duration-200 text-sm`}
                      >
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <div className="flex items-center">
                  <div className="ml-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <p>Followers: {user.followers}</p>
                <p>
                  Status:{" "}
                  <span className={`${user.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-semibold px-2.5 py-0.5 rounded`}>
                    {user.status}
                  </span>
                </p>
                <p>Created on: {user.createdOn}</p>
                <button
                  onClick={() => confirmBlockUser(user._id, user.status)}
                  className={`${
                    user.status === "ACTIVE"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  } px-4 py-2 rounded-md transition-colors duration-200`}
                >
                  {user.status === "ACTIVE" ? "Block" : "Unblock"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListUser;