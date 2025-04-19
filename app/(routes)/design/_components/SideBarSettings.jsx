import React from 'react'
import { ThemeProvider } from '../../../../context/ThemeContext'
import { Button } from '../../../../components/ui/button'

function SideBarSettings({ selectedOption }) {
  return (
    <div className='text-red-600 font-sans w-[280px] p-5 h-screen border-r dark:bg-gray-900 bg-rose-50'>
      <h2 className='font-bold'>{selectedOption?.name}</h2>
      
      <p className='text-sm text-red-700 font-bold'>{selectedOption?.desc}</p>

      <div className='mt-7'>
        {selectedOption?.link ? (
          <Button className="bg-red-600">
          <a
            href={selectedOption.link}
            rel='noopener noreferrer'
            className='dark:text-black text-white font-bold'
          >
            Transform Now
          </a>
          </Button>
        ) : (
          selectedOption?.component
        )}
      </div>
    </div>
  )
}
export default SideBarSettings
