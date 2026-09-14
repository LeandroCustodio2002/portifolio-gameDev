"use client";

import { Canvas } from "@react-three/fiber";
import Globe from "./Globe";
import RotatingTitle from "./CurvedTitle";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  onHover: (project: Project) => void;
  onLeave: () => void;
};

export default function GlobeCanvas({ projects, onHover, onLeave }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={2} />
      <Globe projects={projects} onHover={onHover} onLeave={onLeave} />
      <RotatingTitle />
    </Canvas>
  );
}
