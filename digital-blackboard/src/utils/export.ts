export const exportCanvasAsImage = (canvas: HTMLCanvasElement, filename: string = 'blackboard') => {
  // 创建一个新的canvas用于导出，背景为白色
  const exportCanvas = document.createElement('canvas');
  const exportCtx = exportCanvas.getContext('2d');
  
  if (!exportCtx) return;

  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;

  // 设置白色背景
  exportCtx.fillStyle = '#ffffff';
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

  // 将原canvas内容绘制到导出canvas上
  exportCtx.drawImage(canvas, 0, 0);

  // 创建下载链接
  exportCanvas.toBlob((blob) => {
    if (!blob) return;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }, 'image/png');
};