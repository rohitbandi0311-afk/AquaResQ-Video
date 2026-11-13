import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {ScreenshotShot} from '../components/ScreenshotShot';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {Disclaimer} from '../components/Disclaimer';
import {CLAMP, prog} from '../utils/anim';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';

// Scene 5 - frames 1320-1859 (relative 0-539). Real Power & backup + Oxygen-over-time screenshots.
const dims = frameDims(1440);

export const SimulationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [190, 212], [0, 1], CLAMP);
  const sub = prog(frame, 40, 24);
  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />
      <div style={{position: 'absolute', top: 30, left: 0, right: 0}}>
        <AnimatedTitle text="SIMULATE BEFORE YOU ALLOCATE" start={6} size={54} align="center" spacing={1.5} />
        <div
          style={{
            marginTop: 10,
            textAlign: 'center',
            fontSize: 28,
            fontWeight: 600,
            color: C.slate,
            opacity: sub,
          }}
        >
          Illustrative model estimate — not a sensor reading.
        </div>
      </div>
      <Disclaimer start={30} style={{top: 'auto', bottom: 118, right: 240}} />

      <div style={{position: 'absolute', left: 240, top: 150}}>
        <BrowserFrame width={dims.width} contentHeight={dims.height}>
          <ScreenshotShot
            file="power-backup.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            opacity={1 - swap}
            cam={[
              {f: 0, cx: IMG_W / 2, cy: IMG_H / 2, s: 1},
              {f: 40, cx: 630, cy: 305, s: 2.2},
              {f: 105, cx: 630, cy: 340, s: 2.2},
              {f: 150, cx: 630, cy: 600, s: 1.7},
              {f: 205, cx: 630, cy: 620, s: 1.6},
            ]}
            focus={[
              {box: {x: 270, y: 262, w: 720, h: 62}, start: 36, end: 100, label: 'Power cut length · 12 hours'},
              {box: {x: 280, y: 349, w: 699, h: 34}, start: 96, label: 'Run outage simulation'},
              {box: {x: 281, y: 540, w: 698, h: 225}, start: 150, label: 'Oxygen over time'},
            ]}
            cursor={[
              {f: 0, x: 1000, y: 200},
              {f: 60, x: 1000, y: 200},
              {f: 112, x: 640, y: 362},
            ]}
            clicks={[125]}
          />
          <ScreenshotShot
            file="oxygen-chart.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            opacity={swap}
            cam={[
              {f: 190, cx: 860, cy: 560, s: 1.3},
              {f: 270, cx: 860, cy: 598, s: 2.1},
              {f: 470, cx: 860, cy: 598, s: 2.1},
              {f: 539, cx: 860, cy: 585, s: 1.5},
            ]}
            focus={[
              {box: {x: 366, y: 592, w: 1042, h: 30}, start: 262, label: '4 mg/L protection threshold'},
              {box: {x: 270, y: 482, w: 1184, h: 215}, start: 440, end: 520, label: 'Model estimate · not live data'},
            ]}
            cursor={[
              {f: 280, x: 372, y: 600},
              {f: 440, x: 1385, y: 598},
            ]}
          />
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
