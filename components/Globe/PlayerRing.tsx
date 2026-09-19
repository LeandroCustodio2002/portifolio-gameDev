"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const GLOBE_SCALE = 2.2;
const RING_RADIUS = 4.65;
const LABEL_COUNT = 36;
const DIAGONAL_ALPHA = 0.28 * Math.PI;

const LABELS = Array.from({ length: LABEL_COUNT }, (_, i) => {
  const angle = (i / LABEL_COUNT) * Math.PI * 2;
  return { x: Math.sin(angle) * RING_RADIUS, z: Math.cos(angle) * RING_RADIUS, angle };
});

type Props = {
  activeSlotPos: [number, number, number];
};

export default function PlayerRing({ activeSlotPos }: Props) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.35;
    }

    if (!outerRef.current) return;

    const [lx, ly, lz] = activeSlotPos;
    const P = new THREE.Vector3(lx, ly, lz).multiplyScalar(GLOBE_SCALE).normalize();

    const D = new THREE.Vector3(Math.sin(DIAGONAL_ALPHA), Math.cos(DIAGONAL_ALPHA), 0);

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
