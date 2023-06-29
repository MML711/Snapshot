import React from "react";
import SideBar from "../../components/chat/SideBar";
import Chat from "../../components/chat/Chat";
import "./chatMessage.scss";

const ChatMessage = () => {
  
  return (
    <div className="chathome">
      <div className="container">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatMessage;
