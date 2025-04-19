import React,{useEffect} from 'react'
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
import { fabric } from 'fabric';
import { ThemeProvider } from '../../context/ThemeContext';
function TextSettings() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onAddTextClick=(type)=>{
        if(!canvasEditor) return;
        setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
        setRedoStack([]);
        if(canvasEditor){
            if(type=="Heading"){
                const textRef=new fabric.IText("Add Heading",{
                    fontSize:30,
                    fontWeight:"bold",
                    fontFamily:"Arial",
                    fill:"black",
                    left:100,
                    top:100
                });
                canvasEditor.add(textRef);
            }else if(type=="Subheading"){
                const textRef=new fabric.IText("Add Subheading",{
                    fontSize:20,
                    fontWeight:"400",
                    fontFamily:"Arial",
                    fill:"black",
                    left:100,
                    top:100
                });
                canvasEditor.add(textRef);
            }else if(type=="Paragraph"){
                const textRef=new fabric.IText("Add Paragraph",{
                    fontSize:13,
                    fontWeight:"normal",
                    fontFamily:"Arial",
                    fill:"black",
                    left:100,
                    top:100
                });
                canvasEditor.add(textRef);
            }
        }
    }
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!canvasEditor) return;

            if (e.key === "Delete") {
                const activeObject = canvasEditor.getActiveObject();
                if (activeObject) {
                    canvasEditor.remove(activeObject);
                    canvasEditor.renderAll();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvasEditor]);
  return (
    <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl p-3 dark:bg-white bg-rose-200 rounded-xl cursor-pointer'
        onClick={()=>onAddTextClick("Heading")}>Add Heading</h2>
        <h2 className='font-medium text-xl p-3 dark:bg-white bg-rose-200 rounded-xl cursor-pointer'
        onClick={()=>onAddTextClick("Subheading")}>Add Subheading</h2>
        <h2 className='text-md p-3 dark:bg-white bg-rose-200 rounded-xl cursor-pointer'
        onClick={()=>onAddTextClick("Paragraph")}>Paragraph</h2>
    </div>
  )
}
export default TextSettings
