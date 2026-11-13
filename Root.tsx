import { AquaResQComposition } from './aquaresq/AquaResQRoot';
import { Composition } from 'remotion';
import { AquaResQVideo } from './AquaResQVideo';

export const Root = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={AquaResQVideo}
        durationInFrames={5400}
        fps={30}
        width={1920}
        height={1080}
      />

      <AquaResQComposition />
    </>
  );
};