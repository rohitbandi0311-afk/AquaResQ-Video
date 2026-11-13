// Single source of truth for timing. 30 FPS, 4,500 frames = exactly 150 s.
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 4500;

export interface SceneDef {
  id: string; // also the voice-over file name: public/aquaresq/audio/vo/<id>.mp3
  name: string;
  start: number;
  duration: number;
}

const raw: Array<[string, string, number]> = [
  ['scene01', 'The Aquaculture World', 240], // 0-239
  ['scene02', 'The Emergency', 300], // 240-539
  ['scene03', 'Introducing AquaResQ', 360], // 540-899
  ['scene04', 'Multi-Pond Management', 420], // 900-1319
  ['scene05', 'Outage Simulation', 540], // 1320-1859
  ['scene06', 'The Resource Challenge', 540], // 1860-2399
  ['scene07', 'The Optimization Engine', 600], // 2400-2999
  ['scene08', 'Results and Comparison', 540], // 3000-3539
  ['scene09', 'Explainable Decisions', 510], // 3540-4049
  ['scene10', 'Honest Limitations', 240], // 4050-4289
  ['scene11', 'Final Brand Reveal', 210], // 4290-4499
];

let cursor = 0;
export const SCENES: SceneDef[] = raw.map(([id, name, duration]) => {
  const s = {id, name, start: cursor, duration};
  cursor += duration;
  return s;
});

if (cursor !== TOTAL_FRAMES) {
  throw new Error(`Timeline is ${cursor} frames, expected ${TOTAL_FRAMES}`);
}

/**
 * Asset switches. Everything below is FALSE because those files were not supplied.
 * Drop the file into public/ and flip the flag to true. Nothing is faked.
 */
export const ASSETS = {
  pondAerial: false, // public/aquaresq/pond-aerial.mp4  (scenes 1-2; fallback = vector pond illustration)
  music: false, // public/aquaresq/audio/background-music.mp3
  voiceover: false, // public/aquaresq/audio/vo/scene01.mp3 ... scene11.mp3 (one file per scene)
  sfx: false, // public/aquaresq/audio/sfx/*.mp3 (see SFX list below)
};

export const SHOW_SUBTITLES = true; // brief explicitly asks for scene-aligned subtitles
export const SHOW_PLACEHOLDER_TAGS = true; // small "PLACEHOLDER" tags; set false for the final render

/** Voice-over starts this many frames after each scene starts. */
export const VO_OFFSET = 15;

export interface SfxCue {
  frame: number; // absolute frame
  file: string; // inside public/aquaresq/audio/sfx/
  volume?: number;
}

const whoosh = SCENES.slice(1).map((s) => ({frame: s.start - 10, file: 'whoosh.mp3', volume: 0.5}));

export const SFX: SfxCue[] = [
  ...whoosh,
  {frame: 240 + 90, file: 'power-down.mp3', volume: 0.7},
  {frame: 240 + 170, file: 'rise.mp3', volume: 0.45},
  {frame: 540 + 8, file: 'logo-reveal.mp3', volume: 0.6},
  {frame: 900 + 92, file: 'click.mp3', volume: 0.5},
  {frame: 1320 + 125, file: 'click.mp3', volume: 0.5},
  {frame: 1320 + 250, file: 'data-pulse.mp3', volume: 0.4},
  {frame: 1860 + 20, file: 'pop.mp3', volume: 0.4},
  {frame: 1860 + 40, file: 'pop.mp3', volume: 0.4},
  {frame: 1860 + 60, file: 'pop.mp3', volume: 0.4},
  {frame: 1860 + 240, file: 'impact.mp3', volume: 0.5},
  {frame: 2400 + 70, file: 'click.mp3', volume: 0.5},
  {frame: 2400 + 200, file: 'data-pulse.mp3', volume: 0.4},
  {frame: 2400 + 410, file: 'pop.mp3', volume: 0.5},
  {frame: 3000 + 10, file: 'rise.mp3', volume: 0.4},
  {frame: 3000 + 270, file: 'impact.mp3', volume: 0.5},
  {frame: 3540 + 250, file: 'pop.mp3', volume: 0.4},
  {frame: 3540 + 330, file: 'pop.mp3', volume: 0.4},
  {frame: 3540 + 410, file: 'pop.mp3', volume: 0.5},
  {frame: 4050 + 40, file: 'pop.mp3', volume: 0.4},
  {frame: 4050 + 90, file: 'pop.mp3', volume: 0.4},
  {frame: 4050 + 140, file: 'pop.mp3', volume: 0.4},
  {frame: 4290 + 8, file: 'logo-reveal.mp3', volume: 0.6},
  {frame: 4290 + 60, file: 'resolve.mp3', volume: 0.6},
];
