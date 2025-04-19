import React, { useState } from 'react';
import { useCanvasHook } from '../../app/(routes)/design/[designId]/page';

function AITextGenerator() {
  const { canvasEditor,setCanvasEditor,setUndoStack,setRedoStack } = useCanvasHook();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setResponse('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/gemini?prompt=${encodeURIComponent(prompt)}`);
      const data = await res.json();

      if (data.response) {
        setResponse(data.response);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCanvas = () => {
    if(!canvasEditor) return;
      setUndoStack(prev => [...prev, canvasEditor.toJSON()]);
      // Clear redo stack when a new action is performed
      setRedoStack([]);
    const textRef = new fabric.Textbox(response, {
      left: 100,
      top: 100,
      fill: 'black',
      fontSize: 24,
      fontFamily: 'Arial',
      width: 300,
    });
    canvasEditor.add(textRef);
    canvasEditor.renderAll();
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-4">
      <h3 className="font-semibold text-lg">✨ AI Text Generator</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border rounded-lg"
        placeholder="e.g. Write a motivational quote"
        rows={3}
      />
      <button
        onClick={handleGenerate}
        className="bg-black text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {response && (
        <div className="border p-3 rounded-lg bg-gray-50 space-y-2">
          <p className="text-sm whitespace-pre-wrap">{response}</p>
          <button
            onClick={handleAddToCanvas}
            className="bg-black text-white px-4 py-1 rounded text-sm"
          >
            ➕ Add to Canvas
          </button>
        </div>
      )}

      {error && (
        <div className="border p-3 rounded-lg bg-red-50">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}

export default AITextGenerator;