import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
import { FirebaseAuthContextProvider } from "./context/firebaseAuthContext";
import { ChatContextProvider } from "./context/chatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <FirebaseAuthContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </FirebaseAuthContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
