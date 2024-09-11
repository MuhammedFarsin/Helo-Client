import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return auth ? children : <Navigate to={"/"} />;
}

export default ProtectedRoute;
