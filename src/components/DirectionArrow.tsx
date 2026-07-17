import { useDominoStore } from '../store/useDominoStore';

export function DirectionArrow() {
  const dominoes = useDominoStore((state) => state.dominoes);
  const pushDirection = useDominoStore((state) => state.pushDirection);
  const isSimulating = useDominoStore((state) => state.isSimulating);

  // İlk taş yoksa veya simülasyon başladıysa oku gösterme
  if (dominoes.length === 0 || isSimulating) return null;

  const firstDomino = dominoes[0];
  const [x, , z] = firstDomino.position;

  return (
    <group
      position={[x, 1.5, z]}
      rotation={[0, pushDirection, 0]}
    >
      {/* Ok gövdesi (silindir) */}
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      {/* Ok ucu (koni) */}
      <mesh position={[0, 0, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.4, 12]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}