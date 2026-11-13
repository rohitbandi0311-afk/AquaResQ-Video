import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene6 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>THE RESOURCE CHALLENGE</h2>
      <p style={{ color: '#607D78', fontSize: '24px', marginBottom: '40px' }}>When generator capacity falls short of total aerator demand.</p>
      <div style={{ display: 'flex', gap: '40px', width: '100%', maxWidth: '1300px' }}>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px', borderLeft: '8px solid #F4C66A' }}>
          <h3 style={{ color: '#174D40', fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>Power Required</h3>
          <div style={{ fontSize: '56px', fontWeight: 900, color: '#174D40' }}>6 kW</div>
          <p style={{ color: '#607D78', fontSize: '20px', marginTop: '10px' }}>Three 2 kW aerators across P1, P2, P3</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px', borderLeft: '8px solid #E8756A' }}>
          <h3 style={{ color: '#174D40', fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>Generator Available</h3>
          <div style={{ fontSize: '56px', fontWeight: 900, color: '#E8756A' }}>4 kW</div>
          <p style={{ color: '#607D78', fontSize: '20px', marginTop: '10px' }}>With a 48 kWh fuel-energy limit over 12 hours</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};