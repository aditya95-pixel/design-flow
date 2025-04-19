'use client';
import React, { useState } from 'react';
import { StickerList } from '../Options';
import Image from 'next/image';
import { fabric } from 'fabric';
import { useCanvasHook } from '../../context/useCanvasHook';
import { useParams } from 'next/navigation';
import ImageKit from 'imagekit';

function Stickers() {
  const { designId } = useParams();
  const [loading, setLoading] = useState(false);
  const { canvasEditor,setCanvasEditor,setUndoStack,setRedoStack } = useCanvasHook();

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });

  const onStickerSelect = (stickerUrl) => {
    if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    fabric.Image.fromURL(stickerUrl, (img) => {
      img.set({
        width: 300,
        height: 300,
      });
      canvasEditor.add(img);
      canvasEditor.renderAll();
      setLoading(false);
    }, {
      crossOrigin: "anonymous"
    });
  };
  

  const onFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const imageRef = await imagekit.upload({
      file: file,
      fileName: designId + '.png',
      isPublished: true,
    });

    console.log(imageRef?.url);

    fabric.Image.fromURL(imageRef?.url, (img) => {
      img.set({
        width: 200,
        height: 200,
      });
      canvasEditor.add(img);
      canvasEditor.renderAll();
      setLoading(false);
    });
  };

  return (
    <div className='bg-white p-4 rounded-lg max-h-96 overflow-y-auto'>
  <div className='grid grid-cols-3 gap-3'>
    {StickerList.map((sticker, index) => (
      <div
        key={index}
        className='p-2 border rounded-xl cursor-pointer hover:shadow-md'
        onClick={() => onStickerSelect(sticker)}
      >
        <Image src={sticker} alt='sticker' width={100} height={100} />
      </div>
    ))}
  </div>
</div>

  );
}

export default Stickers;
