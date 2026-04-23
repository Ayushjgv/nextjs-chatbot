"use client";

import { React, useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
//logo
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

const Chatscreen = () => {

  const [SelectedModel, setSelectedModel] = useState('groq');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  const sendMessage = async () => {
    let messageToSend = [...messages, { role: "user", content: message.trim() }];
    let jsonstring = JSON.stringify(messageToSend);
    if (message.trim() === "") return;
    setMessage("");

    setMessages((prev) => [...prev, { role: "user", content: message.trim() }]);


    //all at once response
    if (SelectedModel === 'other') {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ message: jsonstring }),
        });

        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        console.log(data);
      } catch (error) {
        console.log("Error sending message:", error);
      }

    } else if (SelectedModel === 'groq') {

      //groq api

      try {
        const res = await fetch('/api/chatStream', {
          method: 'POST',
          body: JSON.stringify({ message: jsonstring }),
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let done = false;
        let fullResponse = "";

        setMessages((prev) => [...prev, { role: "assistant", content: fullResponse }]);

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (value) {
            const chunk = decoder.decode(value);
            fullResponse += chunk;

            setMessages((prev) => {
              let messagescopy = [...prev];
              messagescopy[messagescopy.length - 1] = {
                ...messagescopy[messagescopy.length - 1],
                content: fullResponse
              };
              return messagescopy;
            });

            console.log("Chunk:", chunk);
          }
        }

        console.log("Stream finished");

      } catch (error) {
        console.log("Error sending message:", error);
      }

    }


  }






  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  }


  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">


      {/* Chat screen */}

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100 w-full">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Messages will appear here...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
                }`}
            >
              <p className="text-sm prose max-w-none">
                <ReactMarkdown>
                  {msg.role === "user"
                    ? msg.content
                    : (msg.content?.reply || msg.content)}
                </ReactMarkdown>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input field */}

      <div className="mb-4 border gap-2 flex items-center justify-center w-4/5 rounded-4xl">

        <select name="models" id="models-select" className='border rounded-4xl p-1 mr-5' value={SelectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="groq">Groq</option>
          <option value="other">other</option>
        </select>

        <form action="#"
          onSubmit={(e) => { handleSubmit(e) }}
          className="flex flex-row justify-center items-center gap-2"
        >
          {/* <div>
            <button className="text-black px-4 py-2 rounded cursor-pointer"><ImageIcon /></button>
          </div> */}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="textarea flex-1 resize-none focus:outline-none focus:ring-0 overflow-hidden rounded-3xl w-xl outline-none selection:bg-transparent"
          />
          <button type="submit" onClick={sendMessage} className="text-black px-4 py-2 rounded cursor-pointer">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatscreen
