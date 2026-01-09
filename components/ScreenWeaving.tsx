import React, { useState } from 'react';
import { UserState, GeneratedSoul, ScreenState } from '../types';
import { generateSoul } from '../services/geminiService';

interface Props {
  user: UserState;
  setScreen: (s: ScreenState) => void;
  setLastSoul: (s: GeneratedSoul) => void;
}

const SOCKETS = [
  { id: 'CORTEX', label: 'CORTEX', x: 50, y: 15 },
  { id: 'OCULAR', label: 'OCULAR', x: 50, y: 28 },
  { id: 'CORE', label: 'CORE', x: 50, y: 45 },
  { id: 'MANIP_L', label: 'MANIP_L', x: 20, y: 60 },
  { id: 'MANIP_R', label: 'MANIP_R', x: 80, y: 60 },
  { id: 'LOCO', label: 'LOCO', x: 50, y: 85 },
];

export const ScreenWeaving: React.FC<Props> = ({ user, setLastSoul, setScreen }) => {
  const [equippedChips, setEquippedChips] = useState<string[]>([]);
  const [isRendering, setIsRendering] = useState(false);

  // Available chips (filtering from inventory for demo)
  const chips = user.inventory.filter(i => i.type === 'CHIP');

  const toggleChip = (chipName: string) => {
    if (equippedChips.includes(chipName)) {
      setEquippedChips(prev => prev.filter(c => c !== chipName));
    } else {
      if (equippedChips.length < 6) {
        setEquippedChips(prev => [...prev, chipName]);
      }
    }
  };

  const handleRender = async () => {
    if (equippedChips.length === 0) return;
    setIsRendering(true);
    const soul = await generateSoul("Standard Doll", equippedChips);
    setLastSoul(soul);
    setIsRendering(false);
    setScreen(ScreenState.DIAGNOSIS);
  };

  return (
    <div className="h-full flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
      {/* Schematic Background - Grid Paper */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* The Doll Schematic */}
        <div className="relative w-[300px] h-[500px] border border-black/10 scale-90 md:scale-100 transition-transform">
           {/* SVG Doll Outline */}
           <svg viewBox="0 0 100 200" className="w-full h-full stroke-black stroke-[0.5] fill-transparent opacity-30 drop-shadow-xl">
              <path d="M50 20 C60 20 65 28 65 35 C65 45 50 50 50 50 C50 50 35 45 35 35 C35 28 40 20 50 20 Z" /> {/* Head */}
              <path d="M50 50 L50 90" /> {/* Spine */}
              <path d="M30 60 L70 60" /> {/* Shoulders */}
              <path d="M30 60 L20 100" /> {/* L Arm */}
              <path d="M70 60 L80 100" /> {/* R Arm */}
              <path d="M50 90 L30 150" /> {/* L Leg */}
              <path d="M50 90 L70 150" /> {/* R Leg */}
              
              {/* Internal decorative lines */}
              <line x1="50" y1="20" x2="50" y2="35" strokeDasharray="2 2" />
              <circle cx="50" cy="90" r="2" />
              <circle cx="30" cy="150" r="2" />
              <circle cx="70" cy="150" r="2" />
           </svg>

           {/* Leader Lines & Labels */}
           <div className="absolute top-[10%] left-[-25%] w-[80px] border-b border-black text-[9px] font-mono text-right pr-1 opacity-60">
             NEURAL_LINK<br/><span className="text-gray-400">CONNECTING...</span>
           </div>
           <div className="absolute top-[10%] left-[20%] w-[1px] h-[20px] bg-black -rotate-45 origin-bottom opacity-30"></div>

           <div className="absolute top-[40%] right-[-25%] w-[80px] border-b border-black text-[9px] font-mono text-left pl-1 opacity-60">
             SOUL_MATRIX<br/><span className="text-ren-magenta animate-pulse">AWAITING_INPUT</span>
           </div>
           <div className="absolute top-[40%] right-[20%] w-[1px] h-[30px] bg-black rotate-45 origin-bottom opacity-30"></div>

           {/* Sockets (Hexagons) */}
           {SOCKETS.map((socket, idx) => {
             const equippedId = equippedChips[idx];
             return (
               <div 
                 key={socket.id}
                 className={`
                   absolute w-10 h-10 border transition-all duration-500
                   rotate-45 flex items-center justify-center
                   ${equippedId ? 'border-ren-magenta bg-ren-magenta/10 shadow-[0_0_15px_rgba(255,0,60,0.3)]' : 'border-black bg-white/90'}
                 `}
                 style={{ top: `${socket.y}%`, left: `${socket.x}%`, transform: 'translate(-50%, -50%) rotate(45deg)' }}
               >
                 <div className="-rotate-45 flex flex-col items-center justify-center w-full h-full">
                   {equippedId ? (
                     <>
                        <div className="w-1.5 h-1.5 bg-ren-magenta rounded-full animate-pulse mb-0.5"></div>
                        <span className="text-[6px] font-mono leading-none text-center max-w-[120%] truncate px-0.5">{equippedId}</span>
                     </>
                   ) : (
                     <span className="text-[6px] font-mono text-gray-400">{socket.label}</span>
                   )}
                 </div>
                 
                 {/* Connecting lines for visuals */}
                 <div className="absolute top-1/2 left-1/2 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-ren-cyan/20 to-transparent -z-10 pointer-events-none opacity-0 group-hover:opacity-100"></div>
               </div>
             );
           })}
        </div>

        {/* Tuning Sliders (Visual Only) */}
        <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-60 hover:opacity-100 transition-opacity">
           {['RESONANCE', 'WEIGHT', 'SPIRIT'].map(label => (
             <div key={label} className="flex flex-col items-center gap-2">
               <span className="font-mono text-[8px] writing-mode-vertical tracking-widest text-gray-500">{label}</span>
               <div className="h-20 w-[1px] bg-gray-300 relative group cursor-pointer">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-1 bg-black group-hover:bg-ren-cyan transition-colors"></div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Palette / Controls */}
      <div className="h-auto min-h-[140px] bg-white border-t border-black p-4 flex flex-col gap-2 relative z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div className="flex justify-between items-center px-2">
           <span className="font-mono text-xs tracking-widest text-gray-500">AVAILABLE_ELEMENTS</span>
           <span className="font-mono text-xs text-ren-magenta">{equippedChips.length} / 6 SOCKETS</span>
         </div>
         
         <div className="flex gap-4 overflow-x-auto pb-2 items-center h-full">
            <div className="min-w-[120px] flex items-center justify-center border-r border-gray-200 pr-4">
                <button 
                    onClick={handleRender}
                    disabled={isRendering || equippedChips.length === 0}
                    className="w-full h-12 bg-black text-white font-mono text-xs tracking-widest hover:bg-ren-cyan disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2 group"
                >
                  {isRendering ? (
                    <span className="animate-pulse">WEAVING...</span>
                  ) : (
                    <>
                      RENDER <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                    </>
                  )}
                </button>
            </div>

            {chips.map(chip => (
              <div 
                key={chip.id}
                onClick={() => toggleChip(chip.name)}
                className={`
                  min-w-[70px] h-20 border flex flex-col items-center justify-center cursor-pointer transition-all relative
                  ${equippedChips.includes(chip.name) 
                      ? 'border-ren-magenta bg-ren-magenta/5 opacity-50' 
                      : 'border-gray-200 hover:border-black hover:-translate-y-1'}
                `}
              >
                <div className="w-5 h-5 bg-gray-100 rounded-full mb-2 flex items-center justify-center text-[8px] font-mono">
                  {chip.name[0]}
                </div>
                <span className="text-[8px] font-mono tracking-wider">{chip.name}</span>
                {equippedChips.includes(chip.name) && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-ren-magenta rounded-full"></div>
                )}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};