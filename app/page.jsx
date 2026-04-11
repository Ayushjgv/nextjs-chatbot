"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  const sendMessage = async () => {
    const messageToSend = message.trim();
    if (messageToSend === "") return;
    setMessage("");

    setMessages((prev) => [...prev, { role: "user", content: messageToSend }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: messageToSend }),
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
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.length === 0 && (
          <p className="text-gray-500">Messages will appear here...</p>
        )}
        {
          messages.map((msg, index)=>{
            return (<div className="mb-4" key={index}>
              <div className={`flex ${msg.role==="user"?'justify-end':'justify-start'}`}>
                <div className="font-bold">{msg.role === "user" ? "You : " : "assistant : "}</div>
                <div>{msg.role==="user" ? msg.content : msg.content.reply}</div>
              </div>
            </div>)
          })
        }
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
          {/* <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border px-3 py-2 rounded-full"
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}
          /> */}
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);

              // auto resize
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none border px-3 py-2 rounded overflow-hidden"
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