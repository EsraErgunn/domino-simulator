import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useEffect } from 'react';
import type { Domino } from '../store/useDominoStore';
import { useDominoStore } from '../store/useDominoStore';

interface DominoPieceProps {
  domino: Domino;
  isFirst: boolean; // İlk taş mı? (zinciri başlatan)
}

// Bir dominonun fiziksel boyutları (metre cinsinden)
const DOMINO_WIDTH = 0.4;
const DOMINO_HEIGHT = 1;
const DOMINO_DEPTH = 0.15;

export function DominoPiece({ domino, isFirst }: DominoPieceProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const isSimulating = useDominoStore((state) => state.isSimulating);
  const selectDomino = useDominoStore((state) => state.selectDomino);

  // Simülasyon başladığında ilk taşa itme kuvveti uygula
  useEffect(() => {
    if (isSimulating && isFirst && rigidBodyRef.current) {
      // Kısa bir gecikme: fizik motorunun hazır olması için
      const timeout = setTimeout(() => {
        rigidBodyRef.current?.applyImpulse({ x: 0, y: 0, z: -2 }, true);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isSimulating, isFirst]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      // İnşaat modu = fixed (sabit), simülasyon = dynamic (hareketli)
      type={isSimulating ? 'dynamic' : 'fixed'}
      position={domino.position}
      rotation={domino.rotation}
      colliders="cuboid" // Kutu şeklinde çarpışma kutusu
      restitution={0.1}  // Sekme miktarı (az)
      friction={0.6}     // Sürtünme
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
        <meshStandardMaterial color={isFirst ? '#ef4444' : domino.color} />
      </mesh>
    </RigidBody>
  );
}