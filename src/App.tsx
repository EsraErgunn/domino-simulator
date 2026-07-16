import { Scene } from './components/Scene';
import { UIControls } from './components/UIControls';
import { KeyboardControls } from './components/KeyboardControls';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <UIControls />
      <KeyboardControls />
      <Scene />
    </div>
  );
}

export default App;