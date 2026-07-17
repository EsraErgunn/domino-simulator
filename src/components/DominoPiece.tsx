import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useEffect, useMemo } from 'react';
import type { Domino } from '../store/useDominoStore';
import { useDominoStore } from '../store/useDominoStore';
import { createDominoTexture } from '../utils/dominoTexture';

interface DominoPieceProps {
  domino: Domino;
  isFirst: boolean;
}

// Domino boyutları (ince ve uzun = kolay devrilir)
const DOMINO_WIDTH = 0.6;
const DOMINO_HEIGHT = 1.2;
const DOMINO_DEPTH = 0.2;

export function DominoPiece({ domino, isFirst }: DominoPieceProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const isSimulating = useDominoStore((state) => state.isSimulating);
  const selectDomino = useDominoStore((state) => state.selectDomino);

  // Domino yüzü dokusunu üret (benekler)
  const texture = useMemo(
    () => createDominoTexture(domino.topPips, domino.bottomPips),
    [domino.topPips, domino.bottomPips]
  );

  useEffect(() => {
    if (isSimulating && isFirst && rigidBodyRef.current) {
      const timeout = setTimeout(() => {
        const dir = useDominoStore.getState().pushDirection;
        const fx = Math.sin(dir) * 1.2;
        const fz = Math.cos(dir) * 1.2;
        rigidBodyRef.current?.applyImpulse({ x: fx, y: 0, z: fz }, true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isSimulating, isFirst]);

  // İlk taş için renk (mercan), diğerleri kendi pastel rengi
  const sideColor = isFirst ? '#ff8b94' : domino.color;

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={isSimulating ? 'dynamic' : 'fixed'}
      position={domino.position}
      rotation={domino.rotation}
      colliders="cuboid"
      mass={1}
      restitution={0}
      friction={0.8}
      linearDamping={0.2}
      angularDamping={0.2}
    >
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (!isSimulating) selectDomino(domino.id);
        }}
      >
        <boxGeometry args={[DOMINO_WIDTH, DOMINO_HEIGHT, DOMINO_DEPTH]} />
        {/* Küpün 6 yüzü: [sağ, sol, üst, alt, ön, arka] */}
        <meshStandardMaterial attach="material-0" color={sideColor} roughness={0.6} />
        <meshStandardMaterial attach="material-1" color={sideColor} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={sideColor} roughness={0.6} />
        <meshStandardMaterial attach="material-3" color={sideColor} roughness={0.6} />
        <meshStandardMaterial attach="material-4" map={texture} roughness={0.5} />
        <meshStandardMaterial attach="material-5" map={texture} roughness={0.5} />
      </mesh>
    </RigidBody>
  );
}