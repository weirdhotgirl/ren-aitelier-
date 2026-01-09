import React from 'react';
import { GeneratedSoul, ScreenState } from '../types';
import { Download, Share2, Archive } from 'lucide-react';

interface Props {
  soul: GeneratedSoul | null;
  setScreen: (s: ScreenState) => void;
}

export const ScreenDiagnosis: React.FC<Props> = ({ soul, setScreen }) => {
  if (!soul) return <div className="p-12 text-center font-mono">NO DATA</div>;

  return (
    <div className="flex items-center justify-center min-h-full p-6">
      <div className="bg-white p-6 shadow-2xl border border-black max-w-4xl w-full flex flex-col md:flex-row gap-8 relative">
        {/* Decorative corner markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black"></div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 aspect-square bg-gray-100 relative overflow-hidden group">
          <img 
            src={soul.imageUrl} 
            alt="Generated Soul" 
            className="w-full h-full object-cover mix-blend-multiply filter contrast-125"
          />
          
          {/* Active Glitch Overlay */}
          <div className="absolute inset-0 bg-ren-cyan mix-blend-exclusion opacity-10 animate-glitch-skew pointer-events-none"></div>
          
          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ren-magenta/5 to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none"></div>

          <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 font-mono text-xs z-10">
            FIG.01 // {soul.grade}
          </div>
        </div>

        {/* Data Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
               <h2 className="font-serif text-3xl">Diagnosis Report</h2>
               <div className="text-4xl font-mono text-ren-magenta animate-pulse shadow-ren-cyan drop-shadow-sm">
                 {soul.grade}
               </div>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                <span className="text-gray-500">FIDELITY</span>
                <span>{soul.fidelity}%</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                <span className="text-gray-500">ENTROPY</span>
                <span className={`${soul.entropy === 'HIGH' ? 'text-ren-magenta' : 'text-black'}`}>{soul.entropy}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-300 pb-1">
                <span className="text-gray-500">STABILITY</span>
                <span>{soul.stability}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 border-l-2 border-ren-cyan relative overflow-hidden">
              <p className="font-serif italic text-sm text-gray-700 leading-relaxed relative z-10">
                "{soul.analysis}"
              </p>
              <div className="absolute -right-4 -bottom-4 text-6xl text-gray-100 font-serif opacity-50 z-0">"</div>
            </div>
            
            <div className="mt-4 flex gap-2">
               <span className="px-2 py-1 border border-black text-[10px] bg-black text-white">PIONEER</span>
               <span className="px-2 py-1 border border-gray-300 text-gray-400 text-[10px]">VERIFIED</span>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={() => setScreen(ScreenState.INVENTORY)}
              className="flex-1 py-3 border border-black flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
            >
              <Archive size={16} /> <span className="text-xs tracking-widest">ARCHIVE</span>
            </button>
            <button className="flex-1 py-3 border border-ren-cyan text-ren-cyan flex items-center justify-center gap-2 hover:bg-ren-cyan hover:text-white transition-colors">
              <Share2 size={16} /> <span className="text-xs tracking-widest">MARKET</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};