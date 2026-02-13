'use client';

import { useState, useRef, useEffect } from 'react';

interface ElementStyle {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

interface AdvancedDraggableProps {
  id: string;
  children: React.ReactNode;
  enabled?: boolean;
  onStyleChange?: (id: string, style: ElementStyle) => void;
  initialStyle?: Partial<ElementStyle>;
}

export function AdvancedDraggable({
  id,
  children,
  enabled = true,
  onStyleChange,
  initialStyle = {},
}: AdvancedDraggableProps) {
  const [style, setStyle] = useState<ElementStyle>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
    ...initialStyle,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [controlsPosition, setControlsPosition] = useState({ x: 100, y: 100 });
  const [isDraggingControls, setIsDraggingControls] = useState(false);

  const dragStartPos = useRef({ x: 0, y: 0 });
  const controlsDragStart = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onStyleChange && !isDragging && !isDraggingControls) {
      onStyleChange(id, style);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style.x, style.y, style.scale, style.rotation, style.opacity, style.zIndex]);

  // Element dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enabled) return;
    if ((e.target as HTMLElement).closest('.control-panel')) return;

    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - style.x,
      y: e.clientY - style.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      setStyle(prev => ({ ...prev, x: newX, y: newY }));
    }

    if (isDraggingControls) {
      const newX = e.clientX - controlsDragStart.current.x;
      const newY = e.clientY - controlsDragStart.current.y;
      setControlsPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingControls(false);
  };

  useEffect(() => {
    if (isDragging || isDraggingControls) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, isDraggingControls]);

  // Controls dragging
  const handleControlsMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.control-content')) return;

    e.stopPropagation();
    setIsDraggingControls(true);
    controlsDragStart.current = {
      x: e.clientX - controlsPosition.x,
      y: e.clientY - controlsPosition.y,
    };
  };

  const updateStyle = (key: keyof ElementStyle, value: number) => {
    setStyle(prev => ({ ...prev, [key]: value }));
  };

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        ref={elementRef}
        onMouseDown={handleMouseDown}
        onClick={() => setShowControls(!showControls)}
        style={{
          position: 'relative',
          transform: `translate(${style.x}px, ${style.y}px) scale(${style.scale}) rotate(${style.rotation}deg)`,
          opacity: style.opacity,
          zIndex: style.zIndex,
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'none' : 'opacity 0.1s ease',
        }}
        className={`
          ${enabled ? 'ring-2 ring-blue-400 ring-opacity-50 hover:ring-opacity-100' : ''}
          ${isDragging ? 'ring-blue-500 ring-opacity-100' : ''}
        `}
      >
        {children}

        {/* Element Info Badge */}
        {enabled && (
          <div className="absolute -top-8 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-50">
            {id} | x:{Math.round(style.x)} y:{Math.round(style.y)}
          </div>
        )}
      </div>

      {/* Control Panel - Draggable, no backdrop */}
      {enabled && showControls && (
        <div
          className="fixed bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 z-[9999] min-w-[320px] control-panel"
          style={{
            left: `${controlsPosition.x}px`,
            top: `${controlsPosition.y}px`,
            cursor: isDraggingControls ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleControlsMouseDown}
        >
          {/* Draggable Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-gray-300 cursor-grab active:cursor-grabbing">
            <h4 className="font-bold text-gray-800 text-sm select-none">🎛️ {id}</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowControls(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold transition-colors control-content"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 control-content">
            {/* Scale */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📏 Boyut: <span className="text-blue-600 text-sm">{style.scale.toFixed(2)}x</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={style.scale}
                onChange={(e) => updateStyle('scale', parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Rotation */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🔄 Döndür: <span className="text-purple-600 text-sm">{style.rotation}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={style.rotation}
                onChange={(e) => updateStyle('rotation', parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Opacity */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                👁️ Şeffaflık: <span className="text-green-600 text-sm">{Math.round(style.opacity * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={style.opacity}
                onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
                className="w-full h-2 bg-green-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Z-Index */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📚 Katman: <span className="text-orange-600 text-sm">{style.zIndex}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={style.zIndex}
                onChange={(e) => updateStyle('zIndex', parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-300 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStyle({ x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, zIndex: 1 });
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-sm px-3 py-2 rounded-lg font-semibold transition-all"
            >
              ↺ Sıfırla
            </button>
          </div>

          {/* Drag hint */}
          <div className="text-xs text-gray-500 text-center mt-2 select-none">
            💡 Başlığı tutup sürükle
          </div>
        </div>
      )}
    </>
  );
}
