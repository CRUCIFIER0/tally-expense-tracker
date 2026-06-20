import { CURRENCY_SYMBOL } from '../utils';

export default function Budgets({ d, setBudget }) {
  return (
    <div className="page-in">
      <div style={{
        background: 'var(--accent)', color: '#fff', borderRadius: 20, padding: '24px 26px', boxShadow: '0 4px 0 var(--accent-dark)',
        marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: .85 }}>Total monthly budget</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 38, letterSpacing: '-.03em', margin: '6px 0 4px', lineHeight: 1 }}>{d.budgetTotalStr}</div>
          <div style={{ fontSize: 13, opacity: .92, fontWeight: 500 }}>{d.totalStr} spent · {d.remainingStr} {d.remainWord}</div>
        </div>
        <div style={{ flex: 1, minWidth: 240, maxWidth: 360 }}>
          <div style={{ height: 11, borderRadius: 99, background: 'rgba(255,255,255,.28)', overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', borderRadius: 99, width: `${d.heroBarPct}%`, background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, opacity: .9 }}>
            <span>{d.usedPctStr} used</span><span>{d.daysLeft} days left</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 0 }}>
        {d.budgetCards.map(c => (
          <div key={c.key} style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: 20, boxShadow: '0 4px 0 #ece2d2' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: c.color }} />
                <span style={{ fontSize: 15, fontWeight: 700 }}>{c.label}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.remainColor }}>{c.remainStr}</span>
            </div>
            <div style={{ height: 10, borderRadius: 99, background: '#efe7d8', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', borderRadius: 99, width: `${c.pct}%`, background: c.barColor }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 13, color: '#9b9081', fontWeight: 500 }}><b style={{ color: '#221c17', fontWeight: 700 }}>{c.spentStr}</b> spent</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Budget {CURRENCY_SYMBOL}</span>
                <input
                  type="number" defaultValue={c.budget}
                  onChange={e => setBudget(c.key, parseFloat(e.target.value))}
                  style={{ width: 84, border: '1.5px solid #e6dccb', borderRadius: 9, padding: '7px 10px', fontSize: 14, fontWeight: 700, background: '#fff', outline: 'none', color: '#221c17', fontFamily: "'DM Sans'" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
