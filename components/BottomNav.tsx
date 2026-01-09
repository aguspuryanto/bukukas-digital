
import React from 'react';
import { UserRole } from '../types';
import { LayoutDashboard, FileText, MessageSquare, Settings } from 'lucide-react';

interface BottomNavProps {
  activePage: string;
  setActivePage: (page: string) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage, role }) => {
  const tabs = [
    { label: 'Beranda', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Laporan', id: 'reports', icon: FileText },
    { label: 'Chat', id: 'chat', icon: MessageSquare },
  ];

  if (role === UserRole.ADMIN) {
    tabs.push({ label: 'Admin', id: 'management', icon: Settings });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around px-2 py-2 md:hidden z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActivePage(tab.id)}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${
            activePage === tab.id ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <tab.icon size={20} className={activePage === tab.id ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-semibold">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
