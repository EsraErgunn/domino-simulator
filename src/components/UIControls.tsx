import { useDominoStore } from '../store/useDominoStore';

export function UIControls() {
  const dominoes = useDominoStore((state) => state.dominoes);
  const isSimulating = useDominoStore((state) => state.isSimulating);
  const startSimulation = useDominoStore((state) => state.startSimulation);
  const stopSimulation = useDominoStore((state) => state.stopSimulation);
  const clearAll = useDominoStore((state) => state.clearAll);
  const placementMode = useDominoStore((state) => state.placementMode);
  const togglePlacementMode = useDominoStore((state) => state.togglePlacementMode);
  const rotatePushDirection = useDominoStore((state) => state.rotatePushDirection);
  const setCameraView = useDominoStore((state) => state.setCameraView);
  const autoRotate = useDominoStore((state) => state.autoRotate);
  const toggleAutoRotate = useDominoStore((state) => state.toggleAutoRotate);

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'rgba(15, 23, 42, 0.85)',
        padding: 20,
        borderRadius: 12,
        color: 'white',
        fontFamily: 'sans-serif',
        minWidth: 200,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}> Domino Simulator</h2>

      <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
        Toplam taş: {dominoes.length}
      </p>

      {/* Play / Stop butonu */}
      {!isSimulating ? (
        <button
          onClick={startSimulation}
          disabled={dominoes.length === 0}
          style={{
            ...buttonStyle,
            background: dominoes.length === 0 ? '#475569' : '#22c55e',
            cursor: dominoes.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ▶ Başlat
        </button>
      ) : (
        <button
          onClick={stopSimulation}
          style={{ ...buttonStyle, background: '#eab308' }}
        >
          ⏸ Durdur
        </button>
      )}
      {/* Yerleştirme modu aç/kapa */}
      <button
        onClick={togglePlacementMode}
        style={{
          ...buttonStyle,
          background: placementMode ? '#3b82f6' : '#64748b',
        }}
      >
        {placementMode ? '✏️ Yerleştirme: AÇIK' : '🔒 Yerleştirme: KAPALI'}
      </button>

      {/* İlk taşın yıkılma yönü */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>İlk taş yönü:</span>
        <button
          onClick={() => rotatePushDirection(-Math.PI / 8)}
          style={{ ...buttonStyle, background: '#8b5cf6', padding: '6px 12px' }}
        >
          ↺
        </button>
        <button
          onClick={() => rotatePushDirection(Math.PI / 8)}
          style={{ ...buttonStyle, background: '#8b5cf6', padding: '6px 12px' }}
        >
          ↻
        </button>
      </div>
      {/* Kamera görünümleri */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, width: '100%' }}>Görünüm:</span>
        <button onClick={() => setCameraView('perspective')} style={viewBtn}>Açılı</button>
        <button onClick={() => setCameraView('top')} style={viewBtn}>Üstten</button>
        <button onClick={() => setCameraView('side')} style={viewBtn}>Yandan</button>
        <button onClick={() => setCameraView('close')} style={viewBtn}>Yakın</button>
      </div>
      
      {/* Otomatik dönme */}
      <button
        onClick={toggleAutoRotate}
        style={{
          ...buttonStyle,
          background: autoRotate ? '#0ea5e9' : '#64748b',
        }}
      >
        {autoRotate ? '🔄 Otomatik Dönme: AÇIK' : '⏹️ Otomatik Dönme: KAPALI'}
      </button>

      {/* Temizle butonu */}
      <button
        onClick={clearAll}
        style={{ ...buttonStyle, background: '#ef4444' }}
      >
        🗑 Hepsini Temizle
      </button>

      <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.7, marginTop: 4 }}>
        <div style={{ fontWeight: 600, marginBottom: 4, opacity: 0.9 }}>
          Kontroller:
        </div>
        <div>🖱️ Fare: zemine tıkla → taş bırak</div>
        <div>⌨️ WASD / Oklar: hayaleti gezdir</div>
        <div>🔄 Q / E: döndür</div>
        <div>⬇️ Enter: taş bırak</div>
        <div>↩️ Ctrl+Z: geri al</div>
        <div style={{ marginTop: 6 }}>▶ Sonra "Başlat" ile zinciri tetikle!</div>
      </div>
    </div>
  );
  
}


// Ortak buton stili
const buttonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: 8,
  padding: '10px 16px',
  fontSize: 14,
  fontWeight: 600,
  color: 'white',
  cursor: 'pointer',
};
const viewBtn: React.CSSProperties = {
  border: 'none',
  borderRadius: 6,
  padding: '6px 10px',
  fontSize: 12,
  fontWeight: 600,
  color: 'white',
  background: '#0ea5e9',
  cursor: 'pointer',
};
