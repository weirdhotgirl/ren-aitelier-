import React from 'react';
import { INITIAL_GATES } from '../constants';
import { Lock, Unlock } from 'lucide-react';
import { ScreenState } from '../types';

export const ScreenMap: React.FC<{ setScreen: (s: ScreenState) => void }> = ({ setScreen }) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4 overflow-x-auto">
      <div className="flex gap-4 md:gap-8 h-[60vh] md:h-[70vh] items-center">
        {INITIAL_GATES.map((gate, index) => (
          <div 
            key={gate.id}
            onClick={() => gate.status === 'UNLOCKED' && setScreen(ScreenState.LOOM)}
            className={`
              relative w-24 md:w-32 h-full border border-black flex flex-col items-center justify-end pb-8 cursor-pointer transition-all duration-500 hover:w-32 md:hover:w-48 group overflow-hidden
              ${gate.status === 'LOCKED' ? 'opacity-50 bg-gray-100' : 'bg-white hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'}
            `}
          >
            {/* Parallax-ish content */}
            <div className="absolute top-10 text-4xl opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 filter grayscale">
              {gate.icon}
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />

            <div className="relative z-20 flex flex-col items-center gap-2">
               <span className="font-mono text-[10px] tracking-widest border border-black px-1">
                 GATE_0{index + 1}
               </span>
               <h3 className="font-serif text-xl md:text-2xl tracking-widest text-center vertical-rl md:writing-mode-horizontal">
                 {gate.name}
               </h3>
               <div className="mt-4">
                 {gate.status === 'LOCKED' ? <Lock size={12} /> : <Unlock size={12} />}
               </div>
            </div>

            {/* Hover Status */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2 py-1 text-[10px] font-mono whitespace-nowrap z-30 pointer-events-none">
              STATUS: {gate.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
