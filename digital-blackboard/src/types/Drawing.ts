export interface Point {
  x: number;
  y: number;
}

export interface DrawingPath {
  points: Point[];
  color: string;
  width: number;
  tool: DrawingTool;
}

export type DrawingTool = 'pen' | 'eraser' | 'highlighter';

export interface DrawingState {
  paths: DrawingPath[];
  currentPath: DrawingPath | null;
  tool: DrawingTool;
  color: string;
  width: number;
  isDrawing: boolean;
}