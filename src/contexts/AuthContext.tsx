import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Organization, Membership } from '../types/audit';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  organizations: Organization[];
  currentOrganization: Organization | null;
  userRole: string | null;
  setCurrentOrganization: (org: Organization) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserOrganizations(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          loadUserOrganizations(session.user.id);
        } else {
          setOrganizations([]);
          setCurrentOrganization(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserOrganizations = async (userId: string) => {
    const { data: memberships } = await supabase
      .from('memberships')
      .select(`
        *,
        organization:organizations(*)
      `)
      .eq('user_id', userId);

    if (memberships) {
      const orgs = memberships.map((m: any) => m.organization);
      setOrganizations(orgs);
      
      // Set first org as current if none selected
      if (orgs.length > 0 && !currentOrganization) {
        setCurrentOrganization(orgs[0]);
        setUserRole(memberships[0].role);
      }
    }
  };

  const handleSetCurrentOrganization = async (org: Organization) => {
    setCurrentOrganization(org);
    
    // Get user role for this organization
    if (user) {
      const { data } = await supabase
        .from('memberships')
        .select('role')
        .eq('user_id', user.id)
        .eq('organization_id', org.id)
        .single();
      
      setUserRole(data?.role || null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    loading,
    organizations,
    currentOrganization,
    userRole,
    setCurrentOrganization: handleSetCurrentOrganization,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};