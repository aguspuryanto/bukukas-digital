
import React, { useState } from 'react';
import { TransactionType } from '../types';
import { X } from 'lucide-react';

interface TransactionFormProps {
  type: TransactionType;
  onClose: () => void;
  onSubmit: (data: { type: TransactionType; amount: number; description: string; adminFee?: number }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, onClose, onSubmit }) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [adminFee, setAdminFee] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onSubmit({
      type,
      amount: Number(amount),
      description,
      adminFee: adminFee ? Number(adminFee) : undefined
    });
  };

  const getTitle = () => {
    return type.replace('_', ' ').toLowerCase();
  };

  const isInput = [
    TransactionType.PEMAKAIAN,
    TransactionType.TRANSFER_ADMIN,
    TransactionType.TRANSFER_DEBIT,
    TransactionType.BIAYA_LAIN_INPUT,
    TransactionType.MODAL
  ].includes(type);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className={`px-6 py-4 flex justify-between items-center text-white ${isInput ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <h3 className="font-bold text-lg capitalize">Input {getTitle()}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah (Rp)</label>
            <input
              type="number"
              required
              autoFocus
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: 50000"
            />
          </div>

          {type === TransactionType.TRANSFER_ADMIN && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Biaya Admin (Opsional)</label>
              <input
                type="number"
                value={adminFee}
                onChange={(e) => setAdminFee(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24"
              placeholder="Berikan catatan transaksi..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 text-white font-bold rounded-lg transition-all shadow-md active:scale-95 ${
                isInput ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
