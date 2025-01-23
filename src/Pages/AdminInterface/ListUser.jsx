import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axiosInstance from "../../Axios/axios"; // Import your axios instance
import AdminNavbar from "./AdminNavbar";

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

  return (
    <div className="flex">
      <AdminNavbar />

      <div
        className={`${
          isLargeScreen ? "ml-60" : "" /* Adjust margin-left for large screens */
        } flex-1 p-6 overflow-y-auto`}
      >
        <h2 className="text-xl font-semibold mb-4">Users list</h2>

        {isLargeScreen && (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">User</th>
                <th className="border-b p-2 text-left">Followers</th>
                <th className="border-b p-2 text-left">Status</th>
                <th className="border-b p-2 text-left">Created on</th>
                <th className="border-b p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border-b p-2">
                    <div className="flex items-center">
                      <div className="ml-2">
                        <p className="font-semibold">{user.helo_id}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b p-2">{user.followers}</td>
                  <td className="border-b p-2">
                    <span className={`${user.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} text-xs font-semibold px-2.5 py-0.5 rounded`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="border-b p-2">{user.createdOn}</td>
                  <td className="border-b p-2">
                    <button
                      onClick={() => handleBlockUser(user._id, user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE")}
                      className={`${user.status === "ACTIVE" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}`}
                    >
                      {user.status === "ACTIVE" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(isTablet || isMobile) && (
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
                  onClick={() => handleBlockUser(user._id, user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE")}
                  className={`${user.status === "ACTIVE" ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}`}
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