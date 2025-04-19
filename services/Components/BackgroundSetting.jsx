import React,{useState} from 'react'
import ColorPickerEditor from "../Sharable/ColorPickerEditor"
import { useCanvasHook } from '../../context/useCanvasHook';
function BackgroundSetting() {
    const [bgColor,setBgColor]=useState('#fff');
    const {canvasEditor,setCanvasEditor, setUndoStack, setRedoStack}=useCanvasHook();
    const onColorChange=(color)=>{
      if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
      setBgColor(color);
      canvasEditor?.set({
        backgroundColor:color,
        backgroundImage:null
      })
      canvasEditor.renderAll();
    }
  return (
    <div>
      <ColorPickerEditor
        value={bgColor}
        onColorChange={(v)=> onColorChange(v)}
      />
    </div>
  )
}
export default BackgroundSetting
