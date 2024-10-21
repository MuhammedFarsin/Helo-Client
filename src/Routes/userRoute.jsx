import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedAuth from "./ProtectedAuth";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../Pages/Common/PageNotFound";

// Lazy load components
const Signin = React.lazy(() => import("../Components/User/SingIn"));
const SignUp = React.lazy(() => import("../Components/User/SignUp"));
const OtpPage = React.lazy(() => import("../Components/User/OtpPage"));
const EmailResetPassword = React.lazy(() => import("../Components/User/EmailResetPassword"));
const ResetPasswordOtp = React.lazy(() => import("../Components/User/ResetPasswordOtp"));
const ResetPassword = React.lazy(() => import("../Components/User/ResetPassword"));
const Home = React.lazy(() => import("../Components/User/Home"));
const User_Profile = React.lazy(() => import("../Components/User/User_Profile"))
const Edit_UserProfile = React.lazy(() => import("../Components/User/EditUserProfile"))

function UserRoute() {
    return (
            <Routes>
                <Route path="/" element={<ProtectedAuth><Signin /></ProtectedAuth>} />
                <Route path="/login" element={<ProtectedAuth><Signin /></ProtectedAuth>} />
                <Route path="/signup" element={<ProtectedAuth><SignUp /></ProtectedAuth>} />
                <Route path="/verify-otp" element={<ProtectedAuth><OtpPage /></ProtectedAuth>} />
                <Route path="/email-password-reset" element={<ProtectedAuth><EmailResetPassword /></ProtectedAuth>} />
                <Route path="/reset-password-otp" element={<ProtectedAuth><ResetPasswordOtp /></ProtectedAuth>} />
                <Route path="/reset-password" element={<ProtectedAuth><ResetPassword /></ProtectedAuth>} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/user-profile" element={<ProtectedRoute><User_Profile /></ProtectedRoute>} />
                <Route path="/edit-user-profile" element={<ProtectedRoute><Edit_UserProfile /></ProtectedRoute>} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
    );
}

export default UserRoute;
