import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function Lines() {
  const linePositions = [
    [0, 0, 0], [3, 0, 0],   // right
    [0, 0, 0], [-3, 0, 0],  // left
    [0, 0, 0], [0, 0, 3],   // forward
    [0, 0, 0], [0, 0, -3],  // backward
  ];

  return (
    <>
      {Array.from({ length: linePositions.length / 2 }).map((_, i) => (
        <Line
          key={i}
          points={[linePositions[i * 2], linePositions[i * 2 + 1]]}
          color="#00faff"
          lineWidth={8}
          dashed={false}
        />
      ))}
    </>
  );
}
