import TransactionRow from './TransactionRow';

const statCard = { background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 18, padding: '18px 20px', boxShadow: '0 4px 0 #ece2d2' };

export default function Transactions({ d, filter, setFilter, search, setSearch, sort, setSort, openEditModal, deleteTxn }) {
  return (
    <div className="page-in">
      <div className="grid-3">
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Shown total</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 25, letterSpacing: '-.02em', marginTop: 3 }}>{d.txTotalStr}</div>
        </div>
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Transactions</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 25, letterSpacing: '-.02em', marginTop: 3 }}>{d.txCount}</div>
        </div>
        <div style={statCard}>
          <div style={{ fontSize: 12, color: '#9b9081', fontWeight: 600 }}>Average</div>
          <div style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 25, letterSpacing: '-.02em', marginTop: 3 }}>{d.txAvgStr}</div>
        </div>
      </div>

      <div style={{ background: '#fffdf9', border: '1.5px solid #ece2d2', borderRadius: 20, padding: 22, boxShadow: '0 4px 0 #ece2d2' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: 1, minWidth: 220, background: '#fff', border: '1.5px solid #e6dccb', borderRadius: 11, padding: '9px 13px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b9081" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions"
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, width: '100%', color: '#221c17' }}
            />
          </div>
          <select
            value={sort} onChange={e => setSort(e.target.value)}
            style={{ border: '1.5px solid #e6dccb', borderRadius: 11, padding: '9px 13px', fontSize: 14, fontWeight: 600, background: '#fff', outline: 'none', cursor: 'pointer', color: '#4a423a' }}
          >
            <option value="date">Newest first</option>
            <option value="amount">Highest amount</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          {d.chips.map(chip => {
            const active = filter === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => setFilter(chip.key)}
                style={{
                  border: `1.5px solid ${active ? '#221c17' : '#e6dccb'}`, background: active ? '#221c17' : '#fffdf9',
                  color: active ? '#f7f3ec' : '#6b6155', borderRadius: 99, padding: '6px 13px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 8px', borderBottom: '1.5px solid #ece2d2', fontSize: 11, fontWeight: 700, letterSpacing: '.04em', color: '#9b9081', textTransform: 'uppercase' }}>
          <span style={{ width: 11 }} /><span style={{ flex: 1 }}>Description</span><span>Amount</span><span style={{ width: 54 }} />
        </div>
        {d.txEmpty && (
          <div style={{ padding: 44, textAlign: 'center', color: '#9b9081', fontSize: 14, fontWeight: 500 }}>No matching transactions.</div>
        )}
        {d.txList.map(t => (
          <TransactionRow key={t.id} t={t} onEdit={openEditModal} onDelete={deleteTxn} />
        ))}
      </div>
    </div>
  );
}
