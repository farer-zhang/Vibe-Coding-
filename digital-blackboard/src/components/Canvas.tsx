import React, { useEffect, useRef } from 'react';
import { DrawingState, Point } from '../types/Drawing';

interface CanvasProps {
  drawingState: DrawingState;
  onStartDrawing: (point: Point) => void;
  onContinueDrawing: (point: Point) => void;
  onEndDrawing: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Canvas: React.FC<CanvasProps> = ({
  drawingState,
  onStartDrawing,
  onContinueDrawing,
  onEndDrawing,
  canvasRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取鼠标/触摸位置
  const getPointFromEvent = (event: MouseEvent | TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0]?.clientX || 0 : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY || 0 : event.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // 绘制路径
  const drawPath = (ctx: CanvasRenderingContext2D, path: any) => {
    if (path.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);

    // 使用二次贝塞尔曲线平滑线条
    for (let i = 1; i < path.points.length - 1; i++) {
      const currentPoint = path.points[i];
      const nextPoint = path.points[i + 1];
      const controlX = (currentPoint.x + nextPoint.x) / 2;
      const controlY = (currentPoint.y + nextPoint.y) / 2;
      ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, controlX, controlY);
    }

    // 绘制最后一个点
    if (path.points.length > 1) {
      const lastPoint = path.points[path.points.length - 1];
      ctx.lineTo(lastPoint.x, lastPoint.y);
    }

    // 设置样式
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 根据工具类型设置混合模式
    if (path.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else if (path.tool === 'highlighter') {
      ctx.globalAlpha = 0.3;
      ctx.globalCompositeOperation = 'source-over';
    } else {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  // 重绘画布
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制所有路径
    drawingState.paths.forEach(path => drawPath(ctx, path));

    // 绘制当前路径
    if (drawingState.currentPath) {
      drawPath(ctx, drawingState.currentPath);
    }
  };

  // 处理鼠标事件
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      const point = getPointFromEvent(event);
      onStartDrawing(point);
    };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (drawingState.isDrawing) {
        const point = getPointFromEvent(event);
        onContinueDrawing(point);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      onEndDrawing();
    };

    // 触摸事件
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const point = getPointFromEvent(event);
      onStartDrawing(point);
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (drawingState.isDrawing) {
        const point = getPointFromEvent(event);
        onContinueDrawing(point);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      onEndDrawing();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [drawingState.isDrawing, onStartDrawing, onContinueDrawing, onEndDrawing]);

  // 重绘画布
  useEffect(() => {
    redrawCanvas();
  }, [drawingState.paths, drawingState.currentPath]);

  // 调整画布大小
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      redrawCanvas();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          cursor: drawingState.tool === 'eraser' ? 'crosshair' : 'crosshair',
          touchAction: 'none',
        }}
      />
    </div>
  );
};