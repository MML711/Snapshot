import React from "react"
import ChatNavbar from "./ChatNavBar"
import Search from "./Search"
import Chats from "./Chats"

const SideBar = () => {
  return (
    <div className="sidebar">
      <ChatNavbar />
      <Search/>
      <Chats/>
    </div>
  )
}

export default SideBar