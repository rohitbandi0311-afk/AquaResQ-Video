import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {CLAMP} from '../utils/anim';

export type TransitionKind = 'wipe' | 'circle' | 'sweep' | 'push' | 'fade';
export const TRANSITION_FRAMES = 24;

/** Soft aqua transition. The scene cut happens at the midpoint, fully covered. Never black. */
export const SceneTransition: React.FC<{kind: TransitionKind}> = ({kind}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, TRANSITION_FRAMES - 1], [0, 1], CLAMP);
  const aqua = `linear-gradient(90deg, rgba(233,248,245,0) 0%, ${C.water} 22%, ${C.teal} 50%, ${C.water} 78%, rgba(233,248,245,0) 100%)`;

  if (kind === 'wipe') {
    const left = interpolate(p, [0, 1], [-140, 100]);
    return (
      <AbsoluteFill>
        <div style={{position: 'absolute', top: 0, bottom: 0, width: '140%', left: `${left}%`, background: aqua}} />
      </AbsoluteFill>
    );
  }
  if (kind === 'push') {
    const top = interpolate(p, [0, 1], [-140, 100]);
    return (
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '140%',
            top: `${top}%`,
            background: `linear-gradient(180deg, rgba(233,248,245,0) 0%, ${C.water} 22%, ${C.green} 50%, ${C.water} 78%, rgba(233,248,245,0) 100%)`,
          }}
        />
      </AbsoluteFill>
    );
  }
  if (kind === 'circle') {
    const r = 88 * Math.sin(Math.PI * p);
    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, ${C.mist}, ${C.water} 60%, ${C.green})`,
          clipPath: `circle(${r}% at 50% 50%)`,
        }}
      />
    );
  }
  if (kind === 'sweep') {
    const x = interpolate(p, [0, 1], [-60, 160]);
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: C.white, opacity: 0.9 * Math.sin(Math.PI * p)}} />
        <div
          style={{
            position: 'absolute',
            top: -200,
            bottom: -200,
            width: 420,
            left: `${x}%`,
            transform: 'rotate(18deg)',
            background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(185,231,242,0.9), rgba(255,255,255,0))',
          }}
        />
      </AbsoluteFill>
    );
  }
  return <AbsoluteFill style={{background: C.paper, opacity: Math.sin(Math.PI * p)}} />;
};
