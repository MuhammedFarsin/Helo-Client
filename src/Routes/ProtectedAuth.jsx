import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedAuth({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user);

  return auth ? (
    user.isAdmin ? (
      <Navigate to={"/admin/admin-dashboard"} />
    ) : (
      <Navigate to={"/home"} />
    )
  ) : (
    children
  );
}
export default ProtectedAuth;
