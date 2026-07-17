import { CanvasTexture, RepeatWrapping } from 'three';

// Kodla tahta damarı deseni üretir
export function createWoodTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Temel ahşap rengi (arka plan)
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(0, 0, 512, 512);

  // Tahta damarları: dalgalı yatay çizgiler
  for (let i = 0; i < 60; i++) {
    const y = Math.random() * 512;
    const opacity = 0.05 + Math.random() * 0.15;
    // Koyu ve açık tonlarla damar hissi
    ctx.strokeStyle =
      Math.random() > 0.5
        ? `rgba(90, 55, 25, ${opacity})`   // koyu damar
        : `rgba(180, 130, 80, ${opacity})`; // açık damar
    ctx.lineWidth = 1 + Math.random() * 2;

    ctx.beginPath();
    ctx.moveTo(0, y);
    // Hafif dalgalı çizgi (gerçek tahta gibi)
    for (let x = 0; x <= 512; x += 20) {
      const wave = Math.sin(x * 0.02 + i) * 4;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 4); // Deseni 4x4 tekrarla (daha ince damar)
  return texture;
}