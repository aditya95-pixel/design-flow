import React from 'react'
import { shapesSettingsList } from '../Options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Trash } from 'lucide-react';
import { useCanvasHook } from '../../context/useCanvasHook';
function ShapesSettings() {
  const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
  const onDelete=()=>{
    if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    const activeObject=canvasEditor.getActiveObject();
    if(activeObject){
      canvasEditor.remove(activeObject);
    }
    
  }
  return (
    <div className='flex gap-6'>
      {shapesSettingsList.map((shape,index)=>(
        <div key={index} className="hover:scale-105 transition-all cursor-pointer">
            <Popover>
              <PopoverTrigger asChild>
                <shape.icon className='dark:text-cyan-200 text-red-800 font-bold'/>
              </PopoverTrigger>
              <PopoverContent className="bg-black text-red-600 font-bold">
                {shape.component}
              </PopoverContent>
            </Popover>
        </div>
      ))}
      <Trash onClick={onDelete} className="hover:scale-105 transition-all cursor-pointer dark:text-cyan-200 text-red-800"/>
    </div>
  )
}

export default ShapesSettings
