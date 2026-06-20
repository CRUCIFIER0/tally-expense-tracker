import { useState } from 'react';
import TransactionRow from './TransactionRow';

const cardStyle = { background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 20, padding: 22, boxShadow: '0 4px 0 #ece2d2' };

export default function Dashboard({ d, monthLabel, monthShort, setView, openEditModal, deleteTxn }) {
  return (
    <div className="page-in">
      <div className="grid-hero">
        <div style={{ background: '#d9603b', color: '#fff', borderRadius: 20, padding: '22px 24px', boxShadow: '0 4px 0 #b94a28', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: .85 }}>Spent in {monthLabel}</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 42, letterSpacing: '-.03em', margin: '6px 0 16px', lineHeight: 1 }}>{d.totalStr}</div>
          <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,.28)', overflow: 'hidden', marginBottom: 9 }}>
            <div style={{ height: '100%', borderRadius: 99, width: `${d.heroBarPct}%`, background: '#fff' }} />
          </div>
          <div style={{ fontSize: 13, opacity: .92, fontWeight: 500 }}>{d.usedPctStr} of {d.budgetTotalStr} budget</div>
        </div>

        <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 74, height: 74, flex: 'none' }}>
            <svg width="74" height="74" viewBox="0 0 74 74">
              <circle cx="37" cy="37" r="27" fill="none" stroke="#efe7d8" strokeWidth="9" />
              <g transform="rotate(-90 37 37)">
                <circle cx="37" cy="37" r="27" fill="none" stroke="#d9603b" strokeWidth="9" strokeLinecap="round" strokeDasharray={d.ringDash} />
              </g>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 15 }}>{d.usedPctStr}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#9b9081', fontWeight: 600 }}>Left to spend</div>
            <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 27, letterSpacing: '-.02em', margin: '3px 0', color: d.remainingColor }}>{d.remainingStr}</div>
            <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 500 }}>{d.daysLeft} days left in {monthShort}</div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 13, color: '#9b9081', fontWeight: 600 }}>Avg per day</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 27, letterSpacing: '-.02em', margin: '3px 0 12px' }}>{d.dailyAvgStr}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f6f0e6', borderRadius: 9, padding: '7px 11px', fontSize: 12, fontWeight: 600, color: d.projectedColor }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />Projected {d.projectedStr}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: '0 0 18px', letterSpacing: '-.01em' }}>Spending by category</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ position: 'relative', width: 178, height: 178, flex: 'none' }}>
              <svg width="178" height="178" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="#efe7d8" strokeWidth="22" />
                <g transform="rotate(-90 90 90)">
                  {d.donutSegs.map((seg, i) => (
                    <circle key={i} cx="90" cy="90" r="70" fill="none" stroke={seg.color} strokeWidth="22" strokeDasharray={seg.dash} strokeDashoffset={seg.offset} />
                  ))}
                </g>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 11, color: '#9b9081', fontWeight: 600 }}>Total</div>
                <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 21, letterSpacing: '-.02em' }}>{d.donutTotalStr}</div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {d.legend.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flex: 'none' }} />
                  <span style={{ fontSize: 13, fontWeight: 500, flex: 1, color: '#4a423a' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{item.valStr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: '0 0 8px', letterSpacing: '-.01em' }}>Monthly spending</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, flex: 1, minHeight: 184, paddingTop: 18 }}>
            {d.trendBars.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#9b9081' }}>{bar.valStr}</div>
                <div style={{ width: '100%', maxWidth: 40, borderRadius: '9px 9px 4px 4px', height: bar.h, background: bar.color }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: '#9b9081' }}>{bar.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: 0, letterSpacing: '-.01em' }}>Budgets</h3>
            <span onClick={() => setView('budgets')} style={{ fontSize: 12, color: '#d9603b', fontWeight: 700, cursor: 'pointer' }}>Manage →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {d.budgetRows.map((row, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#4a423a' }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#9b9081' }}><b style={{ color: '#221c17', fontWeight: 700 }}>{row.spentStr}</b> / {row.budgetStr}</span>
                </div>
                <div style={{ height: 9, borderRadius: 99, background: '#efe7d8', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, width: `${row.pct}%`, background: row.barColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: 0, letterSpacing: '-.01em' }}>Subscriptions</h3>
            <span onClick={() => setView('subscriptions')} style={{ fontSize: 12, color: '#d9603b', fontWeight: 700, cursor: 'pointer' }}>{d.subMonthlyStr}/mo →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {d.subsList.map(s => (
              <SubRow key={s.id} s={s} />
            ))}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18, margin: 0, letterSpacing: '-.01em' }}>Recent transactions</h3>
          <span onClick={() => setView('transactions')} style={{ fontSize: 13, color: '#d9603b', fontWeight: 700, cursor: 'pointer' }}>See all →</span>
        </div>
        <div>
          {d.recentList.map(t => (
            <TransactionRow key={t.id} t={t} onEdit={openEditModal} onDelete={deleteTxn} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SubRow({ s }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 6px', borderRadius: 10, background: hover ? '#faf5ec' : 'transparent' }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flex: 'none' }}>{s.initial}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
        <div style={{ fontSize: 11, color: '#9b9081' }}>{s.cycle} · Next {s.nextStr}</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{s.amountStr}</div>
    </div>
  );
}
