import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Chip(props) {
  const { scene } = useGLTF('/models/cpu.glb');
  const chipRef = useRef();

  useEffect(() => {
    // Remove emissive from chip material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          metalness: 0.5,
          roughness: 0.5,
          emissive: 0x000000,
          emissiveIntensity: 0,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={chipRef} {...props} scale={1} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
} 