import React,{useState} from 'react'
import ImageKit from 'imagekit';
import {Button} from "../../components/ui/button";
import { useParams } from 'next/navigation';
import {Loader2Icon}  from 'lucide-react';
import {fabric} from "fabric";
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
function UploadImage() {
    const {designId}=useParams();
    const[loading,setLoading]=useState(false);
    const { canvasEditor,setCanvasEditor,setUndoStack,setRedoStack } = useCanvasHook();

    var imagekit = new ImageKit({
        publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });
    
    
    const onFileUpload = async (event) => {
        if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
      setLoading(true);
      const file = event.target.files[0];
  
      const imageRef = await imagekit.upload({
          file: file,
          fileName: designId + ".png",
          isPublished: true
      });
  
      console.log(imageRef?.url);
  
      fabric.Image.fromURL(imageRef?.url, (img) => {
          canvasEditor.add(img);
          canvasEditor.renderAll();
          setLoading(false);
      }, {
          crossOrigin: "anonymous" // ✅ Put it here
      });
  };
  
  return (
    <div>
        <label htmlFor="uploadImage">
            <h2 className="p-2 bg-red-600 text-white rounded-md text-center text-small"> 
              {loading?<Loader2Icon className='animate-spin'/>:"Upload Image"}
            </h2>
        </label>
        <input type="file" id="uploadImage" className='hidden'
        multiple={false}
        onChange={onFileUpload}/>
    </div>
  )
}

export default UploadImage;