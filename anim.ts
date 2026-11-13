import {Easing, interpolate} from 'remotion';

export const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);

/** 0 -> 1 progress starting at `start`, lasting `dur` frames (eased, clamped). */
export const prog = (
  frame: number,
  start: number,
  dur = 24,
  easing: (t: number) => number = EASE_OUT,
): number => interpolate(frame, [start, start + dur], [0, 1], {...CLAMP, easing});

/** 1 -> 0 over the last `dur` frames before `end`. */
export const fadeOut = (frame: number, end: number, dur = 14): number =>
  interpolate(frame, [end - dur, end], [1, 0], CLAMP);

/** Format a number with fixed decimals (ES2015-safe). */
export const fx = (n: number, d = 2): string => n.toFixed(d);
