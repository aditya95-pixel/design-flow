import React from 'react'
import {Slider} from "../../components/ui/slider";
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
function BorderWidth() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onWidthChange=(value)=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
        const activeObject=canvasEditor.getActiveObject();
      activeObject.set({
        strokeWidth: value
      });
      canvasEditor.renderAll();
    }
  return (
    <div>
        <h2 className='my-2'> Border Width </h2>
        <Slider defaultValue={[33]} max={100} step={1}
        onValueChange={(v)=>onWidthChange(v[0])}/>
    </div>
  )
}

export default BorderWidth