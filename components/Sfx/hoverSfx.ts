const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const audio = typeof window !== "undefined"
  ? new Audio(`${BASE_PATH}/music/hover.wav`)
  : null;

export function playHoverSfx() {
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = 0.6;
  audio.play().catch(() => {});
}
