import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SceneCanvas from './components/scene';
import MatrixBackground from './components/bg';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <SceneCanvas />
      <MatrixBackground />
    </div>
  );
}

export default App;
