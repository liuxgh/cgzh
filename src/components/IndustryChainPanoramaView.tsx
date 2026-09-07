import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  MapPin, 
  Sparkles, 
  Upload
} from 'lucide-react';

const DEFAULT_PANORAMIC_IMG = 'https://static.zlbaba.com/jida/cyl01.png';
const DEFAULT_MATCHING_IMG = 'https://static.zlbaba.com/jida/gyl01.png';

interface IndustryChainPanoramaViewProps {
  chainName?: string;
}

export const IndustryChainPanoramaView: React.FC<IndustryChainPanoramaViewProps> = ({
  chainName = '新能源汽车'
}) => {
  const [activeTab, setActiveTab] = useState<'panoramic' | 'matching'>('panoramic');
  const [isDragging, setIsDragging] = useState(false);

  // Read saved image from localStorage if custom uploaded
  const [customPanoramicImg, setCustomPanoramicImg] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jlu_custom_panoramic_img_v2') || null;
    }
    return null;
  });

  const [customMatchingImg, setCustomMatchingImg] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jlu_custom_matching_img_v2') || null;
    }
    return null;
  });

  // Save image and sync with server for durable persistence
  const saveAndUploadImage = async (dataUrl: string, type: 'panoramic' | 'matching') => {
    if (type === 'panoramic') {
      setCustomPanoramicImg(dataUrl);
      try {
        localStorage.setItem('jlu_custom_panoramic_img_v2', dataUrl);
      } catch {
        // LocalStorage quota fallback
      }
    } else {
      setCustomMatchingImg(dataUrl);
      try {
        localStorage.setItem('jlu_custom_matching_img_v2', dataUrl);
      } catch {
        // LocalStorage quota fallback
      }
    }

    // Persist to server filesystem so it becomes the default asset
    try {
      await fetch('/api/upload-panoramic-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: dataUrl, type })
      });
    } catch (err) {
      console.error('Server upload sync error:', err);
    }
  };

  // Handle drag and drop anywhere on the viewer
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          saveAndUploadImage(event.target.result as string, activeTab);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Listen for Ctrl+V paste event
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  saveAndUploadImage(event.target.result as string, activeTab);
                }
              };
              reader.readAsDataURL(blob);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeTab]);

  const panoramicSrc = customPanoramicImg || DEFAULT_PANORAMIC_IMG;
  const matchingSrc = customMatchingImg || DEFAULT_MATCHING_IMG;
  const currentSrc = activeTab === 'panoramic' ? panoramicSrc : matchingSrc;

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`bg-[#061026]/95 border border-blue-900/50 rounded-3xl transition-all duration-300 overflow-hidden shadow-2xl space-y-0 relative w-full ${
        isDragging ? 'border-cyan-400 ring-4 ring-cyan-500/30' : ''
      }`}
    >
      {/* Dragging Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-40 bg-blue-950/90 backdrop-blur-xs flex flex-col items-center justify-center text-white border-2 border-dashed border-cyan-400 p-6 pointer-events-none animate-in fade-in">
          <Upload className="w-16 h-16 text-cyan-300 animate-bounce mb-3" />
          <h4 className="text-xl font-black text-white">松开鼠标即可载入原图</h4>
        </div>
      )}

      {/* Top Header & Tabs Bar */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#030919] via-[#071738] to-[#040e24] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-950/80">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/30 flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              战略产业链全景穿透
            </span>
            <span className="text-xs text-slate-300 font-medium">
              当前链条：<strong className="text-white font-bold">{chainName}</strong>
            </span>
          </div>
          <h3 className="text-base sm:text-xl font-black text-white flex items-center gap-2">
            {activeTab === 'panoramic' ? '战略产业链匹配图' : '重点企业供应链匹配'}
          </h3>
        </div>

        {/* Tab Buttons Switcher */}
        <div className="flex items-center gap-1 bg-[#050e24] p-1 rounded-2xl border border-blue-900/60 shadow-inner shrink-0">
          <button
            onClick={() => setActiveTab('panoramic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'panoramic'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-blue-950/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>产业链匹配图</span>
          </button>
          <button
            onClick={() => setActiveTab('matching')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border border-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-blue-950/60'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>供应链匹配</span>
          </button>
        </div>
      </div>

      {/* Main Image Viewport Area (Pure #030919 space background, full-width adaptive) */}
      <div className="p-1.5 sm:p-2 bg-[#030919] relative w-full overflow-hidden">
        {/* The Graphic Container - full width responsive */}
        <div className="relative rounded-2xl overflow-hidden border border-blue-900/60 bg-[#030919] shadow-2xl w-full flex items-center justify-center p-1">
          <img 
            src={currentSrc}
            alt={activeTab === 'panoramic' ? '战略产业链匹配图' : '重点企业供应链匹配'}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (activeTab === 'panoramic' && !target.src.includes('industry-chain-panoramic.png')) {
                target.src = '/industry-chain-panoramic.png';
              } else if (activeTab === 'matching' && !target.src.includes('supply-chain-matching.png')) {
                target.src = '/supply-chain-matching.png';
              }
            }}
            className="w-full h-auto object-contain block select-none"
          />
        </div>
      </div>
    </div>
  );
};
