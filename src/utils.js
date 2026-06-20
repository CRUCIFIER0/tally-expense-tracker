import { MONTHS } from './data';

export const CURRENCY_SYMBOL = '₹';

const nf = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export function fmt(n) {
  return CURRENCY_SYMBOL + nf.format(Math.round(n));
}

export function shortDate(dateStr) {
  const [, m, d] = dateStr.split('-');
  return MONTHS[parseInt(m, 10) - 1] + ' ' + parseInt(d, 10);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function getMonthInfo(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOfMonth = date.getDate();
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return {
    monthKey, dayOfMonth, daysInMonth,
    monthLabel: `${fullMonths[month]} ${year}`,
    monthShort: fullMonths[month],
  };
}

export function lastNMonthKeys(n, date = new Date()) {
  const keys = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
    keys.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: MONTHS[d.getMonth()] });
  }
  return keys;
}
