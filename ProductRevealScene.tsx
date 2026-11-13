import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from '../theme';
import {WaterBackground} from '../components/WaterBackground';
import {BrowserFrame} from '../components/BrowserFrame';
import {ScreenshotShot} from '../components/ScreenshotShot';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {CLAMP, EASE_IO, prog} from '../utils/anim';
import {IMG_H, IMG_W, frameDims} from '../utils/layout';

// Scene 3 - frames 540-899 (relative 0-359).
export const ProductRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoIn = spring({frame: Math.max(0, frame - 6), fps, config: {damping: 200}});
  const p2 = prog(frame, 150, 55, EASE_IO);

  const logoW = interpolate(p2, [0, 1], [820, 460]);
  const logoLeft = interpolate(p2, [0, 1], [(1920 - 820) / 2, 90]);
  const logoTop = interpolate(p2, [0, 1], [230, 70]);
  const subTop = logoTop + logoW / 2 + 10;
  const subLeft = interpolate(p2, [0, 1], [(1920 - 1100) / 2, 90]);
  const dims = frameDims(1060);

  return (
    <AbsoluteFill>
      <WaterBackground variant="water" ripples cx={960} cy={420} />

      <div
        style={{
          position: 'absolute',
          left: logoLeft,
          top: logoTop,
          width: logoW,
          opacity: logoIn,
          transform: `scale(${0.82 + 0.18 * logoIn})`,
          filter: `blur(${(1 - logoIn) * 12}px) drop-shadow(0 14px 30px rgba(23,77,64,0.18))`,
        }}
      >
        <Img src={staticFile('aquaresq/aquaresq-logo.png')} style={{width: '100%', display: 'block'}} />
      </div>

      <div style={{position: 'absolute', left: subLeft, top: subTop, width: interpolate(p2, [0, 1], [1100, 460])}}>
        <AnimatedTitle
          text="Multi-Pond Emergency Intelligence & Resource Optimization"
          start={55}
          size={interpolate(p2, [0, 1], [40, 32])}
          weight={600}
          color={C.forest}
          align="center"
        />
        <AnimatedTitle
          text="TEAM SKAY"
          start={205}
          size={28}
          weight={800}
          spacing={4}
          color={C.teal}
          align="center"
          style={{marginTop: 26}}
        />
      </div>

      {/* floating browser with the real app */}
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 250,
          opacity: p2,
          transform: `translateX(${(1 - p2) * 260}px)`,
        }}
      >
        <BrowserFrame
          width={dims.width}
          contentHeight={dims.height}
          tiltY={interpolate(frame, [150, 360], [-14, -5], CLAMP)}
          tiltX={interpolate(frame, [150, 360], [5, 2], CLAMP)}
        >
          <ScreenshotShot
            file="overview.png"
            imgW={IMG_W}
            imgH={IMG_H}
            width={dims.width}
            height={dims.height}
            cam={[
              {f: 150, cx: IMG_W / 2, cy: IMG_H / 2, s: 1.0},
              {f: 359, cx: 560, cy: 330, s: 1.35},
            ]}
          />
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
