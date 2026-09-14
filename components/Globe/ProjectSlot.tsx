"use client";

import { Component, type ReactNode } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import type { Project } from "@/lib/projects";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type ProjectSlotProps = {
  position: [number, number, number];
  quaternion: THREE.Quaternion;
  widthScale?: number;
  project?: Project;
  onHover?: (project: Project) => void;
  onLeave?: () => void;
};

class TextureErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function ProjectSlotIcon({
  src,
  widthScale,
}: {
  src: string;
  widthScale: number;
}) {
  const texture = useTexture(src);
  return (
    <mesh position={[0, 0, 0.001]}>
      <planeGeometry args={[0.2 * widthScale, 0.2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

export default function ProjectSlot({
  position,
  quaternion,
  widthScale = 1.1,
  project,
  onHover,
  onLeave,
}: ProjectSlotProps) {
  const handlers = project
    ? {
        onPointerOver: (e: THREE.Event) => {
          (e as unknown as PointerEvent).stopPropagation?.();
          document.body.style.cursor = "pointer";
          onHover?.(project);
        },
        onPointerOut: () => {
          document.body.style.cursor = "default";
          onLeave?.();
        },
        onClick: (e: THREE.Event) => {
          (e as unknown as MouseEvent).stopPropagation?.();
          window.open(project.url, "_blank");
        },
      }
    : {};

  return (
    <group position={position} quaternion={quaternion} {...handlers}>
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[0.28 * widthScale, 0.28]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      <mesh>
        <planeGeometry args={[0.23 * widthScale, 0.23]} />
        <meshBasicMaterial color="#000814" />
      </mesh>

      {project?.icon && (
        <TextureErrorBoundary>
          <ProjectSlotIcon
            src={BASE_PATH + project.icon}
            widthScale={widthScale}
          />
        </TextureErrorBoundary>
      )}
    </group>
  );
}
