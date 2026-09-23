"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import CloudSphere from "./CloudSphere";
import Logo3D from "./Logo3D";

// pico da piscada branca do logo (85% de 4.5s): a partir daqui o fundo fica branco
const WHITE_AT = 3.8;

interface Props {
  onReady: () => void;
}

export default function IntroScene({ onReady }: Props) {
  const sky = useRef<THREE.Group>(null);
  const frames = useRef(0);
  const start = useRef(0);
  const time = useRef(-1);

  useFrame(({ clock, scene }) => {
    // espera a cena desenhar alguns frames (texturas já na GPU) antes de começar
    if (time.current < 0) {
      frames.current += 1;

      if (frames.current === 2) {
        start.current = clock.elapsedTime;
        time.current = 0;
        onReady();
      }

      return;
    }

    time.current = clock.elapsedTime - start.current;

    if (time.current >= WHITE_AT && sky.current?.visible) {
      sky.current.visible = false;
      scene.background = new THREE.Color("#ffffff");
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[-3, 4, 5]} intensity={2.5} />

      <group ref={sky}>
        <CloudSphere />
      </group>

      <Logo3D time={time} />
    </>
  );
}
