import React, { useEffect } from 'react';
import { Database as DatabaseIcon, Play, CheckCircle, AlertCircle, Clock, Shield, Users, Building2 } from 'lucide-react';
import { useSupabaseAdmin } from '../../hooks/useSupabaseAdmin';
import MigrationCard from '../../components/admin/MigrationCard';

const Database: React.FC = () => {
  const {
    connectionStatus,
    connectionError,
    migrationResults,
    runningMigration,
    testConnection,
    executeMigration
  } = useSupabaseAdmin();

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  const migrations = [
    {
      id: '01',
      title: 'Core Schema',
      description: 'Create tables, enums, functions, and indexes',
      icon: <DatabaseIcon className="h-6 w-6 text-blue-600" />,
      color: 'blue'
    },
    {
      id: '02',
      title: 'RLS Policies',
      description: 'Enable row-level security and access policies',
      icon: <Shield className="h-6 w-6 text-emerald-600" />,
      color: 'emerald'
    },
    {
      id: '03',
      title: 'Seed Global Checklist',
      description: 'Insert default checklist items and demo data',
      icon: <Building2 className="h-6 w-6 text-orange-600" />,
      color: 'orange'
    },
    {
      id: '10',
      title: 'Training Schema',
      description: 'Create training tables, providers, courses, sessions',
      icon: <Users className="h-6 w-6 text-purple-600" />,
      color: 'purple'
    },
    {
      id: '11',
      title: 'Training RLS',
      description: 'Enable training module security policies',
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      color: 'indigo'
    },
    {
      id: '12',
      title: 'Training Seed Data',
      description: 'Insert sample providers, courses, and sessions',
      icon: <Users className="h-6 w-6 text-pink-600" />,
      color: 'pink'
    }
  ];

  const getStatusIcon = (script: string) => {
    const result = migrationResults[script];
    if (runningMigration === script) {
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

  const getStatusColor = (script: string) => {
    const result = migrationResults[script];
    if (runningMigration === script) return 'border-blue-300 bg-blue-50';
    if (!result) return 'border-slate-200';
    return result.success ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Database Administration</h1>
              <p className="text-slate-600">Manage Supabase migrations and database setup</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-500">
                Timezone: Asia/Kolkata
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Test */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-navy-900">Database Connection</h2>
              <p className="text-slate-600">Test connectivity to Supabase database</p>
            </div>
            <button
              onClick={testConnection}
              disabled={connectionStatus === 'testing'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {connectionStatus === 'testing' ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <DatabaseIcon className="h-4 w-4" />
              )}
              <span>{connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>

          {connectionStatus !== 'idle' && (
            <div className={`p-4 rounded-lg border ${
              connectionStatus === 'success' ? 'bg-emerald-50 border-emerald-200' :
              connectionStatus === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-2">
                {connectionStatus === 'testing' && <Clock className="h-5 w-5 text-blue-500 animate-spin" />}
                {connectionStatus === 'success' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                {connectionStatus === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                <span className={`font-medium ${
                  connectionStatus === 'success' ? 'text-emerald-800' :
                  connectionStatus === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>
                  {connectionStatus === 'testing' && 'Testing database connection...'}
                  {connectionStatus === 'success' && 'Database connection successful!'}
                  {connectionStatus === 'error' && 'Database connection failed'}
                </span>
              </div>
              {connectionError && (
                <p className="text-red-700 text-sm mt-2">{connectionError}</p>
              )}
            </div>
          )}
        </div>

        {/* Migrations */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Database Migrations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Run these migrations in order to set up the complete Audit & Compliance platform. 
              Each migration builds on the previous one.
            </p>
          </div>

          {migrations.map((migration, index) => {
            const result = migrationResults[migration.id];
            return (
              <MigrationCard
                key={migration.id}
                id={migration.id}
                title={migration.title}
                description={migration.description}
                icon={migration.icon}
                color={migration.color}
                result={migrationResults[migration.id]}
                isRunning={runningMigration === migration.id}
                onRun={() => executeMigration(migration.id)}
                order={index + 1}
              />
            );
          })}
        </div>

        {/* Industry Checklists Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Users className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Industry-Specific Checklists</h3>
              <p className="text-blue-800 mb-4">
                After running the core migrations, import industry-specific checklist packs from the Checklist Library:
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• <strong>IT Parks & Offices:</strong> High-density occupancy, data centers, cafeterias</li>
                <li>• <strong>Hospitals & Healthcare:</strong> Patient safety, medical gas systems, infection control</li>
                <li>• <strong>Warehousing & Logistics:</strong> High-pile storage, hazmat, loading docks</li>
                <li>• <strong>Retail & Malls:</strong> Public assembly, multi-tenant coordination, food courts</li>
              </ul>
              <div className="mt-4">
                <a
                  href="/app/audit/checklist"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <span>Go to Checklist Library</span>
                  <Play className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Organization */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Building2 className="h-6 w-6 text-orange-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Demo Organization</h3>
              <p className="text-orange-800 mb-4">
                The seed migration creates a "SafetyWarden Demo" organization with sample data for testing:
              </p>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Demo organization with Bengaluru office</li>
                <li>• 22 global checklist items across 8 categories</li>
                <li>• Ready for audit creation and testing</li>
              </ul>
              <div className="mt-4">
                <a
                  href="/app/audit"
                  className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <span>Access Audit Platform</span>
                  <Play className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-slate-100 border border-slate-300 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-slate-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Security & Safety</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p>• All migrations run with service role privileges and are logged</p>
                <p>• Row-level security ensures multi-tenant data isolation</p>
                <p>• Admin functions are server-only and never exposed to client</p>
                <p>• Database operations use Asia/Kolkata timezone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;