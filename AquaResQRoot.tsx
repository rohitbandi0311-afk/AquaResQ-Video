import React from 'react';
import {Composition} from 'remotion';
import {AquaResQVideo} from './AquaResQVideo';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './data/timeline';

/**
 * Drop <AquaResQComposition /> inside your existing Root.tsx fragment, next to MyComp.
 * Composition id: "AquaResQ"  (1920x1080, 30 fps, 4500 frames = 150 s)
 */
export const AquaResQComposition: React.FC = () => (
  <Composition
    id="AquaResQ"
    component={AquaResQVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
