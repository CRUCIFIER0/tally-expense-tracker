import { useAuth } from './useAuth';
import { useTally } from './useTally';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Budgets from './components/Budgets';
import Subscriptions from './components/Subscriptions';
import Reports from './components/Reports';
import ExpenseModal from './components/ExpenseModal';
import SubscriptionModal from './components/SubscriptionModal';

const TITLES = {
  dashboard: { greeting: (name, d) => `Good to see you, ${name}`, title: (name, d) => `Here's your ${d.monthShort}` },
  transactions: { greeting: () => 'All activity', title: () => 'Transactions' },
  budgets: { greeting: () => 'Plan your month', title: () => 'Budgets' },
  subscriptions: { greeting: () => 'Recurring payments', title: () => 'Subscriptions' },
  reports: { greeting: (name, d) => `Your ${d.monthShort}, by the numbers`, title: () => 'Reports' },
};

function AppShell({ user, signOut }) {
  const t = useTally(user.uid);
  const { derived: d } = t;
  const pg = TITLES[t.view] || TITLES.dashboard;
  const firstName = (user.displayName || user.email || 'there').split(' ')[0];

  const primaryLabel = t.view === 'subscriptions' ? 'Add subscription' : 'Add expense';
  const onPrimary = t.view === 'subscriptions' ? t.openAddSub : t.openAddModal;

  if (t.dataLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f4efe6', color: '#9b9081', fontWeight: 600 }}>
        Loading your data…
      </div>
    );
  }

  return (
    <div className="app-shell" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f4efe6', color: '#221c17', WebkitFontSmoothing: 'antialiased' }}>
      <Sidebar
        view={t.view} setView={t.setView} remainingStr={d.remainingStr} heroBarPct={d.heroBarPct} usedPctStr={d.usedPctStr}
        user={user} onSignOut={signOut} accentColor={t.accentColor} setAccentColor={t.setAccentColor}
      />

      <main className="main-content">
        <Header greeting={pg.greeting(firstName, d)} title={pg.title(firstName, d)} monthLabel={d.monthLabel} primaryLabel={primaryLabel} onPrimary={onPrimary} />

        {t.view === 'dashboard' && (
          <Dashboard d={d} monthLabel={d.monthLabel} monthShort={d.monthShort} setView={t.setView} openEditModal={t.openEditModal} deleteTxn={t.deleteTxn} />
        )}
        {t.view === 'transactions' && (
          <Transactions
            d={d} filter={t.filter} setFilter={t.setFilter} search={t.search} setSearch={t.setSearch}
            sort={t.sort} setSort={t.setSort} openEditModal={t.openEditModal} deleteTxn={t.deleteTxn}
          />
        )}
        {t.view === 'budgets' && <Budgets d={d} setBudget={t.setBudget} />}
        {t.view === 'subscriptions' && <Subscriptions d={d} openEditSub={t.openEditSub} deleteSub={t.deleteSub} />}
        {t.view === 'reports' && <Reports d={d} />}
      </main>

      <ExpenseModal
        open={t.modalOpen} form={t.form} setFormField={t.setFormField} toggleRecurring={t.toggleRecurring}
        formError={t.formError} isEdit={!!t.form.id} onClose={t.closeModal} onSave={t.saveForm} onDelete={t.deleteCurrent}
      />
      <SubscriptionModal
        open={t.subModalOpen} form={t.subForm} setFormField={t.setSubFormField} setCycle={t.setCycle}
        error={t.subError} isEdit={!!t.subForm.id} onClose={t.closeSub} onSave={t.saveSub} onDelete={t.deleteSubCurrent}
      />
    </div>
  );
}

export default function App() {
  const { user, authLoading, authError, signIn, signOut } = useAuth();

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f4efe6', color: '#9b9081', fontWeight: 600 }}>
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login onSignIn={signIn} error={authError} />;
  }

  return <AppShell key={user.uid} user={user} signOut={signOut} />;
}
