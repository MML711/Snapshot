import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseAuthContext = createContext();

export const FirebaseAuthContextProvider = ({ children }) => {
    const [firebaseCurrentUser, setFirebaseCurrentUser] = useState({});
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setFirebaseCurrentUser(user);
        console.log(user);
      });
  
      return () => {
        unsub();
      };
    }, []);
  
    return (
      <FirebaseAuthContext.Provider value={{ firebaseCurrentUser }}>
        {children}
      </FirebaseAuthContext.Provider>
    );
  };