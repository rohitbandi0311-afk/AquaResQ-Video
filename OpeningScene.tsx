import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {PondFootage} from '../components/PondAerial';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {CLAMP} from '../utils/anim';

// Scene 1 - frames 0-239. Phrases at 2.5 s, 4.5 s, 6.5 s.
const PHRASES = [
  {t: 'ONE POWER OUTAGE.', s: 75, color: C.forest},
  {t: 'MULTIPLE PONDS.', s: 135, color: C.forest},
  {t: 'ONE CRITICAL DECISION.', s: 195, color: C.teal},
];

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1.0, 1.14], CLAMP);
  const panX = interpolate(frame, [0, 240], [0, -40], CLAMP);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${zoom}) translateX(${panX}px)`}}>
        <PondFootage />
      </AbsoluteFill>
      {/* soft aqua gradient overlay */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(90deg, rgba(233,248,245,0.95) 0%, rgba(233,248,245,0.78) 36%, rgba(185,231,242,0.15) 72%, rgba(185,231,242,0) 100%)',
        }}
      />
      <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 120, gap: 26}}>
        {PHRASES.map((p) => (
          <AnimatedTitle key={p.t} text={p.t} start={p.s} size={96} color={p.color} spacing={1} />
        ))}
      </AbsoluteFill>
      {/* fade in from white (hook, never black) */}
      <AbsoluteFill style={{background: C.white, opacity: interpolate(frame, [0, 24], [1, 0], CLAMP)}} />
    </AbsoluteFill>
  );
};
