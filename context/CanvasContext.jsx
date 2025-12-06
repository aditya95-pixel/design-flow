import { createContext, useContext } from 'react';
export const CanvasContext = createContext({
  canvasEditor: null,
  setCanvasEditor: () => {},
  undoStack: [],
  redoStack: [],
  setUndoStack: () => {},
  setRedoStack: () => {},
  handleUndo: () => {},
  handleRedo: () => {},
});
