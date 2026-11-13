import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, SHADOW} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {ScreenshotShot} from '../components/ScreenshotShot';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {PLAN, SCENARIO} from '../data/demoMetrics';
import {CLAMP, EASE_IO, prog} from '../utils/anim';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';

// Scene 9 - frames 3540-4049 (relative 0-509). A: real Explainable decision panel. B: INPUTS -> CONSTRAINTS -> DECISION.
const dims = frameDims(1440);

const Card: React.FC<{title: string; at: number; accent: string; children: React.ReactNode}> = ({title, at, accent, children}) => {
  const p = prog(useCurrentFrame(), at, 28);
  return (
    <div
      style={{
        width: 500,
        height: 470,
        borderRadius: 32,
        background: C.white,
        boxShadow: SHADOW,
        borderTop: `10px solid ${accent}`,
        padding: '30px 36px',
        boxSizing: 'border-box',
        opacity: p,
        transform: `translateY(${(1 - p) * 50}px)`,
      }}
    >
      <div style={{fontSize: 34, fontWeight: 800, letterSpacing: 3, color: accent === C.green ? C.forest : accent}}>{title}</div>
      <div style={{marginTop: 22, fontSize: 31, fontWeight: 600, color: C.forest, lineHeight: 1.5}}>{children}</div>
    </div>
  );
};

export const ExplainabilityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const aOut = interpolate(frame, [228, 250], [1, 0], CLAMP);
  const bIn = prog(frame, 236, 20);
  const arrow1 = prog(frame, 300, 40, EASE_IO);
  const arrow2 = prog(frame, 380, 40, EASE_IO);

  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />

      <div style={{position: 'absolute', left: 240, top: 120, opacity: aOut}}>
        <BrowserFrame width={dims.width} contentHeight={dims.height}>
          <ScreenshotShot
            file="overview.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            cam={[
              {f: 0, cx: IMG_W / 2, cy: IMG_H / 2, s: 1},
              {f: 40, cx: 560, cy: 520, s: 2.0},
              {f: 100, cx: 560, cy: 520, s: 2.0},
              {f: 130, cx: 1160, cy: 520, s: 2.0},
              {f: 190, cx: 1160, cy: 520, s: 2.0},
              {f: 215, cx: 860, cy: 625, s: 1.75},
              {f: 240, cx: 860, cy: 625, s: 1.75},
            ]}
            focus={[
              {box: {x: 268, y: 473, w: 589, h: 102}, start: 30, end: 120, label: 'Why this generator allocation?'},
              {box: {x: 866, y: 473, w: 588, h: 102}, start: 118, end: 205, label: 'Why other allocations were excluded?'},
              {box: {x: 268, y: 585, w: 1186, h: 88}, start: 200, label: 'Strategy trade-offs'},
            ]}
          />
        </BrowserFrame>
      </div>

      {/* B: diagram */}
      <div style={{position: 'absolute', inset: 0, opacity: bIn}}>
        <div style={{position: 'absolute', left: 110, top: 190, display: 'flex', gap: 110}}>
          <Card title="INPUTS" at={250} accent={C.teal}>
            {SCENARIO.ponds} ponds · {SCENARIO.outageHours} h outage
            <br />
            {SCENARIO.generatorKw} kW generator
            <br />
            {SCENARIO.fuelKwh} kWh energy
            <br />
            {SCENARIO.thresholdMgL.toFixed(1)} mg/L threshold
          </Card>
          <Card title="CONSTRAINTS" at={330} accent={C.amber}>
            {SCENARIO.feasibleAllocations} of {SCENARIO.totalAllocations} whole-pond allocations feasible
            <br />
            {SCENARIO.rejectedForCapacity} exceeded generator capacity
            <br />
            {SCENARIO.rejectedForFuel} exceeded available energy
          </Card>
          <Card title="DECISION" at={410} accent={C.green}>
            {PLAN.map((p) => (
              <div key={p.pond}>
                {p.pond} — <b>{p.kw} kW</b>
                {p.kw === 0 ? ' (no power)' : ''}
              </div>
            ))}
          </Card>
        </div>

        {/* teal connectors */}
        <svg width={1920} height={200} viewBox="0 0 1920 200" style={{position: 'absolute', left: 0, top: 380}}>
          {[
            {x1: 610, x2: 720, p: arrow1},
            {x1: 1220, x2: 1330, p: arrow2},
          ].map((a, i) => (
            <g key={i}>
              <line x1={a.x1} y1={40} x2={a.x1 + (a.x2 - a.x1) * a.p} y2={40} stroke={C.teal} strokeWidth={8} strokeLinecap="round" />
              <polygon
                points={`${a.x2},40 ${a.x2 - 22},26 ${a.x2 - 22},54`}
                fill={C.teal}
                opacity={a.p > 0.95 ? 1 : 0}
              />
            </g>
          ))}
        </svg>

        <div style={{position: 'absolute', left: 0, right: 0, top: 740}}>
          <AnimatedTitle text="EXPLAINABLE BY DESIGN." start={420} size={72} align="center" color={C.teal} spacing={2} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
