import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Chip(props) {
  const { scene } = useGLTF('/models/cpu.glb');
  const chipRef = useRef();

  useEffect(() => {
    // Remove any glow shell and set a slightly brighter material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          metalness: 0.5,
          roughness: 0.5,
          emissive: 0x222222, // subtle self-brightening
          emissiveIntensity: 0.22,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={chipRef} {...props} scale={1.3} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
} 