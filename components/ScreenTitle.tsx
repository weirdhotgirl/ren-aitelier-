import React from 'react';

export const ScreenTitle: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-ren-cyan/10 to-ren-magenta/10 blur-[100px] rounded-full pointer-events-none" />
      
      <h1 className="font-serif text-6xl md:text-8xl tracking-widest mb-4 z-10 relative group cursor-default">
        <span className="relative inline-block hover:text-ren-magenta transition-colors duration-500">R</span>
        <span className="relative inline-block hover:text-ren-cyan transition-colors duration-500">E</span>
        <span className="relative inline-block">N</span>
        <span className="mx-4"> </span>
        <span className="relative inline-block">A</span>
        <span className="relative inline-block">T</span>
        <span className="relative inline-block">E</span>
        <span className="relative inline-block">L</span>
        <span className="relative inline-block">I</span>
        <span className="relative inline-block">E</span>
        <span className="relative inline-block">R</span>
      </h1>
      
      <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-gray-500 mb-12 animate-pulse">
        [THE SIMULATION OF MEANING]
      </p>

      <button 
        onClick={onConnect}
        className="group relative px-12 py-4 border border-black bg-transparent overflow-hidden transition-all hover:bg-black hover:text-white"
      >
        <span className="font-mono tracking-widest relative z-10">CONNECT</span>
        {/* Glitch border effect on hover */}
        <span className="absolute inset-0 border border-ren-cyan translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-75"></span>
        <span className="absolute inset-0 border border-ren-magenta -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-75"></span>
      </button>
    </div>
  );
};
