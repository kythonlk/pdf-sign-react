import { useState, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

interface UseResizableProps {
  initialWidth: number;
  initialHeight: number;
  minWidth?: number;
  minHeight?: number;
  onSizeChange?: (size: Size) => void;
}

export const useResizable = ({
  initialWidth,
  initialHeight,
  minWidth = 100,
  minHeight = 50,
  onSizeChange,
}: UseResizableProps) => {
  const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<'both' | 'right' | 'bottom'>('both');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState<Size>({ width: 0, height: 0 });

  const startResize = (e: React.MouseEvent, direction: 'both' | 'right' | 'bottom' = 'both') => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ ...size });
  };

  const onResize = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setSize((prevSize) => {
      const newSize = {
        width: resizeDirection !== 'bottom' 
          ? Math.max(startSize.width + deltaX, minWidth)
          : prevSize.width,
        height: resizeDirection !== 'right'
          ? Math.max(startSize.height + deltaY, minHeight)
          : prevSize.height
      };
      
      onSizeChange?.(newSize);
      return newSize;
    });
  };

  const stopResize = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', onResize);
      window.addEventListener('mouseup', stopResize);
    }

    return () => {
      window.removeEventListener('mousemove', onResize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, startPos, startSize]);

  return { size, startResize, onResize };
};