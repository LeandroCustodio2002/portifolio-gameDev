"use client";

import * as THREE from "three";
import { useMemo, useRef, type RefObject } from "react";
import { Center } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const FONT_URL = `${BASE_PATH}/fonts/itc-korinna-bold.typeface.json`;

const TEXT = "CUSTODIO";
const SIZE = 1;
const DEPTH = 0.45;
const LETTER_SPACING = -0.1 * SIZE;
const OUTLINE = 0.07;

// quanto da largura da tela o logo ocupa quando para
const SCREEN_FILL = 0.8;

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

useLoader.preload(FontLoader, FONT_URL);

interface Props {
  // segundos desde o início da intro (-1 enquanto não começou)
  time: RefObject<number>;
}

export default function Logo3D({ time }: Props) {
  const font = useLoader(FontLoader, FONT_URL);
  const group = useRef<THREE.Group>(null);

  const { letters, width } = useMemo(() => {
    const scale = SIZE / font.data.resolution;
    let x = 0;

    const letters = [...TEXT].map((ch) => {
      const shapes = font.generateShapes(ch, SIZE);

      // frente amarela + laterais com chanfro azul
      const face = new THREE.ExtrudeGeometry(shapes, {
        depth: DEPTH,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 2,
      });

      // mesma letra, engordada e um pouco atrás: vira o contorno azul
      const outline = new THREE.ExtrudeGeometry(shapes, {
        depth: DEPTH,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: OUTLINE,
        bevelSegments: 1,
      });

      const letter = { face, outline, x };
      x += font.data.glyphs[ch].ha * scale + LETTER_SPACING;

      return letter;
    });

    return { letters, width: x - LETTER_SPACING };
  }, [font]);

  const materials = useMemo(() => {
    const yellow = new THREE.MeshStandardMaterial({
      color: "#ffd400",
      roughness: 0.35,
      metalness: 0.1,
      toneMapped: false,
    });

    const side = new THREE.MeshStandardMaterial({
      color: "#0028b8",
      roughness: 0.5,
      toneMapped: false,
    });

    const outline = new THREE.MeshStandardMaterial({
      color: "#003cff",
      roughness: 0.5,
      toneMapped: false,
    });

    return { face: [yellow, side], outline };
  }, []);

  useFrame(({ camera, size }) => {
    const g = group.current;
    const t = time.current;

    if (!g) return;

    g.visible = t >= 0.2;
    if (!g.visible) return;

    // distância em que o logo ocupa SCREEN_FILL da largura da tela
    const cam = camera as THREE.PerspectiveCamera;
    const halfFov = THREE.MathUtils.degToRad(cam.fov / 2);
    const aspect = size.width / size.height;
    const rest = width / (SCREEN_FILL * 2 * Math.tan(halfFov) * aspect);

    // voa de longe girando até parar de frente (0.2s → 3s)
    const p = easeOutCubic(clamp01((t - 0.2) / 2.8));

    // depois continua se aproximando devagar (~5%)
    const push = 1 - 0.05 * clamp01((t - 3) / 1.5);

    g.position.z = -THREE.MathUtils.lerp(60, rest, p) * push;
    g.rotation.y = (1 - p) * Math.PI * 2;
    g.rotation.x = (1 - p) * 0.6;
  });

  return (
    <group ref={group} visible={false}>
      <Center>
        {letters.map((l, i) => (
          <group key={i} position={[l.x, 0, 0]}>
            <mesh geometry={l.face} material={materials.face} />
            <mesh
              geometry={l.outline}
              material={materials.outline}
              position={[0, 0, -0.04]}
            />
          </group>
        ))}
      </Center>
    </group>
  );
}
