
import React from 'react';
import { UserRole } from '../types';
import { Shield, User, Key, Mail } from 'lucide-react';

const AdminManagement: React.FC = () => {
  const users = [
    { id: '1', name: 'Administrator', role: UserRole.ADMIN, email: 'admin@bukukas.com' },
    { id: '2', name: 'Budi Santoso', role: UserRole.USER, email: 'budi@bukukas.com' },
    { id: '3', name: 'Siti Aminah', role: UserRole.USER, email: 'siti@bukukas.com' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Manajemen Pengguna</h3>
            <p className="text-sm text-slate-500">Kelola akses dan hak istimewa pengguna sistem</p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
            Tambah User Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div key={u.id} className="p-5 border border-slate-100 rounded-2xl hover:border-indigo-200 transition-colors bg-slate-50/50">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  u.role === UserRole.ADMIN ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'
                }`}>
                  {u.role === UserRole.ADMIN ? <Shield size={24} /> : <User size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{u.name}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">{u.role}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} />
                  {u.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Key size={16} />
                  Last Login: 2 hours ago
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold rounded-md hover:bg-slate-50 transition-colors">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1.5 bg-white border border-rose-100 text-rose-600 text-xs font-bold rounded-md hover:bg-rose-50 transition-colors">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
