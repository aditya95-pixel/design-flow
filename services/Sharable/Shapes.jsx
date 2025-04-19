import React from 'react'
import { ShapeList } from '../Options'
import Image from 'next/image';
import { fabric} from 'fabric';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
function Shapes() {
    const {canvasEditor,setCanvasEditor,setUndoStack,setRedoStack}=useCanvasHook();
    const onShapeSelect=(shape)=>{
        if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
        const properties={
            left: 100,
            top: 100,
            fill: "black",
            stroke: "black",
            strokeWidth: 0,
        }
        if(shape.name=='Circle'){
            const circleRef=new fabric.Circle({
                ...properties,
                radius:50
            })
            canvasEditor.add(circleRef);
        }else if(shape.name=='Square'){
            const squareRef=new fabric.Rect({
                ...properties,
                width:100,
                height:100
            })
            canvasEditor.add(squareRef);
        }else if(shape.name=='Triangle'){
            const triangleRef=new fabric.Triangle({
                ...properties,
                width:100,
                height:100
            })
            canvasEditor.add(triangleRef);
        }else if(shape.name=='Line'){
            const lineRef=new fabric.Line([50,50,200,200],{
                stroke:"black",
                strokeWidth:5
            })
            canvasEditor.add(lineRef);
        }else if (shape.name === 'Rectangle') {
            const rectRef = new fabric.Rect({
                ...properties,
                width: 150,
                height: 80
            });
            canvasEditor.add(rectRef);
        }
        else if (shape.name === 'Ellipse') {
            const ellipseRef = new fabric.Ellipse({
                ...properties,
                rx: 75,
                ry: 45
            });
            canvasEditor.add(ellipseRef);
        }
        else if (shape.name === 'Pentagon') {
            const pentagonRef = new fabric.Polygon([
                { x: 50, y: 0 }, { x: 100, y: 38 },
                { x: 81, y: 100 }, { x: 19, y: 100 },
                { x: 0, y: 38 }
            ], {
                ...properties
            });
            canvasEditor.add(pentagonRef);
        }
        else if (shape.name === 'Hexagon') {
            const hexagonRef = new fabric.Polygon([
                { x: 50, y: 0 }, { x: 100, y: 25 },
                { x: 100, y: 75 }, { x: 50, y: 100 },
                { x: 0, y: 75 }, { x: 0, y: 25 }
            ], {
                ...properties
            });
            canvasEditor.add(hexagonRef);
        }
        else if (shape.name === 'Star') {
            const starRef = new fabric.Polygon([
                { x: 100, y: 0 }, { x: 120, y: 70 }, { x: 190, y: 70 },
                { x: 135, y: 110 }, { x: 155, y: 180 },
                { x: 100, y: 140 }, { x: 45, y: 180 },
                { x: 65, y: 110 }, { x: 10, y: 70 },
                { x: 80, y: 70 }
            ], {
                ...properties
            });
            canvasEditor.add(starRef);
        }
        else if (shape.name === 'Arrow') {
            const arrowRef = new fabric.Polygon([
                { x: 0, y: 50 }, { x: 60, y: 0 },
                { x: 60, y: 30 }, { x: 120, y: 30 },
                { x: 120, y: 70 }, { x: 60, y: 70 },
                { x: 60, y: 100 }
            ], {
                ...properties
            });
            canvasEditor.add(arrowRef);
        }
        else if (shape.name === 'Heart') {
            const heartPath = new fabric.Path('M 272.701,15.554 C 244.254,-7.571 197.791,10.437 174.5,44.014 151.209,10.437 104.746,-7.571 76.299,15.554 -2.728,83.432 174.5,213.407 174.5,213.407 174.5,213.407 351.728,83.432 272.701,15.554 Z');
            heartPath.set({ ...properties, scaleX: 0.2, scaleY: 0.2 });
            canvasEditor.add(heartPath);
        }
        canvasEditor.renderAll();
    }
  return (
    <div className='bg-white p-4 rounded-lg'>
        <div className='grid grid-cols-3 gap-3'>
        {
            ShapeList.map((shape,index)=>(
                <div key={index} className='p-2 border rounded-xl' onClick={()=>onShapeSelect(shape)}>
                    <Image src={shape.icon} alt={shape.name}
                    width={100} height={100}/>
                </div>
        ))}
        </div>
    </div>
  )
}

export default Shapes