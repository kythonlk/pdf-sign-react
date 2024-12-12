import { useState, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export const useSignatureState = (
  onPositionChange: (position: Position) => void,
) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(true);

  const handleDragStop = useCallback(
    (data: Position) => {
      const newPosition = { x: data.x, y: data.y };
      setPosition(newPosition);
      onPositionChange(newPosition);
    },
    [onPositionChange],
  );

  const handleEditingState = useCallback((state: boolean) => {
    setIsEditing(state);
  }, []);

  return {
    position,
    isEditing,
    handleDragStop,
    handleEditingState,
  };
};

