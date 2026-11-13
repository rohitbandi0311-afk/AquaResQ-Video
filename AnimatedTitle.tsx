import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';
import {fadeOut, prog} from '../utils/anim';

interface Props {
  text: string;
  start: number;
  end?: number;
  size?: number;
  color?: string;
  weight?: number;
  spacing?: number;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}

/** Elegant upward motion + opacity + blur-to-sharp. */
export const AnimatedTitle: React.FC<Props> = ({
  text,
  start,
  end,
  size = 64,
  color = C.forest,
  weight = 800,
  spacing = 0,
  align = 'left',
  style,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 28);
  const out = end !== undefined ? fadeOut(frame, end, 14) : 1;
  return (
    <div
      style={{
        opacity: p * out,
        transform: `translateY(${(1 - p) * 36}px)`,
        filter: `blur(${(1 - p) * 10}px)`,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: spacing,
        textAlign: align,
        lineHeight: 1.08,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
