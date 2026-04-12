"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  const sendMessage = async () => {
    let messageToSend=[...messages,{role:"user",content:message.trim()}];
    let jsonstring = JSON.stringify(messageToSend);
    console.log(messageToSend);
    if (message.trim() === "") return;
    setMessage("");

    setMessages((prev) => [...prev, { role: "user", content: message.trim() }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body:JSON.stringify({message:jsonstring}),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
      console.log(data);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    sendMessage();
  }



  return (
    <div className="flex flex-col h-screen w-full">

      {/* Chat screen */}

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Messages will appear here...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm prose max-w-none">
                <ReactMarkdown>
                  {msg.role === "user"
                    ? msg.content
                    : msg.content.reply}
                </ReactMarkdown>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}
      <div className="p-4 border-t flex gap-2 items-center justify-center">
        <form action="#"
         onSubmit={(e)=>{handleSubmit(e)}}
         className="flex flex-row justify-center items-center gap-2"
         >
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Image</button>
          </div>
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              e.target.style.height = "auto";

              const maxHeight = 150;

              if (e.target.scrollHeight > maxHeight) {
                e.target.style.height = maxHeight + "px";
                e.target.style.overflowY = "auto";
              } else {
                e.target.style.height = e.target.scrollHeight + "px";
                e.target.style.overflowY = "hidden";
              }
            }}
            placeholder="Type your message..."
            rows={1}
            onKeyDown={(e)=>{
              if(e.key==="Enter"  && !e.shiftKey){
                e.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 resize-none border px-3 py-2 overflow-hidden rounded-3xl"
          />
          <button type="submit" onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>

    </div>
  );
};

export default Page;