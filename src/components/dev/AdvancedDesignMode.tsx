'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdvancedDraggable } from './AdvancedDraggable';

interface ElementStyle {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

interface AllStyles {
  [key: string]: ElementStyle;
}

const STORAGE_KEY = 'anitya-design-mode-styles';

export function AdvancedDesignMode({ children }: { children: React.ReactNode }) {
  const [designMode, setDesignMode] = useState(false);
  const [styles, setStyles] = useState<AllStyles>({});
  const [showCode, setShowCode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStyles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load styles:', e);
      }
    }
  }, []);

  // Save to localStorage when styles change
  useEffect(() => {
    if (Object.keys(styles).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));
    }
  }, [styles]);

  // Keyboard shortcut: Ctrl+Shift+D
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

  const handleStyleChange = (id: string, style: ElementStyle) => {
    setStyles(prev => ({
      ...prev,
      [id]: style,
    }));
  };

  const resetAllStyles = () => {
    setStyles({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const generateCSS = () => {
    return Object.entries(styles)
      .map(([id, style]) => {
        return `.${id} {
  transform: translate(${style.x}px, ${style.y}px) scale(${style.scale}) rotate(${style.rotation}deg);
  opacity: ${style.opacity};
  z-index: ${style.zIndex};
}`;
      })
      .join('\n\n');
  };

  const generateTailwind = () => {
    return Object.entries(styles)
      .map(([id, style]) => {
        const classes = [];
        if (style.opacity < 1) classes.push(`opacity-${Math.round(style.opacity * 100)}`);
        if (style.zIndex !== 1) classes.push(`z-[${style.zIndex}]`);
        if (style.rotation !== 0) classes.push(`rotate-[${style.rotation}deg]`);
        if (style.scale !== 1) classes.push(`scale-[${style.scale}]`);

        return `${id}:
  style={{ transform: 'translate(${style.x}px, ${style.y}px)' }}
  className="${classes.join(' ')}"`;
      })
      .join('\n\n');
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(styles, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'design-styles.json');
    link.click();
  };

  if (!designMode) {
    return (
      <>
        {children}
        <button
          onClick={() => setDesignMode(true)}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2 transition-all hover:scale-105"
          title="Press Ctrl+Shift+D"
        >
          🎨 Design Mode
        </button>
      </>
    );
  }

  return (
    <>
      {children}

      {/* Control Panel */}
      <div className="fixed top-4 right-4 z-[999] bg-white rounded-xl shadow-2xl p-5 max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b-2">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            🎨 Advanced Design Mode
          </h3>
          <button
            onClick={() => setDesignMode(false)}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-blue-900 font-medium">
            ✨ <strong>Özellikler:</strong>
          </p>
          <ul className="text-xs text-blue-800 mt-2 space-y-1">
            <li>• Sürükle-bırak ile taşı</li>
            <li>• Her öğeye tıkla → Kontroller açılır</li>
            <li>• Boyutlandır, döndür, şeffaflık ayarla</li>
            <li>• Değişiklikler otomatik kaydedilir</li>
          </ul>
        </div>

        <div className="space-y-3">
          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">
              📊 <strong>{Object.keys(styles).length}</strong> öğe düzenlendi
            </p>
          </div>

          {/* Actions */}
          <button
            onClick={resetAllStyles}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            ↺ Tüm Değişiklikleri Sıfırla
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            {showCode ? '🔽 Kodu Gizle' : '📋 CSS Kodunu Göster'}
          </button>

          {showCode && (
            <div className="space-y-2">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-3 py-2 flex items-center justify-between">
                  <span className="text-green-400 text-xs font-mono">CSS</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateCSS());
                      alert('CSS kopyalandı!');
                    }}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                  >
                    Kopyala
                  </button>
                </div>
                <pre className="text-green-400 p-3 text-xs overflow-auto max-h-40">
                  {generateCSS() || '// Henüz stil yok'}
                </pre>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-3 py-2 flex items-center justify-between">
                  <span className="text-blue-400 text-xs font-mono">React/Tailwind</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateTailwind());
                      alert('React kodu kopyalandı!');
                    }}
                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                  >
                    Kopyala
                  </button>
                </div>
                <pre className="text-blue-400 p-3 text-xs overflow-auto max-h-40">
                  {generateTailwind() || '// Henüz stil yok'}
                </pre>
              </div>
            </div>
          )}

          <button
            onClick={exportAsJSON}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            💾 JSON Olarak İndir
          </button>
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-gray-500">
          <strong>Kısayol:</strong> Ctrl+Shift+D
        </div>
      </div>
    </>
  );
}

// Export wrapper component
export function Draggable({
  id,
  children,
  enabled = true,
  initialStyle,
}: {
  id: string;
  children: React.ReactNode;
  enabled?: boolean;
  initialStyle?: any;
}) {
  const [styles, setStyles] = useState<AllStyles>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStyles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load styles:', e);
      }
    }
  }, []);

  const handleStyleChange = useCallback((id: string, style: ElementStyle) => {
    setStyles(prev => {
      const updated = { ...prev, [id]: style };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AdvancedDraggable
      id={id}
      enabled={enabled}
      onStyleChange={handleStyleChange}
      initialStyle={styles[id] || initialStyle}
    >
      {children}
    </AdvancedDraggable>
  );
}
