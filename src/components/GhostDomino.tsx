import { useDominoStore } from '../store/useDominoStore';

const DOMINO_WIDTH = 0.6;
const DOMINO_HEIGHT = 1.2;
const DOMINO_DEPTH = 0.2;

export function GhostDomino() {
  const ghostPosition = useDominoStore((state) => state.ghostPosition);
  const ghostRotation = useDominoStore((state) => state.ghostRotation);
  const isSimulating = useDominoStore((state) => state.isSimulating);

  if (isSimulating) return null;

  return (
    <mesh position={ghostPosition} rotation={[0, ghostRotation, 0]}>
      <boxGeometry args={[DOMINO_WIDTH, DOMINO_HEIGHT, DOMINO_DEPTH]} />
      <meshStandardMaterial color="#22c55e" transparent opacity={0.4} />
    </mesh>
  );
}