import { create } from 'zustand';

export interface Domino {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

interface DominoStore {
  // --- State ---
  dominoes: Domino[];
  isSimulating: boolean;
  selectedDominoId: string | null;

  // Hayalet taş (önizleme) durumu
  ghostPosition: [number, number, number];
  ghostRotation: number; // Y ekseni etrafında dönüş (radyan)

  // --- Actions ---
  addDomino: (position: [number, number, number], rotation?: [number, number, number]) => void;
  removeDomino: (id: string) => void;
  undo: () => void; // Son taşı geri al
  clearAll: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  selectDomino: (id: string | null) => void;

  // Hayalet taş kontrolleri
  moveGhost: (dx: number, dz: number) => void;
  setGhostPosition: (position: [number, number, number]) => void;
  rotateGhost: (delta: number) => void;
}

export const useDominoStore = create<DominoStore>((set) => ({
  // --- Başlangıç state'i ---
  dominoes: [],
  isSimulating: false,
  selectedDominoId: null,
  ghostPosition: [0, 0.6, 0],
  ghostRotation: 0,

  // --- Actions ---
  addDomino: (position, rotation = [0, 0, 0]) =>
    set((state) => ({
      dominoes: [
        ...state.dominoes,
        {
          id: Date.now().toString() + Math.random(),
          position,
          rotation,
          color: '#3b82f6',
        },
      ],
    })),

  removeDomino: (id) =>
    set((state) => ({
      dominoes: state.dominoes.filter((d) => d.id !== id),
    })),

  undo: () =>
    set((state) => ({
      dominoes: state.dominoes.slice(0, -1), // Son elemanı çıkar
    })),

  clearAll: () =>
    set({ dominoes: [], isSimulating: false, selectedDominoId: null }),

  startSimulation: () => set({ isSimulating: true }),
  stopSimulation: () => set({ isSimulating: false }),

  selectDomino: (id) => set({ selectedDominoId: id }),

  // --- Hayalet taş kontrolleri ---
  moveGhost: (dx, dz) =>
    set((state) => ({
      ghostPosition: [
        state.ghostPosition[0] + dx,
        state.ghostPosition[1],
        state.ghostPosition[2] + dz,
      ],
    })),

  setGhostPosition: (position) => set({ ghostPosition: position }),

  rotateGhost: (delta) =>
    set((state) => ({
      ghostRotation: state.ghostRotation + delta,
    })),
}));