import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {Focus, ScreenshotShot} from '../components/ScreenshotShot';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {CLAMP} from '../utils/anim';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';

// Scene 4 - frames 900-1319 (relative 0-419). Real screenshots: Overview -> click Ponds -> pond profiles.
const dims = frameDims(1440);

// Source-pixel boxes of the real input fields on pond-management.png (P1 form).
const P1_FIELDS: Focus[] = [
  {box: {x: 568, y: 439, w: 274, h: 27}, start: 150, label: 'Pond size'},
  {box: {x: 284, y: 491, w: 274, h: 26}, start: 185, label: 'Water depth'},
  {box: {x: 568, y: 491, w: 274, h: 26}, start: 220, label: 'Starting oxygen'},
  {box: {x: 284, y: 542, w: 274, h: 26}, start: 255, label: 'Shrimp biomass'},
  {box: {x: 568, y: 542, w: 274, h: 26}, start: 290, label: 'Aerator power'},
];

export const PondManagementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [92, 108], [0, 1], CLAMP);
  return (
    <AbsoluteFill>
      <WaterBackground variant="mist" />
      <div style={{position: 'absolute', top: 46, left: 0, right: 0}}>
        <AnimatedTitle text="ONE FARM. MULTIPLE POND PROFILES." start={6} size={54} align="center" spacing={1.5} />
      </div>

      <div style={{position: 'absolute', left: 240, top: 150}}>
        <BrowserFrame width={dims.width} contentHeight={dims.height}>
          {/* Overview -> click "Ponds" in the real sidebar */}
          <ScreenshotShot
            file="overview.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            opacity={1 - swap}
            cam={[
              {f: 0, cx: IMG_W / 2, cy: IMG_H / 2, s: 1},
              {f: 70, cx: 330, cy: 250, s: 1.7},
            ]}
            cursor={[
              {f: 0, x: 700, y: 360},
              {f: 40, x: 700, y: 360},
              {f: 85, x: 52, y: 152},
            ]}
            clicks={[92]}
            focus={[{box: {x: 14, y: 143, w: 172, h: 30}, start: 50, end: 100}]}
          />
          <ScreenshotShot
            file="pond-management.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            opacity={swap}
            cam={[
              {f: 95, cx: IMG_W / 2, cy: IMG_H / 2, s: 1},
              {f: 140, cx: 563, cy: 497, s: 2.05},
              {f: 310, cx: 563, cy: 497, s: 2.05},
              {f: 350, cx: 1160, cy: 497, s: 1.9},
              {f: 419, cx: 1160, cy: 497, s: 1.75},
            ]}
            focus={[
              ...P1_FIELDS,
              {box: {x: 880, y: 421, w: 560, h: 150}, start: 350, label: 'Each pond: its own profile'},
            ]}
          />
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
