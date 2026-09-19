"use client";

import { useLayoutEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Globe from "./Globe";
import RotatingTitle from "./CurvedTitle";
import type { Project } from "@/lib/projects";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  projects: Project[];
  onHover: (project: Project) => void;
  onLeave: () => void;
  hasActiveProject: boolean;
};

function ShiftViewToRight({ amount = 0.38 }: { amount?: number }) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const extra = size.width * amount;
    camera.setViewOffset(
      size.width + extra,
      size.height,
      0,
      0,
      size.width,
      size.height
    );
    camera.updateProjectionMatrix();

    return () => {
      camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
  }, [camera, size.height, size.width, amount]);

  return null;
}

const RING_RADIUS = 4.65;
const LABEL_COUNT = 36;

function PlayerRing() {
  const innerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.85;
    }
  });

  const labels = Array.from({ length: LABEL_COUNT }, (_, i) => {
    const angle = (i / LABEL_COUNT) * Math.PI * 2;
    const x = Math.sin(angle) * RING_RADIUS;
    const z = Math.cos(angle) * RING_RADIUS;
    return { x, z, angle };
  });

  return (
    <group rotation={[0, 0, Math.PI * 0.28]}>
      <group ref={innerRef}>
        {labels.map(({ x, z, angle }, i) => (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Text
              fontSize={0.28}
              color="#f472b6"
              font={`${BASE_PATH}/fonts/Anton-Regular.ttf`}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.018}
              outlineColor="#831843"
              // renderOrder alto + depthTest desabilitado: passa na frente dos slots
              renderOrder={10}
              material-depthTest={false}
            >
              1P
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function GlobeCanvas({ projects, onHover, onLeave, hasActiveProject }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ShiftViewToRight />
      <ambientLight intensity={2} />
      <Globe projects={projects} onHover={onHover} onLeave={onLeave} />
      <RotatingTitle />
      {hasActiveProject && <PlayerRing />}
    </Canvas>
  );
}
