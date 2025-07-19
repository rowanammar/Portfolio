import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Chip from "./chip";
import Lines from "./lines";
import * as THREE from "three";
import './scene.css';

// Animated camera component
function AnimatedCamera({ onFinish }) {
  const { camera } = useThree();
  const [t, setT] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const fromPos = new THREE.Vector3(0, 2, 10);
  const toPos = new THREE.Vector3(0, 6, 8);

  const fromQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  const toQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));

  // Ease out back function for a settling effect
  function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  useFrame((_, delta) => {
    // Ensure initial camera setup
    if (!initialized) {
      camera.position.copy(fromPos);
      camera.quaternion.copy(fromQuat);
      setInitialized(true);
      return;
    }

    if (t < 1) {
      const nextT = Math.min(t + delta * 0.4, 1);
      setT(nextT);

      // Use easing for a more natural transition, but clamp to 1
      let easedT = easeOutBack(nextT);
      easedT = Math.min(easedT, 1);
      camera.position.lerpVectors(fromPos, toPos, easedT);
      camera.quaternion.slerpQuaternions(fromQuat, toQuat, easedT);

      if (nextT >= 1) {
        // Explicitly set to final position and rotation to avoid snapping
        camera.position.copy(toPos);
        camera.quaternion.copy(toQuat);
        onFinish?.(); 
        onFinishLoading?.();
      }
    }
  });

  return null;
}

export default function SceneCanvas({ onModelClick, onFinishLoading }) {

  const [cameraDone, setCameraDone] = useState(false);

  // Responsive camera FOV
  const isMobile = window.innerWidth < 600;
  const cameraProps = isMobile
    ? { position: [0, 6, 12], fov: 65 }
    : { position: [0, 6, 8], fov: 50 };

  return (
    <div className="scene-canvas-container">
      <Canvas camera={cameraProps}>
        <fog attach="fog" args={["#000010", 10, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Chip />
        <Lines onModelClick={onModelClick} />
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.15}
          enableZoom={true}
          minDistance={isMobile ? 8 : 6}
          maxDistance={isMobile ? 16 : 20}
          target={[0, 0, 0]}
          enablePan={!isMobile}
        />
        <EffectComposer>
          <Bloom
            intensity={1.2}
            kernelSize={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
