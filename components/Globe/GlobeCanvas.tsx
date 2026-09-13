"use client";

import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import RotatingTitle from "./CurvedTitle";

export default function GlobeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={2} />

      <Globe />
      <RotatingTitle />
    </Canvas>
  );
}