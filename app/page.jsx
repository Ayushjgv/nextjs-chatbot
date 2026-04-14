"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import Chatscreen from "../components/Chatscreen";

const Page = () => {



  return (
   <div className="flex h-screen w-full overflow-hidden">
    {/* Sidebar */}
    <Sidebar />

    {/* Chat */}
    <div className="flex flex-col flex-1 overflow-hidden min-w-0">
      <Chatscreen />
    </div>
  </div>
  );
};

export default Page;