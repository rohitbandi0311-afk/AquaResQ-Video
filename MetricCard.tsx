import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, SHADOW_SOFT} from '../theme';
import {prog} from '../utils/anim';

interface Props {
  label: string;
  value: string;
  unit?: string;
  unitKind?: 'kW' | 'kWh' | 'plain';
  accent?: string;
  start: number;
  width?: number;
  height?: number;
  sub?: string;
  dim?: boolean;
}

/** White rounded card with a big value. kW (teal chip) and kWh (blue dashed chip) stay visually distinct. */
export const MetricCard: React.FC<Props> = ({
  label,
  value,
  unit,
  unitKind = 'plain',
  accent = C.teal,
  start,
  width = 330,
  height = 230,
  sub,
  dim = false,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 26);
  const chip: React.CSSProperties =
    unitKind === 'kWh'
      ? {background: C.water, color: C.forest, border: `2px dashed ${C.teal}`}
      : unitKind === 'kW'
      ? {background: C.teal, color: C.white, border: `2px solid ${C.teal}`}
      : {background: C.mist, color: C.forest, border: `2px solid ${C.mist}`};
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 30,
        background: C.white,
        boxShadow: SHADOW_SOFT,
        borderTop: `8px solid ${accent}`,
        padding: '22px 26px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: p * (dim ? 0.45 : 1),
        transform: `translateY(${(1 - p) * 40}px) scale(${0.94 + 0.06 * p})`,
      }}
    >
      <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 1.5, color: C.slate}}>{label}</div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
        <span style={{fontSize: 92, fontWeight: 800, color: C.forest, lineHeight: 1}}>{value}</span>
        {unit && (
          <span style={{fontSize: 32, fontWeight: 800, padding: '4px 16px', borderRadius: 14, ...chip}}>{unit}</span>
        )}
      </div>
      <div style={{fontSize: 22, color: C.slate, fontWeight: 600, minHeight: 26}}>{sub}</div>
    </div>
  );
};
