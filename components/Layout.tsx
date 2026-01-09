import React from 'react';
import { UserState, ScreenState } from '../types';
import { Battery, Zap, Map as MapIcon, Box, Activity, ShoppingBag, Eye } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: UserState;
  setScreen: (s: ScreenState) => void;
  currentScreen: ScreenState;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, setScreen, currentScreen }) => {
  if (currentScreen === ScreenState.TITLE || currentScreen === ScreenState.IDENTITY) {
    return (
      <div className="relative w-full min-h-screen bg-ren-white text-ren-black overflow-hidden font-mono selection:bg-ren-cyan selection:text-white">
        <div className="scanlines absolute inset-0 pointer-events-none z-50"></div>
        {children}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-ren-white text-ren-black font-mono overflow-hidden flex flex-col selection:bg-ren-cyan selection:text-white">
      <div className="scanlines absolute inset-0 pointer-events-none z-50"></div>
      
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-12 border-b border-black bg-ren-white/90 backdrop-blur-sm z-40 flex items-center justify-between px-4 uppercase text-xs tracking-widest">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-ren-black" />
            <span className="flex gap-0.5">
               {/* Custom progress bar */}
               {[...Array(10)].map((_, i) => (
                 <div key={i} className={`w-1 h-3 ${i < (user.energy / 10) ? 'bg-ren-black' : 'bg-gray-200'}`} />
               ))}
            </span>
            <span className="ml-1">{user.energy}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-ren-magenta" />
            <span>FAITH: {user.faith.toLocaleString()}</span>
          </div>
        </div>
        <div className="font-serif italic text-lg opacity-50">Ren_Atelier</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-20 overflow-y-auto relative z-10">
        {children}
      </main>

      {/* Persistent Nav (Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-black bg-ren-white z-40 flex items-center justify-around">
        <NavBtn active={currentScreen === ScreenState.MAP} onClick={() => setScreen(ScreenState.MAP)} icon={<MapIcon />} label="MAP" />
        <NavBtn active={currentScreen === ScreenState.INVENTORY} onClick={() => setScreen(ScreenState.INVENTORY)} icon={<Box />} label="STORAGE" />
        <NavBtn active={currentScreen === ScreenState.WEAVING} onClick={() => setScreen(ScreenState.WEAVING)} icon={<Activity />} label="WEAVE" />
        <NavBtn active={currentScreen === ScreenState.MARKET} onClick={() => setScreen(ScreenState.MARKET)} icon={<ShoppingBag />} label="MARKET" />
        <NavBtn active={currentScreen === ScreenState.OBSERVATORY} onClick={() => setScreen(ScreenState.OBSERVATORY)} icon={<Eye />} label="OBSERVE" />
      </nav>
    </div>
  );
};

const NavBtn = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300 hover:bg-gray-100 ${active ? 'bg-black text-white' : 'text-gray-500'}`}
  >
    <div className={`w-5 h-5 ${active ? 'animate-pulse' : ''}`}>{icon}</div>
    <span className="text-[10px] tracking-widest">{label}</span>
  </button>
);
