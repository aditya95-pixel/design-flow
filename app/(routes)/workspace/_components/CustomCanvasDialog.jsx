import React,{useContext, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../../components/ui/dialog";
import {Input} from "../../../../components/ui/input";
import { Button } from '../../../../components/ui/button';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
function CustomCanvasDialog({children}) {
  const [name,setName]=useState();
  const [width,setWidth]=useState();
  const [height,setHeight]=useState();
  const {userDetail}=useContext(UserDetailContext);
  const [loading,setLoading]=useState(false);
  const createDesignRecord=useMutation(api.designs.CreateNewDesign);
  const router=useRouter();
  /**
   * 
   * 
   */
  const onCreate=async ()=>{
    toast("Loading...");
    setLoading(true);
    const result=await createDesignRecord({
      name:name,
      width:Number(width),
      height:Number(height),
      uid:userDetail?._id
    });
    setLoading(false);
    router.push("/design/"+result);
  }
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="font-sans">Create custom canvas</DialogTitle>
            <DialogDescription asChild>
                <div className="font-sans">
                    <h2 className='text-sm'>Provide Canvas Width and Height</h2>
                    <div className="mt-5">
                      <Input placeholder="Design Name" onChange={(e)=>setName(e.target.value)}/>
                      <div className='mt-5 flex gap-5 w-full'>
                        <div className='w-full'>
                          <label>Width</label>
                          <Input className="mt-1" type="number" placeholder={500} onChange={(e)=>setWidth(e.target.value)}/>
                        </div>
                        <div className='w-full'>
                          <label>Height</label>
                          <Input className="mt-1" type="number" placeholder={500} onChange={(e)=>setHeight(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-end mt-6'>
                      <Button className="w-full bg-red-700" disabled={loading||!name||!width||!height} onClick={onCreate}>
                        {loading?<Loader2Icon className='animate-spin'/>:"Create"}
                      </Button>
                    </div>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

  )
}

export default CustomCanvasDialog