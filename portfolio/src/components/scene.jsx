import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useSpring, a } from "@react-spring/three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Chip from "./chip";
import Lines from "./lines";

function AnimatedCamera() {
  const camGroup = useRef();
  const { camera } = useThree();

  // Smooth camera animation from front to top-down
  const { position, rotation } = useSpring({
    from: {
      position: [0, 2, 10],
      rotation: [0, 0, 0],
    },
    to: {
      position: [0, 6, 0],
      rotation: [-Math.PI / 2, 0, 0],
    },
    config: { mass: 1, tension: 50, friction: 80 },

    delay: 500, // half-second pause before transition starts
  });

  // Attach camera to animated group
  useFrame(() => {
    if (camGroup.current && !camGroup.current.children.includes(camera)) {
      camGroup.current.add(camera);
    }
  });

  return <a.group ref={camGroup} position={position} rotation={rotation} />;
}

export default function SceneCanvas({ onModelClick }) {
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
      <Canvas
        camera={{ position: [0, 2.5, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#000010", 10, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <AnimatedCamera />
        <Chip />
        <Lines onModelClick={onModelClick} />
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.15}
          enableZoom={true}
          minDistance={7}
          maxDistance={20}
          target={[0, 0, 0]}
        />
        <EffectComposer>
          <Bloom
            intensity={1.2} // How strong the glow is
            kernelSize={2}
            luminanceThreshold={0.1} // Lower = more surfaces glow
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
