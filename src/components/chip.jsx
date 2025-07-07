import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function Chip(props) {
  const { scene } = useGLTF('/models/cpu.glb');
  const chipRef = useRef();

  useEffect(() => {
    // Force a visible material for all meshes (for debugging black model)
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x00faff,
          metalness: 0.5,
          roughness: 0.4,
        });
      }
    });

    // Add glow shell to chip (clamped opacity and scale)
    const glowGroup = new THREE.Group();
    scene.traverse((child) => {
      if (child.isMesh) {
        const glowGeometry = child.geometry.clone();
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#00faff'),
          transparent: true,
          opacity: 0.015, // even lower for subtle outline
          side: THREE.BackSide,
          depthWrite: false,
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.scale.multiplyScalar(1.03); // only slightly bigger for outline
        glowGroup.add(glowMesh);
      }
    });
    chipRef.current.clear && chipRef.current.clear(); // Remove previous children if any
    chipRef.current.add(glowGroup); // Glow shell
    chipRef.current.add(scene);     // Original chip, unmodified
  }, [scene]);

  return (
    <group ref={chipRef} {...props} scale={1} position={[0, 0, 0]} />
  );
}
