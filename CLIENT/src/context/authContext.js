import { createContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { makeRequest } from "../axios";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, inputs);

    localStorage.setItem("accessToken", res.data.accessToken);
    setCurrentUser(res.data.info);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 15);
    localStorage.setItem("snap_expiration", expiration.toISOString());
  };

  const logout = async () => {
    await signOut(auth);
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("snap_expiration");
  };

  const isUpdated = async (id) => {
    const res = await makeRequest.get("/users/find/" + id);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isUpdated }}>
      {children}
    </AuthContext.Provider>
  );
};
