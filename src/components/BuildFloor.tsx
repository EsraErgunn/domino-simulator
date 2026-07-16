import { RigidBody } from '@react-three/rapier';
import type { ThreeEvent } from '@react-three/fiber';
import { useDominoStore } from '../store/useDominoStore';

const FLOOR_SIZE = 30;

export function BuildFloor() {
  const addDomino = useDominoStore((state) => state.addDomino);
  const isSimulating = useDominoStore((state) => state.isSimulating);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    // Simülasyon çalışırken taş eklemeyi engelle
    if (isSimulating) return;

    e.stopPropagation();

    // e.point = tıklanan 3D koordinat (raycaster hesaplıyor)
    const x = e.point.x;
    const z = e.point.z;

    // Taşı zeminin üstüne yerleştir (y = yükseklik/2)
    addDomino([x, 0.5, z], [0, 0, 0]);
  };

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        rotation={[-Math.PI / 2, 0, 0]} // Yatay düzleme çevir
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