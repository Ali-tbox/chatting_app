import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message, handleClick }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message?.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <div style={{ display: "flex" }}>
          <p>
            {message?.text}
            {message?.emoji}
          </p>
          {/* <button
            onClick={() => handleClick(message)}
            style={{ width: "30px", height: "15px", fontSize: "10px" }}
          >
            Edit
          </button> */}
        </div>
        {message?.img && <img src={message?.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
