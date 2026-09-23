"use client";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// baixa a textura antes da intro começar (ainda na tela de insert coin)
useTexture.preload("/cloud.jpg");

export default function CloudSphere() {
  const clouds = useTexture("/cloud.jpg");

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