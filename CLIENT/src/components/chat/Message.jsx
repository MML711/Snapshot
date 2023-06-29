import React, { useContext, useEffect, useRef } from "react";
import { FirebaseAuthContext } from "../../context/firebaseAuthContext";
import { ChatContext } from "../../context/chatContext";

const Message = ({ message }) => {
  const { firebaseCurrentUser } = useContext(FirebaseAuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === firebaseCurrentUser.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === firebaseCurrentUser.uid
              ? firebaseCurrentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
