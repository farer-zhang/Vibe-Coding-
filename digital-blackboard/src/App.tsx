import React from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { useDrawing } from './hooks/useDrawing';
import { exportCanvasAsImage } from './utils/export';

function App() {
  const {
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
  } = useDrawing();

  const handleExport = () => {
    if (canvasRef.current) {
      exportCanvasAsImage(canvasRef.current, 'digital-blackboard');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        drawingState={drawingState}
        onStartDrawing={startDrawing}
        onContinueDrawing={continueDrawing}
        onEndDrawing={endDrawing}
        canvasRef={canvasRef}
      />
      
      <Toolbar
        currentTool={drawingState.tool}
        currentColor={drawingState.color}
        currentWidth={drawingState.width}
        onToolChange={setTool}
        onColorChange={setColor}
        onWidthChange={setWidth}
        onClear={clearCanvas}
        onUndo={undo}
        onExport={handleExport}
      />

      {/* 标题 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px 20px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
      }}>
        <h1 style={{ 
          fontSize: '18px', 
          color: '#fff', 
          margin: 0,
          fontWeight: 'normal'
        }}>
          📝 数字黑板
        </h1>
      </div>

      {/* 使用说明 */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px 15px',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        fontSize: '12px',
        color: '#ccc',
        maxWidth: '200px',
      }}>
        <div>💡 使用提示：</div>
        <div>• 选择工具和颜色开始绘画</div>
        <div>• 支持鼠标和触摸操作</div>
        <div>• 点击导出保存为图片</div>
      </div>
    </div>
  );
}

export default App;