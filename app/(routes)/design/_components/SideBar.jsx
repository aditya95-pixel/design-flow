import React, { useState } from 'react'
import { sideBarMenu } from '../../../../services/Options'
import SideBarSettings from "../_components/SideBarSettings"
import { ThemeProvider } from '../../../../context/ThemeContext'

function SideBar() {
    const [selectedOption, setSelectedOption] = useState(null)
    const [showSettings, setShowSettings] = useState(false)

    const handleOptionClick = (menu) => {
        if (selectedOption?.name === menu.name) {
            setShowSettings(!showSettings)
        } else {
            setSelectedOption(menu)
            setShowSettings(true)
        }
    }

    return (
        <div className='flex font-sans dark:bg-gray-950 bg-rose-50 h-screen'>
            {/* Left sidebar - fixed navigation */}
            <div className='p-2 w-[72px] border-r h-full bg-gray-1200 flex flex-col space-y-2 overflow-y-auto'>
                {sideBarMenu.map((menu, index) => (
                    <div 
                        key={index} 
                        className={`p-2 flex flex-col items-center rounded-lg cursor-pointer transition-all
                            ${menu.name === selectedOption?.name 
                                ? "bg-secondary dark:bg-gray-700" 
                                : "hover:bg-secondary/50 dark:hover:bg-gray-700"}`}
                        onClick={() => handleOptionClick(menu)}
                    >
                        <menu.icon className='dark:text-cyan-200 text-red-800 text-xl mb-1'/>
                        <h2 className='text-[10px] dark:text-cyan-200 text-red-800 text-center font-medium leading-tight'>
                            {menu.name}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Right content area */}
            <div className='flex-1 flex overflow-hidden'>
                {showSettings && (
                    <SideBarSettings selectedOption={selectedOption} />
                )}
                {!showSettings && (
                    <div className='flex-1 flex items-center justify-center dark:bg-gray-900 bg-rose-100'>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar
