import { useState } from 'react';

function IconButton({ title, onClick, hoverBg, hoverColor, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ border: 'none', background: hover ? hoverBg : 'transparent', color: hover ? hoverColor : '#9b9081', cursor: 'pointer', padding: 5, borderRadius: 7, display: 'flex' }}
    >
      {children}
    </button>
  );
}

export default function Subscriptions({ d, openEditSub, deleteSub }) {
  return (
    <div className="page-in">
      <div className="grid-3">
        <div style={{ background: '#7c5cbf', color: '#fff', borderRadius: 18, padding: 20, boxShadow: '0 4px 0 #654aa0' }}>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: .85 }}>Per month</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30, letterSpacing: '-.02em', marginTop: 4 }}>{d.subMonthlyStr}</div>
        </div>
        <div style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: 20, boxShadow: '0 4px 0 #ece2d2' }}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Per year</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30, letterSpacing: '-.02em', marginTop: 4 }}>{d.subYearlyStr}</div>
        </div>
        <div style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: 20, boxShadow: '0 4px 0 #ece2d2' }}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Next payment</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 30, letterSpacing: '-.02em', marginTop: 4 }}>{d.subNextStr}</div>
        </div>
      </div>

      <div className="grid-2" style={{ gap: 16, marginBottom: 0 }}>
        {d.subCards.map(s => (
          <div key={s.id} style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: '18px 20px', boxShadow: '0 4px 0 #ece2d2', display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: s.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19, flex: 'none', fontFamily: "'Bricolage Grotesque'" }}>{s.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: '#9b9081', marginTop: 2 }}>{s.catLabel} · {s.cycle} · Next {s.nextStr}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 18 }}>{s.amountStr}</div>
              <div style={{ display: 'flex', gap: 2, justifyContent: 'flex-end', marginTop: 2 }}>
                <IconButton title="Edit" onClick={() => openEditSub(s.raw)} hoverBg="#efe7d8" hoverColor="#221c17">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>
                </IconButton>
                <IconButton title="Delete" onClick={() => deleteSub(s.id)} hoverBg="#f7dcd4" hoverColor="#c0392b">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
