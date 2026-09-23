"use client";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const CLOUD_URL = `${BASE_PATH}/cloud.jpg`;

// baixa a textura antes da intro começar (ainda na tela de insert coin)
useTexture.preload(CLOUD_URL);

export default function CloudSphere() {
  const clouds = useTexture(CLOUD_URL);

  clouds.wrapS = THREE.RepeatWrapping;
  clouds.wrapT = THREE.RepeatWrapping;

  useFrame((_, delta) => {
    // direita
    clouds.offset.x -= delta * 0.1;

    // cima
    clouds.offset.y += delta * 0.1;
  });

  return (
    <mesh scale={200}>
      <sphereGeometry args={[1, 128, 128]} />

      <meshBasicMaterial
        map={clouds}
        side={THREE.BackSide}
      />
    </mesh>
  );
}