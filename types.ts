export enum ScreenState {
  TITLE = 'TITLE',
  IDENTITY = 'IDENTITY',
  MAP = 'MAP',
  INVENTORY = 'INVENTORY',
  LOOM = 'LOOM',
  WEAVING = 'WEAVING',
  DIAGNOSIS = 'DIAGNOSIS',
  OBSERVATORY = 'OBSERVATORY',
  MARKET = 'MARKET'
}

export interface Item {
  id: string;
  name: string;
  type: 'BLUEPRINT' | 'CHIP';
  icon?: string;
  value?: number;
  trend?: number; // percentage
}

export interface GeneratedSoul {
  imageUrl: string;
  grade: string;
  fidelity: number;
  entropy: 'LOW' | 'MEDIUM' | 'HIGH';
  stability: 'STABLE' | 'VOLATILE' | 'NULL';
  analysis: string;
}

export interface Gate {
  id: string;
  name: string;
  status: 'UNLOCKED' | 'LOCKED';
  icon: string;
}

export interface UserState {
  name: string;
  energy: number;
  faith: number;
  inventory: Item[];
  equippedBlueprint: string | null;
  equippedChips: string[]; // IDs
}
