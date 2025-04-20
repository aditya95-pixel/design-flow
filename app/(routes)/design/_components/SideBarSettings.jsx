import React from 'react'
import { ThemeProvider } from '../../../../context/ThemeContext'
import { Button } from '../../../../components/ui/button'

function SideBarSettings({ selectedOption }) {
    return (
        <div className='dark:text-cyan-200 text-red-800 font-sans w-[320px] p-4 h-full border-l dark:border-gray-700 dark:bg-gray-900 bg-rose-100 flex flex-col'>
            <div className='space-y-3 pb-4 border-b dark:border-gray-700'>
                <h2 className='font-semibold text-base'>{selectedOption?.name}</h2>
                <p className='text-sm dark:text-cyan-200 text-red-800'>
                    {selectedOption?.desc}
                </p>
            </div>

            <div className='mt-4 flex-1 overflow-y-auto text-cyan-600'>
                {selectedOption?.link ? (
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2">
                        <a
                            href={selectedOption.link}
                            rel='noopener noreferrer'
                            className='font-medium text-sm'
                        >
                            Transform Now
                        </a>
                    </Button>
                ) : (
                    <div className='h-full space-y-4 p-1'>
                        {selectedOption?.component}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBarSettings
