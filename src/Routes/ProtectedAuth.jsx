import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../Store/Slices/authSlice";


function ProtectedAuth({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user);
  console.log('render this user',user.isAdmin)
  if (auth && user.status === "BLOCKED") {
    dispatch(logout())
    return <Navigate to="/login" />;
  }
  return auth ? (
    user.isAdmin ? (
      <Navigate to={"/admin/dashboard"} />
    ) : (
      <Navigate to={"/home"} />
    )
  ) : (
    children
  );
}
export default ProtectedAuth;
