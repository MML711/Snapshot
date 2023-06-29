import React, { useContext } from "react";
import { FirebaseAuthContext } from "../../context/firebaseAuthContext";

const ChatNavBar = () => {
  const {firebaseCurrentUser} = useContext(FirebaseAuthContext);
  
  return (
      <div className="navbar">
        <span className="logo">Messages</span>
        <div className="user">
          <img src={firebaseCurrentUser.photoURL} alt="" />
          <span>{firebaseCurrentUser.displayName}</span>
          {/* <button onClick={() => signOut(auth)}>logout</button> */}
        </div>
      </div>
  );
};

export default ChatNavBar;
