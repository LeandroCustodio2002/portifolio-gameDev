"use client";

import { Component, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
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

const goldVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const goldFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec3 deep = vec3(0.90, 0.62, 0.10);
    vec3 gold = vec3(1.0, 0.84, 0.05);
    vec3 hot = vec3(1.0, 0.97, 0.55);

    float sweep = fract(uTime * 0.45);
    float y = 1.0 - vUv.y;
    float dist = abs(y - sweep);
    float band = exp(-dist * dist * 48.0);

    vec3 color = mix(deep, gold, vUv.y);
    color = mix(color, hot, band);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GoldFrameMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={goldVertexShader}
      fragmentShader={goldFragmentShader}
      toneMapped={false}
    />
  );
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
        <GoldFrameMaterial />
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
