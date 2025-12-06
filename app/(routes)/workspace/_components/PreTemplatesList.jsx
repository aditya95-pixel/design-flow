"use client";
import { useMutation, useQuery } from 'convex/react'
import React,{useContext, useState} from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '../../../../components/ui/button';
import CustomCanvasDialog from './CustomCanvasDialog';
import Image from 'next/image';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../../context/ThemeContext';
function PreTemplatesList() {
  const templateList=useQuery(api.templates.GetAllTemplatest);
  const createNewDesignFromTemplate=useMutation(api.designs.CreateDesignFromTemplate);
  const {userDetail}=useContext(UserDetailContext);
  const router=useRouter();
  const onTemplateSelect=async (template)=>{
    const id=await createNewDesignFromTemplate({
      imagePreview:template?.imagePreview,
      jsonTemplate:template?.jsonData,
      name:template?.name,
      uid:userDetail?._id,
      width:template?.width,
      height:template?.height
    });
    router.push("/design/"+id);
  }
  return (
    <div className='mt-7 font-sans'>
      <h2 className='font-bold text-2xl text-red-600'>Available Templates</h2>
      {templateList?.length==0 ?
      <div className='flex flex-col gap-4 items-center mt-5'>
        <Image src={'/edittool.png'} alt="edit" width={100} height={100}/>
        <h2 className="text-center font-bold text-red-600">You don't have any designs yet</h2>
        <CustomCanvasDialog>
        <Button className="bg-red-700 text-white">+ Create New</Button>
        </CustomCanvasDialog>
        
      </div>:
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 '>
        {templateList?.map((design,index)=>(
          <div key={index} className='rounded-lg dark:bg-gray-950 bg-rose-200'
          onClick={()=>onTemplateSelect(design)}>
            {design?.imagePreview ? (
        <Image
          src={design.imagePreview}
          alt={design?.name || "Design"}
          width={300}
          height={300}
          className='w-full h-[200px] cursor-pointer object-contain rounded-lg'
        />
      ) : (
        <div className='w-full h-[200px] bg-gray-100 text-center flex items-center justify-center rounded-lg'>
          <span className="text-gray-400 text-sm">No Preview Available</span>
        </div>
      )}
          </div>
        ))}
      </div>
      }
    </div>
  )
}

export default PreTemplatesList