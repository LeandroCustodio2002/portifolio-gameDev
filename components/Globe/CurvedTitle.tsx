"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const TITLE =
  "SELECT THE PROJECT SELECT THE PROJECT  ";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function CurvedTitle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y -= delta * 1;
  });

  const sphereRadius = 3.9;
  const titleHeight = 2.5;
  const letterAdvance = 0.48;
  const spaceAdvance = 1.85;

  const advances = Array.from(TITLE, (char) =>
    char === " " ? spaceAdvance : letterAdvance
  );
  const totalAdvance = advances.reduce((sum, value) => sum + value, 0);

  let cursor = 0;
  const glyphs = Array.from(TITLE, (char, index) => {
    const angle = ((cursor + advances[index] / 2) / totalAdvance) * Math.PI * 2;
    cursor += advances[index];
    return { char, angle, index };
  });

  return (
    <group ref={groupRef}>
      {glyphs.map(({ char, angle, index }) => {
        if (char === " ") return null;

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
              scale={[1.45, 1, 1]}
              font={`${BASE_PATH}/fonts/Anton-Regular.ttf`}
              fontSize={0.64}
              color="white"
              outlineWidth={0.024}
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