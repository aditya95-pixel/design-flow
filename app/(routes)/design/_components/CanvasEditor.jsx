import React, { useRef, useState, useEffect } from 'react'
import { fabric } from 'fabric'
import { useCanvasHook } from '../../../../context/useCanvasHook'
import TopNavBar from "../../../../services/Components/TopNavBar"
import { Pencil, ChevronDown } from 'lucide-react'

const DESIGN_PRESETS = {
  'instagram-post': { width: 1080, height: 1080, name: 'Instagram Post' },
  'youtube-thumbnail': { width: 1280, height: 720, name: 'YouTube Thumbnail' },
  'facebook-cover': { width: 820, height: 312, name: 'Facebook Cover' },
  'twitter-post': { width: 1200, height: 675, name: 'Twitter Post' },
  'story': { width: 1080, height: 1920, name: 'Story' },
  'custom': { width: 800, height: 600, name: 'Custom' }
}

const COLOR_PALETTE = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', 
  '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080',
  '#800000', '#808000', '#008000', '#800080', '#008080', '#000080'
]

const BRUSH_SIZES = [1, 2, 3, 5, 8, 10, 15, 20]

function CanvasEditor({ DesignInfo }) {
    const canvasRef = useRef()
    const [canvas, setCanvas] = useState(null)
    const [isDrawingMode, setIsDrawingMode] = useState(false)
    const [showToolOptions, setShowToolOptions] = useState(false)
    const [brushColor, setBrushColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState(2)
    const { canvasEditor, setCanvasEditor, setUndoStack, setRedoStack, handleUndo, handleRedo } = useCanvasHook()
    
    const saveState = () => {
        if (!canvasEditor) return
        setUndoStack(prev => [...prev, canvasEditor.toJSON()])
        setRedoStack([])
    }

    const setupPencilTool = () => {
        if (!canvasEditor) return
        setUndoStack(prev => [...prev, canvasEditor.toJSON()])
        setRedoStack([])
        canvasEditor.isDrawingMode = isDrawingMode
        if (isDrawingMode) {
            canvasEditor.freeDrawingBrush = new fabric.PencilBrush(canvasEditor)
            canvasEditor.freeDrawingBrush.color = brushColor
            canvasEditor.freeDrawingBrush.width = brushSize
            canvasEditor.defaultCursor = 'crosshair'
        } else {
            canvasEditor.defaultCursor = 'default'
        }
    }

    const toggleDrawingMode = () => {
        const newMode = !isDrawingMode
        setIsDrawingMode(newMode)
        setShowToolOptions(newMode)
    }

    const handleColorChange = (color) => {
        setBrushColor(color)
        if (canvasEditor && canvasEditor.freeDrawingBrush) {
            canvasEditor.freeDrawingBrush.color = color
        }
    }

    const handleSizeChange = (size) => {
        setBrushSize(size)
        if (canvasEditor && canvasEditor.freeDrawingBrush) {
            canvasEditor.freeDrawingBrush.width = size
        }
    }

    useEffect(() => {
        setupPencilTool()
    }, [isDrawingMode, brushColor, brushSize, canvasEditor])

    useEffect(() => {
        if (canvasRef.current && DesignInfo) {
            const dimensions = DesignInfo?.type && DESIGN_PRESETS[DesignInfo.type] 
                ? DESIGN_PRESETS[DesignInfo.type] 
                : { width: DesignInfo?.width, height: DesignInfo?.height }

            const initCanvas = new fabric.Canvas(canvasRef.current, {
                width: dimensions.width / 1.2,
                height: dimensions.height / 1.2,
                backgroundColor: '#ffffff',
                preserveObjectStacking: true,
                isDrawingMode: false
            })

            const scaleFactor = window.devicePixelRatio || 1
            initCanvas.set({
                width: dimensions.width * scaleFactor,
                height: dimensions.height * scaleFactor,
                zoom: 1 / scaleFactor  
            })

            if (DesignInfo?.jsonTemplate) {
                initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, () => {
                    initCanvas?.requestRenderAll()
                    setUndoStack([initCanvas.toJSON()])
                })
            }

            initCanvas.on('path:created', () => saveState())
            initCanvas.on('object:added', saveState)
            initCanvas.on('object:modified', saveState)
            initCanvas.on('object:removed', saveState)
            
            setCanvas(initCanvas)
            setCanvasEditor(initCanvas)

            return () => {
                initCanvas.dispose()
                initCanvas.off('path:created')
                initCanvas.off('object:added', saveState)
                initCanvas.off('object:modified', saveState)
                initCanvas.off('object:removed', saveState)
            }
        }
    }, [DesignInfo])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete') {
                if (canvasEditor) {
                    const activeObject = canvasEditor.getActiveObject()
                    if (activeObject) {
                        saveState()
                        canvasEditor.remove(activeObject)
                        canvasEditor.renderAll()
                    }
                }
            }
            else if (event.key.toLowerCase() === 'p') {
                event.preventDefault()
                toggleDrawingMode()
            }
            else if (event.ctrlKey && event.key === 'z') {
                event.preventDefault()
                handleUndo()
            }
            else if ((event.ctrlKey && event.key === 'y') || (event.ctrlKey && event.shiftKey && event.key === 'z')) {
                event.preventDefault()
                handleRedo()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [canvasEditor])

    const getCurrentDimensions = () => {
        if (DesignInfo?.type && DESIGN_PRESETS[DesignInfo.type]) {
            return DESIGN_PRESETS[DesignInfo.type]
        }
        return {
            width: DesignInfo?.width || 800,
            height: DesignInfo?.height || 600
        }
    }

    return (
        <div className='font-sans dark:bg-gray-900 bg-rose-100 w-full h-screen flex flex-col'>
            <TopNavBar/>
            
            {/* Pencil Tool Options */}
            <div className='fixed right-6 bottom-6 z-50 flex flex-col items-end gap-2'>
                {showToolOptions && (
                    <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>Color</h3>
                            <div className='grid grid-cols-8 gap-1'>
                                {COLOR_PALETTE.map(color => (
                                    <button
                                        key={color}
                                        className={`w-6 h-6 rounded-full border ${brushColor === color ? 'border-2 border-blue-500' : 'border-gray-300'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorChange(color)}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>Thickness</h3>
                            <div className='flex flex-wrap gap-2'>
                                {BRUSH_SIZES.map(size => (
                                    <button
                                        key={size}
                                        className={`px-2 py-1 rounded-md text-xs ${
                                            brushSize === size 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                        }`}
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        {size}px
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Pencil Toggle Button */}
                <button
                    onClick={toggleDrawingMode}
                    className={`p-3 rounded-full shadow-lg transition-all flex items-center gap-1 ${
                        isDrawingMode 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                    title={isDrawingMode ? 'Disable Pencil Tool (P)' : 'Enable Pencil Tool (P)'}
                >
                    <Pencil className={`h-6 w-6 ${isDrawingMode ? 'text-white' : 'text-current'}`} />
                    <ChevronDown className={`h-4 w-4 transition-transform ${showToolOptions ? 'rotate-180' : ''}`} />
                </button>
            </div>

            <div className='flex-1 relative overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center pt-10 pb-16'>
                    <div className='relative' style={{
                        width: `${getCurrentDimensions().width / 1.2}px`,
                        height: `${getCurrentDimensions().height / 1.2}px`
                    }}>
                        <canvas id='canvas' ref={canvasRef}/>
                        <div className='absolute bottom-2 right-2 bg-white dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300'>
                            {getCurrentDimensions().width} × {getCurrentDimensions().height} px
                            {isDrawingMode && <span className='ml-2'>| Drawing Mode</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CanvasEditor
