import React from 'react';
import {C, SHADOW} from '../theme';

interface Props {
  width: number; // content width; content height is set by `contentHeight`
  contentHeight: number;
  children: React.ReactNode;
  url?: string;
  style?: React.CSSProperties;
  tiltX?: number;
  tiltY?: number;
}

export const CHROME_H = 56;

/** Premium floating browser window. Children fill the content area. */
export const BrowserFrame: React.FC<Props> = ({
  width,
  contentHeight,
  children,
  url = 'aqua-res-q.vercel.app',
  style,
  tiltX = 0,
  tiltY = 0,
}) => (
  <div style={{perspective: 2400, ...style}}>
    <div
      style={{
        width,
        borderRadius: 26,
        background: C.white,
        boxShadow: SHADOW,
        overflow: 'hidden',
        border: '1px solid rgba(23,77,64,0.10)',
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          height: CHROME_H,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 22px',
          background: 'linear-gradient(#FFFFFF, #F1F8F7)',
          borderBottom: '1px solid rgba(23,77,64,0.08)',
        }}
      >
        {['#E8756A', '#F4C66A', '#79C9B0'].map((c) => (
          <span key={c} style={{width: 14, height: 14, borderRadius: 14, background: c}} />
        ))}
        <div
          style={{
            marginLeft: 22,
            flex: 1,
            maxWidth: 520,
            height: 32,
            borderRadius: 16,
            background: C.mist,
            color: C.slate,
            fontSize: 17,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
          }}
        >
          {url}
        </div>
      </div>
      <div style={{width, height: contentHeight, position: 'relative', overflow: 'hidden', background: C.white}}>
        {children}
      </div>
    </div>
  </div>
);
