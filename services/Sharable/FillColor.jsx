import React, { useState } from 'react'
import ColorPickerEditor from './ColorPickerEditor'
import { useCanvasHook } from '../../context/useCanvasHook';
function FillColor() {
  const [color,setColor]=useState("#000");
  const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
  const onColorChange=(color)=>{
    if(!canvasEditor) return;
    setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
    // Clear redo stack when a new action is performed
    setRedoStack([]);
    setColor(color);
    const activeObject=canvasEditor.getActiveObject();
    activeObject.set({
      fill:color
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
export default FillColor
