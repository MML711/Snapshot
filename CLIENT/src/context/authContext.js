import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    // TO DO
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 15);
    localStorage.setItem("expiration", expiration.toISOString());
  };

  const logout = async () => {
    await signOut(auth);
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expiration");
    console.log("clicked logout");
    console.log(currentUser);
  };

  const isUpdated = async (id) => {
    const res = await makeRequest.get("/users/find/" + id);

    console.log("isUpdated");
    setCurrentUser(res.data);
  };

  /* // TODO: FIND A BETTER WAY
  useEffect(() => {
    currentUser && logout();
  }, []);
 */
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log(currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isUpdated }}>
      {children}
    </AuthContext.Provider>
  );
};
