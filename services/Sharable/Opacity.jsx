import React from 'react'
import {Slider} from "../../components/ui/slider";
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
function Opacity() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onOpacityChange=(value)=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
      const activeObject=canvasEditor.getActiveObject();
      activeObject.set({
        opacity: value
      });
      canvasEditor.renderAll();
    }
  return (
    <div>
        <h2 className='my-2'> Update Opacity </h2>
        <Slider defaultValue={[1]} max={1} step={0.1}
        onValueChange={(v)=>onOpacityChange(v[0])}/>
    </div>
  )
}
export default Opacity
