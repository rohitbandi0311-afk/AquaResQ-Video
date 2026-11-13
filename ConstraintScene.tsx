import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SHADOW_SOFT} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {MetricCard} from '../components/MetricCard';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {SCENARIO} from '../data/demoMetrics';
import {fadeOut, prog} from '../utils/anim';

// Scene 6 - frames 1860-2399 (relative 0-539). Pure graphic infographic; numbers from the real scenario.
const TRACK = 1200; // px for 6 kW

const Sym: React.FC<{t: string; at: number}> = ({t, at}) => {
  const p = prog(useCurrentFrame(), at, 18);
  return <div style={{fontSize: 80, fontWeight: 800, color: C.teal, opacity: p, width: 56, textAlign: 'center'}}>{t}</div>;
};

export const ConstraintScene: React.FC = () => {
  const frame = useCurrentFrame();
  const labelOut = fadeOut(frame, 420, 14);
  const reqP = prog(frame, 230, 40);
  const avP = prog(frame, 285, 45);
  const shortP = prog(frame, 345, 35);
  const enP = prog(frame, 385, 30);
  const shortPulse = 1 + 0.025 * Math.sin(frame * 0.15) * shortP;

  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />
      <div style={{position: 'absolute', top: 40, left: 0, right: 0, opacity: labelOut}}>
        <AnimatedTitle
          text="CRITICAL SCENARIO · 12-HOUR OUTAGE"
          start={4}
          size={34}
          weight={700}
          spacing={3}
          color={C.slate}
          align="center"
        />
      </div>
      <div style={{position: 'absolute', top: 30, left: 0, right: 0}}>
        <AnimatedTitle text="NOT EVERY POND CAN BE POWERED." start={430} size={60} align="center" color={C.coralDeep} />
      </div>

      {/* 2 + 2 + 2 = 6 kW */}
      <div style={{position: 'absolute', top: 140, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14}}>
        <MetricCard label="P1 AERATOR" value="2" unit="kW" unitKind="kW" start={20} width={300} height={210} />
        <Sym t="+" at={32} />
        <MetricCard label="P2 AERATOR" value="2" unit="kW" unitKind="kW" start={40} width={300} height={210} />
        <Sym t="+" at={52} />
        <MetricCard label="P3 AERATOR" value="2" unit="kW" unitKind="kW" start={60} width={300} height={210} />
        <Sym t="=" at={150} />
        <MetricCard
          label="6 kW REQUIRED"
          value={String(SCENARIO.allAeratorsKw)}
          unit="kW"
          unitKind="kW"
          start={160}
          width={340}
          height={210}
          accent={C.coral}
          sub="all three aerators"
        />
      </div>

      {/* capacity bars */}
      <div style={{position: 'absolute', left: 260, top: 420, width: TRACK + 300}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 26, opacity: reqP}}>
          <div style={{width: 260, fontSize: 28, fontWeight: 800, color: C.forest}}>6 kW REQUIRED</div>
          <div style={{height: 54, width: TRACK * reqP, borderRadius: 14, background: C.coral, opacity: 0.9}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: avP}}>
          <div style={{width: 260, fontSize: 28, fontWeight: 800, color: C.forest}}>4 kW AVAILABLE</div>
          <div style={{position: 'relative', height: 54, width: TRACK}}>
            <div style={{height: 54, width: (TRACK * 4 * avP) / 6, borderRadius: 14, background: C.teal}} />
            <div
              style={{
                position: 'absolute',
                left: (TRACK * 4) / 6,
                top: 0,
                height: 54,
                width: ((TRACK * 2) / 6) * shortP,
                borderRadius: 14,
                background: 'repeating-linear-gradient(135deg, #F4C66A, #F4C66A 14px, #FBE3A8 14px, #FBE3A8 28px)',
                border: `3px solid ${C.amber}`,
                boxSizing: 'border-box',
                transform: `scale(${shortPulse})`,
                transformOrigin: 'left center',
              }}
            />
          </div>
        </div>
        <div style={{marginLeft: 284 + (TRACK * 4) / 6, marginTop: 14, opacity: shortP}}>
          <span
            style={{
              display: 'inline-block',
              padding: '8px 22px',
              borderRadius: 999,
              background: '#FFF3D1',
              border: `2px solid ${C.amber}`,
              color: C.amberDeep,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            2 kW SHORT
          </span>
        </div>
      </div>

      {/* energy - kWh clearly different from kW */}
      <div
        style={{
          position: 'absolute',
          left: 260,
          top: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '26px 40px',
          borderRadius: 30,
          background: C.white,
          boxShadow: SHADOW_SOFT,
          borderLeft: `10px dashed ${C.teal}`,
          opacity: enP,
          transform: `translateY(${(1 - enP) * 30}px)`,
        }}
      >
        <span style={{fontSize: 26, fontWeight: 700, letterSpacing: 1.5, color: C.slate}}>AVAILABLE ENERGY</span>
        <span style={{fontSize: 48, fontWeight: 800, color: C.forest}}>
          4 <span style={{fontSize: 30, background: C.teal, color: C.white, padding: '2px 12px', borderRadius: 12}}>kW</span>{' '}
          × 12 h =
        </span>
        <span style={{fontSize: 78, fontWeight: 800, color: C.forest, lineHeight: 1}}>{SCENARIO.fuelKwh}</span>
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            background: C.water,
            color: C.forest,
            padding: '4px 18px',
            borderRadius: 14,
            border: `2px dashed ${C.teal}`,
          }}
        >
          kWh
        </span>
      </div>
      <div style={{position: 'absolute', left: 1500, top: 735, width: 330, fontSize: 24, color: C.slate, fontWeight: 600, opacity: enP}}>
        kW = power at one moment.
        <br />
        kWh = energy over time.
      </div>
    </AbsoluteFill>
  );
};
