import React, { useState } from 'react'
import { sideBarMenu } from '../../../../services/Options'
import SideBarSettings from "../_components/SideBarSettings";
import { ThemeProvider } from '../../../../context/ThemeContext';
function SideBar() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleOptionClick = (menu) => {
    if (selectedOption?.name === menu.name) {
      setShowSettings(!showSettings);
    } else {
      setSelectedOption(menu);
      setShowSettings(true);
    }
  };

  return (
    <div className='flex font-sans dark:bg-gray-950 bg-rose-50'>
      <div className='p-2 w-[120px] border-r h-screen pt-2 bg-gray-1200'>
        {sideBarMenu.map((menu, index) => (
          <div 
            key={index} 
            className={`p-2 mb-3 flex flex-col items-center rounded-xl hover:bg-secondary cursor-pointer font-bold shadow-md ${
              menu.name === selectedOption?.name && "bg-secondary"
            }`}
            onClick={() => handleOptionClick(menu)}
          >
            <menu.icon className='text-red-600'/>
            <h2 className='mt-1 text-red-600'>{menu.name}</h2>
          </div>
        ))}
      </div>
      {showSettings && <SideBarSettings selectedOption={selectedOption} />}
    </div>
  )
}

export default SideBar
