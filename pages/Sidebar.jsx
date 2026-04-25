"use client";

import React, { useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import Image from 'next/image';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import HomeIcon from '@mui/icons-material/Home';
import { GlobalSelector } from '../context/GlobalVariable';

const sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { SelectedWork, SetSelectedWork } = GlobalSelector();

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);


  const handleSidebar = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div className={`flex flex-col h-screen border-r border-black p-2 overflow-hidden ${isVisible ? " w-1/3 min-w-45 max-w-80" : "w-10"} transition-all duration-300 ease-in-out`}>
      {/* topbar */}
      {
        isVisible && (
          <div className='flex flex-row gap-2 justify-between items-center transition-all duration-300 ease-in-out'>
            <Image src="/Logo.png" alt="logo" width={40} height={40} className='cursor-pointer' />
            <button onClick={handleSidebar}>
              <ViewSidebarIcon fontSize='small' className='text-gray-900 cursor-pointer' />
            </button>

          </div>
        )
      }
      {
        !isVisible && (
          <button onClick={handleSidebar} className='transition-all duration-300 ease-in-out'>
            <ViewSidebarIcon fontSize='small' className='text-gray-900 cursor-pointer' />
          </button>
        )
      }

      {/* Selector   */}

      {
        isVisible && (
          <div className="mt-6 flex justify-center items-center w-full">
            
            <div className="relative w-60">
              
              {/* Label */}
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Mode
              </label>

              {/* Select */}
              <select
                name="work"
                id="work"
                value={SelectedWork}
                onChange={(e) => SetSelectedWork(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-4 py-2 pr-10 shadow-sm cursor-pointer 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                hover:border-gray-400 transition-all duration-200"
              >
                <option value="chat">💬 Chat</option>
                <option value="pdf">📄 PDF</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none text-gray-500 absolute right-5 top-9">
                ▼
              </div>

            </div>
          </div>
        )
      }

      {/* content */}
      {
        isVisible && (
          <div className='flex flex-col gap-2 justify-between transition-all duration-300 ease-in-out mt-4 p-2'>
            {/* //options */}


            <div className='flex flex-row gap-2 justify-between items-center'>
              <button className='flex flex-row gap-2 justify-between items-center'>
                <ChatIcon fontSize='small' className='text-gray-900 cursor-pointer' />
                <span className='text-gray-900 cursor-pointer'>New Chat</span>
              </button>
            </div>

            <h5 className='text-gray-400 text-center'>Recents</h5>

            {/* recent chats  */}

            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                return (
                  <div key={item} className='flex flex-row gap-2 justify-between items-center pt-1'>
                    <button className='flex flex-row gap-2 justify-between items-center'>
                      <ChatIcon fontSize='small' className='text-gray-900 cursor-pointer' />
                      <span className='text-gray-900 cursor-pointer'>{item}</span>
                    </button>
                  </div>
                )
              })
            }

          </div>
        )
      }

    </div>
  )
}

export default sidebar

