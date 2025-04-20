"use client";
import React, { useContext } from 'react'
import Image from 'next/image';
import { api } from '../../../../convex/_generated/api';
import { canvasSizeOptions } from '../../../../services/Options';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
function IntroOptions() {
  const createDesignRecord = useMutation(api.designs.CreateNewDesign);
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const OnCanvasOptionSelect = async (option) => {
    toast("Loading...");
    const result = await createDesignRecord({
      name: option.name,
      width: option.width,
      height: option.height,
    });
    router.push("/design/" + result);
  }

  return (
    <div className="min-h-screen mt-2 px-4 sm:px-6 lg:px-8 font-sans dark:bg-gray-900 bg-rose-100">
      {/* Banner Section */}
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
          Workspace
        </h2>
      </div>

      {/* Options Grid */}
      <div className='mt-2 sm:mt-10 font-sa'>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 justify-items-center'>
          {canvasSizeOptions.map((option, index) => (
            <div 
              key={index} 
              className='flex flex-col items-center cursor-pointer w-full'
              onClick={() => OnCanvasOptionSelect(option)}
            >
              <div className='p-3 sm:p-4 rounded-lg hover:bg-opacity-20 transition-all w-full flex justify-center dark:hover:bg-cyan-500 hover:bg-rose-200'>
                <Image 
                  src={option.icon} 
                  alt={option.name} 
                  width={60} 
                  height={60}
                  className='w-20 h-20 sm:w-12 sm:h-12 md:w-17 md:h-17 object-contain hover:scale-105 transition-all'
                />
              </div>
              <h2 className='text-xs sm:text-sm mt-2 font-medium text-center dark:text-white text-black'>
                {option.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IntroOptions
