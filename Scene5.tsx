import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene5 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>SIMULATE BEFORE YOU ALLOCATE</h2>
      <p style={{ color: '#E8756A', fontSize: '22px', fontWeight: 700, marginBottom: '40px' }}>⚠️ SIMULATED MODEL ESTIMATE — NOT LIVE FARM DATA</p>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '50px', width: '100%', maxWidth: '1300px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#174D40', fontSize: '30px', fontWeight: 800, marginBottom: '20px' }}>Dissolved Oxygen Mass-Balance Trajectory</h3>
        <p style={{ color: '#607D78', fontSize: '22px', lineHeight: 1.6, marginBottom: '25px' }}>Evaluates water column demand, sediment demand, and shrimp respiration against reaeration and mechanical aeration.</p>
        <div style={{ background: '#E9F8F5', padding: '20px', borderRadius: '12px', color: '#174D40', fontSize: '20px', fontWeight: 700 }}>Protection Threshold: 4.0 mg/L (Configurable MPEDA BMP Guideline)</div>
      </div>
    </AbsoluteFill>
  );
};