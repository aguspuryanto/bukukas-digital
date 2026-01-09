
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Lock, User as UserIcon, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // Simulasi proses pembacaan role dan kredensial oleh sistem
    setTimeout(() => {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name: username || (role === UserRole.ADMIN ? 'Administrator' : 'Petugas Kasir'),
        role: role // Role yang dibaca dari pilihan pengguna
      });
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-2xl shadow-xl mb-4">
            <CreditCard size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">BukuKas Digital</h1>
          <p className="text-slate-500 mt-2 font-medium">Portal Manajemen Keuangan</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-700">Masuk Sebagai:</label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                  role === UserRole.ADMIN ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  Role: {role}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.USER)}
                  disabled={isLoggingIn}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    role === UserRole.USER 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md ring-4 ring-indigo-50' 
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <UserIcon size={24} className={role === UserRole.USER ? 'text-indigo-600' : 'text-slate-300'} />
                  <span className="text-xs font-bold uppercase tracking-wide">Petugas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  disabled={isLoggingIn}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                    role === UserRole.ADMIN 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md ring-4 ring-indigo-50' 
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <ShieldCheck size={24} className={role === UserRole.ADMIN ? 'text-indigo-600' : 'text-slate-300'} />
                  <span className="text-xs font-bold uppercase tracking-wide">Admin</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Username / ID Karyawan"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoggingIn}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm disabled:opacity-50"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  defaultValue="••••••••"
                  disabled={isLoggingIn}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Memverifikasi Role...
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-widest font-bold">
          Enkripsi Keamanan 256-bit Aktif
        </p>
      </div>
    </div>
  );
};

export default Login;
