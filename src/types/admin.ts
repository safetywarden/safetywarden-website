export interface MigrationResult {
  success: boolean;
  rowsAffected?: number;
  error?: string;
  logs: string[];
}

export interface ConnectionTest {
  success: boolean;
  timestamp?: string;
  error?: string;
}

export interface MigrationScript {
  id: string;
  title: string;
  description: string;
  filename: string;
  order: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'SuperAdmin' | 'OrgAdmin';
  organization_id?: string;
}

export interface MigrationLog {
  id: string;
  script: string;
  actor_id?: string;
  success: boolean;
  error?: string;
  logs: string[];
  ran_at: string;
}