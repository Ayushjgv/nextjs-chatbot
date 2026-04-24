"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import Chatscreen from "../components/Chatscreen";

const Page = () => {

  const [SelectedWork, setSelectedWork] = useState('chat');


  return (
    <>
      {/* topbar */}

      < div className='mt-5 flex justify-center items-center absolute top-0 right-2' >
        <select name="work" id="work" value={SelectedWork} onChange={(e) => setSelectedWork(e.target.value)}>
          <option value="chat">Chat</option>
          <option value="pdf">PDF</option>
        </select>
      </div >


      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Chat */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <Chatscreen SelectedWork={SelectedWork} />
        </div>
      </div>
    </>
  );
};

export default Page;