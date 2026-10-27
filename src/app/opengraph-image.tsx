import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt =
  'SmartMacroCalc.com — Body Recomposition, GLP-1 Protein & Calorie Cycling Calculator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 64px',
          background: 'linear-gradient(135deg, #0f172a 0%, #0f172a 55%, #042f2e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Row: Brand & Clinical Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: '#0d9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
                color: '#ffffff',
              }}
            >
              SMC
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '30px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                  SmartMacroCalc.com
                </span>
                <span
                  style={{
                    background: 'rgba(20, 184, 166, 0.2)',
                    border: '1px solid rgba(45, 212, 191, 0.4)',
                    color: '#5eead4',
                    fontSize: '13px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  EVIDENCE-BASED
                </span>
              </div>
              <span style={{ fontSize: '15px', color: '#94a3b8', marginTop: '2px' }}>
                Mifflin-St Jeor • Katch-McArdle • Cunningham Bioenergetics Engine
              </span>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              color: '#6ee7b7',
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            NCBI PubMed Cited • 100% Free
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-1px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Body Recomposition, GLP-1 Protein</span>
            <span style={{ color: '#2dd4bf' }}>&amp; Calorie Cycling Calculator</span>
          </div>
          <div
            style={{
              fontSize: '21px',
              color: '#cbd5e1',
              marginTop: '14px',
              maxWidth: '980px',
              lineHeight: 1.4,
            }}
          >
            Calculate exact Training Day (+5%) &amp; Rest Day (-20%) macros, Ozempic/GLP-1 lean
            muscle floors, Perimenopause protocols, 16:8 Fasting timelines &amp; 12-week projections.
          </div>
        </div>

        {/* 3 Visual Preview Metric Cards */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            width: '100%',
            marginTop: '12px',
          }}
        >
          <div
            style={{
              flex: 1,
              background: 'rgba(16, 185, 129, 0.12)',
              border: '2px solid rgba(16, 185, 129, 0.45)',
              borderRadius: '18px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#6ee7b7' }}>
              TRAINING DAYS (+5% SURPLUS)
            </span>
            <span style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              2,870 kcal
            </span>
            <span style={{ fontSize: '15px', color: '#cbd5e1', marginTop: '4px' }}>
              175g Protein • 335g Carbs • mTORC1 Refeed
            </span>
          </div>

          <div
            style={{
              flex: 1,
              background: 'rgba(99, 102, 241, 0.12)',
              border: '2px solid rgba(129, 140, 248, 0.45)',
              borderRadius: '18px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#a5b4fc' }}>
              REST DAYS (-20% DEFICIT)
            </span>
            <span style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              2,185 kcal
            </span>
            <span style={{ fontSize: '15px', color: '#cbd5e1', marginTop: '4px' }}>
              175g Protein • 160g Carbs • Fat Oxidation
            </span>
          </div>

          <div
            style={{
              flex: 1,
              background: 'rgba(20, 184, 166, 0.12)',
              border: '2px solid rgba(45, 212, 191, 0.45)',
              borderRadius: '18px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#5eead4' }}>
              7 CLINICAL CALCULATORS
            </span>
            <span style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              3.0g Leucine
            </span>
            <span style={{ fontSize: '15px', color: '#cbd5e1', marginTop: '4px' }}>
              GLP-1 • Perimenopause • 16:8 Clock • FFMI
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
