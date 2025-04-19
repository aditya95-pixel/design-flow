import React, { useRef,useState, useEffect} from 'react'
import {fabric} from 'fabric';
import {useCanvasHook} from '../[designId]/page';
import TopNavBar from "../../../../services/Components/TopNavBar"
function CanvasEditor({DesignInfo}) {
    const canvasRef=useRef();
    const [canvas,setCanvas]=useState(null);
    const {canvasEditor,setCanvasEditor, setUndoStack, setRedoStack,handleUndo,handleRedo} = useCanvasHook();
    
    const saveState = () => {
        if (!canvasEditor) return;
        setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
        // Clear redo stack when a new action is performed
        setRedoStack([]);
    };

    useEffect(()=>{
        if(canvasRef.current && DesignInfo){
            const initCanvas=new fabric.Canvas(canvasRef.current,{
                width:DesignInfo?.width/1.2,
                height:DesignInfo?.height/1.2,
                backgroundColor:'#ffffff',
                preserveObjectStacking:true
            })
            const scaleFactor=window.devicePixelRatio||1;
            initCanvas.set({
                width: DesignInfo?.width * scaleFactor,
                height: DesignInfo?.height * scaleFactor,
                zoom: 1 / scaleFactor  
            })
            if(DesignInfo?.jsonTemplate){
                initCanvas.loadFromJSON(DesignInfo?.jsonTemplate,()=>{
                    initCanvas?.requestRenderAll();
                    // Save initial state
                    setUndoStack([initCanvas.toJSON()]);
                });
            }
            setCanvas(initCanvas)
            setCanvasEditor(initCanvas);

            // Set up event listeners for state changes
            initCanvas.on('object:added', saveState);
            initCanvas.on('object:modified', saveState);
            initCanvas.on('object:removed', saveState);
            return ()=>{
                initCanvas.dispose();
                initCanvas.off('object:added', saveState);
                initCanvas.off('object:modified', saveState);
                initCanvas.off('object:removed', saveState);
            }
        }
    },[DesignInfo])

    useEffect(()=>{
        const handleKeyDown=(event)=>{
            if(event.key === 'Delete') {
                if(canvasEditor) {
                    const activeObject=canvasEditor.getActiveObject();
                    if(activeObject){
                        saveState(); // Save state before deletion
                        canvasEditor.remove(activeObject);
                        canvasEditor.renderAll();
                    }
                }
            }
            // Ctrl+Z for undo
            else if (event.ctrlKey && event.key === 'z') {
                event.preventDefault();
                handleUndo();
            }
            // Ctrl+Y or Ctrl+Shift+Z for redo
            else if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'z')) {
                event.preventDefault();
                handleRedo();
            }
        }
        document.addEventListener("keydown",handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown",handleKeyDown);
        }
    },[canvasEditor])

    return (
        <div className='font-sans dark:bg-gray-900 bg-rose-100 w-full h-screen '>
            <TopNavBar/>
            <div className=' flex mt-10 items-center justify-center '>
                <canvas id='canvas' ref={canvasRef}/>
            </div>
        </div>
    )
}

export default CanvasEditor
