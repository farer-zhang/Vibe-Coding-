import { useState, useRef, useCallback } from 'react';
import { DrawingState, DrawingPath, Point, DrawingTool } from '../types/Drawing';

export const useDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>({
    paths: [],
    currentPath: null,
    tool: 'pen',
    color: '#ffffff',
    width: 3,
    isDrawing: false,
  });

  const startDrawing = useCallback((point: Point) => {
    const newPath: DrawingPath = {
      points: [point],
      color: drawingState.color,
      width: drawingState.width,
      tool: drawingState.tool,
    };

    setDrawingState(prev => ({
      ...prev,
      currentPath: newPath,
      isDrawing: true,
    }));
  }, [drawingState.color, drawingState.width, drawingState.tool]);

  const continueDrawing = useCallback((point: Point) => {
    if (!drawingState.isDrawing || !drawingState.currentPath) return;

    setDrawingState(prev => ({
      ...prev,
      currentPath: prev.currentPath ? {
        ...prev.currentPath,
        points: [...prev.currentPath.points, point],
      } : null,
    }));
  }, [drawingState.isDrawing, drawingState.currentPath]);

  const endDrawing = useCallback(() => {
    if (!drawingState.currentPath) return;

    setDrawingState(prev => ({
      ...prev,
      paths: [...prev.paths, prev.currentPath!],
      currentPath: null,
      isDrawing: false,
    }));
  }, [drawingState.currentPath]);

  const setTool = useCallback((tool: DrawingTool) => {
    setDrawingState(prev => ({ ...prev, tool }));
  }, []);

  const setColor = useCallback((color: string) => {
    setDrawingState(prev => ({ ...prev, color }));
  }, []);

  const setWidth = useCallback((width: number) => {
    setDrawingState(prev => ({ ...prev, width }));
  }, []);

  const clearCanvas = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: [],
      currentPath: null,
    }));
  }, []);

  const undo = useCallback(() => {
    setDrawingState(prev => ({
      ...prev,
      paths: prev.paths.slice(0, -1),
    }));
  }, []);

  return {
    canvasRef,
    drawingState,
    startDrawing,
    continueDrawing,
    endDrawing,
    setTool,
    setColor,
    setWidth,
    clearCanvas,
    undo,
  };
};