'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface DraggableElementProps {
  id: string;
  children: React.ReactNode;
  onPositionChange?: (x: number, y: number) => void;
  enabled?: boolean;
}

export function DraggableElement({
  id,
  children,
  onPositionChange,
  enabled = true
}: DraggableElementProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: !enabled,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString({
          x: position.x + transform.x,
          y: position.y + transform.y,
          scaleX: 1,
          scaleY: 1,
        }),
      }
    : {
        transform: CSS.Translate.toString({
          x: position.x,
          y: position.y,
          scaleX: 1,
          scaleY: 1,
        }),
      };

  // Save position when drag ends
  const handleDragEnd = () => {
    if (transform) {
      const newX = position.x + transform.x;
      const newY = position.y + transform.y;
      setPosition({ x: newX, y: newY });
      onPositionChange?.(newX, newY);
    }
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      className={`
        relative
        ${isDragging ? 'z-50 cursor-grabbing opacity-80' : 'cursor-grab'}
        ${enabled ? 'ring-2 ring-blue-400 ring-opacity-50 hover:ring-opacity-100' : ''}
      `}
    >
      {children}
      {enabled && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl">
          {id} (x: {Math.round(position.x + (transform?.x || 0))}, y: {Math.round(position.y + (transform?.y || 0))})
        </div>
      )}
    </div>
  );
}
