import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { SeverityLevel } from '../../types/intelligence';

interface SeverityBadgeProps {
  level: SeverityLevel;
  showIcon?: boolean;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ level, showIcon = true }) => {
  const config = {
    High: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: AlertTriangle,
      label: 'High'
    },
    Medium: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      icon: AlertCircle,
      label: 'Medium'
    },
    Low: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: Info,
      label: 'Low'
    }
  };

  const { bg, text, icon: Icon, label } = config[level];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${bg} ${text}`}>
      {showIcon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
};

export default SeverityBadge;
