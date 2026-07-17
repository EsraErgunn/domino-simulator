import { RigidBody } from '@react-three/rapier';
import type { ThreeEvent } from '@react-three/fiber';
import { useMemo } from 'react';
import { useDominoStore } from '../store/useDominoStore';
import { createWoodTexture } from '../utils/woodTexture';

const FLOOR_SIZE = 30;

function snap(value: number): number {
  return Math.round(value * 2) / 2;
}

export function BuildFloor() {
  const addDomino = useDominoStore((state) => state.addDomino);
  const isSimulating = useDominoStore((state) => state.isSimulating);
  const ghostRotation = useDominoStore((state) => state.ghostRotation);
  const placementMode = useDominoStore((state) => state.placementMode);

  // Dokuyu bir kez üret (her render'da yeniden üretme)
  const woodTexture = useMemo(() => createWoodTexture(), []);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (isSimulating) return;
    if (!placementMode) return;
    e.stopPropagation();

    const x = snap(e.point.x);
    const z = snap(e.point.z);
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
        <meshStandardMaterial
          map={woodTexture}
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
    </RigidBody>
  );
}