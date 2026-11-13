import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
export const Scene11 = () => {
  const frame = useCurrentFrame();
  const scale = spring({ frame, fps: 30, config: { damping: 12 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#18A999', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '80px' }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center', maxWidth: '1300px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '72px', fontWeight: 900, marginBottom: '15px' }}>AquaResQ</h1>
        <p style={{ color: '#E9F8F5', fontSize: '36px', fontWeight: 700, marginBottom: '40px', letterSpacing: '2px' }}>WHEN EVERY POND COUNTS.</p>
        <div style={{ color: '#174D40', background: '#FFFFFF', padding: '16px 32px', borderRadius: '16px', display: 'inline-block', fontSize: '24px', fontWeight: 800 }}>TEAM SKAY • HACKWITHADITYA 2026</div>
      </div>
    </AbsoluteFill>
  );
};