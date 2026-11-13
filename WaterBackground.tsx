import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';

const wavePath = (frame: number, y: number, amp: number, wl: number, speed: number, phase: number): string => {
  const pts: string[] = [];
  for (let x = 0; x <= 1920; x += 40) {
    const yy = y + Math.sin((x / wl) * Math.PI * 2 + frame * speed + phase) * amp;
    pts.push(`${x},${yy.toFixed(1)}`);
  }
  return `M0,1080 L${pts.join(' L')} L1920,1080 Z`;
};

interface Props {
  variant?: 'mist' | 'water' | 'white';
  ripples?: boolean;
  cx?: number;
  cy?: number;
}

/** Bright aqua background with slow organic waves and (optionally) expanding water ripples. Deterministic. */
export const WaterBackground: React.FC<Props> = ({variant = 'mist', ripples = false, cx = 960, cy = 540}) => {
  const frame = useCurrentFrame();
  const bg =
    variant === 'water'
      ? `linear-gradient(160deg, #F6FDFB 0%, ${C.mist} 30%, ${C.water} 78%, #9ADBD0 130%)`
      : variant === 'white'
      ? `linear-gradient(170deg, ${C.white} 0%, #F4FBF9 60%, ${C.mist} 100%)`
      : `linear-gradient(160deg, ${C.white} 0%, ${C.mist} 55%, #D8F0F2 100%)`;
  const base = variant === 'water' ? 600 : 860;
  const op = variant === 'water' ? 1 : 0.7;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        <path d={wavePath(frame, base + 120, 16, 520, 0.035, 0)} fill={C.water} opacity={0.35 * op} />
        <path d={wavePath(frame, base + 190, 20, 680, -0.028, 1.7)} fill={C.green} opacity={0.22 * op} />
        <path d={wavePath(frame, base + 250, 14, 420, 0.04, 3.1)} fill={C.teal} opacity={0.12 * op} />
        {ripples &&
          [0, 1, 2, 3].map((i) => {
            const t = ((frame + i * 45) % 180) / 180;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={90 + t * 820}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={4 - t * 2.5}
                opacity={(1 - t) * 0.7}
              />
            );
          })}
      </svg>
    </AbsoluteFill>
  );
};
