import axios from 'axios'
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import React,{useEffect,useState} from 'react'
import { Button } from '../../components/ui/button';
import {Input} from "../../components/ui/input"
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
import {fabric} from "fabric";
import { ThemeProvider } from '../../context/ThemeContext';
function SearchImages() {
    const[imageList,setImageList]=useState([]);
    const [searchInput,setSearchInput]=useState();
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    useEffect(()=>{
        GetImageList("Gradient");
    },[])
    const GetImageList=async (searchInput)=>{
        //https://api.unsplash.com/search/photos
        const result=await axios.get('https://api.unsplash.com/search/photos',{
            params:{
                query:searchInput,
                page:1,
                per_page:20
            },
            headers:{
                Authorization:`Client-ID `+process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
            }
        });
        setImageList(result?.data?.results)
        console.log(result)
    }
    /**
     * To add selected image to canvas
     */
    const addImageToCanvas = (imageUrl) => {
        if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
        fabric.Image.fromURL(imageUrl, (img) => {
            canvasEditor.add(img);
            canvasEditor.renderAll();
        }, {
            crossOrigin: "anonymous"
        });
    };    
  return (
    <div className='mt-5'>
        <h2 className='font-bold dark:text-white text-black'>Search Images</h2>
            <div className='flex gap-2 items-center my-2'>
                <Input placeholder={'Mountain'} className="text-white" onChange={(e)=>setSearchInput(e.target.value)}/>
                <Button onClick={()=>GetImageList(searchInput)} ><SearchIcon/></Button>
            </div>
        <div className="mt-3 grid grid-cols-2 gap-2
        overflow-auto h-[75vh]">
        {imageList.map((image) => (
            <div key={image.id} onClick={()=>addImageToCanvas(image?.urls?.small)}
            className='cursor-pointer'>
            <Image
                src={image?.urls?.thumb}
                alt={image?.slug || 'Unsplash image'}
                width={300}
                height={300}
                className="w-full h-[80px] rounded-sm object-cover"
            />
            </div>
        ))}
        </div>
    </div>
  )
}
export default SearchImages
