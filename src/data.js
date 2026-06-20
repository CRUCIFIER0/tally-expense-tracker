export const CATEGORIES = [
  { key: 'food', label: 'Food & Dining', color: '#d9603b' },
  { key: 'grocery', label: 'Groceries', color: '#2f9e8f' },
  { key: 'transport', label: 'Transport', color: '#3b6ea5' },
  { key: 'shopping', label: 'Shopping', color: '#b0507f' },
  { key: 'bills', label: 'Bills & Utilities', color: '#e0962f' },
  { key: 'fun', label: 'Entertainment', color: '#7c5cbf' },
];

export const CATEGORY_MAP = CATEGORIES.reduce((m, c) => {
  m[c.key] = c;
  return m;
}, {});

export const defaultBudgets = {
  food: 4000, grocery: 5000, transport: 2500, shopping: 6000, bills: 5000, fun: 2000,
};

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
