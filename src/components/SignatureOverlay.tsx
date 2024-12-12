import React, { useRef, useCallback } from "react";
import Draggable from "react-draggable";
import { useSignatureState } from "../hooks/useSignatureState";
import { useResizable } from "../hooks/useResizable";
import ResizeHandles from "./ResizeHandles";

interface SignatureOverlayProps {
  signatureUrl: string;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

const SignatureOverlay: React.FC<SignatureOverlayProps> = ({
  signatureUrl,
  onPositionChange,
  onSizeChange,
}) => {
  const nodeRef = useRef(null);
  const { position, isEditing, handleDragStop, handleEditingState } =
    useSignatureState(onPositionChange);
  const { size, startResize } = useResizable({
    initialWidth: 200,
    initialHeight: 100,
    onSizeChange,
  });

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      handleEditingState(true);
    },
    [handleEditingState],
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
    },
    [handleEditingState],
  );
  console.log(position);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStop={handleDragStop}
      onStart={() => handleEditingState(true)}
      disabled={!isEditing}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        style={{
          position: "absolute",
          width: size.width,
          height: size.height,
          cursor: isEditing ? "move" : "default",
          zIndex: 10,
        }}
        className={`group ${isEditing ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
        onContextMenu={handleContextMenu}
        onMouseLeave={() => handleEditingState(false)}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={signatureUrl}
          alt="Signature"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          draggable={false}
        />

        {isEditing && <ResizeHandles onStartResize={startResize} />}
      </div>
    </Draggable>
  );
};

export default SignatureOverlay;
