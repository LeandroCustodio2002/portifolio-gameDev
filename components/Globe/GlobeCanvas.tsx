"use client";

import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Globe from "./Globe";
import RotatingTitle from "./CurvedTitle";
import PlayerRing from "./PlayerRing";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  onHover: (project: Project, localPos: [number, number, number]) => void;
  onLeave: () => void;
  activeSlotPos: [number, number, number] | null;
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

export default function GlobeCanvas({ projects, onHover, onLeave, activeSlotPos }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ShiftViewToRight />
      <ambientLight intensity={2} />
      <Globe projects={projects} onHover={onHover} onLeave={onLeave} />
      <RotatingTitle />
      {activeSlotPos && (
        <>
          <mesh renderOrder={9}>
            <sphereGeometry args={[4.3, 32, 32]} />
            <meshBasicMaterial colorWrite={false} />
          </mesh>
          <PlayerRing activeSlotPos={activeSlotPos} />
        </>
      )}
    </Canvas>
  );
}
