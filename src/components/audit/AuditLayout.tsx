import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  Building2, 
  ClipboardList, 
  FileText, 
  Settings, 
  CheckSquare,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AuditLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, currentOrganization, organizations, setCurrentOrganization, signOut, userRole } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/app/audit', icon: BarChart3 },
    { name: 'Sites', href: '/app/audit/sites', icon: Building2 },
    { name: 'Checklist Library', href: '/app/audit/checklist', icon: ClipboardList },
    { name: 'Audits', href: '/app/audit/audits', icon: FileText },
    { name: 'Actions', href: '/app/audit/actions', icon: CheckSquare },
    { name: 'Reports', href: '/app/audit/reports', icon: FileText },
  ];

  // Add Settings for OrgAdmin only
  if (userRole === 'OrgAdmin') {
    navigation.push({ name: 'Settings', href: '/app/audit/settings', icon: Settings });
  }

  const isActive = (href: string) => {
    if (href === '/app/audit') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200">
            <img src="/safety-warden.png" alt="SafetyWarden" className="h-8 w-auto" />
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-slate-200">
          <div className="flex h-16 items-center px-4 border-b border-slate-200">
            <Link to="/">
              <img src="/safety-warden.png" alt="SafetyWarden" className="h-8 w-auto" />
            </Link>
          </div>
          
          {/* Organization Selector */}
          <div className="px-4 py-3 border-b border-slate-200">
            <div className="relative">
              <button
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="font-medium text-slate-900 truncate">
                    {currentOrganization?.name}
                  </div>
                  <div className="text-xs text-slate-500">{userRole}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              
              {orgDropdownOpen && organizations.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  {organizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => {
                        setCurrentOrganization(org);
                        setOrgDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="font-medium text-slate-900">{org.name}</div>
                      <div className="text-xs text-slate-500">{org.city}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="px-4 py-3 border-t border-slate-200">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-900">{user?.user_metadata?.full_name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden flex h-16 items-center justify-between px-4 bg-white border-b border-slate-200">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
          <img src="/safety-warden.png" alt="SafetyWarden" className="h-8 w-auto" />
          <div className="w-6" />
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuditLayout;