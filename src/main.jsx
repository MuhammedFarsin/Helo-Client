import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js"; // Ensure this path is correct
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify"; // Ensure ToastContainer is correctly imported
import "react-toastify/dist/ReactToastify.css"; // Ensure the path is correct for styles
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

// Create a persistor instance
let persistor = persistStore(store);

// Your Google client ID (replace with your actual client ID)
const googleClientId = "13988288783-kbum81p5eug7olu2ktq5tol35sc0b3uo.apps.googleusercontent.com"; // Ensure this is defined in your .env file

// Render the application
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <App />
          <ToastContainer />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
