import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene4 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '10px' }}>ONE FARM. MULTIPLE POND PROFILES.</h2>
      <p style={{ color: '#607D78', fontSize: '24px', marginBottom: '40px' }}>Water depth, starting dissolved oxygen, shrimp biomass, and aerator power per pond.</p>
      <div style={{ display: 'flex', gap: '30px', width: '100%', maxWidth: '1500px' }}>
        {['P1 (2000 m²)', 'P2 (2000 m²)', 'P3 (2000 m²)'].map((p, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '30px', borderTop: '6px solid #18A999', boxShadow: '0 10px 30px rgba(24, 169, 153, 0.1)' }}>
            <h3 style={{ color: '#174D40', fontSize: '28px', fontWeight: 800, marginBottom: '15px' }}>{p}</h3>
            <p style={{ color: '#607D78', fontSize: '20px', lineHeight: 1.6 }}>• Depth: 0.8 m<br/>• Aerator: 2 kW<br/>• Biomass: 2500 kg</p>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};