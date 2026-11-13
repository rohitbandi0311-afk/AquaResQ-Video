import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene10 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>HONEST LIMITATIONS & FUTURE SCOPE</h2>
      <div style={{ display: 'flex', gap: '30px', maxWidth: '1300px' }}>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px' }}>
          <h3 style={{ color: '#E8756A', fontSize: '24px', fontWeight: 800, marginBottom: '15px' }}>Current Prototype</h3>
          <p style={{ color: '#607D78', fontSize: '20px', lineHeight: 1.5 }}>• Software-only planning prototype<br/>• Simulated planning data<br/>• No live sensor integration</p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '35px' }}>
          <h3 style={{ color: '#18A999', fontSize: '24px', fontWeight: 800, marginBottom: '15px' }}>Next Steps</h3>
          <p style={{ color: '#607D78', fontSize: '20px', lineHeight: 1.5 }}>• Expert review & field validation<br/>• Weather & IoT sensor integration<br/>• Mobile emergency alerts</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};