"use client";

import { useRef } from "react";
import * as THREE from "three";
import ProjectSlot from "./ProjectSlot";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  onHover: (project: Project) => void;
  onLeave: () => void;
};

export default function Globe({ projects, onHover, onLeave }: Props) {
  const globeRef = useRef<THREE.Group>(null);

  const rows = [4, 6, 6, 6, 6, 4];

  const sphereRadius = 2.07;
  const rowSpacing = 0.27;
  const spacing = 0.29;

  const slots: {
    id: string;
    position: [number, number, number];
    quaternion: THREE.Quaternion;
  }[] = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const count = rows[rowIndex];

    const y =
      ((rows.length - 1) * rowSpacing) / 2 -
      rowIndex * rowSpacing;

    const totalWidth = (count - 1) * spacing;

    for (let colIndex = 0; colIndex < count; colIndex++) {
      const x = colIndex * spacing - totalWidth / 2;

      const z = Math.sqrt(
        Math.max(0, sphereRadius * sphereRadius - x * x - y * y)
      );

      const normal = new THREE.Vector3(x, y, z).normalize();
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

      slots.push({
        id: `${rowIndex}-${colIndex}`,
        position: [x, y, z],
        quaternion,
      });
    }
  }

  return (
    <group ref={globeRef} scale={2.2}>
      {/* MERIDIANOS */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`vertical-${i}`} rotation={[0, (Math.PI / 20) * i, 0]}>
          <torusGeometry args={[2, 0.01, 8, 128]} />
          <meshBasicMaterial color="#2991f9" />
        </mesh>
      ))}

      {/* PARALELOS */}
      {Array.from({ length: 13 }).map((_, i) => {
        const t = (i + 1) / 14;
        const y = (t - 0.5) * 4;
        const radius = Math.sqrt(Math.max(0.1, 4 - y * y));
        return (
          <mesh
            key={`horizontal-${i}`}
            position={[0, y, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[radius, 0.01, 8, 128]} />
            <meshBasicMaterial color="#2991f9" />
          </mesh>
        );
      })}

      {/* PROJECT SLOTS */}
      {slots.map((slot, index) => (
        <ProjectSlot
          key={slot.id}
          position={slot.position}
          quaternion={slot.quaternion}
          project={projects[index]}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
    </group>
  );
}
