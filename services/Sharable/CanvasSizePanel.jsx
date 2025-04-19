'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';
import { toast } from 'sonner';

function CanvasSizePanel() {
  const { canvasEditor,setCanvasEditor,setUndoStack,setRedoStack } = useCanvasHook();
  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 600
  });
  const [isEditing, setIsEditing] = useState(false);

  // Sync with current canvas size
  useEffect(() => {
    if (canvasEditor) {
      setDimensions({
        width: canvasEditor.width,
        height: canvasEditor.height
      });
    }
  }, [canvasEditor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setDimensions(prev => ({
        ...prev,
        [name]: Math.max(100, Math.min(5000, numValue))
      }));
    }
  };

  const applyDimensions = () => {
    if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    if (canvasEditor && dimensions.width && dimensions.height) {
      canvasEditor.setDimensions({
        width: dimensions.width,
        height: dimensions.height
      });
      canvasEditor.renderAll();
      toast.success(`Canvas set to ${dimensions.width}×${dimensions.height}px`);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-4">
      <h3 className="font-medium text-lg">Canvas Size</h3>
      
      {isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              name="width"
              value={dimensions.width}
              onChange={handleChange}
              className="w-24"
              min="100"
              max="5000"
              type="number"
            />
            <span>×</span>
            <Input
              name="height"
              value={dimensions.height}
              onChange={handleChange}
              className="w-24"
              min="100"
              max="5000"
              type="number"
            />
            <span>px</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={applyDimensions} size="sm">
              Apply
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                // Reset to current canvas dimensions
                if (canvasEditor) {
                  setDimensions({
                    width: canvasEditor.width,
                    height: canvasEditor.height
                  });
                }
              }}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>
            {dimensions.width} × {dimensions.height} px
          </p>
          <Button 
            variant="outline"
            onClick={() => setIsEditing(true)}
            size="sm"
          >
            Change
          </Button>
        </div>
      )}
    </div>
  );
}

export default CanvasSizePanel;