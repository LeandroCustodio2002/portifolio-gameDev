"use client";

import { Component, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { Project } from "@/lib/projects";
import { playHoverSfx } from "@/components/Sfx/hoverSfx";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type ProjectSlotProps = {
  position: [number, number, number];
  quaternion: THREE.Quaternion;
  widthScale?: number;
  project?: Project;
  onHover?: (project: Project, localPos: [number, number, number]) => void;
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
    vec3 hot  = vec3(1.0, 0.97, 0.55);

    float sweep = fract(uTime * 0.45);
    float y     = 1.0 - vUv.y;
    float dist  = abs(y - sweep);
    float band  = exp(-dist * dist * 48.0);

    vec3 color = mix(deep, gold, vUv.y);
    color = mix(color, hot, band);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// shader: dois círculos 2D orbitando com trail de dissipação
const orbitalVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const orbitalFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // mapeia [0,1] -> [-1,1] e corrige aspect ratio do slot (1.1 de largura)
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x /= 1.1;

    float orbitR = 0.62;  // raio do círculo de órbita (em coords normalizadas)
    float dotR   = 0.16;  // raio de cada bolinha
    float speed  = 4.0;   // velocidade angular

    float alpha = 0.0;

    for (int b = 0; b < 2; b++) {
      float base = uTime * speed + float(b) * 3.14159265;

      for (int t = 0; t < 12; t++) {
        float angle  = base - float(t) * 0.28;
        vec2  pos    = vec2(cos(angle), sin(angle)) * orbitR;
        float d      = length(uv - pos);
        float circle = smoothstep(dotR, dotR * 0.35, d);
        float fade   = pow(1.0 - float(t) / 12.0, 2.2);
        alpha = max(alpha, circle * fade);
      }
    }

    gl_FragColor = vec4(0.96, 0.44, 0.71, alpha);
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

function OrbitingBalls({ widthScale }: { widthScale: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, 0.003]}>
      <planeGeometry args={[0.23 * widthScale, 0.23]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={orbitalVertexShader}
        fragmentShader={orbitalFragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
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
  const [hovered, setHovered] = useState(false);

  const handlers = project
    ? {
        onPointerEnter: (e: THREE.Event) => {
          (e as unknown as PointerEvent).stopPropagation?.();
          document.body.style.cursor = "pointer";
          setHovered(true);
          playHoverSfx();
          onHover?.(project, position);
        },
        onPointerLeave: () => {
          document.body.style.cursor = "default";
          setHovered(false);
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

      {hovered && <OrbitingBalls widthScale={widthScale} />}
    </group>
  );
}
