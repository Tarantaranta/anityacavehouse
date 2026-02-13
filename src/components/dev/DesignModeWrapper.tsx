'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { DraggableElement } from './DraggableElement';

interface Position {
  x: number;
  y: number;
}

interface Positions {
  [key: string]: Position;
}

export function DesignModeWrapper({ children }: { children: React.ReactNode }) {
  const [designMode, setDesignMode] = useState(false);
  const [positions, setPositions] = useState<Positions>({});
  const [showCode, setShowCode] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+D to toggle design mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setDesignMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    setPositions(prev => ({
      ...prev,
      [id]: {
        x: (prev[id]?.x || 0) + delta.x,
        y: (prev[id]?.y || 0) + delta.y,
      },
    }));
  };

  const resetPositions = () => {
    setPositions({});
  };

  const generateCode = () => {
    const code = Object.entries(positions)
      .map(([id, pos]) => {
        return `${id}: { transform: 'translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px)' }`;
      })
      .join('\n');

    return code || 'No positions set';
  };

  if (!designMode) {
    return (
      <>
        {children}
        <button
          onClick={() => setDesignMode(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
          title="Press Ctrl+Shift+D"
        >
          🎨 Design Mode
        </button>
      </>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {children}

      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">🎨 Design Mode Active</h3>
          <button
            onClick={() => setDesignMode(false)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-gray-600 mb-3">
          Sürükle-bırak ile öğeleri hareket ettirin. Her öğe mavi kenarlıklı gösterilir.
        </p>

        <div className="space-y-2">
          <button
            onClick={resetPositions}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
          >
            ↺ Reset Positions
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
          >
            {showCode ? '🔽 Hide Code' : '📋 Show CSS Code'}
          </button>

          {showCode && (
            <div className="mt-2">
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-auto max-h-40">
                {generateCode()}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateCode());
                  alert('Code copied to clipboard!');
                }}
                className="w-full mt-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs"
              >
                📋 Copy Code
              </button>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-500">
          <strong>Shortcut:</strong> Ctrl+Shift+D
        </div>
      </div>
    </DndContext>
  );
}

// Wrapper for draggable elements
export function Draggable({
  id,
  children,
  enabled = true,
}: {
  id: string;
  children: React.ReactNode;
  enabled?: boolean;
}) {
  return (
    <DraggableElement id={id} enabled={enabled}>
      {children}
    </DraggableElement>
  );
}
