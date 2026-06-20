import { useState } from 'react';

export default function Header({ greeting, title, monthLabel, primaryLabel, onPrimary }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 26, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontSize: 13, color: '#9b9081', fontWeight: 600, marginBottom: 6 }}>{greeting}</div>
        <h1 className="page-title" style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 33, letterSpacing: '-.025em', margin: 0, lineHeight: 1 }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 11, padding: '9px 14px', fontWeight: 600, fontSize: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d9603b' }} />{monthLabel}
        </div>
        <button
          onClick={onPrimary}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => { setHover(false); setActive(false); }}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7, background: '#d9603b', color: '#fff', border: 'none',
            borderRadius: 11, padding: '11px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            boxShadow: active ? '0 1px 0 #b94a28' : '0 3px 0 #b94a28',
            transform: active ? 'translateY(1px)' : hover ? 'translateY(-1px)' : 'none',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1, marginTop: -1 }}>+</span> {primaryLabel}
        </button>
      </div>
    </div>
  );
}
