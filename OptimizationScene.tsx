import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, SHADOW, SHADOW_SOFT} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {ScreenshotShot} from '../components/ScreenshotShot';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {DEFICIT, PLAN, SCENARIO} from '../data/demoMetrics';
import {CLAMP, EASE_IO, fadeOut, prog} from '../utils/anim';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';

// Scene 7 - frames 2400-2999 (relative 0-599).
// A: real "Plan generator power" screen.  B: the 8 whole-pond combinations evaluated.  C: selected plan.
const dims = frameDims(1440);

type Combo = {on: [boolean, boolean, boolean]; deficit?: number};
const COMBOS: Combo[] = [
  {on: [false, false, false], deficit: DEFICIT.noGenerator}, // no power (reference)
  {on: [true, false, false]},
  {on: [false, true, false]},
  {on: [false, false, true]},
  {on: [true, true, false], deficit: DEFICIT.highestRiskFirst}, // from the app: Highest initial risk first
  {on: [true, false, true], deficit: DEFICIT.aquaresqOptimized}, // from the app: AquaResQ optimized
  {on: [false, true, true]},
  {on: [true, true, true]}, // 6 kW > 4 kW generator -> excluded
];
const kwOf = (c: Combo) => c.on.filter((x) => x).length * SCENARIO.aeratorKwEach;
const BEST = 5;

const CHECKS = [
  {t: 'GENERATOR CAPACITY CHECK', at: 200},
  {t: 'AVAILABLE ENERGY CHECK', at: 262},
  {t: 'MODELED OXYGEN DEFICIT', at: 324},
];

