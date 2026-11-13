import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {CUES} from '../data/cues';
import {SHOW_SUBTITLES} from '../data/timeline';
import {CLAMP} from '../utils/anim';

/** Scene-aligned subtitles, max two lines, bottom-centre. Lives at root so it uses absolute frames. */
export const SubtitleTrack: React.FC = () => {
  const frame = useCurrentFrame();
  if (!SHOW_SUBTITLES) return null;
  const cue = CUES.find((c) => frame >= c.start && frame < c.end);
  if (!cue) return null;
  const opacity = interpolate(frame, [cue.start, cue.start + 6, cue.end - 6, cue.end], [0, 1, 1, 0], CLAMP);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 34,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          padding: '14px 36px',
          borderRadius: 22,
          background: 'rgba(255,255,255,0.88)',
          boxShadow: '0 8px 28px rgba(23,77,64,0.14)',
          color: C.forest,
          fontSize: 40,
          fontWeight: 600,
          lineHeight: 1.25,
          textAlign: 'center',
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
