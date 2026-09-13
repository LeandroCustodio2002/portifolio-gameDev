"use client";

import * as THREE from "three";

type ProjectSlotProps = {
  position: [number, number, number];
  quaternion: THREE.Quaternion;
  widthScale?: number;
};

export default function ProjectSlot({
  position,
  quaternion,
  widthScale = 1.1,
}: ProjectSlotProps) {
  return (
    <group
      position={position}
      quaternion={quaternion}
    >
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry
          args={[
            0.28 * widthScale,
            0.28,
          ]}
        />
        <meshBasicMaterial
          color="#FFD700"
        />
      </mesh>

      <mesh>
        <planeGeometry
          args={[
            0.23 * widthScale,
            0.23,
          ]}
        />
        <meshBasicMaterial
          color="#000814"
        />
      </mesh>
    </group>
  );
}