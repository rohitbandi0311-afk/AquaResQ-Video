import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene8 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>STRATEGY COMPARISON & RESULTS</h2>
      <p style={{ color: '#607D78', fontSize: '24px', marginBottom: '40px' }}>Integrated Oxygen Deficit (mg/L·h, lower is better)</p>
      <div style={{ display: 'flex', gap: '30px', width: '100%', maxWidth: '1400px' }}>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px' }}>
          <h3 style={{ color: '#607D78', fontSize: '22px', fontWeight: 700 }}>No Generator</h3>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#607D78', margin: '15px 0' }}>89.28</div>
          <p style={{ fontSize: '18px', color: '#607D78' }}>Reference baseline deficit</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px' }}>
          <h3 style={{ color: '#F4C66A', fontSize: '22px', fontWeight: 700 }}>Risk First</h3>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#F4C66A', margin: '15px 0' }}>36.24</div>
          <p style={{ fontSize: '18px', color: '#607D78' }}>Greedy starting DO sort</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px', border: '3px solid #18A999' }}>
          <h3 style={{ color: '#18A999', fontSize: '22px', fontWeight: 700 }}>AquaResQ Optimized</h3>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#18A999', margin: '15px 0' }}>23.60</div>
          <p style={{ fontSize: '18px', color: '#174D40', fontWeight: 700 }}>73.6% Lower Deficit</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};