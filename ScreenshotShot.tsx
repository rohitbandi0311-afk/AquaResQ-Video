import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {CLAMP, EASE_IO, fadeOut, prog} from '../utils/anim';

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
/** Camera keyframe in SOURCE-IMAGE pixels: centre (cx, cy) and zoom s (1 = whole image visible). */
export interface Cam {
  f: number;
  cx: number;
  cy: number;
  s: number;
}
export interface Focus {
  box: Box;
  start: number;
  end?: number;
  label?: string;
}
export interface CursorKF {
  f: number;
  x: number;
  y: number;
}

interface Props {
  file: string; // file name inside public/aquaresq/screens/
  imgW: number;
  imgH: number;
  width: number;
  height: number;
  cam: Cam[];
  focus?: Focus[];
  cursor?: CursorKF[];
  clicks?: number[];
  opacity?: number;
}

const kf = (frame: number, frames: number[], values: number[]): number =>
  interpolate(frame, frames, values, {...CLAMP, easing: EASE_IO});

/**
 * Real AquaResQ screenshot with a virtual camera (zoom/pan), animated focus outlines and a cursor.
 * Everything drawn on top is positioned in source-image pixels so it tracks the camera exactly.
 */
export const ScreenshotShot: React.FC<Props> = ({
  file,
  imgW,
  imgH,
  width,
  height,
  cam,
  focus = [],
  cursor,
  clicks = [],
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const u = width / imgW;
  const fr = cam.map((c) => c.f);
  const cx = kf(frame, fr, cam.map((c) => c.cx));
  const cy = kf(frame, fr, cam.map((c) => c.cy));
  const s = kf(frame, fr, cam.map((c) => c.s));

  const cur = (f: number) =>
    cursor
      ? {
          x: kf(f, cursor.map((c) => c.f), cursor.map((c) => c.x)),
          y: kf(f, cursor.map((c) => c.f), cursor.map((c) => c.y)),
        }
      : {x: 0, y: 0};
  const cp = cur(frame);

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', opacity}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: imgW * u,
          height: imgH * u,
          transformOrigin: '0 0',
          transform: `translate(${width / 2 - cx * u * s}px, ${height / 2 - cy * u * s}px) scale(${s})`,
        }}
      >
        <Img src={staticFile(`aquaresq/screens/${file}`)} style={{width: '100%', height: '100%', display: 'block'}} />

        {focus.map((f, i) => {
          const p = prog(frame, f.start, 18);
          const o = f.end !== undefined ? fadeOut(frame, f.end, 12) : 1;
          const pad = 6;
          const labelAbove = f.box.y > 50;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (f.box.x - pad) * u,
                top: (f.box.y - pad) * u,
                width: (f.box.w + pad * 2) * u,
                height: (f.box.h + pad * 2) * u,
                border: `${4 / s}px solid ${C.teal}`,
                borderRadius: 12 / s + 4,
                background: 'rgba(24,169,153,0.07)',
                boxShadow: `0 0 ${26 / s}px rgba(24,169,153,0.45)`,
                opacity: p * o,
                transform: `scale(${0.96 + 0.04 * p})`,
              }}
            >
              {f.label && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: labelAbove ? -46 / s : f.box.h * u + pad * 2 * u + 8 / s,
                    padding: `${6 / s}px ${16 / s}px`,
                    borderRadius: 999,
                    background: C.teal,
                    color: C.white,
                    fontSize: 24 / s,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 16px rgba(23,77,64,0.25)',
                  }}
                >
                  {f.label}
                </div>
              )}
            </div>
          );
        })}

        {clicks.map((c, i) => {
          const t = interpolate(frame, [c, c + 16], [0, 1], CLAMP);
          const pos = cur(c);
          return frame >= c && t < 1 ? (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: pos.x * u - (24 + t * 50) / s,
                top: pos.y * u - (24 + t * 50) / s,
                width: (48 + t * 100) / s,
                height: (48 + t * 100) / s,
                borderRadius: '50%',
                border: `${4 / s}px solid ${C.teal}`,
                opacity: 1 - t,
              }}
            />
          ) : null;
        })}

        {cursor && (
          <svg
            width={34 / s}
            height={34 / s}
            viewBox="0 0 24 32"
            style={{
              position: 'absolute',
              left: cp.x * u,
              top: cp.y * u,
              filter: 'drop-shadow(0 4px 6px rgba(23,77,64,0.35))',
            }}
          >
            <path d="M1 1 L1 25 L7 19.5 L11.5 30 L16 28 L11.5 18 L20 18 Z" fill="#FFFFFF" stroke={C.forest} strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
};
