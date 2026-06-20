import { CATEGORIES } from '../data';
import { CURRENCY_SYMBOL } from '../utils';

export default function SubscriptionModal({ open, form, setFormField, setCycle, error, isEdit, onClose, onSave, onDelete }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(34,28,23,.42)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: 24, animation: 'fade .15s ease' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-card"
        style={{ width: 430, maxWidth: '100%', background: '#fbf7f0', border: '1.5px solid #ece2d2', borderRadius: 22, padding: 26, boxShadow: '0 24px 60px rgba(34,28,23,.3)', animation: 'flyup .22s cubic-bezier(.2,.8,.2,1)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 21, margin: 0, letterSpacing: '-.01em' }}>{isEdit ? 'Edit subscription' : 'Add subscription'}</h3>
          <button onClick={onClose} style={{ border: 'none', background: '#efe7d8', width: 30, height: 30, borderRadius: 9, cursor: 'pointer', fontSize: 17, color: '#6b6155', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
        </div>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Service name</label>
        <input
          type="text" value={form.name} onChange={e => setFormField('name', e.target.value)} placeholder="e.g. Netflix"
          style={{ width: '100%', border: '1.5px solid #e6dccb', borderRadius: 12, padding: '11px 14px', fontSize: 14, outline: 'none', background: '#fff', marginBottom: 16 }}
        />

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Amount</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #e6dccb', borderRadius: 13, padding: '11px 16px', marginBottom: 16 }}>
          <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, color: '#9b9081' }}>{CURRENCY_SYMBOL}</span>
          <input
            type="number" value={form.amount} onChange={e => setFormField('amount', e.target.value)} placeholder="0"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 22, width: '100%', color: '#221c17' }}
          />
        </div>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Billing cycle</label>
        <div style={{ display: 'flex', gap: 8, background: '#efe7d8', borderRadius: 11, padding: 4, marginBottom: 16 }}>
          <button
            onClick={() => setCycle('Monthly')}
            style={{ flex: 1, border: 'none', borderRadius: 8, padding: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: form.cycle === 'Monthly' ? '#fffdf9' : 'transparent', color: form.cycle === 'Monthly' ? '#221c17' : '#8a7f72' }}
          >Monthly</button>
          <button
            onClick={() => setCycle('Yearly')}
            style={{ flex: 1, border: 'none', borderRadius: 8, padding: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: form.cycle === 'Yearly' ? '#fffdf9' : 'transparent', color: form.cycle === 'Yearly' ? '#221c17' : '#8a7f72' }}
          >Yearly</button>
        </div>

        <div className="modal-field-row" style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Category</label>
            <select
              value={form.category} onChange={e => setFormField('category', e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e6dccb', borderRadius: 12, padding: '11px 12px', fontSize: 14, background: '#fff', outline: 'none', cursor: 'pointer' }}
            >
              {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Next payment</label>
            <input
              type="date" value={form.next} onChange={e => setFormField('next', e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e6dccb', borderRadius: 12, padding: '11px 12px', fontSize: 14, background: '#fff', outline: 'none' }}
            />
          </div>
        </div>

        {error && (
          <div style={{ fontSize: 13, color: '#c0392b', fontWeight: 600, margin: '-6px 0 14px' }}>Enter a name and an amount greater than 0.</div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          {isEdit && (
            <button onClick={onDelete} style={{ border: '1.5px solid #e8c4bb', background: '#fff', color: '#c0392b', borderRadius: 12, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Delete</button>
          )}
          <button onClick={onClose} style={{ flex: 1, border: '1.5px solid #e6dccb', background: '#fff', color: '#4a423a', borderRadius: 12, padding: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onSave} style={{ flex: 1, border: 'none', background: '#7c5cbf', color: '#fff', borderRadius: 12, padding: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 3px 0 #654aa0' }}>{isEdit ? 'Save changes' : 'Add subscription'}</button>
        </div>
      </div>
    </div>
  );
}
