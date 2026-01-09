
import React from 'react';
import { UserRole, TransactionType } from '../types';
import { 
  LayoutDashboard, 
  Wallet, 
  Send, 
  CreditCard, 
  ArrowDownToLine, 
  FileText, 
  Settings, 
  MessageSquare,
  LogOut,
  Package,
  ArrowUpFromLine,
  PlusCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  activePage: string;
  setActivePage: (page: string) => void;
  onAddTransaction: (type: TransactionType) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  role, 
  activePage, 
  setActivePage, 
  onAddTransaction, 
  onLogout,
  isOpen,
  onClose
}) => {
  // Menu Dasar untuk semua user
  const basicMenu = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard, color: 'text-indigo-600' },
    { label: 'Laporan', id: 'reports', icon: FileText, color: 'text-blue-600' },
    { label: 'Chat Room', id: 'chat', icon: MessageSquare, color: 'text-pink-600' },
  ];

  // Menu Transaksi khusus Admin
  const adminTransactions = [
    { label: 'Modal', type: TransactionType.MODAL, icon: Wallet, color: 'text-emerald-600' },
    { label: 'Transfer Admin', type: TransactionType.TRANSFER_ADMIN, icon: Send, color: 'text-orange-600' },
    { label: 'Kartu Debit', type: TransactionType.TRANSFER_DEBIT, icon: CreditCard, color: 'text-slate-700' },
    { label: 'Tarik Tunai', type: TransactionType.TARIK_TUNAI, icon: ArrowDownToLine, color: 'text-rose-600' },
    { label: 'Setor Admin', type: TransactionType.SETOR_ADMIN, icon: ArrowUpFromLine, color: 'text-cyan-500' },
  ];

  // Menu Transaksi khusus Kasir (User)
  const userTransactions = [
    { label: 'Pemakaian', type: TransactionType.PEMAKAIAN, icon: Package, color: 'text-amber-600' },
    { label: 'Transfer Kasir', type: TransactionType.TRANSFER_ADMIN, icon: Send, color: 'text-indigo-500' },
    { label: 'Setoran Harian', type: TransactionType.SETOR_ADMIN, icon: ArrowUpFromLine, color: 'text-emerald-500' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <div className="bg-indigo-600 text-white p-1 rounded">
            <PlusCircle size={20} />
          </div>
          BukuKas
        </div>
        <button onClick={onClose} className="p-2 md:hidden hover:bg-slate-100 rounded-lg">
          <X size={20} className="text-slate-400" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Menu Utama */}
        <div className="pb-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
          {basicMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePage === item.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} className={item.color} />
              {item.label}
            </button>
          ))}
          {role === UserRole.ADMIN && (
            <button
              onClick={() => setActivePage('management')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'management' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings size={18} className="text-slate-500" />
              User Management
            </button>
          )}
        </div>

        {/* Menu Transaksi Berdasarkan Role */}
        <div className="pt-4 border-t border-slate-50">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Transaksi</p>
          {(role === UserRole.ADMIN ? adminTransactions : userTransactions).map((item, idx) => (
            <button
              key={`trans-${idx}`}
              onClick={() => onAddTransaction(item.type)}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <item.icon size={18} className={item.color} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl text-sm font-bold transition-colors"
        >
          <LogOut size={16} />
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