export const OptimizationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const aOut = interpolate(frame, [158, 176], [1, 0], CLAMP);
  const bIn = prog(frame, 170, 20);
  const bOut = fadeOut(frame, 458, 18);
  const cIn = prog(frame, 462, 30);
  const bestGlow = prog(frame, 400, 30);

  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />

      {/* A: real app */}
      <div style={{position: 'absolute', left: 240, top: 120, opacity: aOut}}>
        <BrowserFrame width={dims.width} contentHeight={dims.height}>
          <ScreenshotShot
            file="plan-generator.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            cam={[
              {f: 0, cx: IMG_W / 2, cy: IMG_H / 2, s: 1},
              {f: 40, cx: 630, cy: 60, s: 2.1},
              {f: 105, cx: 630, cy: 60, s: 2.1},
              {f: 130, cx: 630, cy: 205, s: 2.0},
              {f: 175, cx: 630, cy: 205, s: 1.8},
            ]}
            focus={[
              {box: {x: 270, y: 21, w: 720, h: 34}, start: 36, end: 100, label: 'Plan generator power'},
              {box: {x: 284, y: 118, w: 692, h: 34}, start: 120, label: '4 kW · 48 kWh · 7 plans checked'},
            ]}
            cursor={[
              {f: 0, x: 1100, y: 150},
              {f: 40, x: 1100, y: 150},
              {f: 66, x: 640, y: 40},
            ]}
            clicks={[72]}
          />
        </BrowserFrame>
      </div>

      {/* title for B + C */}
      <div style={{position: 'absolute', top: 36, left: 0, right: 0}}>
        <AnimatedTitle text="EXPLAINABLE RESOURCE OPTIMIZATION" start={176} size={54} align="center" spacing={1.5} />
      </div>

      {/* B: 8 feasible-or-not combinations */}
      <div style={{position: 'absolute', inset: 0, opacity: bIn * bOut}}>
        <div style={{position: 'absolute', left: 150, top: 160, width: 1620, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28}}>
          {COMBOS.map((c, i) => {
            const kw = kwOf(c);
            const feasible = kw <= SCENARIO.generatorKw;
            const capShown = frame >= CHECKS[0].at + i * 4;
            const enShown = frame >= CHECKS[1].at + i * 4;
            const defShown = frame >= CHECKS[2].at + i * 4;
            const isBest = i === BEST;
            const dim = frame >= 400 && !isBest ? 0.38 : 1;
            return (
              <div
                key={i}
                style={{
                  height: 250,
                  borderRadius: 26,
                  background: C.white,
                  boxShadow: isBest && bestGlow > 0 ? `0 0 0 ${6 * bestGlow}px ${C.teal}, ${SHADOW}` : SHADOW_SOFT,
                  padding: '20px 24px',
                  boxSizing: 'border-box',
                  opacity: dim * prog(frame, 180 + i * 4, 18),
                  transform: `scale(${1 + 0.04 * (isBest ? bestGlow : 0)})`,
                }}
              >
                <div style={{display: 'flex', gap: 10}}>
                  {['P1', 'P2', 'P3'].map((n, k) => (
                    <span
                      key={n}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '8px 0',
                        borderRadius: 12,
                        fontSize: 26,
                        fontWeight: 800,
                        background: c.on[k] ? C.green : '#EEF3F2',
                        color: c.on[k] ? C.forest : '#9AAEAA',
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <div style={{marginTop: 14, fontSize: 30, fontWeight: 800, color: C.forest}}>
                  {kw} <span style={{fontSize: 22, background: C.teal, color: C.white, padding: '1px 9px', borderRadius: 8}}>kW</span>
                </div>
                <div style={{marginTop: 10, fontSize: 22, fontWeight: 700, lineHeight: 1.45, color: C.slate}}>
                  <div style={{opacity: capShown ? 1 : 0.15, color: capShown && !feasible ? C.coralDeep : C.slate}}>
                    {capShown ? (feasible ? '✓ capacity ≤ 4 kW' : '✕ 6 kW exceeds 4 kW') : '· capacity'}
                  </div>
                  <div style={{opacity: enShown ? 1 : 0.15}}>
                    {enShown ? (feasible ? '✓ energy ≤ 48 kWh' : '— excluded') : '· energy'}
                  </div>
                  <div style={{opacity: defShown ? 1 : 0.15, color: isBest && defShown ? C.teal : C.slate}}>
                    {defShown
                      ? !feasible
                        ? '— not evaluated'
                        : c.deficit !== undefined
                        ? `deficit ${c.deficit.toFixed(3)} mg/L·h`
                        : 'deficit evaluated'
                      : '· deficit'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{position: 'absolute', left: 150, top: 760, width: 1620, display: 'flex', justifyContent: 'space-between'}}>
          {CHECKS.map((ck, i) => {
            const on = frame >= ck.at;
            const done = frame >= (CHECKS[i + 1] ? CHECKS[i + 1].at : 390);
            return (
              <div
                key={ck.t}
                style={{
                  width: 520,
                  padding: '16px 0',
                  textAlign: 'center',
                  borderRadius: 999,
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 1,
                  background: on ? (done ? C.green : C.teal) : C.white,
                  color: on ? (done ? C.forest : C.white) : C.slate,
                  border: `2px solid ${on ? C.teal : '#D6E6E3'}`,
                  boxShadow: SHADOW_SOFT,
                  transition: 'none',
                }}
              >
                {ck.t}
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 856, textAlign: 'center', fontSize: 28, fontWeight: 700, color: C.forest, opacity: prog(frame, 400, 20)}}>
          Lowest modeled integrated oxygen deficit among feasible plans: P1 + P3
        </div>
      </div>

      {/* C: selected plan with green connectors */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 250, height: 560, opacity: cIn}}>
        <svg width={1920} height={560} viewBox="0 0 1920 560" style={{position: 'absolute', inset: 0}}>
          {[0, 1, 2].map((i) => {
            const x = 380 + i * 580;
            const active = PLAN[i].kw > 0;
            const len = prog(frame, 480 + i * 12, 40, EASE_IO);
            const d = `M960,150 C960,230 ${x + 130},200 ${x + 130},310`;
            return active ? (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={C.teal}
                strokeWidth={8}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - len}
              />
            ) : (
              <path key={i} d={d} fill="none" stroke="#C9D6D3" strokeWidth={5} strokeDasharray="14 12" opacity={len} />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 760,
            top: 40,
            width: 400,
            height: 110,
            borderRadius: 28,
            background: C.white,
            boxShadow: SHADOW,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            fontSize: 40,
            fontWeight: 800,
            color: C.forest,
          }}
        >
          ⚡ Generator · {SCENARIO.generatorKw} kW
        </div>
        {PLAN.map((p, i) => {
          const active = p.kw > 0;
          return (
            <div
              key={p.pond}
              style={{
                position: 'absolute',
                left: 380 + i * 580,
                top: 310,
                width: 260,
                height: 220,
                borderRadius: 30,
                background: C.white,
                boxShadow: SHADOW,
                borderTop: `10px solid ${active ? C.teal : '#C9D6D3'}`,
                padding: '24px 28px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{fontSize: 60, fontWeight: 800, color: C.forest}}>{p.pond}</div>
              <div style={{marginTop: 14, fontSize: 52, fontWeight: 800, color: active ? C.teal : C.slate}}>
                {p.kw} <span style={{fontSize: 28}}>kW</span>
              </div>
              <div style={{fontSize: 22, fontWeight: 700, color: C.slate}}>{active ? 'Aerator powered' : 'No power assigned'}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
