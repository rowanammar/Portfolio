import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Chip(props) {
  const { scene } = useGLTF('/models/cpu.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color = new THREE.Color('#e0e0e0');
        child.material.emissiveIntensity = 3;
      }
    });
  }, [scene]);

  const chipRef = useRef(null);

  return (
    <group
      ref={chipRef}
      {...props}
      scale={[2.85, 3.85, 2.85]}
      position={[0, -0.1, 0]}
      rotation={[0, Math.PI, 0]}
    >
      <directionalLight intensity={5} position={[5, 5, 5]} />
      <primitive object={scene} />
    </group>
  );
}