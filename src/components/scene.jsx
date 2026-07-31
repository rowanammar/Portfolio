import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect, useCallback } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Chip from "./chip";
import Lines from "./lines";
import * as THREE from "three";
import SceneLoader from "./SceneLoader";
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

// Tiny component that fires a callback once it mounts inside Suspense,
// meaning all sibling useGLTF calls have resolved.
function LoadNotifier({ onLoaded }) {
  useEffect(() => {
    onLoaded();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function SceneCanvas({ onModelClick, onFinishLoading, accentColor, theme }) {

  const [cameraDone, setCameraDone] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const handleModelsLoaded = useCallback(() => {
    // Start fade-out, then hide loader completely
    setFadingOut(true);
    setTimeout(() => {
      setModelsLoaded(true);
    }, 600); // matches the CSS fade-out duration
  }, []);

  // Responsive camera FOV
  const isMobile = window.innerWidth < 600;
  const cameraProps = isMobile
    ? { position: [0, 6, 12], fov: 65 }
    : { position: [0, 6, 8], fov: 50 };

  // Determine accent colors for the loader based on theme
  const loaderAccent = theme === 'green' ? '#00ff99' : '#00faff';
  const loaderSecondary = theme === 'green' ? '#39ff14' : '#006aff';

  return (
    <div className="scene-canvas-container">
      {/* SVG Loader overlay — only shown while 3D models are loading */}
      {!modelsLoaded && (
        <div className={`scene-loader-wrapper${fadingOut ? ' fade-out' : ''}`}>
          <SceneLoader accentColor={loaderAccent} secondaryColor={loaderSecondary} />
        </div>
      )}
      <Canvas camera={cameraProps}>
        <fog attach="fog" args={["#000010", 10, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Chip />
          <Lines onModelClick={onModelClick} neonColor={accentColor} />
          <LoadNotifier onLoaded={handleModelsLoaded} />
        </Suspense>
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
