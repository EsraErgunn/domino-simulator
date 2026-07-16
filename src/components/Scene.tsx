import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { DominoPiece } from './DominoPiece';
import { BuildFloor } from './BuildFloor';
import { GhostDomino } from './GhostDomino';
import { useDominoStore } from '../store/useDominoStore';

export function Scene() {
  const dominoes = useDominoStore((state) => state.dominoes);

  return (
    <Canvas
      shadows
      camera={{ position: [8, 10, 12], fov: 50 }}
      style={{ width: '100vw', height: '100vh', background: '#0f172a' }}
    >
      {/* --- Işıklar --- */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* --- Fizik Dünyası --- */}
      <Physics gravity={[0, -9.81, 0]}>
        <BuildFloor />
        {dominoes.map((domino, index) => (
          <DominoPiece key={domino.id} domino={domino} isFirst={index === 0} />
        ))}
      </Physics>

      {/* --- Hayalet önizleme (fizik dışı) --- */}
      <GhostDomino />

      {/* --- Grid --- */}
      <Grid
        args={[30, 30]}
        cellColor="#334155"
        sectionColor="#475569"
        position={[0, 0.01, 0]}
      />

      <OrbitControls makeDefault />
    </Canvas>
  );
}