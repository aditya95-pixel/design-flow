import React, { useState,useEffect } from 'react'
import ShapesSettings from "../Sharable/ShapesSettings";
import { useCanvasHook } from '../../context/useCanvasHook';
import TextSettingsNavbar from "./TextSettings"

function TopNavBar() {
    const { canvasEditor, handleUndo, handleRedo, undoStack, redoStack } = useCanvasHook();
    const [showShapeSettings,setShowShapeSettings]=useState(false);
    const [enableTextSettings,setEnableTextSettings]=useState(false);
    
    useEffect(() => {
        if(canvasEditor){
            const activeObject=canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }
    },[canvasEditor]);
    
    if(canvasEditor){
        canvasEditor.on("selection:created",function(e){
            const activeObject=canvasEditor.getActiveObject();
            if(!activeObject.text) {
                setShowShapeSettings(true);
                setEnableTextSettings(false);
            }
            if(activeObject.text) {
                setShowShapeSettings(false);
                setEnableTextSettings(true);
            }
        })
        canvasEditor.on('selection:updated',function(){
            const activeObject=canvasEditor.getActiveObject();
            if(!activeObject.text) {
                setShowShapeSettings(true);
                setEnableTextSettings(false);
            }
            if(activeObject.text) {
                setShowShapeSettings(false);
                setEnableTextSettings(true);
            }
        })
        canvasEditor.on('selection:cleared',function(){
            setShowShapeSettings(false);
            setEnableTextSettings(false);
        })
    }
    
    return (
        <div className='p-2 text-white'>
            <div className="flex items-center space-x-4 mt-3 mb-3">
                <button 
                    onClick={handleUndo} 
                    disabled={!undoStack || undoStack.length <= 1}
                    className={`px-3 py-1 rounded ${(!undoStack || undoStack.length <= 1) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    Undo
                </button>
                <button 
                    onClick={handleRedo} 
                    disabled={!redoStack || redoStack.length === 0}
                    className={`px-3 py-1 rounded ${(!redoStack || redoStack.length === 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    Redo
                </button>
            </div>
            {showShapeSettings && <ShapesSettings/>}
            {enableTextSettings && <TextSettingsNavbar/>}
        </div>
    )
}

export default TopNavBar
