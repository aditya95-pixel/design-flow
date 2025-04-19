"use client";
import { UserButton } from '@stackframe/stack';
import React from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Image from "next/image";
function WorkspaceHeader() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`
      p-4 px-4 md:px-6 
      flex justify-between items-center 
      shadow-sm font-sans
      bg-gradient-to-r from-red-600 via-red-800 to-indigo-900 
      w-full fixed top-0 left-0 right-0 z-50
      h-16
    `}>
      <h1 className='font-bold font-poppins text-xl md:text-2xl text-white'>
        DesignFlow
      </h1>
      <div className="flex items-center space-x-4">
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <div className="relative">
          <UserButton appearance={{
            elements: {
              avatarBox: "w-8 h-8 md:w-9 md:h-9",
              userButtonPopoverCard: "mt-2"
            }
          }} />
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
