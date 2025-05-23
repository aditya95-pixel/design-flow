import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Trash } from 'lucide-react';
import { TextSettingsList } from '../Options';
import { useCanvasHook } from '../../context/useCanvasHook';
import FontStyles from "../Sharable/FontStyles";
function TextSettingsNavbar() {
  const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onDelete=()=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
      const activeObject=canvasEditor.getActiveObject();
      if(activeObject){
        canvasEditor.remove(activeObject);
      }
    }
  return (
    <div>
        <div className='flex gap-6'>
        {TextSettingsList.map((shape,index)=>(
          <div key={index} className="hover:scale-105 transition-all cursor-pointer">
              <Popover>
                <PopoverTrigger asChild>
                  <shape.icon className='text-red-600 font-bold'/>
                </PopoverTrigger>
                <PopoverContent className="bg-black text-red-600 font-bold">
                  {shape.component}
                </PopoverContent>
              </Popover>
          </div>
        ))}
        <FontStyles/>
        <Trash onClick={onDelete} className="hover:scale-105 transition-all cursor-pointer text-red-600"/>
      </div>
    </div>
  )
}
export default TextSettingsNavbar
