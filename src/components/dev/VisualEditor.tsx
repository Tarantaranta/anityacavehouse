'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { EditableElement } from './EditableElement';

// Types
export interface ElementStyle {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderRadius?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  // New glassmorphism & effects
  backdropBlur?: string;
  textShadow?: string;
  boxShadow?: string;
}

export interface ElementData {
  id: string;
  style: ElementStyle;
  content?: string;
  deleted?: boolean;
}

interface EditorState {
  elements: { [key: string]: ElementData };
}

interface HistoryState {
  past: EditorState[];
  present: EditorState;
  future: EditorState[];
}

const STORAGE_KEY_BASE = 'anitya-visual-editor-v2';

// Context
interface EditorContextType {
  editorMode: boolean;
  elements: { [key: string]: ElementData };
  updateElement: (id: string, updates: Partial<ElementData>) => void;
  deleteElement: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  resetAll: () => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within VisualEditor');
  }
  return context;
}

// Main Visual Editor Component
export function VisualEditor({ children }: { children: React.ReactNode }) {
  // Get locale from HTML lang attribute instead of useParams to avoid issues
  const [locale, setLocale] = useState('tr');

  useEffect(() => {
    const htmlLang = document.documentElement.lang || 'tr';
    setLocale(htmlLang);
  }, []);

  const STORAGE_KEY = `${STORAGE_KEY_BASE}-${locale}`;

  const [editorMode, setEditorMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // History management with undo/redo
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: { elements: {} },
    future: [],
  });

  // Load from localStorage on mount - LOCALE SPECIFIC
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory({
          past: [],
          present: { elements: parsed },
          future: [],
        });
      } catch (e) {
        console.error('Failed to load editor state:', e);
      }
    } else {
      // Reset to empty if no data for this locale
      setHistory({
        past: [],
        present: { elements: {} },
        future: [],
      });
    }
  }, [STORAGE_KEY, locale]);

  // Save to localStorage when state changes - LOCALE SPECIFIC
  useEffect(() => {
    if (Object.keys(history.present.elements).length > 0) {
      const data = JSON.stringify(history.present.elements);
      localStorage.setItem(STORAGE_KEY, data);
      console.log('💾 SAVED to localStorage:', STORAGE_KEY, history.present.elements);
    }
  }, [history.present.elements, STORAGE_KEY]);

  // Inject styles into DOM for persistence
  // In EDITOR MODE: Don't inject transform/opacity/zIndex (inline styles handle it)
  // In NON-EDITOR MODE: Inject everything including transform for persistence
  useEffect(() => {
    const styleId = 'visual-editor-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    console.log('🎨 Injecting CSS for elements:', Object.keys(history.present.elements), 'editorMode:', editorMode);

    // Generate CSS for all elements
    const cssRules = Object.entries(history.present.elements)
      .filter(([_, data]) => !data.deleted)
      .map(([id, data]) => {
        const { style } = data;
        const rules: string[] = [];
        const childRules: string[] = []; // For nested text elements

        // Typography styles - apply to both wrapper and children
        if (style.fontSize) {
          rules.push(`font-size: ${style.fontSize} !important;`);
          childRules.push(`font-size: ${style.fontSize} !important;`);
        }
        if (style.fontWeight) {
          rules.push(`font-weight: ${style.fontWeight} !important;`);
          childRules.push(`font-weight: ${style.fontWeight} !important;`);
        }
        if (style.fontFamily) {
          rules.push(`font-family: ${style.fontFamily} !important;`);
          childRules.push(`font-family: ${style.fontFamily} !important;`);
        }
        if (style.color) {
          rules.push(`color: ${style.color} !important;`);
          childRules.push(`color: ${style.color} !important;`);
        }
        if (style.textAlign) {
          rules.push(`text-align: ${style.textAlign} !important;`);
          childRules.push(`text-align: ${style.textAlign} !important;`);
        }
        if (style.lineHeight) {
          rules.push(`line-height: ${style.lineHeight} !important;`);
          childRules.push(`line-height: ${style.lineHeight} !important;`);
        }
        if (style.letterSpacing) {
          rules.push(`letter-spacing: ${style.letterSpacing} !important;`);
          childRules.push(`letter-spacing: ${style.letterSpacing} !important;`);
        }

        // Transform & Visual styles - for wrapper
        // ONLY inject transform/opacity/zIndex when editor is CLOSED
        // When editor is OPEN, inline styles handle these (to avoid !important conflicts)
        if (!editorMode) {
          // Always apply transform (even if values are default) to ensure consistency
          rules.push(`transform: translate(${style.x || 0}px, ${style.y || 0}px) scale(${style.scale || 1}) rotate(${style.rotation || 0}deg) !important;`);
          // Ensure element is transformable - inline elements can't be transformed properly
          if (!style.display || style.display === 'inline') {
            rules.push(`display: inline-block !important;`);
          }
          if (style.opacity !== undefined && style.opacity !== 1) {
            rules.push(`opacity: ${style.opacity} !important;`);
          }
          if (style.zIndex !== undefined && style.zIndex !== 'auto' && style.zIndex !== 1) {
            rules.push(`z-index: ${style.zIndex} !important;`);
          }
        }

        // Effects - apply to wrapper
        if (style.backdropBlur) rules.push(`backdrop-filter: blur(${style.backdropBlur}) !important; -webkit-backdrop-filter: blur(${style.backdropBlur}) !important;`);
        if (style.textShadow) {
          rules.push(`text-shadow: ${style.textShadow} !important;`);
          childRules.push(`text-shadow: ${style.textShadow} !important;`);
        }
        if (style.boxShadow) rules.push(`box-shadow: ${style.boxShadow} !important;`);

        // Layout styles - only for wrapper
        if (style.backgroundColor) rules.push(`background-color: ${style.backgroundColor} !important;`);
        if (style.borderRadius) rules.push(`border-radius: ${style.borderRadius} !important;`);
        if (style.marginTop) rules.push(`margin-top: ${style.marginTop} !important;`);
        if (style.marginBottom) rules.push(`margin-bottom: ${style.marginBottom} !important;`);
        if (style.marginLeft) rules.push(`margin-left: ${style.marginLeft} !important;`);
        if (style.marginRight) rules.push(`margin-right: ${style.marginRight} !important;`);
        if (style.paddingTop) rules.push(`padding-top: ${style.paddingTop} !important;`);
        if (style.paddingBottom) rules.push(`padding-bottom: ${style.paddingBottom} !important;`);
        if (style.paddingLeft) rules.push(`padding-left: ${style.paddingLeft} !important;`);
        if (style.paddingRight) rules.push(`padding-right: ${style.paddingRight} !important;`);
        if (style.width) rules.push(`width: ${style.width} !important;`);
        if (style.height) rules.push(`height: ${style.height} !important;`);
        if (style.display) rules.push(`display: ${style.display} !important;`);
        if (style.flexDirection) rules.push(`flex-direction: ${style.flexDirection} !important;`);
        if (style.justifyContent) rules.push(`justify-content: ${style.justifyContent} !important;`);
        if (style.alignItems) rules.push(`align-items: ${style.alignItems} !important;`);
        if (style.gap) rules.push(`gap: ${style.gap} !important;`);

        const cssBlocks = [];

        // Main wrapper styles
        if (rules.length > 0) {
          cssBlocks.push(`.editable-${id} { ${rules.join(' ')} }`);
        }

        // Nested children styles (h1, h2, h3, h4, h5, h6, p, span, a, etc.)
        if (childRules.length > 0) {
          cssBlocks.push(`.editable-${id} * { ${childRules.join(' ')} }`);
        }

        return cssBlocks.join('\n');
      })
      .filter(Boolean)
      .join('\n');

    styleEl.textContent = cssRules;

    // DEBUG: Log injected CSS when editor is closed
    if (!editorMode && cssRules) {
      console.log('🎨 CSS INJECTED:', cssRules);
    }

    // Don't remove styles when exiting editor mode - keep them persistent!
  }, [history.present.elements, editorMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+E to toggle editor
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setEditorMode(prev => !prev);
      }

      // Ctrl+Z to undo
      if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }

      // Ctrl+Shift+Z or Ctrl+Y to redo
      if ((e.ctrlKey && e.shiftKey && e.key === 'Z') || (e.ctrlKey && e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // Delete key to delete selected element
      if (e.key === 'Delete' && selectedElement) {
        e.preventDefault();
        deleteElement(selectedElement);
      }

      // Escape to deselect
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement]);

  const updateElement = useCallback((id: string, updates: Partial<ElementData>) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: {
        elements: {
          ...prev.present.elements,
          [id]: {
            ...prev.present.elements[id],
            id,
            ...updates,
            style: {
              ...prev.present.elements[id]?.style,
              ...updates.style,
            },
          },
        },
      },
      future: [], // Clear future when new change is made
    }));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: {
        elements: {
          ...prev.present.elements,
          [id]: {
            ...prev.present.elements[id],
            deleted: true,
          },
        },
      },
      future: [],
    }));
    setSelectedElement(null);
  }, []);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setHistory({
      past: [],
      present: { elements: {} },
      future: [],
    });
    localStorage.removeItem(STORAGE_KEY);
    setSelectedElement(null);
  }, [STORAGE_KEY]);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  const generateCSS = () => {
    const entries = Object.entries(history.present.elements)
      .filter(([_, data]) => !data.deleted)
      .map(([id, data]) => {
        const { style } = data;
        const rules: string[] = [];

        if (style.x !== 0 || style.y !== 0 || style.scale !== 1 || style.rotation !== 0) {
          rules.push(`  transform: translate(${style.x}px, ${style.y}px) scale(${style.scale}) rotate(${style.rotation}deg);`);
        }
        if (style.opacity !== undefined && style.opacity !== 1) rules.push(`  opacity: ${style.opacity};`);
        if (style.zIndex !== undefined && style.zIndex !== 1) rules.push(`  z-index: ${style.zIndex};`);
        if (style.fontSize) rules.push(`  font-size: ${style.fontSize};`);
        if (style.fontWeight) rules.push(`  font-weight: ${style.fontWeight};`);
        if (style.fontFamily) rules.push(`  font-family: ${style.fontFamily};`);
        if (style.color) rules.push(`  color: ${style.color};`);
        if (style.textAlign) rules.push(`  text-align: ${style.textAlign};`);
        if (style.lineHeight) rules.push(`  line-height: ${style.lineHeight};`);
        if (style.letterSpacing) rules.push(`  letter-spacing: ${style.letterSpacing};`);
        if (style.backgroundColor) rules.push(`  background-color: ${style.backgroundColor};`);
        if (style.borderRadius) rules.push(`  border-radius: ${style.borderRadius};`);
        if (style.marginTop) rules.push(`  margin-top: ${style.marginTop};`);
        if (style.marginBottom) rules.push(`  margin-bottom: ${style.marginBottom};`);
        if (style.marginLeft) rules.push(`  margin-left: ${style.marginLeft};`);
        if (style.marginRight) rules.push(`  margin-right: ${style.marginRight};`);
        if (style.paddingTop) rules.push(`  padding-top: ${style.paddingTop};`);
        if (style.paddingBottom) rules.push(`  padding-bottom: ${style.paddingBottom};`);
        if (style.paddingLeft) rules.push(`  padding-left: ${style.paddingLeft};`);
        if (style.paddingRight) rules.push(`  padding-right: ${style.paddingRight};`);
        if (style.width) rules.push(`  width: ${style.width};`);
        if (style.height) rules.push(`  height: ${style.height};`);
        if (style.display) rules.push(`  display: ${style.display};`);
        if (style.flexDirection) rules.push(`  flex-direction: ${style.flexDirection};`);
        if (style.justifyContent) rules.push(`  justify-content: ${style.justifyContent};`);
        if (style.alignItems) rules.push(`  align-items: ${style.alignItems};`);
        if (style.gap) rules.push(`  gap: ${style.gap};`);

        if (rules.length > 0) {
          return `.editable-${id} {\n${rules.join('\n')}\n}`;
        }
        return null;
      })
      .filter(Boolean);

    return entries.length > 0
      ? entries.join('\n\n')
      : '/* No style changes yet - start editing elements! */';
  };

  const exportJSON = () => {
    const data = {
      elements: history.present.elements,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', 'visual-editor-export.json');
    link.click();
  };

  const contextValue: EditorContextType = {
    editorMode,
    elements: history.present.elements,
    updateElement,
    deleteElement,
    undo,
    redo,
    canUndo,
    canRedo,
    resetAll,
    selectedElement,
    setSelectedElement,
  };

  const activeElements = Object.keys(history.present.elements).filter(
    id => !history.present.elements[id].deleted
  ).length;

  if (!editorMode) {
    return (
      <EditorContext.Provider value={contextValue}>
        {children}
        <button
          onClick={() => setEditorMode(true)}
          className="fixed bottom-4 right-4 z-[9999] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2 transition-all hover:scale-105"
          title="Press Ctrl+Shift+E"
        >
          ✨ Visual Editor
        </button>
      </EditorContext.Provider>
    );
  }

  return (
    <EditorContext.Provider value={contextValue}>
      {/* Full page scrollable container */}
      <div className="min-h-screen w-full overflow-y-auto">
        {children}
      </div>

      {/* Editor Control Panel - Collapsible */}
      <div className={`fixed top-4 right-4 z-[9999] bg-white rounded-xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-auto' : 'p-5 max-w-md max-h-[90vh] overflow-y-auto'
      }`}>
        {/* Header - Always Visible */}
        <div className={`flex items-center justify-between ${isMinimized ? 'p-3' : 'mb-4 pb-3 border-b-2'}`}>
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            ✨ Visual Editor
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase">
              {locale}
            </span>
            {isMinimized && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {activeElements} elements
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-purple-600 hover:text-purple-800 font-bold text-xl"
              title={isMinimized ? "Expand panel" : "Minimize panel"}
            >
              {isMinimized ? '▼' : '▲'}
            </button>
            <button
              onClick={() => setEditorMode(false)}
              className="text-red-500 hover:text-red-700 font-bold text-xl"
              title="Close editor (Ctrl+Shift+E)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Panel Content - Collapsible */}
        {!isMinimized && (
          <div>

        {/* Quick Actions */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              title="Ctrl+Z"
            >
              ↶ Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
              title="Ctrl+Shift+Z"
            >
              ↷ Redo
            </button>
          </div>

          {/* Preview Mode Button */}
          <button
            onClick={() => setEditorMode(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl"
            title="Close editor and preview your changes"
          >
            👁️ Preview Changes (Ctrl+Shift+E)
          </button>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
          <p className="text-xs text-purple-900 font-medium mb-2">
            ✨ <strong>Features:</strong>
          </p>
          <ul className="text-xs text-purple-800 space-y-1">
            <li>• Click any element to edit it</li>
            <li>• Drag to reposition</li>
            <li>• Edit text, fonts, colors, sizes</li>
            <li>• Delete with X button or Delete key</li>
            <li>• Undo/Redo: Ctrl+Z / Ctrl+Shift+Z</li>
            <li>• Escape to deselect</li>
          </ul>
        </div>

        {/* Persistence Info */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-green-900 font-bold">
              💾 Auto-Save Active
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">Saved</span>
            </div>
          </div>
          <p className="text-xs text-green-700">
            All changes are saved automatically. Close editor (Ctrl+Shift+E) to preview without editing UI!
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            📊 <strong>{activeElements}</strong> active elements
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {selectedElement ? `Selected: ${selectedElement}` : 'No element selected'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            {showCodePanel ? '🔽 Hide Code' : '📋 Show CSS Code'}
          </button>

          {showCodePanel && (
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-3 py-2 flex items-center justify-between">
                <span className="text-green-400 text-xs font-mono">CSS Output</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateCSS());
                    alert('CSS copied!');
                  }}
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <pre className="text-green-400 p-3 text-xs overflow-auto max-h-60">
                {generateCSS() || '// No styles yet'}
              </pre>
            </div>
          )}

          <button
            onClick={exportJSON}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            💾 Export as JSON
          </button>

          <button
            onClick={resetAll}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            🗑️ Reset All
          </button>
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-gray-500">
          <strong>Shortcuts:</strong> Ctrl+Shift+E (toggle) | Ctrl+Z (undo) | Ctrl+Shift+Z (redo) | Delete (remove)
        </div>
        </div>
        )}
      </div>
    </EditorContext.Provider>
  );
}

// Editable wrapper component
export function Editable({
  id,
  children,
  type = 'element',
  editableText = false,
}: {
  id: string;
  children: React.ReactNode;
  type?: 'text' | 'element' | 'container';
  editableText?: boolean;
}) {
  const editor = useEditor();

  const elementData = editor.elements[id];

  // Don't render deleted elements
  if (elementData?.deleted) {
    return null;
  }

  // ALWAYS use EditableElement for consistent rendering
  // In non-editor mode, EditableElement will hide controls but still apply transforms
  return (
    <EditableElement
      id={id}
      type={type}
      editableText={editableText}
      initialData={elementData}
    >
      {children}
    </EditableElement>
  );
}
