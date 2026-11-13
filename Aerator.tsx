import React from 'react';
import {C} from '../theme';

interface Props {
  angle: number; // blade rotation in degrees
  power: number; // 0..1 splash intensity
  size?: number;
}

/** Paddle-wheel aerator, vector. Blades are 8-fold symmetric so fast rotation stays smooth. */
export const Aerator: React.FC<Props> = ({angle, power, size = 520}) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 520 374">
    <defs>
      <linearGradient id="aw" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#CFF1F0" />
        <stop offset="1" stopColor="#7FD6D0" />
      </linearGradient>
    </defs>
    <ellipse cx="260" cy="250" rx="250" ry="110" fill="url(#aw)" />
    {[0, 1, 2].map((i) => (
      <ellipse
        key={i}
        cx="260"
        cy="238"
        rx={90 + i * 55 * (0.4 + 0.6 * power)}
        ry={24 + i * 14 * (0.4 + 0.6 * power)}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        opacity={(0.8 - i * 0.22) * (0.25 + 0.75 * power)}
      />
    ))}
    {/* float */}
    <rect x="150" y="214" width="220" height="26" rx="13" fill={C.forest} opacity="0.9" />
    {/* wheel */}
    <g transform={`translate(260 190) rotate(${angle})`}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x="-9" y="-92" width="18" height="70" rx="6" fill={C.teal} transform={`rotate(${i * 45})`} />
      ))}
      <circle r="26" fill={C.forest} />
      <circle r="10" fill={C.mist} />
    </g>
    {/* splash droplets */}
    {[-70, -30, 30, 70].map((dx, i) => (
      <circle key={i} cx={260 + dx} cy={150 - Math.abs(dx) * 0.3} r={6 + i} fill="#FFFFFF" opacity={0.85 * power} />
    ))}
  </svg>
);
