
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between">
      <div className="min-w-0 overflow-hidden">
        <p className="text-[10px] md:text-sm font-medium text-slate-500 mb-0.5 md:mb-1 truncate uppercase tracking-tight md:normal-case md:tracking-normal">{title}</p>
        <h3 className="text-lg md:text-2xl font-bold text-slate-900 truncate leading-tight">{value}</h3>
        {trend && (
          <p className="text-[10px] md:text-xs mt-1 md:mt-2 text-emerald-600 font-medium">
            {trend}
          </p>
        )}
      </div>
      <div className={`p-2 md:p-3 rounded-xl flex-shrink-0 ml-2 ${color}`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
    </div>
  );
};

export default StatCard;
