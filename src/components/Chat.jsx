import React, { useContext } from "react";
//import Messages from "./Messages";
import Input from "./Input";
import logo from "../pages/logo192.png";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={logo} alt="" />
          <img src={logo} alt="" />
          <img src={logo} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
