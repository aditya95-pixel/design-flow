"use client";
import { useParams } from 'next/navigation';
import React,{useState,useContext} from 'react'
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import SideBar from "../_components/SideBar";
import CanvasEditor from "../_components/CanvasEditor";
import {CanvasContext} from "../../../../context/CanvasContext";
import { ThemeProvider } from '../../../../context/ThemeContext';
function DesignEditor() {
    const {designId}=useParams();
    const [canvasEditor,setCanvasEditor]=useState();
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const DesignInfo=useQuery(api.designs.GetDesign,{
        id:designId
    });

    const handleUndo = () => {
        if (undoStack.length === 0 || !canvasEditor) return;        
        const lastState = undoStack[undoStack.length - 1];        
        setRedoStack([...redoStack, canvasEditor.toJSON()]);        
        canvasEditor.loadFromJSON(lastState, () => {
            canvasEditor.renderAll();
        });        
        setUndoStack(undoStack.slice(0, -1));
    };

    const handleRedo = () => {
        if (redoStack.length === 0 || !canvasEditor) return;
        const lastState = redoStack[redoStack.length - 1];
        setUndoStack([...undoStack, canvasEditor.toJSON()]);
        canvasEditor.loadFromJSON(lastState, () => {
            canvasEditor.renderAll();
        });
        setRedoStack(redoStack.slice(0, -1));
    };

    return (
        <ThemeProvider>
            <div className="w-full min-h-screen overflow-x-hidden">
                <CanvasContext.Provider value={{
                    canvasEditor,
                    setCanvasEditor,
                    undoStack,
                    redoStack,
                    setUndoStack,
                    setRedoStack,
                    handleUndo,
                    handleRedo
                }}>     
                <DesignHeader DesignInfo={DesignInfo}/>
                <div className='flex'>
                    <SideBar/>
                    <CanvasEditor DesignInfo={DesignInfo} />
                </div>
                </CanvasContext.Provider>
            </div>
        </ThemeProvider>
    )
}

export default DesignEditor

export const useCanvasHook=()=>{
    const context=useContext(CanvasContext);
    if (!context){
        throw new Error("Error")
    }
    return context
}
