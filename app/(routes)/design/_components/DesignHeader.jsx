import { Button } from '../../../../components/ui/button';
import { UserButton } from '@stackframe/stack'
import { Download, Save, Sun, Moon } from 'lucide-react';
import React,{useEffect,useState} from 'react'
import { useCanvasHook } from '../../../../context/useCanvasHook';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import ImageKit from 'imagekit';
import { useTheme } from '../../../../context/ThemeContext';
import Image from 'next/image';
function DesignHeader({ DesignInfo }) {
  const { theme, toggleTheme } = useTheme();
  const { canvasEditor } = useCanvasHook();
  const SaveDesign = useMutation(api.designs.SaveDesign);
  const UpdateDesignName = useMutation(api.designs.updateDesignName);
  const { designId } = useParams();
  const [designName, setDesignName] = useState(DesignInfo?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  });
  useEffect(() => {
    setDesignName(DesignInfo?.name || "");
  }, [DesignInfo]);

  const handleNameChange = (e) => {
    setDesignName(e.target.value);
  };

  const saveDesignName = async () => {
    try {
      await UpdateDesignName({
        id: designId,
        name: designName
      });
      toast.success("Design name updated");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update design name");
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveDesignName();
    } else if (e.key === 'Escape') {
      setDesignName(DesignInfo?.name || "");
      setIsEditing(false);
    }
  };
  const onSave = async () => {
    if (canvasEditor) {
      const base64Image = canvasEditor?.toDataURL({
        format: "png",
        quality: 0.5
      });
      const existingFiles = await imagekit.listFiles({
        searchQuery: `name="${designId}.png"`
      });
      if (existingFiles.length > 0 && existingFiles[0]?.fileId) {
        await imagekit.deleteFile(existingFiles[0].fileId);
      }
      const imageRef = await imagekit.upload({
        file: base64Image,
        fileName: designId + ".png",
        isPublished: true,
        useUniqueFileName: false
      });
      console.log(imageRef.url);
      const JsonDesign = canvasEditor.toJSON();
      const result = await SaveDesign({
        id: designId,
        jsonDesign: JsonDesign,
        imagePreview: imageRef.url
      });
      toast("Saved");
    }
  }

  const onExport = () => {
    const dataUrl = canvasEditor?.toDataURL({
      format: "png",
      quality: 1
    });
    const link = document?.createElement("a");
    link.href = dataUrl;
    link.download = "DesignFlow.png";
    link.click();
  }

  return (
    <div className="font-sans w-full p-4 flex items-center justify-between gap-4 bg-gradient-to-r from-red-600 via-red-750 to-indigo-900">
  {/* Logo - Fixed width to prevent squeezing */}
  <div className="flex-shrink-0 w-[140px]">
    <Image 
      src="/logo.png" 
      alt="DesignFlow" 
      width={140} 
      height={60}
      className="object-contain h-full w-auto" 
      priority
    />
  </div>

  {/* Design Name - Flexible center area */}
  <div className="flex-1 min-w-0 mx-4">
    {isEditing ? (
      <input
        autoFocus
        value={designName}
        onChange={handleNameChange}
        onBlur={saveDesignName}
        onKeyDown={handleKeyDown}
        className="text-white bg-transparent border-b border-white/50 outline-none w-full px-2 text-center"
      />
    ) : (
      <div
        onClick={() => setIsEditing(true)}
        className="text-white cursor-pointer hover:bg-white/10 rounded px-2 py-1 text-center truncate"
      >
        {designName || "Untitled Design"}
      </div>
    )}
  </div>

  {/* Action Buttons - Right-aligned group */}
  <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
    {/* Theme Toggle */}
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>

    {/* Save Button */}
    <Button 
      className="h-9 px-3 sm:px-4 whitespace-nowrap" 
      onClick={onSave}
    >
      <Save className="h-4 w-4" />
      <span className="ml-2 hidden sm:inline">Save</span>
    </Button>

    {/* Download Button */}
    <Button 
      className="h-9 px-3 sm:px-4 whitespace-nowrap" 
      onClick={onExport}
    >
      <Download className="h-4 w-4" />
      <span className="ml-2 hidden sm:inline">Download</span>
    </Button>

    {/* User Button */}
    <div className="ml-1 sm:ml-2">
      <UserButton />
    </div>
  </div>
</div>
  )
}

export default DesignHeader