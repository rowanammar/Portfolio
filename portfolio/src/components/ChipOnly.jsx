import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function RawChip() {
  const { scene } = useGLTF('/models/cpu.glb');
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}

export default function ChipOnly() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RawChip />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
} 