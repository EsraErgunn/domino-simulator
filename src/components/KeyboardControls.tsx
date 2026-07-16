import { useEffect } from 'react';
import { useDominoStore } from '../store/useDominoStore';

const MOVE_STEP = 0.5;              // Her tuşta ne kadar kayar
const ROTATE_STEP = Math.PI / 12;  // Her dönüşte 15 derece

export function KeyboardControls() {
  const moveGhost = useDominoStore((state) => state.moveGhost);
  const rotateGhost = useDominoStore((state) => state.rotateGhost);
  const addDomino = useDominoStore((state) => state.addDomino);
  const undo = useDominoStore((state) => state.undo);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Store'un güncel halini oku
      const state = useDominoStore.getState();
      if (state.isSimulating) return; // Simülasyonda klavye kapalı

      switch (e.key.toLowerCase()) {
        // --- Hareket: WASD + Oklar ---
        case 'w':
        case 'arrowup':
          moveGhost(0, -MOVE_STEP);
          break;
        case 's':
        case 'arrowdown':
          moveGhost(0, MOVE_STEP);
          break;
        case 'a':
        case 'arrowleft':
          moveGhost(-MOVE_STEP, 0);
          break;
        case 'd':
        case 'arrowright':
          moveGhost(MOVE_STEP, 0);
          break;

        // --- Döndürme: Q / E ---
        case 'q':
          rotateGhost(-ROTATE_STEP);
          break;
        case 'e':
          rotateGhost(ROTATE_STEP);
          break;

        // --- Taş bırak: Enter veya Space ---
        case 'enter':
        case ' ':
          e.preventDefault();
          addDomino(state.ghostPosition, [0, state.ghostRotation, 0]);
          break;

        // --- Geri al: Ctrl+Z ---
        case 'z':
          if (e.ctrlKey) {
            e.preventDefault();
            undo();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Temizlik: bileşen kaldırılınca dinleyiciyi kaldır
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveGhost, rotateGhost, addDomino, undo]);

  return null; // Görsel çıktısı yok
}