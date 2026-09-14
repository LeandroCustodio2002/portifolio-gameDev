"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TITLE =
  "SELECT THE PROJECT SELECT THE PROJECT ";

export default function CurvedTitle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y -= delta * 1;
  });

  const sphereRadius = 3.9;
  const titleHeight = 2.5;

  return (
    <group ref={groupRef}>
      {TITLE.split("").map((char, index) => {
        const angle =
          (index / TITLE.length) * Math.PI * 2;

        const x = Math.sin(angle) * sphereRadius;
        const z = Math.cos(angle) * sphereRadius;

        return (
          <group
            key={index}
            position={[x, titleHeight, z]}
            rotation={[0, angle, 0]}
          >
            <Text
              position={[0, 0, 0]}
              rotation={[-.5, 0, 0]}
              fontSize={0.5}
              color="white"
              outlineWidth={0.02}
              outlineColor="#6ec1ff"
              anchorX="center"
              anchorY="middle"
              material-side={THREE.DoubleSide}
            >
              {char}
            </Text>
          </group>
        );
      })}
    </group>
  );
}