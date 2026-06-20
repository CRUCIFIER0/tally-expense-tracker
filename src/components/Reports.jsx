const statCard = { background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: 18, boxShadow: '0 4px 0 #ece2d2' };
const cardStyle = { background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 20, padding: 22, boxShadow: '0 4px 0 #ece2d2' };

export default function Reports({ d }) {
  return (
    <div className="page-in">
      <div className="grid-4">
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Biggest expense</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, letterSpacing: '-.02em', margin: '4px 0 2px' }}>{d.biggestAmtStr}</div>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 500 }}>{d.biggestName}</div>
        </div>
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Top category</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, letterSpacing: '-.02em', margin: '4px 0 2px' }}>{d.topSpendStr}</div>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 500 }}>{d.topSpendLabel}</div>
        </div>
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Avg transaction</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, letterSpacing: '-.02em', margin: '4px 0 2px' }}>{d.txAvgStr}</div>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 500 }}>{d.txCount} this month</div>
        </div>
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Most frequent</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, letterSpacing: '-.02em', margin: '4px 0 2px' }}>{d.freqLabel}</div>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 500 }}>{d.freqCount} transactions</div>
        </div>
      </div>

      <div className="grid-reports-main">
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: '0 0 8px', letterSpacing: '-.01em' }}>Monthly trend</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flex: 1, minHeight: 260, paddingTop: 18 }}>
            {d.reportTrend.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9b9081' }}>{bar.valStr}</div>
                <div style={{ width: '100%', maxWidth: 48, borderRadius: '10px 10px 4px 4px', height: bar.h, background: bar.color }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: '#9b9081' }}>{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: '0 0 18px', letterSpacing: '-.01em' }}>Where it goes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {d.reportCats.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4a423a' }}>{c.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{c.valStr} <span style={{ color: '#9b9081', fontWeight: 600, fontSize: 12 }}>{c.pct}%</span></span>
                </div>
                <div style={{ height: 10, borderRadius: 99, background: '#efe7d8', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${c.barPct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
