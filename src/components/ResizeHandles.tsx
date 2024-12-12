import React from "react";

interface ResizeHandlesProps {
  onStartResize: (
    e: React.MouseEvent,
    direction?: "both" | "right" | "bottom",
  ) => void;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onStartResize }) => {
  return (
    <>
      <div
        className="absolute right-0 bottom-0 w-4 h-4 bg-blue-500 cursor-se-resize rounded-sm"
        onMouseDown={(e) => onStartResize(e, "both")}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 cursor-e-resize rounded-sm"
        onMouseDown={(e) => onStartResize(e, "right")}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 cursor-s-resize rounded-sm"
        onMouseDown={(e) => onStartResize(e, "bottom")}
      />
    </>
  );
};

export default ResizeHandles;

