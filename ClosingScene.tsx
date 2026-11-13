import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {CLAMP, prog} from '../utils/anim';

// Scene 11 - frames 4290-4499 (relative 0-209). Ends on a light, clean frame (never black).
export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoIn = spring({frame: Math.max(0, frame - 6), fps, config: {damping: 200}});
  const chipP = prog(frame, 90, 24);
  const endFade = interpolate(frame, [180, 209], [0, 0.9], CLAMP);
  return (
    <AbsoluteFill>
      <WaterBackground variant="water" ripples cx={960} cy={400} />
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 120,
          width: 880,
          opacity: logoIn,
          transform: `scale(${0.85 + 0.15 * logoIn})`,
          filter: `blur(${(1 - logoIn) * 10}px) drop-shadow(0 14px 30px rgba(23,77,64,0.18))`,
        }}
      >
        <Img src={staticFile('aquaresq/aquaresq-logo.png')} style={{width: '100%', display: 'block'}} />
      </div>
      <div style={{position: 'absolute', top: 640, left: 0, right: 0}}>
        <AnimatedTitle text="WHEN EVERY POND COUNTS." start={40} size={72} align="center" spacing={3} color={C.forest} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 780,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
          opacity: chipP,
          transform: `translateY(${(1 - chipP) * 24}px)`,
        }}
      >
        <span style={{padding: '14px 36px', borderRadius: 999, background: C.teal, color: C.white, fontSize: 34, fontWeight: 800, letterSpacing: 4}}>
          TEAM SKAY
        </span>
        <span style={{padding: '14px 36px', borderRadius: 999, background: C.white, color: C.forest, fontSize: 34, fontWeight: 800, letterSpacing: 4, border: `3px solid ${C.teal}`}}>
          HACKWITHADITYA 2026
        </span>
      </div>
      <AbsoluteFill style={{background: C.paper, opacity: endFade}} />
    </AbsoluteFill>
  );
};
