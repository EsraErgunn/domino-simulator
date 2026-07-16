import { create } from 'zustand';

// Bir dominonun veri şekli
export interface Domino {
  id: string;
  position: [number, number, number]; // x, y, z
  rotation: [number, number, number]; // rx, ry, rz
  color: string;
}

// Store'un tam yapısı (state + actions)
interface DominoStore {
  dominoes: Domino[];
  isSimulating: boolean;
  selectedDominoId: string | null;

  addDomino: (position: [number, number, number], rotation?: [number, number, number]) => void;
  removeDomino: (id: string) => void;
  updateDominoPosition: (id: string, position: [number, number, number]) => void;
  updateDominoRotation: (id: string, rotation: [number, number, number]) => void;
  clearAll: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  selectDomino: (id: string | null) => void;
}

export const useDominoStore = create<DominoStore>((set) => ({
  // --- Başlangıç state'i ---
  dominoes: [],
  isSimulating: false,
  selectedDominoId: null,

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

  updateDominoPosition: (id, position) =>
    set((state) => ({
      dominoes: state.dominoes.map((d) =>
        d.id === id ? { ...d, position } : d
      ),
    })),

  updateDominoRotation: (id, rotation) =>
    set((state) => ({
      dominoes: state.dominoes.map((d) =>
        d.id === id ? { ...d, rotation } : d
      ),
    })),

  clearAll: () =>
    set({ dominoes: [], isSimulating: false, selectedDominoId: null }),

  startSimulation: () => set({ isSimulating: true }),
  stopSimulation: () => set({ isSimulating: false }),

  selectDomino: (id) => set({ selectedDominoId: id }),
}));