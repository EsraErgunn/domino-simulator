import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useEffect } from 'react';
import type { Domino } from '../store/useDominoStore';
import { useDominoStore } from '../store/useDominoStore';

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

  useEffect(() => {
    if (isSimulating && isFirst && rigidBodyRef.current) {
      const timeout = setTimeout(() => {
        // Üst kısımdan it (daha gerçekçi devrilme)
        rigidBodyRef.current?.applyImpulse({ x: 0, y: 0, z: -1.2 }, true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isSimulating, isFirst]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={isSimulating ? 'dynamic' : 'fixed'}
      position={domino.position}
      rotation={domino.rotation}
      colliders="cuboid"
      mass={1}
      restitution={0}      // Sıfır sekme = zıplamaz
      friction={0.8}       // Yüksek sürtünme = kaymaz
      linearDamping={0.2}  // Hareket sönümü (yavaşça durur)
      angularDamping={0.2} // Dönme sönümü
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
        <meshStandardMaterial
          color={isFirst ? '#ef4444' : domino.color}
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>
    </RigidBody>
  );
}