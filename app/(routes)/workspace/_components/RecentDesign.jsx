"use client";
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react'
import { Button } from '../../../../components/ui/button';
import CustomCanvasDialog from "./CustomCanvasDialog";
import { useConvex } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
function RecentDesign() {
  const [designList, setDesignList] = useState([]);
  const { userDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (userDetail) {
      console.log("User ID:", userDetail?._id);
      GetRecentDesigns();
    }
  }, [userDetail])

  const GetRecentDesigns = async () => {
    const result = await convex.query(api.designs.GetUserDesigns, {
      uid: userDetail?._id
    });
    console.log(result.data);
    setDesignList(result.data);
  }

  const handleDeleteDesign = async (designId) => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      const result = await convex.mutation(api.designs.deleteDesign, {
        id: designId
      });
      
      if (result) {
        toast.success("Design deleted successfully");
        await GetRecentDesigns();
      }
    } catch (error) {
      console.error("Error deleting design:", error);
      toast.error("Failed to delete design");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className='mt-7 min-h-screen h-full font-sans dark:bg-gray-900 bg-rose-100'>
      <h2 className='font-bold text-2xl dark:text-white text-gray-900'>Recent Designs</h2>
      {designList?.length == 0 ?
        <div className='flex flex-col gap-4 items-center mt-5'>
          <Image src={'/edittool.png'} alt="edit" width={100} height={100} />
          <h2 className="text-center font-bold text-red-600">You don't have any designs yet</h2>
          <CustomCanvasDialog>
            <Button className="bg-red-700 text-white">+ Create New</Button>
          </CustomCanvasDialog>
        </div> :
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
          {designList?.map((design, index) => (
            <div key={index} className='dark:bg-gray-950 bg-rose-200 rounded-lg relative group shadow-sm'>
              <div 
                className='cursor-pointer'
                onClick={() => router.push("/design/" + design._id)}
              >
                {design?.imagePreview ? (
                  <Image
                    src={design.imagePreview}
                    alt={design?.name || "Design"}
                    width={300}
                    height={300}
                    className='w-full h-[200px] object-contain rounded-lg'
                  />
                ) : (
                  <div className='w-full h-[200px] bg-gray-100 text-center flex items-center justify-center rounded-lg'>
                    <span className="text-gray-400 text-sm">No Preview Available</span>
                  </div>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDesign(design._id);
                }}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="p-2">
                <p className="text-sm truncate dark:text-white text-black">{design?.name || "Untitled Design"}</p>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default RecentDesign