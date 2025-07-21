import { Line, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useState } from 'react';
import { a, useSpring } from '@react-spring/three';

const modelFiles = [
  '/models/server (1).glb',
  '/models/envelope.glb', // Swapped: Envelope now second
  '/models/ID card.glb',  // Swapped: ID Card now third
  '/models/cloud.glb',
];

const modelLabels = [
  'Projects',
  'Contact Me',    // Swapped: Envelope label now second
  'About Me',      // Swapped: ID Card label now third
  'Cloud',
];

// Per-model rotation corrections (in radians)
const modelRotations = [
  [0, 0, 0],                  // Server: face front
  [Math.PI / 2, 0, 0],        // Envelope: upright (now second)
  [0, 0, 0],                  // ID Card: no rotation (now third)
  [0, 0, 0],                  // Cloud: no rotation
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

export default function Lines({ onModelClick }) {
  const [hovered, setHovered] = useState(null); // index of hovered model
  const [clicked, setClicked] = useState(null); // index of clicked model

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
      // Rotation is now handled below
      return model;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models.map(m => m.scene)]);

  // Floating height above each cylinder
  const floatHeight = 1.0;

  // Neon label box component
  function NeonLabel({ text }) {
    return (
      <group position={[0, 1.1, 0]}>
        <mesh>
          <planeGeometry args={[1.9, 0.6]} />
          <meshBasicMaterial
            color={'#0a0a1a'}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh>
          <planeGeometry args={[2.05, 0.75]} />
          <meshBasicMaterial
            color={neonColor}
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
        <Html center style={{ pointerEvents: 'none', zIndex: 20 }} distanceFactor={1.6}>
          <div style={{
            color: neonColor,
            fontWeight: 800,
            fontSize: '1.25em',
            textShadow: '0 0 12px #00faff, 0 0 32px #00faff',
            letterSpacing: '0.08em',
            textAlign: 'center',
            fontFamily: 'Orbitron, Share Tech Mono, monospace',
            userSelect: 'none',
            padding: '0.18em 1.1em',
            minWidth: 120,
            whiteSpace: 'nowrap',
            borderRadius: 8,
            boxShadow: '0 0 16px #00faff55',
            background: 'rgba(10,16,32,0.18)',
            border: '1.5px solid #00faff44',
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
        const isClicked = clicked === i;
        // Animate scale on click
        const { scale } = useSpring({
          scale: isClicked ? 1.35 : isHovered ? 1.22 : 1,
          config: { tension: 300, friction: 12 },
        });
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
              <a.group
                position={[end[0], end[1] + floatHeight, end[2]]}
                scale={scale}
                rotation={modelRotations[i]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(i); }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(null); }}
                onClick={() => {
                  setClicked(i);
                  setTimeout(() => {
                    setClicked(null);
                    if (onModelClick) onModelClick(i);
                  }, 180); // Animate before opening panel
                }}
                style={{ cursor: 'pointer' }}
              >
                <primitive object={model} />
              </a.group>
            )}
            {/* Billboard NeonLabel using Html so it always faces the camera and stays above the model */}
            {model && isHovered && (
              <Html
                position={[end[0], end[1] + floatHeight + 1.1, end[2]]}
                center
                transform
                occlude={false}
                style={{ pointerEvents: 'none', zIndex: 20 }}
                distanceFactor={1.6}
              >
                <div style={{
                  color: neonColor,
                  fontWeight: 900,
                  fontSize: '2.1em',
                  textShadow: '0 0 18px #00faff, 0 0 48px #00faff',
                  letterSpacing: '0.12em',
                  textAlign: 'center',
                  fontFamily: 'Orbitron, Share Tech Mono, monospace',
                  userSelect: 'none',
                  padding: '0.32em 2.2em',
                  minWidth: 220,
                  whiteSpace: 'nowrap',
                  borderRadius: 12,
                  boxShadow: '0 0 32px #00faff99',
                  background: 'rgba(10,16,32,0.28)',
                  border: '2.5px solid #00faff88',
                }}>{modelLabels[i]}</div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}
