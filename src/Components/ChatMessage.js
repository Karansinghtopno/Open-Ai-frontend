import React from "react";
import chatgpt_icon from "../images/chatgpt-icon.svg";
import avatar_icon from "../images/avatar.svg";
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat_message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat_message_center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" ? (
            <img src={chatgpt_icon} alt="chat_gpt_icon" />
          ) : (
            <img src={avatar_icon} alt="chat_gpt_icon" />
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
