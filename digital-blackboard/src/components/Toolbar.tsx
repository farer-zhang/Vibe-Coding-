import React from 'react';
import { DrawingTool } from '../types/Drawing';

interface ToolbarProps {
  currentTool: DrawingTool;
  currentColor: string;
  currentWidth: number;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onWidthChange: (width: number) => void;
  onClear: () => void;
  onUndo: () => void;
  onExport: () => void;
}

const colors = [
  '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
  '#ff00ff', '#00ffff', '#ffa500', '#800080', '#008000'
];

const widths = [1, 3, 5, 8, 12, 20];

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  currentColor,
  currentWidth,
  onToolChange,
  onColorChange,
  onWidthChange,
  onClear,
  onUndo,
  onExport,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '15px',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    }}>
      {/* 工具选择 */}
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>工具</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['pen', 'highlighter', 'eraser'] as DrawingTool[]).map(tool => (
            <button
              key={tool}
              onClick={() => onToolChange(tool)}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '5px',
                background: currentTool === tool ? '#4a90e2' : '#333',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {tool === 'pen' ? '✏️ 画笔' : 
               tool === 'highlighter' ? '🖍️ 荧光笔' : '🧽 橡皮'}
            </button>
          ))}
        </div>
      </div>

      {/* 颜色选择 */}
      {currentTool !== 'eraser' && (
        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>颜色</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
            {colors.map(color => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                style={{
                  width: '25px',
                  height: '25px',
                  border: currentColor === color ? '2px solid #4a90e2' : '1px solid #555',
                  borderRadius: '3px',
                  background: color,
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* 粗细选择 */}
      <div>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#ccc' }}>粗细</div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {widths.map(width => (
            <button
              key={width}
              onClick={() => onWidthChange(width)}
              style={{
                padding: '5px 8px',
                border: 'none',
                borderRadius: '3px',
                background: currentWidth === width ? '#4a90e2' : '#333',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              {width}px
            </button>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={onUndo}
          style={{
            padding: '8px 12px',
            border: 'none',
            borderRadius: '5px',
            background: '#666',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          ↶ 撤销
        </button>
        <button
          onClick={onClear}
          style={{
            padding: '8px 12px',
            border: 'none',
            borderRadius: '5px',
            background: '#d32f2f',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          🗑️ 清空
        </button>
        <button
          onClick={onExport}
          style={{
            padding: '8px 12px',
            border: 'none',
            borderRadius: '5px',
            background: '#2e7d32',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          💾 导出
        </button>
      </div>
    </div>
  );
};