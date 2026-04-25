"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../pages/Sidebar";
import Chatscreen from "../pages/Chatscreen";
import { GlobalSelector } from "../context/GlobalVariable";

const Page = () => {

  const { SelectedWork, SetSelectedWork } = GlobalSelector();


  return (
    <>
      


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