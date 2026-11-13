import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {FONT, C} from './theme';
import {SCENES} from './data/timeline';
import {OpeningScene} from './scenes/OpeningScene';
import {OutageScene} from './scenes/OutageScene';
import {ProductRevealScene} from './scenes/ProductRevealScene';
import {PondManagementScene} from './scenes/PondManagementScene';
import {SimulationScene} from './scenes/SimulationScene';
import {ConstraintScene} from './scenes/ConstraintScene';
import {OptimizationScene} from './scenes/OptimizationScene';
import {ResultsScene} from './scenes/ResultsScene';
import {ExplainabilityScene} from './scenes/ExplainabilityScene';
import {LimitationsScene} from './scenes/LimitationsScene';
import {ClosingScene} from './scenes/ClosingScene';
import {SceneTransition, TRANSITION_FRAMES, TransitionKind} from './components/SceneTransition';
import {SubtitleTrack} from './components/SubtitleTrack';
import {AudioLayer} from './components/AudioLayer';

const COMPONENTS: React.FC[] = [
  OpeningScene,
  OutageScene,
  ProductRevealScene,
  PondManagementScene,
  SimulationScene,
  ConstraintScene,
  OptimizationScene,
  ResultsScene,
  ExplainabilityScene,
  LimitationsScene,
  ClosingScene,
];

// Boundary i (between scene i and i+1) uses a different transition each time.
const TRANSITIONS: TransitionKind[] = ['fade', 'circle', 'sweep', 'wipe', 'push', 'fade', 'wipe', 'sweep', 'push', 'circle'];

export const AquaResQVideo: React.FC = () => (
  <AbsoluteFill style={{background: C.mist, fontFamily: FONT}}>
    {SCENES.map((s, i) => {
      const Scene = COMPONENTS[i];
      return (
        <Sequence key={s.id} from={s.start} durationInFrames={s.duration} name={`${i + 1}. ${s.name}`}>
          <Scene />
        </Sequence>
      );
    })}

    {SCENES.slice(1).map((s, i) => (
      <Sequence
        key={`t-${s.id}`}
        from={s.start - TRANSITION_FRAMES / 2}
        durationInFrames={TRANSITION_FRAMES}
        name={`Transition ${i + 1}→${i + 2}`}
      >
        <SceneTransition kind={TRANSITIONS[i]} />
      </Sequence>
    ))}

    <SubtitleTrack />
    <AudioLayer />
  </AbsoluteFill>
);
