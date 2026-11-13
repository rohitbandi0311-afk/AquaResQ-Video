import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene7 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>EXPLAINABLE RESOURCE OPTIMIZATION</h2>
      <p style={{ color: '#607D78', fontSize: '24px', marginBottom: '40px' }}>Exhaustive search across binary aerator subsets.</p>
      <div style={{ display: 'flex', gap: '30px', width: '100%', maxWidth: '1400px' }}>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px', borderTop: '6px solid #79C9B0' }}>
          <h3 style={{ color: '#174D40', fontSize: '26px', fontWeight: 800, marginBottom: '15px' }}>P1: 2 kW Powered</h3>
          <p style={{ color: '#607D78', fontSize: '20px' }}>Optimized oxygen preservation trajectory.</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px', borderTop: '6px solid #E8756A' }}>
          <h3 style={{ color: '#174D40', fontSize: '26px', fontWeight: 800, marginBottom: '15px' }}>P2: 0 kW Unpowered</h3>
          <p style={{ color: '#607D78', fontSize: '20px' }}>Exhaustive constraint limit reached.</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px', borderTop: '6px solid #79C9B0' }}>
          <h3 style={{ color: '#174D40', fontSize: '26px', fontWeight: 800, marginBottom: '15px' }}>P3: 2 kW Powered</h3>
          <p style={{ color: '#607D78', fontSize: '20px' }}>Maximizes total oxygen exposure.</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};