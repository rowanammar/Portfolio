import { Line, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useState } from 'react';

const modelFiles = [
  '/models/server (1).glb',
  '/models/ID card.glb',
  '/models/envelope.glb',
  '/models/cloud.glb',
];

const modelLabels = [
  'Projects',
  'About Me',
  'Contact Me',
  'Cloud',
];

// Preload models for faster initial load
modelFiles.forEach((file) => useGLTF.preload(file));

// Utility to center and scale a model
function centerAndScaleModel(scene, targetSize = 1.7) {
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = targetSize / maxDim;
  scene.scale.setScalar(scale);
  // Center the model
  const center = new THREE.Vector3();
  box.getCenter(center);
  scene.position.sub(center.multiplyScalar(scale));
}

export default function Lines() {
  const [hovered, setHovered] = useState(null); // index of hovered model

  const linePositions = [
    [0, 0, 0], [3, 0, 0],   // right
    [0, 0, 0], [-3, 0, 0],  // left
    [0, 0, 0], [0, 0, 3],   // forward
    [0, 0, 0], [0, 0, -3],  // backward
  ];

  // Cylinder (disc) parameters
  const cylinderRadius = 0.65;
  const cylinderHeight = 0.08;
  const cylinderSegments = 32;
  const neonColor = '#00faff';

  // Load all models
  const models = modelFiles.map((file) => useGLTF(file));

  // Memoize processed models for performance
  const processedModels = useMemo(() => {
    return models.map((gltf, i) => {
      if (!gltf || !gltf.scene) return null;
      const model = gltf.scene.clone();
      centerAndScaleModel(model, 1.7);
      if (i === 2) {
        model.rotation.x = Math.PI / 2; // Envelope upright
      }
      return model;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models.map(m => m.scene)]);

  // Floating height above each cylinder
  const floatHeight = 0.6;

  // Neon label box component
  function NeonLabel({ text }) {
    return (
      <group position={[0, 1.1, 0]}>
        <mesh>
          <planeGeometry args={[1.7, 0.5]} />
          <meshBasicMaterial
            color={'#0a0a1a'}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[1.75, 0.55]} />
          <meshBasicMaterial
            color={neonColor}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
        <Html center style={{ pointerEvents: 'none' }}>
          <div style={{
            color: neonColor,
            fontWeight: 'bold',
            fontSize: '1.2em',
            textShadow: '0 0 8px #00faff, 0 0 16px #00faff',
            letterSpacing: '0.05em',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            userSelect: 'none',
          }}>{text}</div>
        </Html>
      </group>
    );
  }

  return (
    <>
      {Array.from({ length: linePositions.length / 2 }).map((_, i) => {
        const end = linePositions[i * 2 + 1];
        const model = processedModels[i];
        const isHovered = hovered === i;
        return (
          <group key={i}>
            <Line
              points={[linePositions[i * 2], end]}
              color={neonColor}
              lineWidth={8}
              dashed={false}
            />
            {/* Glowing cylinder at the end of the line */}
            <mesh position={end}>
              <cylinderGeometry args={[cylinderRadius, cylinderRadius, cylinderHeight, cylinderSegments]} />
              <meshStandardMaterial
                color={neonColor}
                emissive={neonColor}
                emissiveIntensity={2.5}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
            {/* Glow shell for the cylinder */}
            <mesh position={end}>
              <cylinderGeometry args={[cylinderRadius * 1.12, cylinderRadius * 1.12, cylinderHeight * 1.2, cylinderSegments]} />
              <meshBasicMaterial
                color={neonColor}
                transparent
                opacity={0.08}
                side={THREE.BackSide}
                depthWrite={false}
              />
            </mesh>
            {/* Floating model above the cylinder (no glow shell) */}
            {model && (
              <group
                position={[end[0], end[1] + floatHeight, end[2]]}
                scale={isHovered ? 1.22 : 1}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(i); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(null); }}
              >
                <primitive object={model} />
                {isHovered && <NeonLabel text={modelLabels[i]} />}
              </group>
            )}
          </group>
        );
      })}
    </>
  );
}

// For further optimization, compress your .glb models with Draco or use lower-poly versions.
