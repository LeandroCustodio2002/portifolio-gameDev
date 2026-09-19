"use client";

import { useLayoutEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Globe from "./Globe";
import RotatingTitle from "./CurvedTitle";
import type { Project } from "@/lib/projects";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// scale do grupo Globe — deve bater com Globe.tsx
const GLOBE_SCALE = 2.2;
const RING_RADIUS = 4.65;
const LABEL_COUNT = 36;

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

const LABELS = Array.from({ length: LABEL_COUNT }, (_, i) => {
  const angle = (i / LABEL_COUNT) * Math.PI * 2;
  return { x: Math.sin(angle) * RING_RADIUS, z: Math.cos(angle) * RING_RADIUS, angle };
});

function PlayerRing({ activeSlotPos }: { activeSlotPos: [number, number, number] }) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    // órbita contínua dos labels
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.35;
    }

    if (!outerRef.current) return;

    // posição mundo do slot = posição local × scale do Globe
    const [lx, ly, lz] = activeSlotPos;
    const P = new THREE.Vector3(lx, ly, lz).multiplyScalar(GLOBE_SCALE).normalize();

    // eixo de referência diagonal (mesmo ângulo Z da versão estática: 0.28π)
    // aparece diagonal para câmera em +Z pois tem componentes X e Y
    const alpha = 0.28 * Math.PI;
    const D = new THREE.Vector3(Math.sin(alpha), Math.cos(alpha), 0);

    // projetar D para fora de P → N ⊥ P, mas próximo de D (mantém diagonal)
    const N = D.clone().addScaledVector(P, -D.dot(P));
    if (N.lengthSq() < 1e-6) N.set(0, 0, 1).addScaledVector(P, -P.z);
    N.normalize();

    const target = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      N
    );
    outerRef.current.quaternion.slerp(target, 0.08);
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        {LABELS.map(({ x, z, angle }, i) => (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Text
              fontSize={0.28}
              color="#ff0090"
              font={`${BASE_PATH}/fonts/Anton-Regular.ttf`}
              anchorX="center"
              anchorY="middle"
              fillOpacity={0.72}
              renderOrder={10}
            >
              1P 1P
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function GlobeCanvas({ projects, onHover, onLeave, activeSlotPos }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ShiftViewToRight />
      <ambientLight intensity={2} />
      <Globe projects={projects} onHover={onHover} onLeave={onLeave} />
      <RotatingTitle />
      {/* Máscara de profundidade: esfera invisível que preenche o depth buffer
          no volume do globo, bloqueando labels do anel que ficam atrás dele */}
      {activeSlotPos && (
        <mesh renderOrder={9}>
          <sphereGeometry args={[4.3, 32, 32]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>
      )}
      {activeSlotPos && <PlayerRing activeSlotPos={activeSlotPos} />}
    </Canvas>
  );
}
