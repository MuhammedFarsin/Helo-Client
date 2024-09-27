import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedAuth from "./Routes/ProtectedAuth";
import ProtectedRoute from "./Routes/ProtectedRoute";
import "./App.css"
// Lazy load components
const Signin = React.lazy(() => import("./Components/User/SingIn"));
const SignUp = React.lazy(() => import("./Components/User/SignUp"));
const OtpPage = React.lazy(() => import("./Components/User/OtpPage"));
const EmailResetPassword = React.lazy(() => import("./Components/User/EmailResetPassword"));
const ResetPasswordOtp = React.lazy(() => import("./Components/User/ResetPasswordOtp"));
const ResetPassword = React.lazy(() => import("./Components/User/ResetPassword"));
const Home = React.lazy(() => import("./Components/User/Home"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedAuth>
                <Signin />
              </ProtectedAuth>
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
            path="/reset-password-otp"
            element={
              <ProtectedAuth>
                <ResetPasswordOtp />
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
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
