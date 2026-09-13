"use client";

import { useRef } from "react";
import * as THREE from "three";

export default function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={globeRef} scale={2}>
      {Array.from({ length: 13 }).map((_, i) => (
        <mesh
          key={`vertical-${i}`}
          rotation={[0, (Math.PI / 13) * i, 0]}
        >
          <torusGeometry args={[2, 0.015, 8, 128]} />
          <meshBasicMaterial color="#2991f9" />
        </mesh>
      ))}

      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i + 1) / 14;

        const y = (t - 0.5) * 4;

        const radius = Math.sqrt(
          Math.max(0.1, 4 - y * y)
        );

        return (
          <mesh
            key={`horizontal-${i}`}
            position={[0, y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry
              args={[radius, 0.015, 8, 128]}
            />
            <meshBasicMaterial color="#2991f9" />
          </mesh>
        );
      })}
    </group>
  );
}