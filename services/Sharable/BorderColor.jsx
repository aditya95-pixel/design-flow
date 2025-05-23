import React,{useState} from 'react'
import ColorPickerEditor from './ColorPickerEditor';
import { useCanvasHook } from '../../context/useCanvasHook';
function BorderColor() {
    const [color,setColor]=useState("#000");
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onColorChange=(color)=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
      setColor(color);
      const activeObject=canvasEditor.getActiveObject();
      activeObject.set({
        stroke:color,
        strokeWidth: activeObject.strokeWidth || 2
      });
      canvasEditor.renderAll();
    }
  return (
    <div>
        <ColorPickerEditor onColorChange={(v)=>onColorChange(v)}
        value={color}/>
    </div>
  )
}
export default BorderColor
