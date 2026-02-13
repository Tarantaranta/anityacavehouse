'use client';

import { useState, useRef, useEffect } from 'react';
import { useEditor, type ElementData, type ElementStyle } from './VisualEditor';

interface StylePanelProps {
  elementId: string;
  elementData?: ElementData;
  type?: 'text' | 'element' | 'container';
}

export function StylePanel({ elementId, elementData, type = 'element' }: StylePanelProps) {
  const editor = useEditor();
  const [position, setPosition] = useState({ x: 100, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'transform' | 'typography' | 'spacing' | 'layout'>('transform');
  const dragStart = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const style = elementData?.style || {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    zIndex: 1,
  };

  // Panel dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.panel-content')) return;

    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
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
  }, [isDragging]);

  const updateStyle = (updates: Partial<ElementStyle>) => {
    editor.updateElement(elementId, {
      style: {
        ...style,
        ...updates,
      },
    });
  };

  const tabs = [
    { id: 'transform' as const, label: '🔄 Transform', icon: '🔄' },
    { id: 'typography' as const, label: '✍️ Typography', icon: '✍️' },
    { id: 'spacing' as const, label: '📐 Spacing', icon: '📐' },
    { id: 'layout' as const, label: '📦 Layout', icon: '📦' },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed bg-white/95 backdrop-blur-md rounded-xl shadow-2xl z-[10000] min-w-[360px] max-w-[400px] style-panel"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'auto',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-t-xl cursor-grab active:cursor-grabbing select-none">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm">🎨 Style Editor</h4>
            <p className="text-xs opacity-90">{elementId}</p>
          </div>
          <button
            onClick={() => editor.setSelectedElement(null)}
            className="bg-white/20 hover:bg-white/30 rounded-full w-7 h-7 flex items-center justify-center font-bold transition-colors panel-content"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 panel-content">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 max-h-[70vh] overflow-y-auto panel-content">
        {/* Transform Tab */}
        {activeTab === 'transform' && (
          <div className="space-y-3">
            {/* Position X */}
            <div className="bg-blue-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ↔️ Position X: <span className="text-blue-600">{Math.round(style.x || 0)}px</span>
              </label>
              <input
                type="range"
                min="-500"
                max="500"
                step="1"
                value={style.x || 0}
                onChange={(e) => updateStyle({ x: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Position Y */}
            <div className="bg-blue-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ↕️ Position Y: <span className="text-blue-600">{Math.round(style.y || 0)}px</span>
              </label>
              <input
                type="range"
                min="-500"
                max="500"
                step="1"
                value={style.y || 0}
                onChange={(e) => updateStyle({ y: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Scale */}
            <div className="bg-green-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📏 Scale: <span className="text-green-600">{(style.scale || 1).toFixed(2)}x</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={style.scale || 1}
                onChange={(e) => updateStyle({ scale: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Rotation */}
            <div className="bg-purple-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🔄 Rotation: <span className="text-purple-600">{style.rotation || 0}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={style.rotation || 0}
                onChange={(e) => updateStyle({ rotation: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="bg-pink-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                👁️ Opacity: <span className="text-pink-600">{Math.round((style.opacity || 1) * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={style.opacity || 1}
                onChange={(e) => updateStyle({ opacity: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Z-Index */}
            <div className="bg-orange-50 rounded-lg p-3">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📚 Z-Index: <span className="text-orange-600">{style.zIndex || 1}</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={style.zIndex || 1}
                onChange={(e) => updateStyle({ zIndex: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-3">
            {/* Font Size */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📏 Font Size
              </label>
              <input
                type="text"
                value={style.fontSize || ''}
                onChange={(e) => updateStyle({ fontSize: e.target.value })}
                placeholder="e.g., 16px, 1.5rem, 2em"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Font Weight */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                💪 Font Weight
              </label>
              <select
                value={style.fontWeight || ''}
                onChange={(e) => updateStyle({ fontWeight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Default</option>
                <option value="100">Thin (100)</option>
                <option value="200">Extra Light (200)</option>
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semi Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>

            {/* Font Family */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🔤 Font Family
              </label>
              <select
                value={style.fontFamily || ''}
                onChange={(e) => updateStyle({ fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                style={{ fontFamily: style.fontFamily || 'inherit' }}
              >
                <option value="">Default</option>
                <optgroup label="✍️ Handwritten & Script">
                  <option value="'Dancing Script', cursive" style={{fontFamily: 'Dancing Script, cursive'}}>Dancing Script (Flowing)</option>
                  <option value="'Parisienne', cursive" style={{fontFamily: 'Parisienne, cursive'}}>Parisienne (Elegant Script)</option>
                  <option value="'Great Vibes', cursive" style={{fontFamily: 'Great Vibes, cursive'}}>Great Vibes (Luxury Script)</option>
                  <option value="'Allura', cursive" style={{fontFamily: 'Allura, cursive'}}>Allura (Calligraphy)</option>
                  <option value="'Satisfy', cursive" style={{fontFamily: 'Satisfy, cursive'}}>Satisfy (Casual Script)</option>
                  <option value="'Alex Brush', cursive" style={{fontFamily: 'Alex Brush, cursive'}}>Alex Brush (Wedding)</option>
                </optgroup>
                <optgroup label="✨ Ultra Luxury Serif">
                  <option value="'Playfair Display', serif" style={{fontFamily: 'Playfair Display, serif'}}>Playfair Display (Elegant)</option>
                  <option value="'Cormorant Garamond', serif" style={{fontFamily: 'Cormorant Garamond, serif'}}>Cormorant Garamond (Luxury)</option>
                  <option value="'Bodoni Moda', serif" style={{fontFamily: 'Bodoni Moda, serif'}}>Bodoni Moda (High Fashion)</option>
                  <option value="'Cinzel', serif" style={{fontFamily: 'Cinzel, serif'}}>Cinzel (Roman Luxury)</option>
                  <option value="'Libre Baskerville', serif" style={{fontFamily: 'Libre Baskerville, serif'}}>Libre Baskerville (Classic)</option>
                  <option value="'Crimson Text', serif" style={{fontFamily: 'Crimson Text, serif'}}>Crimson Text (Editorial)</option>
                  <option value="'Lora', serif" style={{fontFamily: 'Lora, serif'}}>Lora (Refined)</option>
                  <option value="'Merriweather', serif" style={{fontFamily: 'Merriweather, serif'}}>Merriweather (Premium)</option>
                </optgroup>
                <optgroup label="🎨 Minimalist Sans">
                  <option value="'Montserrat', sans-serif" style={{fontFamily: 'Montserrat, sans-serif'}}>Montserrat (Modern)</option>
                  <option value="'Raleway', sans-serif" style={{fontFamily: 'Raleway, sans-serif'}}>Raleway (Elegant Sans)</option>
                  <option value="'Poppins', sans-serif" style={{fontFamily: 'Poppins, sans-serif'}}>Poppins (Contemporary)</option>
                  <option value="'Inter', sans-serif" style={{fontFamily: 'Inter, sans-serif'}}>Inter (Clean Modern)</option>
                  <option value="'Outfit', sans-serif" style={{fontFamily: 'Outfit, sans-serif'}}>Outfit (Geometric)</option>
                  <option value="'Josefin Sans', sans-serif" style={{fontFamily: 'Josefin Sans, sans-serif'}}>Josefin Sans (Art Deco)</option>
                  <option value="'Quicksand', sans-serif" style={{fontFamily: 'Quicksand, sans-serif'}}>Quicksand (Soft & Round)</option>
                </optgroup>
                <optgroup label="🏛️ Display & Decorative">
                  <option value="'Abril Fatface', display" style={{fontFamily: 'Abril Fatface, display'}}>Abril Fatface (Bold Display)</option>
                  <option value="'Yeseva One', display" style={{fontFamily: 'Yeseva One, display'}}>Yeseva One (Elegant Display)</option>
                  <option value="'Cardo', serif" style={{fontFamily: 'Cardo, serif'}}>Cardo (Renaissance)</option>
                </optgroup>
                <optgroup label="📖 Classic">
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                </optgroup>
              </select>
            </div>

            {/* Text Color */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🎨 Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={
                    style.color &&
                    style.color !== 'transparent' &&
                    style.color.match(/^#[0-9A-Fa-f]{6}$/)
                      ? style.color
                      : '#000000'
                  }
                  onChange={(e) => updateStyle({ color: e.target.value })}
                  className="w-16 h-10 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={style.color || ''}
                  onChange={(e) => updateStyle({ color: e.target.value })}
                  placeholder="#000, white, rgba()"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => updateStyle({ color: '' })}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  title="Reset to default"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Text Align */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ↔️ Text Align
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateStyle({ textAlign: align })}
                    className={`px-3 py-2 text-xs font-semibold rounded transition-colors ${
                      style.textAlign === align
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {align[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Height */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📏 Line Height
              </label>
              <input
                type="text"
                value={style.lineHeight || ''}
                onChange={(e) => updateStyle({ lineHeight: e.target.value })}
                placeholder="e.g., 1.5, 24px, 2rem"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Letter Spacing */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ↔️ Letter Spacing
              </label>
              <input
                type="text"
                value={style.letterSpacing || ''}
                onChange={(e) => updateStyle({ letterSpacing: e.target.value })}
                placeholder="e.g., 0.5px, 0.1em"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Text Shadow */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ✨ Text Shadow
              </label>
              <input
                type="text"
                value={style.textShadow || ''}
                onChange={(e) => updateStyle({ textShadow: e.target.value })}
                placeholder="e.g., 2px 2px 4px rgba(0,0,0,0.5)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStyle({ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Soft
                </button>
                <button
                  onClick={() => updateStyle({ textShadow: '0px 4px 8px rgba(0,0,0,0.5)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Drop
                </button>
                <button
                  onClick={() => updateStyle({ textShadow: '0px 0px 10px rgba(255,255,255,0.8)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Glow
                </button>
                <button
                  onClick={() => updateStyle({ textShadow: '' })}
                  className="flex-1 px-2 py-1 bg-red-200 hover:bg-red-300 text-xs rounded"
                >
                  None
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <div className="space-y-3">
            {/* Margin */}
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="text-xs font-bold text-gray-700 mb-3">📏 Margin</h5>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={style.marginTop || ''}
                  onChange={(e) => updateStyle({ marginTop: e.target.value })}
                  placeholder="Top"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.marginBottom || ''}
                  onChange={(e) => updateStyle({ marginBottom: e.target.value })}
                  placeholder="Bottom"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.marginLeft || ''}
                  onChange={(e) => updateStyle({ marginLeft: e.target.value })}
                  placeholder="Left"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.marginRight || ''}
                  onChange={(e) => updateStyle({ marginRight: e.target.value })}
                  placeholder="Right"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Padding */}
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="text-xs font-bold text-gray-700 mb-3">📦 Padding</h5>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={style.paddingTop || ''}
                  onChange={(e) => updateStyle({ paddingTop: e.target.value })}
                  placeholder="Top"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.paddingBottom || ''}
                  onChange={(e) => updateStyle({ paddingBottom: e.target.value })}
                  placeholder="Bottom"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.paddingLeft || ''}
                  onChange={(e) => updateStyle({ paddingLeft: e.target.value })}
                  placeholder="Left"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={style.paddingRight || ''}
                  onChange={(e) => updateStyle({ paddingRight: e.target.value })}
                  placeholder="Right"
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Width & Height */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  ↔️ Width
                </label>
                <input
                  type="text"
                  value={style.width || ''}
                  onChange={(e) => updateStyle({ width: e.target.value })}
                  placeholder="auto, 100px, 50%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  ↕️ Height
                </label>
                <input
                  type="text"
                  value={style.height || ''}
                  onChange={(e) => updateStyle({ height: e.target.value })}
                  placeholder="auto, 100px, 50%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeTab === 'layout' && (
          <div className="space-y-3">
            {/* Background Color */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🎨 Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={
                    style.backgroundColor &&
                    style.backgroundColor !== 'transparent' &&
                    style.backgroundColor !== 'none' &&
                    style.backgroundColor.match(/^#[0-9A-Fa-f]{6}$/)
                      ? style.backgroundColor
                      : '#ffffff'
                  }
                  onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                  className="w-16 h-10 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={style.backgroundColor || ''}
                  onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                  placeholder="transparent, #fff, rgba()"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => updateStyle({ backgroundColor: 'transparent' })}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  title="Set to transparent"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                ⬛ Border Radius
              </label>
              <input
                type="text"
                value={style.borderRadius || ''}
                onChange={(e) => updateStyle({ borderRadius: e.target.value })}
                placeholder="0, 8px, 50%"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Glassmorphism - Backdrop Blur */}
            <div className="border-2 border-blue-200 rounded-lg p-3 bg-blue-50/30">
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                🌫️ Glassmorphism (Backdrop Blur)
              </label>
              <p className="text-xs text-gray-500 mb-2 italic">
                💡 Text and glassmorphism move together as one element
              </p>
              <input
                type="text"
                value={style.backdropBlur || ''}
                onChange={(e) => updateStyle({ backdropBlur: e.target.value })}
                placeholder="e.g., 10px, 20px"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
              />

              {/* Very Light Options */}
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Very Light (Subtle):</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                    })}
                    className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-xs rounded"
                  >
                    Ultra Light
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                    })}
                    className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-xs rounded"
                  >
                    Extra Light
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                    })}
                    className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-xs rounded"
                  >
                    Super Light
                  </button>
                </div>
              </div>

              {/* Medium Options */}
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Medium:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                  >
                    Light
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                  >
                    Strong
                  </button>
                </div>
              </div>

              {/* Dark Options */}
              <div className="mb-2">
                <p className="text-xs text-gray-500 mb-1">Dark:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-800 text-white text-xs rounded"
                  >
                    Light Dark
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '20px',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-800 text-white text-xs rounded"
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => updateStyle({
                      backdropBlur: '24px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '20px',
                      paddingTop: '1.5rem',
                      paddingBottom: '1.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    })}
                    className="flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-800 text-white text-xs rounded"
                  >
                    Strong Dark
                  </button>
                </div>
              </div>

              {/* Border Radius Quick Presets */}
              <div className="mb-2 mt-3 pt-3 border-t border-gray-300">
                <p className="text-xs text-gray-600 font-semibold mb-2">⬛ Corner Roundness:</p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => updateStyle({ borderRadius: '8px' })}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-xs rounded"
                    style={{ borderRadius: '8px' }}
                  >
                    Soft
                  </button>
                  <button
                    onClick={() => updateStyle({ borderRadius: '16px' })}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-xs rounded"
                    style={{ borderRadius: '16px' }}
                  >
                    Round
                  </button>
                  <button
                    onClick={() => updateStyle({ borderRadius: '24px' })}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-xs rounded"
                    style={{ borderRadius: '24px' }}
                  >
                    Very Round
                  </button>
                  <button
                    onClick={() => updateStyle({ borderRadius: '50%' })}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-xs rounded-full"
                  >
                    Pill
                  </button>
                </div>
              </div>

              {/* Clear Button */}
              <button
                onClick={() => updateStyle({
                  backdropBlur: '',
                  backgroundColor: '',
                  borderRadius: '',
                  paddingTop: '',
                  paddingBottom: '',
                  paddingLeft: '',
                  paddingRight: '',
                })}
                className="w-full px-2 py-1 bg-red-200 hover:bg-red-300 text-xs rounded mt-2"
              >
                Clear All Glassmorphism
              </button>
            </div>

            {/* Box Shadow */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📦 Box Shadow
              </label>
              <input
                type="text"
                value={style.boxShadow || ''}
                onChange={(e) => updateStyle({ boxShadow: e.target.value })}
                placeholder="e.g., 0 4px 6px rgba(0,0,0,0.1)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStyle({ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Soft
                </button>
                <button
                  onClick={() => updateStyle({ boxShadow: '0 10px 25px rgba(0,0,0,0.15)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Large
                </button>
                <button
                  onClick={() => updateStyle({ boxShadow: '0 0 20px rgba(255,255,255,0.5)' })}
                  className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                >
                  Glow
                </button>
                <button
                  onClick={() => updateStyle({ boxShadow: '' })}
                  className="flex-1 px-2 py-1 bg-red-200 hover:bg-red-300 text-xs rounded"
                >
                  None
                </button>
              </div>
            </div>

            {/* Display */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-2">
                📦 Display
              </label>
              <select
                value={style.display || ''}
                onChange={(e) => updateStyle({ display: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Default</option>
                <option value="block">Block</option>
                <option value="inline">Inline (⚠️ Can't be dragged)</option>
                <option value="inline-block">Inline Block (Recommended)</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
                <option value="none">None</option>
              </select>
              {style.display === 'inline' && (
                <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded">
                  ⚠️ Inline elements cannot be transformed (dragged, scaled, rotated). Use "Inline Block" or "Block" for draggable elements.
                </p>
              )}
            </div>

            {/* Flexbox controls (if display is flex) */}
            {style.display === 'flex' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    ↔️ Flex Direction
                  </label>
                  <select
                    value={style.flexDirection || ''}
                    onChange={(e) => updateStyle({ flexDirection: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Default</option>
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                    <option value="row-reverse">Row Reverse</option>
                    <option value="column-reverse">Column Reverse</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    ⚖️ Justify Content
                  </label>
                  <select
                    value={style.justifyContent || ''}
                    onChange={(e) => updateStyle({ justifyContent: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Default</option>
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    ⬍ Align Items
                  </label>
                  <select
                    value={style.alignItems || ''}
                    onChange={(e) => updateStyle({ alignItems: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Default</option>
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    ↔️ Gap
                  </label>
                  <input
                    type="text"
                    value={style.gap || ''}
                    onChange={(e) => updateStyle({ gap: e.target.value })}
                    placeholder="0, 8px, 1rem"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={() => {
            editor.updateElement(elementId, {
              style: {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
                zIndex: 1,
              },
            });
          }}
          className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          ↺ Reset to Default
        </button>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 rounded-b-xl text-xs text-gray-500 text-center panel-content">
        💡 Drag header to move panel
      </div>
    </div>
  );
}
