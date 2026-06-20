import { CATEGORIES } from '../data';
import { CURRENCY_SYMBOL } from '../utils';

export default function ExpenseModal({ open, form, setFormField, toggleRecurring, formError, isEdit, onClose, onSave, onDelete }) {
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
          <h3 style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 21, margin: 0, letterSpacing: '-.01em' }}>{isEdit ? 'Edit expense' : 'Add expense'}</h3>
          <button onClick={onClose} style={{ border: 'none', background: '#efe7d8', width: 30, height: 30, borderRadius: 9, cursor: 'pointer', fontSize: 17, color: '#6b6155', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
        </div>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Amount</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #e6dccb', borderRadius: 13, padding: '12px 16px', marginBottom: 16 }}>
          <span style={{ fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, color: '#9b9081' }}>{CURRENCY_SYMBOL}</span>
          <input
            type="number" value={form.amount} onChange={e => setFormField('amount', e.target.value)} placeholder="0"
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Bricolage Grotesque'", fontWeight: 800, fontSize: 26, width: '100%', color: '#221c17' }}
          />
        </div>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Description</label>
        <input
          type="text" value={form.name} onChange={e => setFormField('name', e.target.value)} placeholder="e.g. Swiggy dinner"
          style={{ width: '100%', border: '1.5px solid #e6dccb', borderRadius: 12, padding: '11px 14px', fontSize: 14, outline: 'none', background: '#fff', marginBottom: 16 }}
        />

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
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#9b9081', marginBottom: 7 }}>Date</label>
            <input
              type="date" value={form.date} onChange={e => setFormField('date', e.target.value)}
              style={{ width: '100%', border: '1.5px solid #e6dccb', borderRadius: 12, padding: '11px 12px', fontSize: 14, background: '#fff', outline: 'none' }}
            />
          </div>
        </div>

        <button
          onClick={toggleRecurring}
          style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', border: '1.5px solid #e6dccb', background: '#fff', borderRadius: 12, padding: '11px 14px', cursor: 'pointer', marginBottom: 18, textAlign: 'left' }}
        >
          <span style={{ width: 42, height: 24, borderRadius: 99, background: form.recurring ? '#2f9e8f' : '#dcd2c0', position: 'relative', flex: 'none' }}>
            <span style={{ position: 'absolute', top: 2, left: form.recurring ? 20 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)' }} />
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#4a423a' }}>Recurring subscription</span>
        </button>

        {formError && (
          <div style={{ fontSize: 13, color: '#c0392b', fontWeight: 600, margin: '-6px 0 14px' }}>Enter a description and an amount greater than 0.</div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          {isEdit && (
            <button onClick={onDelete} style={{ border: '1.5px solid #e8c4bb', background: '#fff', color: '#c0392b', borderRadius: 12, padding: '12px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Delete</button>
          )}
          <button onClick={onClose} style={{ flex: 1, border: '1.5px solid #e6dccb', background: '#fff', color: '#4a423a', borderRadius: 12, padding: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onSave} style={{ flex: 1, border: 'none', background: '#d9603b', color: '#fff', borderRadius: 12, padding: 12, fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 3px 0 #b94a28' }}>{isEdit ? 'Save changes' : 'Add expense'}</button>
        </div>
      </div>
    </div>
  );
}
