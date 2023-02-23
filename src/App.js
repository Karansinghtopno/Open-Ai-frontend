import "./App.css";
import { useState } from "react";
// import axios from "axios";
// import chatgpt_icon from "../src/images/chatgpt-icon.svg";
import ChatMessage from "./Components/ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
  
    {
      user: "me",
      message: "I want to use Chat Gpt Today",
    },  {
      user: "gpt",
      message: "How can I help you today",
    },
  ]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let chatLogNew = [...chatLog,{user:"me", message:`${input}`}]
      // let UserMessage = e.target.value;
      // await setChatLog([...chatLog, { user: "me", message: `${input}` }]);
      setInput("");
      setChatLog(chatLogNew)
      const messages= chatLogNew.map((message) => message.message).join("")
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages,
        })
      });

      const data = await response.json();
      setChatLog([...chatLogNew,{user:"gpt",message:`${data.message}`}])

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClear = ()=>{
    setChatLog([]);
  }

  return (
    <div className="App">
      <div className="side_menu">
        <div className="side_menu_button" onClick={handleClear}>
          <span>+</span>
          New Chat
        </div>
      </div>
      <div className="chatbox">
        <div className="chat_log">
          {chatLog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}

          {/* <div className="chat_message chatgpt">
            <div className="chat_message_center">
              <div className="avatar chatgpt">
                <img src={chatgpt_icon} alt="chat_gpt_icon" />
              </div>
              <div className="message">I am an Ai</div>
            </div>
          </div> */}
        </div>
        <div className="chat_input_holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat_input"
              type="text"
              placeholder="write here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
