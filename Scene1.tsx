import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
export const Scene1 = () => {
  const frame = useCurrentFrame();
  const scale = spring({ frame, fps: 30, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '80px' }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center', maxWidth: '1400px' }}>
        <div style={{ color: '#18A999', fontSize: '24px', fontWeight: 700, letterSpacing: '4px', marginBottom: '20px' }}>TEAM SKAY PRESENTS • HACKWITHADITYA 2026</div>
        <h1 style={{ color: '#174D40', fontSize: '72px', fontWeight: 900, lineHeight: 1.1, marginBottom: '30px' }}>WHEN EVERY POND COUNTS.</h1>
        <p style={{ color: '#607D78', fontSize: '32px', fontWeight: 500, lineHeight: 1.4 }}>Across aquaculture farms, multiple ponds depend on electricity to keep aerators running.</p>
      </div>
    </AbsoluteFill>
  );
};