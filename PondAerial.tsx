import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {ASSETS, SHOW_PLACEHOLDER_TAGS} from '../data/timeline';

// Deterministic pseudo-random (no Math.random: renders must be reproducible).
const rng = (seed: number) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const PONDS: Array<{x: number; y: number}> = [];
for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) PONDS.push({x: 110 + c * 600, y: 90 + r * 500});

const TREES = (() => {
  const r = rng(7);
  const out: Array<{x: number; y: number; r: number; o: number}> = [];
  for (let i = 0; i < 70; i++) out.push({x: r() * 1920, y: r() * 1080, r: 14 + r() * 30, o: 0.35 + r() * 0.4});
  return out;
})();

/** Vector aerial of a pond farm (used only when no real aerial footage is supplied). */
const PondIllustration: React.FC<{running?: boolean}> = ({running = true}) => {
  const frame = useCurrentFrame();
  return (
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="grass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CDEBB8" />
          <stop offset="1" stopColor="#9FD58F" />
        </linearGradient>
        <linearGradient id="pw" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A6EDE6" />
          <stop offset="1" stopColor="#3DBDB4" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#grass)" />
      {TREES.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={t.r} fill="#6DB87A" opacity={t.o} />
      ))}
      {PONDS.map((p, i) => (
        <g key={i}>
          <rect x={p.x - 24} y={p.y - 24} width={568} height={408} rx={30} fill="#EFE7CC" />
          <rect x={p.x} y={p.y} width={520} height={360} rx={18} fill="url(#pw)" />
          {[0, 1, 2, 3].map((k) => (
            <path
              key={k}
              d={`M${p.x + 20},${p.y + 60 + k * 80} q60,${Math.sin(frame * 0.05 + k + i) * 8} 120,0 t120,0 t120,0 t120,0`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={3}
              opacity={0.35}
            />
          ))}
          {[0.3, 0.7].map((fx, k) => {
            const ax = p.x + 520 * fx;
            const ay = p.y + 180;
            return (
              <g key={k}>
                {[0, 1].map((j) => {
                  const t = running ? ((frame + j * 20 + k * 11 + i * 7) % 40) / 40 : 0.5;
                  return (
                    <circle
                      key={j}
                      cx={ax}
                      cy={ay}
                      r={16 + t * 44}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={3}
                      opacity={running ? 1 - t : 0.25}
                    />
                  );
                })}
                <g transform={`translate(${ax} ${ay}) rotate(${running ? frame * 16 : 0})`}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
                    <rect key={b} x={-3} y={-22} width={6} height={18} rx={2} fill={C.forest} transform={`rotate(${b * 45})`} />
                  ))}
                  <circle r={6} fill={C.forest} />
                </g>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};

/** Real aerial footage when supplied, otherwise the vector illustration + a small placeholder tag. */
export const PondFootage: React.FC<{running?: boolean; blur?: number}> = ({running = true, blur = 0}) => (
  <AbsoluteFill style={{filter: blur ? `blur(${blur}px)` : undefined}}>
    {ASSETS.pondAerial ? (
      <OffthreadVideo
        src={staticFile('aquaresq/pond-aerial.mp4')}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    ) : (
      <>
        <PondIllustration running={running} />
        {SHOW_PLACEHOLDER_TAGS && (
          <div
            style={{
              position: 'absolute',
              left: 28,
              top: 24,
              padding: '6px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.85)',
              color: C.slate,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            PLACEHOLDER ILLUSTRATION — add public/aquaresq/pond-aerial.mp4
          </div>
        )}
      </>
    )}
  </AbsoluteFill>
);
