import React from 'react';
import { UserState, ScreenState } from '../types';
import { Hexagon, Cpu, Disc } from 'lucide-react';

export const ScreenInventory: React.FC<{ user: UserState, setScreen: (s: ScreenState) => void }> = ({ user, setScreen }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-black pb-2">
        <h2 className="font-mono text-sm tracking-widest">WORKBENCH_STORAGE // SECTOR_01</h2>
        <span className="font-mono text-xs text-gray-400">{user.inventory.length} ITEMS</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Equipped/Blueprint Slot (Fixed for now) */}
        <div className="aspect-square border border-ren-cyan bg-ren-cyan/5 p-4 flex flex-col justify-between cursor-pointer relative group">
          <div className="absolute top-2 right-2 text-[10px] text-ren-cyan font-bold">[ACTIVE]</div>
          <Hexagon className="w-12 h-12 text-ren-cyan stroke-1 mx-auto mt-4" />
          <div className="text-center">
            <p className="font-serif text-lg leading-none">Standard Doll</p>
            <p className="font-mono text-[9px] text-gray-500 mt-1">[BLUEPRINT]</p>
          </div>
        </div>

        {/* Dynamic Items */}
        {user.inventory.filter(i => i.type === 'CHIP').map((item) => (
          <div key={item.id} className="aspect-square border border-gray-200 hover:border-black p-4 flex flex-col justify-between cursor-pointer transition-all hover:bg-white group">
            <div className="flex justify-between items-start">
               <Cpu className="w-5 h-5 text-gray-400 group-hover:text-ren-magenta transition-colors" />
               <span className="font-mono text-[9px] border border-gray-200 px-1">{item.value}F</span>
            </div>
            <div className="text-center">
               <div className="w-8 h-8 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center group-hover:bg-ren-magenta/10 transition-colors">
                  <Disc className="w-4 h-4" />
               </div>
               <p className="font-mono text-xs tracking-wider">{item.name}</p>
            </div>
          </div>
        ))}

        {/* Empty Slots Filler */}
        {[...Array(8 - user.inventory.length)].map((_, i) => (
           <div key={`empty-${i}`} className="aspect-square border border-gray-100 flex items-center justify-center">
             <span className="text-gray-200 text-2xl font-thin">+</span>
           </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => setScreen(ScreenState.WEAVING)}
          className="w-full max-w-md py-4 border-y border-black font-mono tracking-[0.3em] hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-4 group"
        >
          LOAD_BLUEPRINT <span className="group-hover:translate-x-2 transition-transform">&gt;</span>
        </button>
      </div>
    </div>
  );
};
