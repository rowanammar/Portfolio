import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Chip(props) {
  const { scene } = useGLTF('/models/cpu.glb');
  const chipRef = useRef();

  useEffect(() => {
    // Add glow shell to chip
    const glowGroup = new THREE.Group();

    scene.traverse((child) => {
      if (child.isMesh) {
        // Clone geometry for glow shell only, do NOT modify chip material
        const glowGeometry = child.geometry.clone();
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#00faff'),
          transparent: true,
          opacity: 0.03, // very low for subtle outline
          side: THREE.BackSide,
          depthWrite: false,
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.scale.multiplyScalar(1.08); // slightly bigger for outline
        glowGroup.add(glowMesh);
      }
    });
    chipRef.current.add(glowGroup); // Glow shell
    chipRef.current.add(scene);     // Original chip, unmodified
  }, [scene]);

  return (
    <group ref={chipRef} {...props} scale={1} position={[0, 0, 0]} />
  );
}
