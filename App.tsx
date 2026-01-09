
import React, { useState, useMemo } from 'react';
import { UserRole, Transaction, TransactionType, User } from './types';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import ChatRoom from './pages/ChatRoom';
import AdminManagement from './pages/AdminManagement';
import TransactionForm from './components/TransactionForm';
import Login from './pages/Login';
import { Menu, Plus, Shield, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [showForm, setShowForm] = useState<TransactionType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate Total Balance
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      const isInput = [
        TransactionType.PEMAKAIAN,
        TransactionType.TRANSFER_ADMIN,
        TransactionType.TRANSFER_DEBIT,
        TransactionType.BIAYA_LAIN_INPUT,
        TransactionType.MODAL
      ].includes(curr.type);

      return isInput ? acc + curr.amount : acc - curr.amount;
    }, 0);
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id' | 'date' | 'userName' | 'isPending'>) => {
    if (!currentUser) return;
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      userName: currentUser.name,
      isPending: false
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setShowForm(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsSidebarOpen(false);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard transactions={transactions} totalBalance={totalBalance} />;
      case 'reports':
        return <Reports transactions={transactions} />;
      case 'chat':
        return <ChatRoom transactions={transactions} />;
      case 'management':
        return <AdminManagement />;
      default:
        return <Dashboard transactions={transactions} totalBalance={totalBalance} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        role={currentUser.role} 
        activePage={activePage} 
        setActivePage={(p) => {
          setActivePage(p);
          setIsSidebarOpen(false);
        }}
        onAddTransaction={(type) => {
          setShowForm(type);
          setIsSidebarOpen(false);
        }}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64 pb-24 md:pb-8 overflow-x-hidden">
        <header className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-none mb-1">BukuKas Digital</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-xs text-slate-500 flex items-center gap-1">
                   {currentUser.role === UserRole.ADMIN ? <Shield size={10} className="text-indigo-600" /> : <UserIcon size={10} className="text-emerald-600" />}
                   Sesi Aktif: <span className="font-bold text-slate-800">{currentUser.name}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm border ${
              currentUser.role === UserRole.ADMIN 
              ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${currentUser.role === UserRole.ADMIN ? 'bg-indigo-600' : 'bg-emerald-600'}`}></div>
              {currentUser.role} MODE
            </div>
          </div>
        </header>

        {renderPage()}
      </main>

      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center md:hidden z-30 active:scale-90 transition-transform"
      >
        <Plus size={28} />
      </button>

      <BottomNav 
        activePage={activePage} 
        setActivePage={setActivePage} 
        role={currentUser.role} 
      />

      {showForm && (
        <TransactionForm 
          type={showForm} 
          onClose={() => setShowForm(null)} 
          onSubmit={addTransaction}
        />
      )}
    </div>
  );
};

export default App;
