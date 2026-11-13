import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
export const Scene9 = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ backgroundColor: '#E9F8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, padding: '60px' }}>
      <h2 style={{ color: '#174D40', fontSize: '48px', fontWeight: 900, marginBottom: '20px' }}>EXPLAINABLE BY DESIGN</h2>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '50px 70px', maxWidth: '1200px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#18A999', fontSize: '28px', fontWeight: 800, marginBottom: '20px' }}>Why this generator allocation?</h3>
        <p style={{ color: '#607D78', fontSize: '24px', lineHeight: 1.6, marginBottom: '20px' }}>Deterministic reason codes explain why power was assigned to specific ponds, which alternatives were excluded, and trade-offs across strategies.</p>
        <div style={{ color: '#174D40', fontSize: '22px', fontWeight: 700 }}>INPUTS → CONSTRAINTS → DECISION</div>
      </div>
    </AbsoluteFill>
  );
};