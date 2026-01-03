
import React from 'react';
import { HOTSPOTS, IMAGES } from './constants';
import { HotspotOverlay } from './components/HotspotOverlay';

const App: React.FC = () => {
  const baseImage = IMAGES.base;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#000000] text-white overflow-hidden">
      {/* Background Glitch Ambience - Very subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 noise-bg opacity-[0.01]" />
      </div>

      {/* Main Interactive Container */}
      <div className="w-full max-w-5xl mb-3 flex justify-between items-end mono px-1">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white pulse-soft shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/90">
            [ System ] Mouse hover to analyze data_
          </span>
        </div>
        <div className="hidden sm:block text-[10px] text-white/20 tracking-tighter uppercase">
          DARK_FOREST // OBSERVER_SCAN
        </div>
      </div>

      <div 
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 group bg-[#000000]"
      >
        {/* 
            Fixed container logic: 
            Removing min-h-[400px] ensures the container matches the image aspect ratio exactly on mobile.
            This fixes the misalignment where percentages were calculated against a taller box than the image.
        */}
        <div className="relative w-full">
          {/* Subtle scanning line overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
          
          <img 
            src={baseImage} 
            alt="Interactive Identity Map"
            className="w-full h-auto block select-none pointer-events-none transition-opacity duration-1000 opacity-0"
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).classList.replace('opacity-0', 'opacity-100');
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000') {
                target.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000';
              }
            }}
          />

          {/* Hotspots Container - Now scales perfectly with the image */}
          <div className="absolute inset-0 z-10">
            {HOTSPOTS.map((hotspot) => (
              <HotspotOverlay key={hotspot.id} hotspot={hotspot} />
            ))}
          </div>
          
          {/* Technical UI Corner Accents */}
          <div className="absolute top-4 left-4 border-l border-t border-white/10 w-8 h-8 pointer-events-none" />
          <div className="absolute top-4 right-4 border-r border-t border-white/10 w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-4 left-4 border-l border-b border-white/10 w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-4 right-4 border-r border-b border-white/10 w-8 h-8 pointer-events-none" />
          
          {/* Mobile Instruction */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-20 pointer-events-none">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              Tap to analyze data
            </p>
          </div>
        </div>
      </div>

      {/* Footer System Info - Brightened to text-white/40 for better legibility */}
      <div className="mt-6 flex gap-6 text-[9px] uppercase tracking-widest text-white/20 mono pointer-events-none">
        <div className="flex items-center gap-2">
          <span>System Stable</span>
        </div>
        <span>Lat: 52.5200° N / Lon: 13.4050° E</span>
        <span className="hidden sm:inline">Session: 0xFF92A</span>
      </div>
    </div>
  );
};

export default App;
