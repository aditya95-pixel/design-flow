import React, { useEffect, useState } from 'react';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
import {fabric} from 'fabric';

function PencilTool() {
    const { canvasEditor, setCanvasEditor, setUndoStack, setRedoStack } = useCanvasHook();
    const isDrawing = React.useRef(false);
    const path = React.useRef(null);
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);
    
    useEffect(() => {
        if (!canvasEditor) return;

        const handleMouseDown = (options) => {
            if (options.e.button !== 0) return; 

            isDrawing.current = true;
            canvasEditor.selection = false; 
            setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
            setRedoStack([]);

            const { x, y } = options.pointer;
            path.current = new fabric.Path(`M ${x} ${y}`, {
                stroke: brushColor,
                strokeWidth: brushSize,
                fill: '',
                strokeLineCap: 'round',
                strokeLineJoin: 'round',
                selectable: false,
                skipOffscreen: false 
            });
            canvasEditor.add(path.current);
            canvasEditor.requestRenderAll(); 
        };

        const handleMouseMove = (options) => {
            if (!isDrawing.current || !path.current) return;

            const { x, y } = options.pointer;
            const newPath = path.current.path.concat([['L', x, y]]);
            path.current.set({ path: newPath });
            path.current.setCoords();
            path.current.dirty = true; 
            canvasEditor.renderAll();
        };

        const handleMouseUp = () => {
            isDrawing.current = false;
            if (path.current) {
                path.current.setCoords();
                canvasEditor.requestRenderAll();
            }
            path.current = null;
            canvasEditor.selection = true; 
        };

        canvasEditor.on('mouse:down', handleMouseDown);
        canvasEditor.on('mouse:move', handleMouseMove);
        canvasEditor.on('mouse:up', handleMouseUp);

        return () => {
            canvasEditor.off('mouse:down', handleMouseDown);
            canvasEditor.off('mouse:move', handleMouseMove);
            canvasEditor.off('mouse:up', handleMouseUp);
        };
    }, [canvasEditor, setUndoStack, setRedoStack, brushColor, brushSize]);

    return (
        <div className='bg-white p-4 rounded-lg'>
            <h3 className='font-medium mb-3'>Drawing Tools</h3>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <label>Color:</label>
                    <input 
                        type="color" 
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                        className='h-8 w-8'
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <label>Size:</label>
                    <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className='w-24'
                    />
                    <span>{brushSize}px</span>
                </div>
                <div className='flex gap-2 mt-2'>
                    <button 
                        className='px-3 py-1 border rounded-lg bg-blue-100 hover:bg-blue-200'
                        onClick={() => {
                            if (!canvasEditor) return;
                            setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
                            setRedoStack([]);
                            canvasEditor.clear(); // Clear the canvas
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PencilTool;