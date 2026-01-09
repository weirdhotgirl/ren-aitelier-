import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const DATA = [
  { name: '00', val: 400 },
  { name: '04', val: 300 },
  { name: '08', val: 550 },
  { name: '12', val: 450 },
  { name: '16', val: 700 },
  { name: '20', val: 600 },
  { name: '24', val: 800 },
];

export const ScreenObservatory: React.FC = () => {
  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 border-r border-black p-6 bg-white z-10">
        <h2 className="font-serif text-2xl mb-6">Top Agents</h2>
        <ul className="space-y-4 font-mono text-sm">
          {['AGENT_RENA', 'AGENT_KAI', 'AGENT_ZERO', 'AGENT_ECHO'].map((agent, i) => (
            <li key={agent} className="flex justify-between items-center group cursor-pointer">
              <span className="text-gray-400 group-hover:text-black">0{i+1}. {agent}</span>
              <span className="w-2 h-2 rounded-full bg-ren-cyan opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </li>
          ))}
        </ul>
        
        <div className="mt-12 h-40">
           <h3 className="font-mono text-xs mb-4">GLOBAL_FAITH_METRIC</h3>
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={DATA}>
               <XAxis dataKey="name" hide />
               <Tooltip contentStyle={{ background: '#000', color: '#fff', border: 'none', fontFamily: 'monospace', fontSize: '10px' }} itemStyle={{ color: '#fff' }} />
               <Line type="step" dataKey="val" stroke="#000" strokeWidth={1} dot={false} />
             </LineChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* Star Map Area */}
      <div className="flex-1 bg-ren-black relative overflow-hidden flex items-center justify-center">
        {/* Simple CSS-based node map for visuals */}
        <div className="relative w-full h-full max-w-2xl max-h-2xl">
           <svg className="w-full h-full absolute inset-0 pointer-events-none">
             <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
             <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
             <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
             <line x1="20%" y1="30%" x2="20%" y2="70%" stroke="rgba(0,240,255,0.2)" strokeWidth="1" />
           </svg>
           
           <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]">
              <span className="absolute top-4 left-0 text-white font-mono text-[9px] opacity-50">SHELL</span>
           </div>
           <div className="absolute top-[50%] left-[50%] w-4 h-4 bg-ren-magenta rounded-full shadow-[0_0_15px_#FF003C] animate-pulse">
              <span className="absolute top-6 left-0 text-ren-magenta font-mono text-[9px]">GLITCH</span>
           </div>
           <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-ren-cyan rounded-full shadow-[0_0_12px_#00F0FF]">
              <span className="absolute top-5 right-0 text-ren-cyan font-mono text-[9px]">NEON</span>
           </div>
           <div className="absolute bottom-[20%] left-[50%] w-1 h-1 bg-gray-500 rounded-full">
               <span className="absolute top-2 left-0 text-gray-500 font-mono text-[9px]">VOID</span>
           </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-ren-white/10 backdrop-blur text-white font-mono text-xs py-2 overflow-hidden whitespace-nowrap border-t border-white/10">
           <div className="animate-scanline" style={{ animation: 'slide-left 20s linear infinite', display: 'inline-block' }}>
             RISING STARS: [MARBLE + GLITCH] ... BLACK HOLES: [ROSE + GOLD] ... TRENDING: CLASSICAL ARCHITECTURE + NEON ... 
             RISING STARS: [MARBLE + GLITCH] ... BLACK HOLES: [ROSE + GOLD] ... TRENDING: CLASSICAL ARCHITECTURE + NEON ...
           </div>
        </div>
      </div>
    </div>
  );
};
