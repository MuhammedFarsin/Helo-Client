import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoadingPage from "./Pages/Common/LoadingPage";
const UserRoute = React.lazy(() => import("./Routes/UserRoutes"));


function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path="/*" element={<UserRoute/>} />     
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
