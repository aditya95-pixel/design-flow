import React from 'react'
import { FontFamilyList } from '../Options'
import { useCanvasHook } from '../../context/useCanvasHook'
function FontFamily() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
        const onFontFamilyChange=(value)=>{
          if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      setRedoStack([]);
            const activeObject=canvasEditor.getActiveObject();
          activeObject.set({
            fontFamily:value
          });
          canvasEditor.renderAll();
        }
  return (
    <div className='h-[200px] overflow-auto'>
        {FontFamilyList.map((font,index)=>(
            <h2 key={index} className='text-lg p-2 bg-secondary rounded-lg mb-2 cursor-pointer'
            style={{
                fontFamily:font
            }} onClick={()=>onFontFamilyChange(font)}>
                {font}
            </h2>
        ))}
    </div>
  )
}
export default FontFamily
