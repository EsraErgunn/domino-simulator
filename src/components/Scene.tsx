import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { DominoPiece } from './DominoPiece';
import { BuildFloor } from './BuildFloor';
import { GhostDomino } from './GhostDomino';
import { useDominoStore } from '../store/useDominoStore';
import { DirectionArrow } from './DirectionArrow';
import { CameraController } from './CameraController';

export function Scene() {
  const dominoes = useDominoStore((state) => state.dominoes);
  const autoRotate = useDominoStore((state) => state.autoRotate);

  return (
    <Canvas
      shadows
      camera={{ position: [8, 10, 12], fov: 50 }}
      style={{ width: '100vw', height: '100vh', background: '#2a2118' }}
    >
      {/* --- Işıklar --- */}
      <ambientLight intensity={0.7} />
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

      <DirectionArrow />
      <CameraController />

      {/* --- Grid --- */}
      <Grid
        args={[30, 30]}
        cellColor="#c8c8cc"
        sectionColor="#a0a0a8"
        position={[0, 0.01, 0]}
        fadeDistance={35}
      />

      {/* --- Kamera Kontrolü (tek, autoRotate'li) --- */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        zoomSpeed={0.5}
        panSpeed={0.8}
        enablePan={true}
        minDistance={3}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={autoRotate}
        autoRotateSpeed={1.0}
        target={[0, 0, 0]}
        mouseButtons={{
          LEFT: 2,   // Sol tık = PAN (kaydırma)
          MIDDLE: 1, // Orta tık = ZOOM
          RIGHT: 0,  // Sağ tık = ROTATE (döndürme)
        }}
      />
    </Canvas>
  );
}