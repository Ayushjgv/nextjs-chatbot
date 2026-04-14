"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import HomeIcon from '@mui/icons-material/Home';

const sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

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
      {
        isVisible && (
          <div className='flex flex-col gap-2 justify-between items-center transition-all duration-300 ease-in-out'>
            sidebar
          </div>
        )
      }

    </div>
  )
}

export default sidebar

