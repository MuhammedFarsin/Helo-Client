import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../Pages/Common/PageNotFound";

const Dashboard = React.lazy(() => import("../Components/Admin/Dashboard"));
const Ads = React.lazy(() => import("../Components/Admin/Ads"));
const Report = React.lazy(() => import("../Components/Admin/Report"));
const Users = React.lazy(() => import("../Components/Admin/Users"));

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ads"
        element={
          <ProtectedRoute>
            <Ads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default React.memo(AdminRoutes);
