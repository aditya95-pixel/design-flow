import { useContext } from "react";
import { CanvasContext } from "./CanvasContext";

export const useCanvasHook = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasHook must be used within a CanvasContext.Provider");
  }
  return context;
};
