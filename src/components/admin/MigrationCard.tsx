import React from 'react';
import { Play, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { MigrationResult } from '../../types/admin';

interface MigrationCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  result?: MigrationResult;
  isRunning: boolean;
  onRun: () => void;
  order: number;
}

const MigrationCard: React.FC<MigrationCardProps> = ({
  id,
  title,
  description,
  icon,
  color,
  result,
  isRunning,
  onRun,
  order
}) => {
  const getStatusIcon = () => {
    if (isRunning) {
      return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
    }
    if (!result) {
      return null;
    }
    return result.success ? (
      <CheckCircle className="h-5 w-5 text-emerald-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusColor = () => {
    if (isRunning) return 'border-blue-300 bg-blue-50';
    if (!result) return 'border-slate-200';
    return result.success ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${getStatusColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100`}>
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-navy-900">
                {order}. {title}
              </h3>
              {getStatusIcon()}
            </div>
            <p className="text-slate-600 mb-4">{description}</p>
            
            {result && (
              <div className="space-y-2">
                {result.success ? (
                  <div className="text-emerald-700 text-sm">
                    ✅ Migration completed successfully
                    {result.rowsAffected !== undefined && ` (${result.rowsAffected} rows affected)`}
                  </div>
                ) : (
                  <div className="text-red-700 text-sm">
                    ❌ Migration failed: {result.error}
                  </div>
                )}
                
                {result.logs.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900">
                      View Logs ({result.logs.length} entries)
                    </summary>
                    <div className="mt-2 bg-slate-100 rounded-lg p-3">
                      <pre className="text-xs text-slate-700 whitespace-pre-wrap">
                        {result.logs.join('\n')}
                      </pre>
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2 ${
            result?.success 
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : `bg-${color}-600 hover:bg-${color}-700 text-white`
          }`}
        >
          {isRunning ? (
            <>
              <Clock className="h-4 w-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>{result?.success ? 'Re-run' : 'Run Migration'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MigrationCard;