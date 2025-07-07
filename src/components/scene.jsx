import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Chip from "./chip";
import Lines from "./lines";
import * as THREE from "three";

// Animated camera component
function AnimatedCamera({ onFinish }) {
  const { camera } = useThree();
  const [t, setT] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const fromPos = new THREE.Vector3(0, 2, 10);
  const toPos = new THREE.Vector3(0, 6, 8);

  const fromQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  const toQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));

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

      camera.position.lerpVectors(fromPos, toPos, nextT);
      camera.quaternion.slerpQuaternions(fromQuat, toQuat, nextT);

      if (nextT >= 1) {
        onFinish?.(); // Notify parent when animation finishes
      }
    }
  });

  return null;
}

export default function SceneCanvas({ onModelClick }) {
  const [cameraDone, setCameraDone] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <fog attach="fog" args={["#000010", 10, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <AnimatedCamera onFinish={() => setCameraDone(true)} />
        <Chip />
        <Lines onModelClick={onModelClick} />

        {cameraDone && (
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.15}
            enableZoom={true}
            minDistance={7}
            maxDistance={20}
            target={[0, 0, 0]}
          />
        )}

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
