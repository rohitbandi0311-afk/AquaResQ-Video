import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import {ASSETS, SCENES, SFX, TOTAL_FRAMES, VO_OFFSET} from '../data/timeline';
import {CUES} from '../data/cues';
import {CLAMP} from '../utils/anim';

const MUSIC_BASE = 0.3;
const MUSIC_DUCKED = 0.09;

/** Music volume: fades in/out and ducks under every spoken cue (smooth 10-frame ramps). */
const musicVolume = (f: number): number => {
  let duck = 0;
  for (const c of CUES) {
    const d = interpolate(f, [c.start - 10, c.start, c.end, c.end + 12], [0, 1, 1, 0], CLAMP);
    if (d > duck) duck = d;
  }
  const fade = interpolate(f, [0, 45, TOTAL_FRAMES - 90, TOTAL_FRAMES], [0, 1, 1, 0], CLAMP);
  return (MUSIC_BASE - (MUSIC_BASE - MUSIC_DUCKED) * duck) * fade;
};

/** Every layer is switched on only when the real file exists (flags in data/timeline.ts). */
export const AudioLayer: React.FC = () => (
  <>
    {ASSETS.music && <Audio src={staticFile('aquaresq/audio/background-music.mp3')} volume={musicVolume} />}
    {ASSETS.voiceover &&
      SCENES.map((s) => (
        <Sequence key={s.id} from={s.start + VO_OFFSET} name={`VO ${s.id}`}>
          <Audio src={staticFile(`aquaresq/audio/vo/${s.id}.mp3`)} volume={1} />
        </Sequence>
      ))}
    {ASSETS.sfx &&
      SFX.map((x, i) => (
        <Sequence key={i} from={Math.max(0, x.frame)} name={`SFX ${x.file}`}>
          <Audio src={staticFile(`aquaresq/audio/sfx/${x.file}`)} volume={x.volume ?? 0.5} />
        </Sequence>
      ))}
  </>
);
