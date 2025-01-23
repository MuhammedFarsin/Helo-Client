import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoadingPage from "./Pages/Common/LoadingPage";
const UserRoute = React.lazy(() => import("./Routes/UserRoutes"));
const AdminRoute = React.lazy(() => import("./Routes/AdminRoutes"));


function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path="/*" element={<UserRoute/>} />     
          <Route path="/admin/*" element={<AdminRoute/>} />     
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
