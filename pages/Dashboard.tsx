
import React from 'react';
import { Transaction, TransactionType } from '../types';
import StatCard from '../components/StatCard';
import { Wallet, TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
  totalBalance: number;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, totalBalance }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const totalInput = transactions
    .filter(t => [TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalOutput = transactions
    .filter(t => [TransactionType.SETOR_ADMIN, TransactionType.TARIK_TUNAI, TransactionType.TARIK_KREDIT, TransactionType.BIAYA_LAIN_OUTPUT].includes(t.type))
    .reduce((acc, curr) => acc + curr.amount, 0);

  const chartData = [
    { name: 'Masuk', amount: totalInput, color: '#10b981' },
    { name: 'Keluar', amount: totalOutput, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard 
          title="Saldo Utama" 
          value={formatCurrency(totalBalance)} 
          icon={Wallet} 
          color="bg-indigo-100 text-indigo-600"
        />
        <div className="grid grid-cols-2 sm:contents gap-3">
          <StatCard 
            title="Masuk" 
            value={formatCurrency(totalInput)} 
            icon={TrendingUp} 
            color="bg-emerald-100 text-emerald-600"
          />
          <StatCard 
            title="Keluar" 
            value={formatCurrency(totalOutput)} 
            icon={TrendingDown} 
            color="bg-rose-100 text-rose-600"
          />
        </div>
        <StatCard 
          title="Total Transaksi" 
          value={transactions.length} 
          icon={Activity} 
          color="bg-amber-100 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
            <Activity size={18} className="text-blue-500" />
            Visualisasi Arus Kas
          </h3>
          <div className="h-[200px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px'}}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 md:mb-6 flex items-center gap-2">
            <Clock size={18} className="text-orange-500" />
            Terbaru
          </h3>
          <div className="space-y-3 md:space-y-4">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-semibold text-slate-800 truncate">{t.type.replace('_', ' ')}</p>
                  <p className="text-[10px] md:text-xs text-slate-500">{new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
                <p className={`text-xs md:text-sm font-bold ml-2 ${
                  [TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type)
                  ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {[TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type) ? '+' : '-'} {formatCurrency(t.amount)}
                </p>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-xs md:text-sm text-slate-400 text-center py-8 italic">Belum ada transaksi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
