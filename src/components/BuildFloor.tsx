import { RigidBody } from '@react-three/rapier';
import type { ThreeEvent } from '@react-three/fiber';
import { useDominoStore } from '../store/useDominoStore';

const FLOOR_SIZE = 30;

// Koordinatı en yakın 0.5'e yuvarla (hafif hizalama)
function snap(value: number): number {
  return Math.round(value * 2) / 2;
}

export function BuildFloor() {
  const addDomino = useDominoStore((state) => state.addDomino);
  const isSimulating = useDominoStore((state) => state.isSimulating);
  const ghostRotation = useDominoStore((state) => state.ghostRotation);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isSimulating) return;
    e.stopPropagation();

    const x = snap(e.point.x);
    const z = snap(e.point.z);

    // Hayalet taşın mevcut rotasyonuyla bırak
    addDomino([x, 0.6, z], [0, ghostRotation, 0]);
  };

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onPointerDown={handlePointerDown}
      >
        <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </RigidBody>
  );
}