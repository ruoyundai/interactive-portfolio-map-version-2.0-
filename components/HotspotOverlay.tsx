
import React, { useState, useEffect, useMemo } from 'react';
import { Hotspot } from '../types';
import { IMAGES } from '../constants';

interface HotspotOverlayProps {
  hotspot: Hotspot;
}

const Typewriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 30 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span className="cursor whitespace-pre-wrap">{currentText}</span>;
};

export const HotspotOverlay: React.FC<HotspotOverlayProps> = ({ hotspot }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate position for the info card to avoid being cut off
  const cardPositionClass = useMemo(() => {
    const horizontal = hotspot.x > 50 ? '-left-[280px]' : 'left-[105%]';
    const vertical = hotspot.y > 50 ? 'bottom-0' : 'top-0';
    return `${horizontal} ${vertical}`;
  }, [hotspot.x, hotspot.y]);

  // Calculate the transform needed to center the hotspot in the preview box
  const zoomFactor = useMemo(() => {
    // Zoom in so the hotspot fills more of the preview width
    // Increased from 0.7 to 1.1 for a more "magnified" effect
    return (100 / hotspot.width) * 1.1;
  }, [hotspot.width]);

  const transformStyle = useMemo(() => {
    const centerX = hotspot.x + hotspot.width / 2;
    const centerY = hotspot.y + hotspot.height / 2;
    
    // translate is applied after scale, so we move the image based on the distance from center
    const translateX = (50 - centerX) * zoomFactor;
    const translateY = (50 - centerY) * zoomFactor;
    
    return {
      transform: `translate(${translateX}%, ${translateY}%) scale(${zoomFactor})`,
      transformOrigin: 'center center'
    };
  }, [hotspot.x, hotspot.y, hotspot.width, hotspot.height, zoomFactor]);

  return (
    <div
      className="absolute group transition-all duration-300"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
        zIndex: isHovered ? 50 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 2px White Stroke Border */}
      <div
        className={`absolute inset-0 border-2 border-white transition-all duration-500 pointer-events-none ${
          isHovered ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 rotate-1'
        }`}
        style={{
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
        }}
      >
        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />
      </div>

      {/* Futuristic Info Card */}
      {isHovered && (
        <div
          className={`absolute w-[260px] pointer-events-none transition-all duration-500 animate-in fade-in zoom-in-95 ${cardPositionClass}`}
        >
          <div className="bg-[#000000] border border-white/20 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-white px-2 py-1 flex justify-between items-center">
              <span className="mono text-[10px] text-black font-bold uppercase tracking-tighter">
                SCAN_ID: {hotspot.id.toUpperCase()}
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                <div className="w-1.5 h-1.5 bg-black rounded-full opacity-30" />
              </div>
            </div>

            {/* Zoom Image Section */}
            <div className="relative h-40 border-b border-white/10 overflow-hidden bg-black flex items-center justify-center">
              {/* Main Preview Image using transform for perfect centering */}
              <img 
                src={IMAGES.base}
                alt="zoom preview"
                className="absolute w-full h-auto max-w-none transition-transform duration-700 ease-out"
                style={transformStyle}
              />
              
              {/* Scanline and Grid Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] animate-[scanline-stutter_6s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0),rgba(255,255,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40" />
            </div>

            {/* Content Area */}
            <div className="p-4 mono">
              <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-3 border-l-[3px] border-white pl-3 leading-none">
                {hotspot.label}
              </h3>
              <div className="text-[11px] leading-relaxed text-white/80 min-h-[3rem] whitespace-pre-wrap">
                <Typewriter text={hotspot.description} />
              </div>
              
              {/* Status Indicator */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-[2px] bg-white/10 overflow-hidden">
                  <div className="h-full bg-white w-2/3 animate-[pulse_2s_infinite]" />
                </div>
                <span className="text-[8px] text-white/40 tracking-widest uppercase">Active_</span>
              </div>
            </div>
          </div>
          
          {/* Connector Line Element */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-px bg-white/30 ${hotspot.x > 50 ? '-right-8' : '-left-8'}`} />
        </div>
      )}
    </div>
  );
};
