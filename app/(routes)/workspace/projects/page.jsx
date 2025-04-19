import React from 'react'
import RecentDesign from '../_components/RecentDesign'
import Image from 'next/image'
import { useTheme } from '../../../../context/ThemeContext';

function Projects() {
  return (
    <div className="p-5 w-full dark:bg-gray-900 bg-rose-100">
        <div className='relative'>
                            <Image 
                              src={"/banner-home.png"}
                              alt="banner" 
                              width={1800} 
                              height={300}
                              className='w-full h-[150px] sm:h-[180px] md:h-[200px] rounded-xl dark: md:rounded-2xl object-cover mt-10 dark:hidden'
                            />
                            <Image 
                              src={"/banner.png"}
                              alt="banner" 
                              width={1800} 
                              height={300}
                              className='w-full h-[150px] sm:h-[180px] md:h-[200px] rounded-xl dark: md:rounded-2xl object-cover mt-10 hidden dark:block'
                            />
                            <h2 className='text-2xl sm:text-3xl absolute bottom-5 left-5 sm:left-10 dark:text-white text-white font-medium'>
                  Projects
                </h2>
                </div>
        <RecentDesign/>
    </div>
  )
}
export default Projects;
