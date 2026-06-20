import { useState } from 'react';

function IconButton({ title, onClick, hoverBg, hoverColor, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: 'none', background: hover ? hoverBg : 'transparent', color: hover ? hoverColor : '#9b9081',
        cursor: 'pointer', padding: 7, borderRadius: 8, display: 'flex',
      }}
    >
      {children}
    </button>
  );
}

export default function TransactionRow({ t, onEdit, onDelete }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 8px', borderBottom: '1px solid #f0e8d9', background: hover ? '#faf5ec' : 'transparent' }}
    >
      <span style={{ width: 11, height: 11, borderRadius: 4, background: t.catColor, flex: 'none' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</span>
          {t.recurring && (
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '.04em', color: '#7c5cbf', background: '#efeaf9', borderRadius: 6, padding: '2px 6px' }}>AUTO</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: '#9b9081', marginTop: 1 }}>{t.catLabel} · {t.dateStr}</div>
      </div>
      <span style={{ fontSize: 15, fontWeight: 700 }}>{t.amountStr}</span>
      <div style={{ display: 'flex', gap: 3 }}>
        <IconButton title="Edit" onClick={() => onEdit(t.raw)} hoverBg="#efe7d8" hoverColor="#221c17">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M14 6l4 4"/></svg>
        </IconButton>
        <IconButton title="Delete" onClick={() => onDelete(t.id)} hoverBg="#f7dcd4" hoverColor="#c0392b">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>
        </IconButton>
      </div>
    </div>
  );
}
