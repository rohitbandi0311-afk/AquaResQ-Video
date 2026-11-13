import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene3 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#18A999', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '80px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '30px', padding: '70px 90px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', textAlign: 'center', maxWidth: '1300px' }}>
        <h1 style={{ color: '#174D40', fontSize: '68px', fontWeight: 900, marginBottom: '15px' }}>AquaResQ</h1>
        <div style={{ color: '#18A999', fontSize: '26px', fontWeight: 700, letterSpacing: '3px', marginBottom: '30px' }}>POND INTELLIGENCE</div>
        <p style={{ color: '#607D78', fontSize: '28px', fontWeight: 500, lineHeight: 1.5 }}>Multi-Pond Aquaculture Emergency Intelligence & Resource Optimization System</p>
        <div style={{ marginTop: '30px', fontSize: '20px', color: '#174D40', fontWeight: 600, background: '#E9F8F5', padding: '12px 24px', borderRadius: '12px', display: 'inline-block' }}>🔗 https://aqua-res-q.vercel.app/</div>
      </div>
    </AbsoluteFill>
  );
};