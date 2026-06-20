import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { CATEGORIES, CATEGORY_MAP, defaultBudgets } from './data';
import { fmt, shortDate, todayISO, getMonthInfo, lastNMonthKeys } from './utils';
import { darken, lighten } from './colorUtils';

const blankForm = () => ({ id: null, name: '', amount: '', category: 'food', date: todayISO(), recurring: false });
const blankSub = () => ({ id: null, name: '', amount: '', category: 'fun', cycle: 'Monthly', next: todayISO() });

export const DEFAULT_ACCENT = '#d9603b';

export function useTally(uid) {
  const [view, setView] = useState('dashboard');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState(false);
  const [form, setForm] = useState(blankForm());

  const [subModalOpen, setSubModalOpen] = useState(false);
  const [subError, setSubError] = useState(false);
  const [subForm, setSubForm] = useState(blankSub());

  const [budgets, setBudgets] = useState(defaultBudgets);
  const [subs, setSubs] = useState([]);
  const [txns, setTxns] = useState([]);
  const [accentColor, setAccentColorState] = useState(DEFAULT_ACCENT);
  const [dataLoading, setDataLoading] = useState(true);

  // Firestore: subscribe to this user's document and keep local state in sync.
  const writingRef = useRef(false);
  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, 'users', uid);
    const unsub = onSnapshot(ref, snap => {
      if (writingRef.current) { writingRef.current = false; return; }
      if (snap.exists()) {
        const data = snap.data();
        setBudgets(data.budgets || defaultBudgets);
        setSubs(data.subs || []);
        setTxns(data.txns || []);
        setAccentColorState(data.accentColor || DEFAULT_ACCENT);
      } else {
        setDoc(ref, { budgets: defaultBudgets, subs: [], txns: [], accentColor: DEFAULT_ACCENT });
      }
      setDataLoading(false);
    });
    return unsub;
  }, [uid]);

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--accent', accentColor);
    root.setProperty('--accent-dark', darken(accentColor));
    root.setProperty('--accent-soft', lighten(accentColor, 0.92));
  }, [accentColor]);

  const persist = useCallback((next) => {
    if (!uid) return;
    writingRef.current = true;
    setDoc(doc(db, 'users', uid), next, { merge: true });
  }, [uid]);

  const setFormField = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);
  const setSubFormField = useCallback((k, v) => setSubForm(f => ({ ...f, [k]: v })), []);

  const openAddModal = useCallback(() => { setForm(blankForm()); setFormError(false); setModalOpen(true); }, []);
  const openEditModal = useCallback(t => {
    setForm({ id: t.id, name: t.name, amount: String(t.amount), category: t.category, date: t.date, recurring: !!t.recurring });
    setFormError(false);
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const toggleRecurring = useCallback(() => setForm(f => ({ ...f, recurring: !f.recurring })), []);

  const saveForm = useCallback(() => {
    const amt = parseFloat(form.amount);
    if (!form.name.trim() || !(amt > 0)) { setFormError(true); return; }
    const v = Math.round(amt);
    setTxns(prev => {
      let next;
      if (form.id) {
        next = prev.map(t => t.id === form.id
          ? { ...t, name: form.name.trim(), amount: v, category: form.category, date: form.date, recurring: form.recurring }
          : t);
      } else {
        const nid = Math.max(0, ...prev.map(t => t.id)) + 1;
        next = [{ id: nid, name: form.name.trim(), amount: v, category: form.category, date: form.date, recurring: form.recurring }, ...prev];
      }
      persist({ txns: next });
      return next;
    });
    setModalOpen(false);
    setFormError(false);
  }, [form, persist]);

  const deleteCurrent = useCallback(() => {
    const id = form.id;
    setTxns(prev => {
      const next = prev.filter(x => x.id !== id);
      persist({ txns: next });
      return next;
    });
    setModalOpen(false);
  }, [form, persist]);

  const deleteTxn = useCallback(id => setTxns(prev => {
    const next = prev.filter(x => x.id !== id);
    persist({ txns: next });
    return next;
  }), [persist]);

  const openAddSub = useCallback(() => { setSubForm(blankSub()); setSubError(false); setSubModalOpen(true); }, []);
  const openEditSub = useCallback(s => {
    setSubForm({ id: s.id, name: s.name, amount: String(s.amount), category: s.category, cycle: s.cycle, next: s.next });
    setSubError(false);
    setSubModalOpen(true);
  }, []);
  const closeSub = useCallback(() => setSubModalOpen(false), []);
  const setCycle = useCallback(cycle => setSubForm(f => ({ ...f, cycle })), []);

  const saveSub = useCallback(() => {
    const amt = parseFloat(subForm.amount);
    if (!subForm.name.trim() || !(amt > 0)) { setSubError(true); return; }
    const v = Math.round(amt);
    setSubs(prev => {
      let next;
      if (subForm.id) {
        next = prev.map(x => x.id === subForm.id
          ? { ...x, name: subForm.name.trim(), amount: v, category: subForm.category, cycle: subForm.cycle, next: subForm.next }
          : x);
      } else {
        const nid = Math.max(0, ...prev.map(x => x.id)) + 1;
        next = [...prev, { id: nid, name: subForm.name.trim(), amount: v, category: subForm.category, cycle: subForm.cycle, next: subForm.next }];
      }
      persist({ subs: next });
      return next;
    });
    setSubModalOpen(false);
    setSubError(false);
  }, [subForm, persist]);

  const deleteSubCurrent = useCallback(() => {
    const id = subForm.id;
    setSubs(prev => {
      const next = prev.filter(x => x.id !== id);
      persist({ subs: next });
      return next;
    });
    setSubModalOpen(false);
  }, [subForm, persist]);

  const deleteSub = useCallback(id => setSubs(prev => {
    const next = prev.filter(x => x.id !== id);
    persist({ subs: next });
    return next;
  }), [persist]);

  const setBudget = useCallback((key, val) => setBudgets(b => {
    const next = { ...b, [key]: Math.max(0, Math.round(val || 0)) };
    persist({ budgets: next });
    return next;
  }), [persist]);

  const setAccentColor = useCallback(hex => {
    setAccentColorState(hex);
    persist({ accentColor: hex });
  }, [persist]);

  const derived = useMemo(() => {
    const { monthKey, dayOfMonth, daysInMonth, monthLabel, monthShort } = getMonthInfo();

    const monthTxns = txns.filter(t => t.date.indexOf(monthKey) === 0);
    const total = monthTxns.reduce((a, t) => a + t.amount, 0);
    const budgetTotal = Object.values(budgets).reduce((a, b) => a + b, 0);
    const remaining = budgetTotal - total;
    const dailyAvg = dayOfMonth > 0 ? total / dayOfMonth : 0;
    const projected = dailyAvg * daysInMonth;
    const usedPct = budgetTotal > 0 ? (total / budgetTotal) * 100 : 0;

    const byCat = {};
    CATEGORIES.forEach(c => { byCat[c.key] = 0; });
    monthTxns.forEach(t => { byCat[t.category] = (byCat[t.category] || 0) + t.amount; });

    const C = 2 * Math.PI * 70;
    let acc = 0;
    const donutSegs = [];
    CATEGORIES.forEach(c => {
      const val = byCat[c.key];
      if (val <= 0) return;
      const len = total > 0 ? (val / total) * C : 0;
      donutSegs.push({ color: c.color, dash: `${len.toFixed(2)} ${(C - len).toFixed(2)}`, offset: (-acc).toFixed(2) });
      acc += len;
    });

    const maxCat = Math.max(1, ...CATEGORIES.map(c => byCat[c.key]));
    const legend = CATEGORIES.map(c => ({
      label: c.label, color: c.color, valStr: fmt(byCat[c.key]),
      pct: total > 0 ? Math.round((byCat[c.key] / total) * 100) : 0,
      barPct: Math.round((byCat[c.key] / maxCat) * 100),
    }));

    const budgetRows = CATEGORIES.map(c => {
      const spent = byCat[c.key], b = budgets[c.key] || 0;
      const ratio = b > 0 ? spent / b : 0;
      return { label: c.label, spentStr: fmt(spent), budgetStr: fmt(b), pct: Math.min(100, Math.round(ratio * 100)), barColor: spent > b ? '#c0392b' : c.color };
    });

    const budgetCards = CATEGORIES.map(c => {
      const spent = byCat[c.key], b = budgets[c.key] || 0;
      const ratio = b > 0 ? spent / b : 0;
      const rem = b - spent;
      return {
        key: c.key, label: c.label, color: c.color, budget: b,
        spentStr: fmt(spent), pct: Math.min(100, Math.round(ratio * 100)),
        barColor: spent > b ? '#c0392b' : c.color,
        remainStr: rem >= 0 ? `${fmt(rem)} left` : `${fmt(-rem)} over`,
        remainColor: rem >= 0 ? '#2f9e8f' : '#c0392b',
      };
    });

    const monthSlots = lastNMonthKeys(6);
    const totalsByMonth = {};
    txns.forEach(t => {
      const key = t.date.slice(0, 7);
      totalsByMonth[key] = (totalsByMonth[key] || 0) + t.amount;
    });
    const shown = monthSlots.map(({ key, label }) => ({ label, value: totalsByMonth[key] || 0, current: key === monthKey }));
    const maxV = Math.max(1, ...shown.map(s => s.value));
    const trendBars = shown.map(s => ({ label: s.label, h: Math.max(6, Math.round((s.value / maxV) * 150)), valStr: fmt(s.value), color: s.current ? '#d9603b' : '#e8d3b0' }));
    const reportTrend = shown.map(s => ({ label: s.label, h: Math.max(6, Math.round((s.value / maxV) * 210)), valStr: fmt(s.value), color: s.current ? '#d9603b' : '#e8d3b0' }));

    const subsSorted = subs.slice().sort((a, b) => a.next.localeCompare(b.next));
    const subsList = subsSorted.map(s => ({
      id: s.id, name: s.name, amountStr: fmt(s.amount), cycle: s.cycle, nextStr: shortDate(s.next),
      color: (CATEGORY_MAP[s.category] || {}).color || '#888', initial: s.name.charAt(0),
    }));
    const subCards = subsSorted.map(s => ({
      id: s.id, name: s.name, amountStr: fmt(s.amount), cycle: s.cycle, nextStr: shortDate(s.next),
      catLabel: (CATEGORY_MAP[s.category] || {}).label || '', color: (CATEGORY_MAP[s.category] || {}).color || '#888', initial: s.name.charAt(0),
      raw: s,
    }));
    const subMonthly = subs.filter(s => s.cycle === 'Monthly').reduce((a, s) => a + s.amount, 0);
    const subYearly = subMonthly * 12 + subs.filter(s => s.cycle === 'Yearly').reduce((a, s) => a + s.amount, 0);
    const subNext = subsSorted.length ? shortDate(subsSorted[0].next) : '—';

    const mkRow = t => ({
      id: t.id, name: t.name, amountStr: fmt(t.amount), dateStr: shortDate(t.date),
      catLabel: (CATEGORY_MAP[t.category] || {}).label || '', catColor: (CATEGORY_MAP[t.category] || {}).color || '#888',
      recurring: !!t.recurring, raw: t,
    });

    const sortedByDate = txns.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
    const recentFiltered = (filter === 'all' ? sortedByDate : sortedByDate.filter(t => t.category === filter)).slice(0, 6);
    const recentList = recentFiltered.map(mkRow);

    const searchLower = (search || '').toLowerCase().trim();
    let arr = txns.slice();
    if (filter !== 'all') arr = arr.filter(t => t.category === filter);
    if (searchLower) arr = arr.filter(t => t.name.toLowerCase().indexOf(searchLower) >= 0);
    arr.sort((a, b) => sort === 'amount' ? b.amount - a.amount : (b.date.localeCompare(a.date) || b.id - a.id));
    const txList = arr.map(mkRow);
    const txTotal = arr.reduce((a, t) => a + t.amount, 0);
    const txAvg = arr.length ? txTotal / arr.length : 0;

    const chips = [{ key: 'all', label: 'All' }].concat(CATEGORIES.map(c => ({ key: c.key, label: c.label })));

    let biggest = null;
    monthTxns.forEach(t => { if (!biggest || t.amount > biggest.amount) biggest = t; });
    const counts = {};
    monthTxns.forEach(t => { counts[t.category] = (counts[t.category] || 0) + 1; });
    let freqKey = null, freqCount = 0;
    Object.keys(counts).forEach(k => { if (counts[k] > freqCount) { freqCount = counts[k]; freqKey = k; } });
    let topKey = null, topVal = 0;
    CATEGORIES.forEach(c => { if (byCat[c.key] > topVal) { topVal = byCat[c.key]; topKey = c.key; } });
    const reportCats = CATEGORIES.map(c => ({
      label: c.label, color: c.color, valStr: fmt(byCat[c.key]),
      pct: total > 0 ? Math.round((byCat[c.key] / total) * 100) : 0,
      barPct: Math.round((byCat[c.key] / maxCat) * 100), value: byCat[c.key],
    })).sort((a, b) => b.value - a.value);

    const RC = 2 * Math.PI * 27;
    const ringLen = Math.min(1, usedPct / 100) * RC;
    const ringDash = `${ringLen.toFixed(2)} ${(RC - ringLen).toFixed(2)}`;

    return {
      monthLabel, monthShort,
      total, budgetTotal, remaining, usedPct, dailyAvg, projected,
      totalStr: fmt(total), budgetTotalStr: fmt(budgetTotal),
      remainingStr: fmt(Math.abs(remaining)), remainingColor: remaining < 0 ? '#c0392b' : '#221c17',
      remainWord: remaining < 0 ? 'over budget' : 'remaining',
      usedPctStr: `${Math.round(usedPct)}%`, heroBarPct: Math.min(100, Math.round(usedPct)),
      daysLeft: daysInMonth - dayOfMonth,
      dailyAvgStr: fmt(dailyAvg), projectedStr: fmt(projected),
      projectedColor: projected > budgetTotal ? '#c0392b' : '#2f9e8f',
      ringDash, donutSegs, donutTotalStr: fmt(total),
      legend, budgetRows, budgetCards, trendBars, reportTrend,
      subsList, subCards, subMonthlyStr: fmt(subMonthly), subYearlyStr: fmt(subYearly), subNextStr: subNext,
      recentList, txList, txEmpty: txList.length === 0,
      txTotalStr: fmt(txTotal), txCount: arr.length, txAvgStr: fmt(txAvg),
      chips,
      biggestAmtStr: biggest ? fmt(biggest.amount) : fmt(0), biggestName: biggest ? biggest.name : '—',
      topSpendStr: fmt(topVal), topSpendLabel: topKey ? (CATEGORY_MAP[topKey] || {}).label : '—',
      freqLabel: freqKey ? (CATEGORY_MAP[freqKey] || {}).label : '—', freqCount,
      reportCats,
    };
  }, [txns, budgets, subs, filter, search, sort]);

  return {
    view, setView, filter, setFilter, search, setSearch, sort, setSort,
    modalOpen, formError, form, setFormField, openAddModal, openEditModal, closeModal, toggleRecurring, saveForm, deleteCurrent, deleteTxn,
    subModalOpen, subError, subForm, setSubFormField, openAddSub, openEditSub, closeSub, setCycle, saveSub, deleteSubCurrent, deleteSub,
    budgets, setBudget,
    accentColor, setAccentColor,
    dataLoading,
    derived,
  };
}
