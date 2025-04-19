import React from 'react'
import {Slider} from "../../components/ui/slider";
import { useCanvasHook } from '../../context/useCanvasHook';
function Opacity() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onRadiusChange=(value)=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
        const activeObject=canvasEditor.getActiveObject();
      activeObject.set({
        rx:value,
        ry:value
      });
      canvasEditor.renderAll();
    }
  return (
    <div>
        <h2 className='my-2'> Change Border Radius</h2>
        <Slider defaultValue={[0]} max={100} step={1}
        onValueChange={(v)=>onRadiusChange(v[0])}/>
    </div>
  )
}

export default Opacity