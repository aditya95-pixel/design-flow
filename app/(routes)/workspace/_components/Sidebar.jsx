"use client";
import React, { useState } from 'react';
import { WorkspaceMenu } from "../../../../services/Options";
import { CirclePlus, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import CustomCanvasDialog from './CustomCanvasDialog';
import { useTheme } from '../../../../context/ThemeContext';
function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMenuClick = (menuPath) => {
    router.push(menuPath);
    setIsMobileOpen(false); // Close sidebar on mobile after selection
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='font-sans'>
      {/* Toggle Button - Shows on all screens */}
      <button 
        className={`fixed ${isOpen ? 'left-64' : 'left-20'} top-18 z-50 bg-gray-800 p-2 rounded-lg transition-all duration-300 hidden md:block`}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <ChevronLeft className="text-white h-6 w-6" />
        ) : (
          <ChevronRight className="text-white h-6 w-6" />
        )}
      </button>

      {/* Mobile Hamburger Button - Shows only on mobile */}
      <button 
        className="md:hidden fixed top-18 left-4 z-50 bg-gray-800 p-2 rounded-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="text-white h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 top-0 left-0 
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        transition-transform duration-300 ease-in-out 
        z-40 ${isOpen ? 'w-64' : 'w-20'} 
        dark:bg-gray-950 bg-rose-50 shadow-sm p-4 flex flex-col
      `}>
        {/* Create Button */}
        <div className={`p-1 mb-6 ${!isOpen ? 'flex justify-center' : ''}`}>
  <CustomCanvasDialog>
    <div className={`flex items-center ${isOpen ? 'justify-start space-x-2' : 'justify-center'} bg-red-600 text-black rounded-lg p-3 hover:bg-red-700 transition-colors cursor-pointer w-full`}>
      <CirclePlus className='h-3 w-5' />
      {isOpen && <span className='text-sm font-bold'>Create</span>}
    </div>
  </CustomCanvasDialog>
</div>


        {/* Menu Items */}
        <div className='flex-1 overflow-y-auto'>
          {WorkspaceMenu.map((menu, index) => (
            <SidebarMenuItem 
              key={index} 
              menu={menu} 
              isActive={menu.path === path}
              onClick={() => handleMenuClick(menu.path)}
              isCollapsed={!isOpen}
            />
          ))}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarMenuItem({ menu, isActive, onClick, isCollapsed }) {
  return (
    <div
      className={`
        p-3 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} 
        mb-3 font-bold text-red-600 hover:bg-red-200 rounded-lg 
        cursor-pointer transition-colors ${isActive && 'bg-red-200'}
        ${isCollapsed ? 'px-2' : ''}
      `}
      onClick={onClick}
      title={isCollapsed ? menu.name : ''} // Show tooltip when collapsed
    >
      <menu.icon className={`h-5 w-5 ${isActive ? 'text-red-900' : 'text-red-600'}`} />
      {!isCollapsed && (
        <h2 className={`text-sm ${isActive ? 'text-red-900' : 'text-red-600'}`}>
          {menu.name}
        </h2>
      )}
    </div>
  );
}

export default Sidebar;