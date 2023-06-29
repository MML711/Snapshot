import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { FirebaseAuthContext } from "../../context/firebaseAuthContext";
import { ChatContext } from "../../context/chatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { firebaseCurrentUser } = useContext(FirebaseAuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", firebaseCurrentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    firebaseCurrentUser.uid && getChats();
  }, [firebaseCurrentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // console.log(chats);
  // console.log(Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} tabIndex="0">
          <img
            src={chat[1].userInfo.photoURL}
            alt=""
          />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
