import { Gate, Item } from './types';

export const INITIAL_GATES: Gate[] = [
  { id: 'greek', name: 'CLASSICAL', status: 'UNLOCKED', icon: '🏛️' },
  { id: 'pop', name: 'POP_ART', status: 'UNLOCKED', icon: '🥫' },
  { id: 'cyber', name: 'CYBERNETIC', status: 'LOCKED', icon: '💾' },
  { id: 'void', name: 'THE_VOID', status: 'LOCKED', icon: '🌑' },
];

export const INITIAL_INVENTORY: Item[] = [
  { id: 'bp_standard', name: 'STANDARD_DOLL', type: 'BLUEPRINT' },
  { id: 'chip_shell', name: 'SHELL', type: 'CHIP', value: 100, trend: 5 },
  { id: 'chip_rose', name: 'ROSE', type: 'CHIP', value: 250, trend: -2 },
  { id: 'chip_geo', name: 'GEOMETRY', type: 'CHIP', value: 150, trend: 12 },
  { id: 'chip_neon', name: 'NEON', type: 'CHIP', value: 300, trend: 8 },
  { id: 'chip_gold', name: 'GOLD', type: 'CHIP', value: 500, trend: 15 },
  { id: 'chip_glitch', name: 'GLITCH', type: 'CHIP', value: 800, trend: 20 },
];

export const LOOM_SYMBOLS = [
  '0xFE', '∑', '†', '??', 'µ', '§', '∆', '::', '//', '01'
];
