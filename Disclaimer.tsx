import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {DISCLAIMER} from '../data/demoMetrics';
import {prog} from '../utils/anim';

interface Props {
  text?: string;
  start?: number;
  size?: number;
  style?: React.CSSProperties;
}

export const Disclaimer: React.FC<Props> = ({text = DISCLAIMER, start = 10, size = 22, style}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 20);
  return (
    <div
      style={{
        position: 'absolute',
        top: 34,
        right: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 22px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.92)',
        border: `2px solid ${C.amber}`,
        color: C.forest,
        fontSize: size,
        fontWeight: 700,
        letterSpacing: 1,
        opacity: p,
        transform: `translateY(${(1 - p) * -14}px)`,
        ...style,
      }}
    >
      <span style={{width: 12, height: 12, borderRadius: 12, background: C.amber}} />
      {text}
    </div>
  );
};
