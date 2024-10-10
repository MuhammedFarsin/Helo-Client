import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleAuthClientId } from "./Config/config.jsx";
import LoadingPage from "./Pages/Common/LoadingPage.jsx";

let persistor = persistStore(store);

const googleClientId = googleAuthClientId;
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingPage/>}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <App />
          <ToastContainer />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
