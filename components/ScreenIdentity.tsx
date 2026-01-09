import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export const ScreenIdentity: React.FC<{ onInitialize: (name: string) => void }> = ({ onInitialize }) => {
  const [name, setName] = useState('');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-ren-white relative">
       {/* Slide over effect would be handled by a transition wrapper in standard apps, here assuming simple switch */}
       
       <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center mb-12 hover:border-ren-black transition-colors cursor-pointer group">
         <Upload className="w-8 h-8 text-gray-300 group-hover:text-ren-black mb-2" />
         <span className="font-mono text-xs text-gray-400 group-hover:text-ren-black">[UPLOAD_RECEPTACLE]</span>
         <div className="absolute inset-0 rounded-full border border-ren-cyan opacity-0 group-hover:animate-ping"></div>
       </div>

       <div className="w-full max-w-sm px-8">
         <label className="block font-mono text-xs text-gray-400 mb-2">CODE_NAME: ________</label>
         <div className="flex items-center border-b border-black py-2">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              className="appearance-none bg-transparent border-none w-full text-ren-black mr-3 py-1 px-2 leading-tight focus:outline-none font-mono text-xl tracking-widest placeholder-gray-200"
              placeholder="ENTER_ID"
              autoFocus
            />
            <div className="w-3 h-6 bg-ren-black animate-flicker"></div>
         </div>
       </div>

       <button 
         onClick={() => name && onInitialize(name)}
         disabled={!name}
         className="mt-16 px-8 py-3 bg-ren-black text-white font-mono text-sm tracking-widest hover:bg-ren-magenta disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
       >
         INITIALIZE_AGENT
       </button>
    </div>
  );
};
