import { useState } from 'react';

const ACCENT_PRESETS = ['#d9603b', '#3b6ea5', '#2f9e8f', '#7c5cbf', '#b0507f', '#c0392b'];

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>
  ) },
  { key: 'transactions', label: 'Transactions', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9h14M8 6L5 9l3 3M19 15H5M16 12l3 3-3 3"/></svg>
  ) },
  { key: 'budgets', label: 'Budgets', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="11" width="4" height="9" rx="1.5"/><rect x="10" y="5" width="4" height="15" rx="1.5"/><rect x="16" y="14" width="4" height="6" rx="1.5"/></svg>
  ) },
  { key: 'subscriptions', label: 'Subscriptions', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="8"/></svg>
  ) },
  { key: 'reports', label: 'Reports', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16l5-5 4 3 7-8"/></svg>
  ) },
];

export default function Sidebar({ view, setView, remainingStr, heroBarPct, usedPctStr, user, onSignOut, accentColor, setAccentColor }) {
  const [open, setOpen] = useState(false);
  const name = user?.displayName || user?.email || 'Account';
  const initials = name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

  const goTo = key => { setView(key); setOpen(false); };

  return (
    <aside className={`sidebar${open ? ' sidebar-open' : ''}`}>
      <div className="sidebar-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0 6px' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 21, boxShadow: '0 3px 0 var(--accent-dark)', flex: 'none' }}>₹</div>
          <div className="sidebar-brand-text">
            <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 20, letterSpacing: '-.02em', lineHeight: 1 }}>Tally</div>
            <div style={{ fontSize: 11, color: '#9b9081', fontWeight: 500, marginTop: 2 }}>Personal finance</div>
          </div>
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 8, color: '#221c17' }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const active = view === item.key;
          return (
            <a
              key={item.key}
              onClick={() => goTo(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 11,
                textDecoration: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', flex: 'none', whiteSpace: 'nowrap',
                background: active ? '#221c17' : 'transparent', color: active ? '#f7f3ec' : '#6b6155',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#efe7d8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = active ? '#221c17' : 'transparent'; }}
            >
              {item.icon}
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-budget-card" style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 14, padding: 15 }}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Left to spend</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 23, margin: '3px 0 10px', letterSpacing: '-.02em' }}>{remainingStr}</div>
          <div style={{ height: 7, borderRadius: 99, background: '#efe7d8', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 99, width: `${heroBarPct}%`, background: 'var(--accent)' }} />
          </div>
          <div style={{ fontSize: 11, color: '#9b9081', marginTop: 8, fontWeight: 500 }}>{usedPctStr} of budget used</div>
        </div>

        <div style={{ padding: '0 6px' }}>
          <div style={{ fontSize: 11, color: '#9b9081', fontWeight: 600, marginBottom: 8 }}>Accent color</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {ACCENT_PRESETS.map(hex => (
              <button
                key={hex}
                onClick={() => setAccentColor(hex)}
                aria-label={`Set accent color ${hex}`}
                style={{
                  width: 22, height: 22, borderRadius: '50%', background: hex, cursor: 'pointer', padding: 0,
                  border: accentColor?.toLowerCase() === hex ? '2px solid #221c17' : '2px solid transparent',
                  boxShadow: '0 0 0 1px rgba(0,0,0,.08)',
                }}
              />
            ))}
            <label
              title="Custom color"
              style={{
                width: 22, height: 22, borderRadius: '50%', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                border: '1.5px dashed #9b9081', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <input
                type="color" value={accentColor || '#d9603b'} onChange={e => setAccentColor(e.target.value)}
                style={{ position: 'absolute', inset: -4, opacity: 0, cursor: 'pointer' }}
              />
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9b9081" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 6px', flex: 'none' }}>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="" style={{ width: 34, height: 34, borderRadius: '50%', flex: 'none', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#2f9e8f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flex: 'none' }}>{initials}</div>
          )}
          <div style={{ lineHeight: 1.25, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{name}</div>
            <div onClick={onSignOut} style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Sign out</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
