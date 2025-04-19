import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react'
import React from 'react'
import Image from 'next/image';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
function TemplatesList() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const templateList=useQuery(api.templates.GetAllTemplatest);
    const onTemplateSelect=(template)=>{
        if(!canvasEditor) return;
        setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
        setRedoStack([]);
        if(canvasEditor){
            canvasEditor.loadFromJSON(template?.jsonData,()=>{
                canvasEditor?.requestRenderAll();
            })
        }
    }
    if (!templateList) {
        return <p className='text-white text-center mt-5'>Loading templates...</p>;
    }
  return (
    <div>
        <div className='grid grid-cols-2 gap-5'>
                {templateList?.map((template,index)=>(
                    <Image src={template.imagePreview}
                    onClick={()=>onTemplateSelect(template)}
                    key={index}
                    alt={template?.name}
                    width={500}
                    height={500}
                    className='w-full h-[150px] rounded-lg object-contain bg-secondary
                    cursor-pointer'
                    />
            ))}
         </div>
    </div>
  )
}

export default TemplatesList
