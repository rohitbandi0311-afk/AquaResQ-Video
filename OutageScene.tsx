import React from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame} from 'remotion';
import {C, SHADOW} from '../theme';
import {PondFootage} from '../components/PondAerial';
import {Aerator} from '../components/Aerator';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {prog} from '../utils/anim';

// Scene 2 - frames 240-539 (relative 0-299).
const POWER_CUT = 90;
const TAU = 30;

export const OutageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const angle =
    frame < POWER_CUT
      ? frame * 16
      : POWER_CUT * 16 + 16 * TAU * (1 - Math.exp(-(frame - POWER_CUT) / TAU));
  const splash = frame < POWER_CUT ? 1 : Math.exp(-(frame - POWER_CUT) / 40);
  const supplyColor = interpolateColors(frame, [POWER_CUT - 2, POWER_CUT + 14], [C.green, C.coral]);
  const cardP = prog(frame, 10, 30);
  const supplyP = prog(frame, 20, 30);

  return (
    <AbsoluteFill>
      <PondFootage running={frame < POWER_CUT} blur={10} />
      <AbsoluteFill style={{background: 'rgba(255,255,255,0.62)'}} />

      {/* aerator close-up */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 120,
          width: 760,
          height: 600,
          borderRadius: 36,
          background: 'linear-gradient(180deg,#FFFFFF,#E9F8F5)',
          boxShadow: SHADOW,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: cardP,
          transform: `translateY(${(1 - cardP) * 40}px)`,
        }}
      >
        <Aerator angle={angle} power={splash} size={640} />
      </div>

      {/* supply indicator */}
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 120,
          width: 860,
          height: 120,
          borderRadius: 30,
          background: C.white,
          boxShadow: SHADOW,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          padding: '0 38px',
          boxSizing: 'border-box',
          opacity: supplyP,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 46,
            background: supplyColor,
            boxShadow: `0 0 0 10px ${frame < POWER_CUT ? 'rgba(121,201,176,0.3)' : 'rgba(232,117,106,0.3)'}`,
          }}
        />
        <div style={{fontSize: 36, fontWeight: 800, color: C.forest, letterSpacing: 1.5}}>ELECTRICITY SUPPLY</div>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: 36,
            fontWeight: 800,
            color: frame < POWER_CUT ? C.teal : C.coralDeep,
          }}
        >
          {frame < POWER_CUT ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* three pond cards */}
      <div style={{position: 'absolute', left: 960, top: 280, display: 'flex', gap: 24}}>
        {['P1', 'P2', 'P3'].map((name, i) => {
          const off = frame >= 110 + i * 15;
          const p = prog(frame, 30 + i * 8, 26);
          return (
            <div
              key={name}
              style={{
                width: 270,
                height: 440,
                borderRadius: 30,
                background: C.white,
                boxShadow: SHADOW,
                padding: '30px 28px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px)`,
                borderTop: `8px solid ${off ? C.coral : C.teal}`,
              }}
            >
              <div style={{fontSize: 64, fontWeight: 800, color: C.forest}}>{name}</div>
              <div style={{fontSize: 26, fontWeight: 700, color: C.slate}}>AERATOR · 2 kW</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 26,
                    background: off ? '#C9D6D3' : C.green,
                    boxShadow: off ? 'none' : '0 0 0 8px rgba(121,201,176,0.3)',
                  }}
                />
                <span style={{fontSize: 28, fontWeight: 800, color: off ? C.coralDeep : C.teal}}>
                  {off ? 'NO POWER' : 'POWER ON'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* messages, one at a time */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, height: 120}}>
        <AnimatedTitle
          text="POWER FAILURE DETECTED"
          start={100}
          end={165}
          size={66}
          color={C.coralDeep}
          align="center"
          spacing={2}
          style={{position: 'absolute', left: 0, right: 0}}
        />
        <AnimatedTitle
          text="LIMITED BACKUP POWER"
          start={172}
          end={228}
          size={66}
          color={C.amberDeep}
          align="center"
          spacing={2}
          style={{position: 'absolute', left: 0, right: 0}}
        />
        <AnimatedTitle
          text="WHICH POND GETS PRIORITY?"
          start={232}
          size={66}
          color={C.forest}
          align="center"
          spacing={2}
          style={{position: 'absolute', left: 0, right: 0}}
        />
      </div>
    </AbsoluteFill>
  );
};
