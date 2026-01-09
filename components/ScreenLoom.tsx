import React, { useEffect, useState, useRef } from 'react';
import { LOOM_SYMBOLS } from '../constants';

export const ScreenLoom: React.FC = () => {
  const [weaving, setWeaving] = useState(false);
  const [collected, setCollected] = useState<string[]>([]);
  
  const Column = ({ speed, active }: { speed: number, active: boolean }) => {
    const [offset, setOffset] = useState(0);
    const requestRef = useRef<number>();

    const animate = () => {
      setOffset(prev => (prev + speed) % 100);
      if (active) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    useEffect(() => {
      if (active) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      }
      return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [active, speed]);

    return (
      <div className="h-64 w-16 overflow-hidden border-x border-dashed border-gray-300 relative bg-gray-50/50">
        <div className="absolute top-0 left-0 w-full text-center font-mono text-sm leading-8 text-gray-400 blur-[0.5px]" style={{ transform: `translateY(-${offset}%)` }}>
          {/* Repeat list 3 times for smooth loop */}
          {[...LOOM_SYMBOLS, ...LOOM_SYMBOLS, ...LOOM_SYMBOLS].map((s, i) => (
             <div key={i}>{s}</div>
          ))}
        </div>
        <div className="absolute inset-x-0 top-1/2 h-8 border-y border-ren-magenta/50 -translate-y-1/2 bg-ren-magenta/5 pointer-events-none z-10" />
      </div>
    );
  };

  const handleWeave = () => {
    if (weaving) return;
    setWeaving(true);
    setCollected([]);
    
    // Simulate process
    setTimeout(() => {
      setWeaving(false);
      // Determine drops
      const drops = ['NEON', 'SHELL']; 
      setCollected(drops);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pb-16">
      <h2 className="font-serif text-3xl mb-8 tracking-widest">THE LOOM OF FATE</h2>
      
      <div className="flex gap-4 mb-12 relative">
         <Column speed={2} active={weaving} />
         <Column speed={3} active={weaving} />
         <Column speed={1.5} active={weaving} />
         
         {/* Noise overlay over loom */}
         <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
      </div>

      <button 
        onClick={handleWeave}
        disabled={weaving}
        className={`
          w-24 h-24 rounded-full border border-black flex items-center justify-center font-mono text-xs tracking-widest transition-all
          ${weaving ? 'bg-black text-white scale-90' : 'hover:bg-ren-cyan hover:border-ren-cyan hover:text-white hover:scale-105'}
        `}
      >
        {weaving ? '...' : 'WEAVE'}
      </button>

      {/* Tray */}
      <div className="mt-8 h-20 w-full max-w-md glass-panel flex items-center justify-center gap-4 transition-all duration-500">
        {collected.length === 0 && !weaving && <span className="text-[10px] font-mono text-gray-400">TRAY_EMPTY</span>}
        {collected.map((item, i) => (
          <div key={i} className="px-4 py-2 bg-white border border-black text-xs font-mono animate-bounce shadow-lg">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
