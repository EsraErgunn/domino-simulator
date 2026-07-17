import { CanvasTexture } from 'three';

// Bir sayı için nokta konumlarını döndürür (zar deseni gibi)
function getPipPositions(count: number): [number, number][] {
  const positions: Record<number, [number, number][]> = {
    0: [],
    1: [[0.5, 0.5]],
    2: [[0.3, 0.3], [0.7, 0.7]],
    3: [[0.3, 0.3], [0.5, 0.5], [0.7, 0.7]],
    4: [[0.3, 0.3], [0.7, 0.3], [0.3, 0.7], [0.7, 0.7]],
    5: [[0.3, 0.3], [0.7, 0.3], [0.5, 0.5], [0.3, 0.7], [0.7, 0.7]],
    6: [[0.3, 0.25], [0.7, 0.25], [0.3, 0.5], [0.7, 0.5], [0.3, 0.75], [0.7, 0.75]],
  };
  return positions[count] || [];
}

// Domino yüzü çizer: üstte ve altta birer sayı (0-6)
export function createDominoTexture(top: number, bottom: number): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512; // Domino dikey: 1 genişlik, 2 yükseklik oranı
  const ctx = canvas.getContext('2d')!;

  // Fildişi beyaz zemin
  ctx.fillStyle = '#f8f4e8';
  ctx.fillRect(0, 0, 256, 512);

  // Kenarlık
  ctx.strokeStyle = '#d0c8b0';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 504);

  // Ortadaki bölme çizgisi
  ctx.beginPath();
  ctx.moveTo(20, 256);
  ctx.lineTo(236, 256);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#2a2a2a';
  ctx.stroke();

  // Noktaları çiz (üst yarı ve alt yarı)
  ctx.fillStyle = '#1a1a1a';
  const drawPips = (count: number, offsetY: number) => {
    getPipPositions(count).forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px * 256, offsetY + py * 256, 18, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  drawPips(top, 0);    // Üst yarı (0-256 px)
  drawPips(bottom, 256); // Alt yarı (256-512 px)

  return new CanvasTexture(canvas);
}