import { create } from 'zustand';

// Pastel renk paleti
const PASTEL_COLORS = [
  '#a8d8ea', // soft blue
  '#aa96da', // soft purple
  '#fcbad3', // soft pink
  '#ffffd2', // soft yellow
  '#a8e6cf', // soft mint
  '#ffd3b6', // soft peach
  '#d4a5a5', // soft rose
];

export interface Domino {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  topPips: number;    // Üst yarıdaki nokta sayısı (0-6)
  bottomPips: number; // Alt yarıdaki nokta sayısı (0-6)
}

interface DominoStore {
  // --- State ---
  dominoes: Domino[];
  isSimulating: boolean;
  selectedDominoId: string | null;

  // Hayalet taş (önizleme) durumu
  ghostPosition: [number, number, number];
  ghostRotation: number; // Y ekseni etrafında dönüş (radyan)

  // İlk taşın itileceği yön (radyan, Y ekseni)
  pushDirection: number;

  placementMode: boolean;
  cameraView: 'perspective' | 'top' | 'side' | 'close';
  autoRotate: boolean;

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

  rotatePushDirection: (delta: number) => void;
  togglePlacementMode: () => void;
  setCameraView: (view: 'perspective' | 'top' | 'side' | 'close') => void;
  toggleAutoRotate: () => void;
}

export const useDominoStore = create<DominoStore>((set) => ({
  // --- Başlangıç state'i ---
  dominoes: [],
  isSimulating: false,
  selectedDominoId: null,
  ghostPosition: [0, 0.6, 0],
  ghostRotation: 0,
  pushDirection: 0,
  placementMode: true,
  cameraView: 'perspective',
  autoRotate: false,

  // --- Actions ---
  addDomino: (position, rotation = [0, 0, 0]) =>
    set((state) => ({
      dominoes: [
        ...state.dominoes,
        {
          id: Date.now().toString() + Math.random(),
          position,
          rotation,
          color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
          topPips: Math.floor(Math.random() * 7),    // 0-6
          bottomPips: Math.floor(Math.random() * 7), // 0-6
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

  rotatePushDirection: (delta) =>
    set((state) => ({
      pushDirection: state.pushDirection + delta,
    })),

  togglePlacementMode: () =>
    set((state) => ({ placementMode: !state.placementMode })),

  setCameraView: (view) => set({ cameraView: view }),

  toggleAutoRotate: () =>
    set((state) => ({ autoRotate: !state.autoRotate })),
}));