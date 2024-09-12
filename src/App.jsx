import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Components/User/SingIn";
import SignUp from "./Components/User/SignUp";
import OtpPage from "./Components/User/OtpPage";
import EmailResetPassword from "./Components/User/EmailResetPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Home from "./Components/User/Home";
import ProtectedAuth from "./Routes/ProtectedAuth";
// import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedAuth>
              <Signin />
            // </ProtectedAuth>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedAuth>
              <Signin />
            </ProtectedAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuth>
              <SignUp />
            </ProtectedAuth>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <ProtectedAuth>
              <OtpPage />
            </ProtectedAuth>
          }
        />
        <Route
          path="/email-password-reset"
          element={
            <ProtectedAuth>
              <EmailResetPassword />
            </ProtectedAuth>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedAuth>
              <ResetPassword />
            </ProtectedAuth>
          }
        />
        <Route
          path="/home"
          element={
            // <ProtectedRoute>
              <Home />
            // {/* </ProtectedRoute> */}
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
