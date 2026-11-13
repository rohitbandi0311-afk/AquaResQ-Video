import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SHADOW_SOFT} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {ScreenshotShot} from '../components/ScreenshotShot';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';
import {prog} from '../utils/anim';

// Scene 10 - frames 4050-4289 (relative 0-239). Honest limitations, not hidden.
const dims = frameDims(980);

const STATEMENTS = [
  {t: 'SOFTWARE-ONLY PROTOTYPE', at: 40, color: C.teal},
  {t: 'SIMULATED PLANNING DATA', at: 90, color: C.amber},
  {t: 'FIELD VALIDATION — NEXT STEP', at: 140, color: C.green},
];

export const LimitationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = prog(frame, 4, 30);
  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />
      <div style={{position: 'absolute', left: 80, top: 250, opacity: inP, transform: `translateX(${(1 - inP) * -60}px)`}}>
        <BrowserFrame width={dims.width} contentHeight={dims.height} tiltY={8} tiltX={2}>
          <ScreenshotShot
            file="overview.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            cam={[
              {f: 0, cx: IMG_W / 2, cy: IMG_H / 2, s: 1.0},
              {f: 239, cx: IMG_W / 2 + 40, cy: IMG_H / 2 - 20, s: 1.12},
            ]}
          />
        </BrowserFrame>
      </div>
      <div style={{position: 'absolute', left: 1160, top: 250, display: 'flex', flexDirection: 'column', gap: 36}}>
        {STATEMENTS.map((s) => {
          const p = prog(frame, s.at, 24);
          return (
            <div
              key={s.t}
              style={{
                width: 700,
                padding: '30px 38px',
                borderRadius: 28,
                background: C.white,
                boxShadow: SHADOW_SOFT,
                borderLeft: `12px solid ${s.color}`,
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: 1,
                color: C.forest,
                opacity: p,
                transform: `translateX(${(1 - p) * 70}px)`,
              }}
            >
              {s.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
