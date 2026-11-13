import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, SHADOW_SOFT} from '../theme';
import {AnimatedChart} from '../components/AnimatedChart';
import {AnimatedTitle} from '../components/AnimatedTitle';
import {Disclaimer} from '../components/Disclaimer';
import {DEFICIT, PERCENT_LOWER, POND_HOURS} from '../data/demoMetrics';
import {prog} from '../utils/anim';

// Scene 8 - frames 3000-3539 (relative 0-539). Pure white background, three bars.
export const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pctP = prog(frame, 250, 50);
  const noteP = prog(frame, 360, 30);
  return (
    <AbsoluteFill style={{background: C.white}}>
      <div style={{position: 'absolute', top: 34, left: 0, right: 0}}>
        <AnimatedTitle text="INTEGRATED OXYGEN DEFICIT" start={6} size={56} align="center" spacing={2} />
        <div style={{textAlign: 'center', marginTop: 8, fontSize: 28, fontWeight: 600, color: C.slate, opacity: prog(frame, 24, 20)}}>
          mg/L·h — lower is better
        </div>
      </div>

      <div style={{position: 'absolute', left: 120, top: 200}}>
        <AnimatedChart
          start={30}
          max={DEFICIT.noGenerator}
          height={520}
          barWidth={230}
          gap={90}
          bars={[
            {label: 'No generator', value: DEFICIT.noGenerator, color: '#9DB5AE', delay: 0},
            {label: 'Highest initial risk first', value: DEFICIT.highestRiskFirst, color: C.amber, delay: 50},
            {label: 'AquaResQ optimized', value: DEFICIT.aquaresqOptimized, color: C.teal, delay: 100},
          ]}
        />
      </div>

      {/* result callout */}
      <div
        style={{
          position: 'absolute',
          left: 1210,
          top: 250,
          width: 600,
          padding: '40px 44px',
          borderRadius: 36,
          background: `linear-gradient(160deg, ${C.mist}, ${C.white})`,
          boxShadow: SHADOW_SOFT,
          border: `3px solid ${C.teal}`,
          opacity: pctP,
          transform: `translateY(${(1 - pctP) * 40}px) scale(${0.95 + 0.05 * pctP})`,
        }}
      >
        <div style={{fontSize: 130, fontWeight: 800, color: C.teal, lineHeight: 1}}>{(PERCENT_LOWER * pctP).toFixed(1)}%</div>
        <div style={{marginTop: 12, fontSize: 40, fontWeight: 800, color: C.forest, lineHeight: 1.15}}>LOWER MODELED DEFICIT</div>
        <div style={{marginTop: 12, fontSize: 28, fontWeight: 600, color: C.slate}}>Compared with no generator allocation.</div>
      </div>

      {/* honest trade-off note: AquaResQ does not dominate every metric */}
      <div
        style={{
          position: 'absolute',
          left: 1210,
          top: 640,
          width: 600,
          padding: '20px 28px',
          borderRadius: 24,
          background: '#FFF8E6',
          border: `2px solid ${C.amber}`,
          fontSize: 25,
          fontWeight: 600,
          color: C.forest,
          lineHeight: 1.35,
          opacity: noteP,
        }}
      >
        Trade-off: “Highest initial risk first” spends fewer pond-hours at/below threshold (
        {POND_HOURS.highestRiskFirst.toFixed(2)} h vs {POND_HOURS.aquaresqOptimized.toFixed(2)} h).
      </div>

      <Disclaimer
        text="SIMULATED RESULT — NOT A VALIDATED FIELD-PERFORMANCE CLAIM."
        start={400}
        size={26}
        style={{top: 'auto', bottom: 118, right: 'auto', left: 120}}
      />
    </AbsoluteFill>
  );
};
