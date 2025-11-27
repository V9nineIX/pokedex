import React from 'react';
import { STAT_LABELS } from '@/constant';

interface StatBarProps {
  name: string;
  value: number;
  colorClass: string;
}

const StatBar: React.FC<StatBarProps> = ({ name, value, colorClass }) => {
  // Max stat is roughly 255 (Blissey HP), but usually around 100-150. Let's base scale on 200.
  const percentage = Math.min((value / 200) * 100, 100);

  const label = STAT_LABELS[name] || name;
  const formattedValue = value.toString().padStart(3, '0');

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className={`w-10 font-bold ${colorClass} uppercase`}>{label}</span>
      <span className="w-8 text-gray-600 font-medium">{formattedValue}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-gray-200 h-2">
        <div
          className={`h-full ${colorClass.replace('text-', 'bg-')} opacity-80`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatBar;
