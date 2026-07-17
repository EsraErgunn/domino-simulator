import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useDominoStore } from '../store/useDominoStore';

// Her görünüm için kamera pozisyonu
const VIEWS = {
  perspective: [8, 10, 12],
  top: [0, 20, 0.1],
  side: [18, 3, 0],
  close: [4, 5, 6],
} as const;

export function CameraController() {
  const cameraView = useDominoStore((state) => state.cameraView);
  const { camera } = useThree();

  useEffect(() => {
    const [x, y, z] = VIEWS[cameraView];
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  }, [cameraView, camera]);

  return null;
}