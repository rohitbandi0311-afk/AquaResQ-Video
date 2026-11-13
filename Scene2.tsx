import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene2 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '80px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '60px 80px', boxShadow: '0 20px 40px rgba(24, 169, 153, 0.1)', border: '3px solid #E8756A', maxWidth: '1200px', textAlign: 'center' }}>
        <div style={{ color: '#E8756A', fontSize: '24px', fontWeight: 800, letterSpacing: '2px', marginBottom: '15px' }}>⚠️ POWER FAILURE DETECTED</div>
        <h2 style={{ color: '#174D40', fontSize: '56px', fontWeight: 800, marginBottom: '20px' }}>LIMITED BACKUP POWER</h2>
        <p style={{ color: '#607D78', fontSize: '30px', fontWeight: 600 }}>When power fails, which pond gets priority before dissolved oxygen collapses?</p>
      </div>
    </AbsoluteFill>
  );
};