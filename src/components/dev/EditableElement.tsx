'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useEditor, type ElementData } from './VisualEditor';
import { StylePanel } from './StylePanel';

interface EditableElementProps {
  id: string;
  children: React.ReactNode;
  type?: 'text' | 'element' | 'container';
  editableText?: boolean;
  initialData?: ElementData;
}

export function EditableElement({
  id,
  children,
  type = 'element',
  editableText = false,
  initialData,
}: EditableElementProps) {
  const editor = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  // Initialize with saved data or defaults
  const elementData = editor.elements[id];
  const isSelected = editor.selectedElement === id;

  // Merge saved styles with defaults
  const defaultStyle = {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
    display: 'inline-block',
  };

  const style = elementData?.style
    ? { ...defaultStyle, ...elementData.style }
    : defaultStyle;

  // Handle element click (only in editor mode)
  const handleClick = (e: React.MouseEvent) => {
    if (!editor.editorMode) return;
    e.stopPropagation();
    if (isEditing) return;
    editor.setSelectedElement(id);
  };

  // Handle dragging (only in editor mode)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editor.editorMode) return;
    if (isEditing) return;
    if ((e.target as HTMLElement).closest('.style-panel')) return;
    if ((e.target as HTMLElement).closest('.delete-button')) return;

    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - (style.x || 0),
      y: e.clientY - (style.y || 0),
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;

      editor.updateElement(id, {
        style: {
          ...style,
          x: newX,
          y: newY,
        },
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, id, style, editor]);

  // Handle text editing
  const handleDoubleClick = () => {
    if (editableText || type === 'text') {
      setIsEditing(true);
    }
  };

  const handleTextChange = (newContent: string) => {
    editor.updateElement(id, { content: newContent });
  };

  // Handle delete
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    editor.deleteElement(id);
  };

  // Build style object - Apply transform directly for immediate visual feedback
  // CSS injection provides persistence, but inline styles ensure immediate updates
  const appliedStyle: React.CSSProperties = {
    position: 'relative',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'all 0.1s ease',
    transform: `translate(${style.x || 0}px, ${style.y || 0}px) scale(${style.scale || 1}) rotate(${style.rotation || 0}deg)`,
    opacity: style.opacity !== undefined ? style.opacity : 1,
    zIndex: style.zIndex || 1,
    // Ensure element can be transformed (inline elements can't be)
    display: style.display || 'inline-block',
  };

  // DEBUG: Log style when dragging
  if (isDragging) {
    console.log(`🔍 ${id} - Dragging:`, {
      x: style.x,
      y: style.y,
      transform: appliedStyle.transform,
    });
  }

  // Force apply transform with !important using DOM API
  // This overrides any Tailwind classes like mx-auto, max-w-*, etc.
  useLayoutEffect(() => {
    if (elementRef.current) {
      const el = elementRef.current;
      // Apply styles with !important to override Tailwind
      el.style.setProperty('transform', appliedStyle.transform || 'none', 'important');
      el.style.setProperty('opacity', String(appliedStyle.opacity ?? 1), 'important');
      el.style.setProperty('z-index', String(appliedStyle.zIndex ?? 1), 'important');
      el.style.setProperty('display', appliedStyle.display || 'inline-block', 'important');
      el.style.setProperty('cursor', appliedStyle.cursor || 'default', 'important');
      el.style.setProperty('transition', appliedStyle.transition || 'none', 'important');
      el.style.setProperty('position', 'relative', 'important');
    }
  }, [appliedStyle]);

  // Only show editor UI when editor mode is active
  const showEditorUI = editor.editorMode;

  const borderStyle = showEditorUI && isSelected
    ? 'ring-4 ring-purple-500 ring-opacity-80'
    : showEditorUI
    ? 'ring-2 ring-blue-400 ring-opacity-30 hover:ring-opacity-70'
    : '';

  return (
    <>
      <div
        ref={elementRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        style={appliedStyle}
        className={`editable-element editable-${id} ${borderStyle}`}
      >
        {/* Element Info Badge - Only in editor mode */}
        {showEditorUI && (
          <div className="absolute -top-8 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-[10000] flex items-center gap-2">
            <span>{id}</span>
            {(style.x !== 0 || style.y !== 0) && (
              <span className="opacity-75">
                x:{Math.round(style.x || 0)} y:{Math.round(style.y || 0)}
              </span>
            )}
          </div>
        )}

        {/* Delete Button - Only in editor mode */}
        {showEditorUI && isSelected && (
          <button
            onClick={handleDelete}
            className="delete-button absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold z-[10001] shadow-lg transition-colors"
            title="Delete (or press Delete key)"
          >
            ✕
          </button>
        )}

        {showEditorUI && isEditing && (editableText || type === 'text') ? (
          <input
            type="text"
            defaultValue={elementData?.content || ''}
            onBlur={(e) => {
              handleTextChange(e.target.value);
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTextChange(e.currentTarget.value);
                setIsEditing(false);
              }
              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
            autoFocus
            className="w-full bg-white/90 border-2 border-purple-500 rounded px-2 py-1"
          />
        ) : (
          children
        )}
      </div>

      {/* Style Panel - Only in editor mode */}
      {showEditorUI && isSelected && <StylePanel elementId={id} elementData={elementData} type={type} />}
    </>
  );
}
