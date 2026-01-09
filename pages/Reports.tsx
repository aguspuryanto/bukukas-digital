
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { Search, Download, Filter } from 'lucide-react';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-slate-800">Riwayat Transaksi Lengkap</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm w-full md:w-64 transition-all"
              />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
              <Filter size={18} />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-semibold text-slate-600 text-sm">Tanggal</th>
                <th className="pb-4 font-semibold text-slate-600 text-sm">Jenis</th>
                <th className="pb-4 font-semibold text-slate-600 text-sm">Keterangan</th>
                <th className="pb-4 font-semibold text-slate-600 text-sm">Kasir</th>
                <th className="pb-4 font-semibold text-slate-600 text-sm text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-sm text-slate-600">
                    {new Date(t.date).toLocaleDateString('id-ID')}
                    <br />
                    <span className="text-xs text-slate-400">{new Date(t.date).toLocaleTimeString('id-ID')}</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      [TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type)
                      ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {t.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-800 max-w-xs truncate">
                    {t.description || '-'}
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {t.userName}
                  </td>
                  <td className={`py-4 text-sm font-bold text-right ${
                    [TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type)
                    ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {[TransactionType.PEMAKAIAN, TransactionType.TRANSFER_ADMIN, TransactionType.TRANSFER_DEBIT, TransactionType.BIAYA_LAIN_INPUT, TransactionType.MODAL].includes(t.type) ? '+' : '-'} {formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
