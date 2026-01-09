import React from 'react';
import { INITIAL_INVENTORY } from '../constants';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const ScreenMarket: React.FC = () => {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
         <div>
           <h2 className="font-serif text-3xl">MATERIAL EXCHANGE</h2>
           <p className="font-mono text-xs text-ren-magenta mt-1">FAITH_MARKET // LIVE</p>
         </div>
         <div className="font-mono text-xl">
           INDEX: 1,204.55
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm text-left">
          <thead className="border-b border-black text-xs uppercase tracking-widest text-gray-500">
            <tr>
              <th className="py-4">CHIP_ID</th>
              <th className="py-4">PRICE (FAITH)</th>
              <th className="py-4">TREND (24H)</th>
              <th className="py-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_INVENTORY.filter(i => i.type === 'CHIP').map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-white transition-colors group">
                <td className="py-4 font-bold group-hover:text-ren-cyan transition-colors">[{item.name}]</td>
                <td className="py-4">{item.value}</td>
                <td className="py-4">
                   <div className={`flex items-center gap-1 ${item.trend! > 0 ? 'text-green-600' : 'text-ren-magenta'}`}>
                     {item.trend! > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                     {Math.abs(item.trend!)}%
                   </div>
                </td>
                <td className="py-4 text-right">
                  <button className="px-4 py-1 border border-black hover:bg-black hover:text-white text-xs tracking-wider mr-2">
                    BUY
                  </button>
                  <button className="px-4 py-1 border border-gray-300 text-gray-400 hover:border-ren-magenta hover:text-ren-magenta text-xs tracking-wider">
                    SELL
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
