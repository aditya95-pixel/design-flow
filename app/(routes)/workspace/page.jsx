"use client";
import React from 'react';
import IntroOptions from "./_components/IntroOptions";
import RecentDesign from "./_components/RecentDesign";
import { useTheme } from '../../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function Workspace() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`p-10 min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-rose-100'}`}>
      <IntroOptions />
      <RecentDesign />
    </div>
  );
}

export default Workspace;