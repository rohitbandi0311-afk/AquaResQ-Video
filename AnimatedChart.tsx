import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {EASE_IO, prog} from '../utils/anim';

export interface BarDef {
  label: string;
  value: number;
  color: string;
  delay: number; // frames after `start`
}

interface Props {
  bars: BarDef[];
  max: number;
  height: number;
  barWidth: number;
  gap: number;
  start: number;
  decimals?: number;
  unit?: string;
}

/** Bars rise smoothly with a counting value label. Bars always start from zero. */
export const AnimatedChart: React.FC<Props> = ({bars, max, height, barWidth, gap, start, decimals = 2, unit}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'flex-end', gap, height: height + 120, position: 'relative'}}>
      {/* baseline */}
      <div style={{position: 'absolute', left: -20, right: -20, bottom: 74, height: 3, background: 'rgba(23,77,64,0.18)'}} />
      {bars.map((b) => {
        const p = prog(frame, start + b.delay, 70, EASE_IO);
        return (
          <div key={b.label} style={{width: barWidth, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontSize: 46, fontWeight: 800, color: C.forest, marginBottom: 12, opacity: Math.min(1, p * 3)}}>
              {(b.value * p).toFixed(decimals)}
              {unit ? <span style={{fontSize: 22, fontWeight: 600, color: C.slate}}> {unit}</span> : null}
            </div>
            <div
              style={{
                width: barWidth,
                height: Math.max(2, (b.value / max) * height * p),
                borderRadius: '18px 18px 0 0',
                background: `linear-gradient(180deg, ${b.color}, ${b.color}CC)`,
                boxShadow: '0 10px 26px rgba(23,77,64,0.14)',
              }}
            />
            <div
              style={{
                marginTop: 18,
                height: 56,
                width: barWidth + gap - 20,
                textAlign: 'center',
                fontSize: 26,
                fontWeight: 700,
                color: C.forest,
                lineHeight: 1.15,
              }}
            >
              {b.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
