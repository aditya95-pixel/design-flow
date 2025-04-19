import React from 'react'
import Image from 'next/image'
import PreTemplatesList from "../_components/PreTemplatesList";
import { useTheme } from '../../../../context/ThemeContext';
function Templates() {
  return (
    <div className="p-10 w-full dark:bg-gray-900 bg-rose-100 min-h-screen">
        <div className='relative'>
            <Image src={"/banner.png"} alt="banner" width={1800} height={300}
                        className='w-full h-[200px] rounded-2xl object-cover mt-12'/>
                        <h2 className='text-3xl absolute bottom-5 left-10 dark:text-white text-black'>Templates</h2>
        </div>
        <PreTemplatesList/>
    </div>
  )
}

export default Templates