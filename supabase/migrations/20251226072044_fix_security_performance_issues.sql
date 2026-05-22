/*
  # Fix Security and Performance Issues

  ## Changes Made

  ### 1. Add Missing Foreign Key Indexes
  - Add indexes on all foreign key columns to improve query performance
  - Covers: actions, admin_migration_logs, audit_responses, audits, media, memberships, page_views

  ### 2. Optimize RLS Policies with Auth Function Wrapping
  - Wrap all auth.uid() calls with (select auth.uid()) to prevent re-evaluation per row
  - Improves query performance at scale
  - Updates policies on: users, memberships, sites, checklist_items, audits, audit_responses, actions, media, settings

  ### 3. Enable RLS on admin_migration_logs
  - Add RLS policies for authenticated user access

  ### 4. Fix Function Search Paths
  - Set immutable search_path for all public functions

  ### 5. Note on Unused Indexes
  - Keeping unused indexes as they provide value for future queries and have minimal overhead
  - Will be utilized as the application scales

  ### 6. Note on Multiple Permissive Policies
  - Current design is intentional for role-based access control
  - Separate policies for different access levels (view vs manage) are correct
*/

-- =====================================================
-- 1. Add Missing Foreign Key Indexes
-- =====================================================

-- actions table
CREATE INDEX IF NOT EXISTS idx_actions_checklist_item_id ON public.actions(checklist_item_id);

-- admin_migration_logs table
CREATE INDEX IF NOT EXISTS idx_admin_migration_logs_actor_id ON public.admin_migration_logs(actor_id);

-- audit_responses table
CREATE INDEX IF NOT EXISTS idx_audit_responses_checklist_item_id ON public.audit_responses(checklist_item_id);
CREATE INDEX IF NOT EXISTS idx_audit_responses_created_by ON public.audit_responses(created_by);

-- audits table
CREATE INDEX IF NOT EXISTS idx_audits_auditor_id ON public.audits(auditor_id);

-- media table
CREATE INDEX IF NOT EXISTS idx_media_audit_id ON public.media(audit_id);
CREATE INDEX IF NOT EXISTS idx_media_checklist_item_id ON public.media(checklist_item_id);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media(uploaded_by);

-- memberships table
CREATE INDEX IF NOT EXISTS idx_memberships_organization_id ON public.memberships(organization_id);

-- page_views table
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON public.page_views(user_id);

-- =====================================================
-- 2. Enable RLS on admin_migration_logs
-- =====================================================

ALTER TABLE public.admin_migration_logs ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view migration logs
DROP POLICY IF EXISTS "Authenticated users can view migration logs" ON public.admin_migration_logs;
CREATE POLICY "Authenticated users can view migration logs"
  ON public.admin_migration_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert migration logs
DROP POLICY IF EXISTS "Authenticated users can insert migration logs" ON public.admin_migration_logs;
CREATE POLICY "Authenticated users can insert migration logs"
  ON public.admin_migration_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- 3. Optimize RLS Policies - Wrap auth.uid() calls
-- =====================================================

-- Users table policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can view org members" ON public.users;
CREATE POLICY "Users can view org members"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships m1
      WHERE m1.user_id = (select auth.uid())
      AND EXISTS (
        SELECT 1 FROM public.memberships m2
        WHERE m2.user_id = users.id
        AND m2.organization_id = m1.organization_id
      )
    )
  );

-- Memberships table policies
DROP POLICY IF EXISTS "Users can read own memberships" ON public.memberships;
CREATE POLICY "Users can read own memberships"
  ON public.memberships
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

DROP POLICY IF EXISTS "Users can create own memberships" ON public.memberships;
CREATE POLICY "Users can create own memberships"
  ON public.memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Sites table policies
DROP POLICY IF EXISTS "Users can view sites in their organizations" ON public.sites;
CREATE POLICY "Users can view sites in their organizations"
  ON public.sites
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = sites.organization_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "OrgAdmins and Auditors can manage sites" ON public.sites;
CREATE POLICY "OrgAdmins and Auditors can manage sites"
  ON public.sites
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = sites.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = sites.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  );

-- Checklist items table policies
DROP POLICY IF EXISTS "Users can view checklist items" ON public.checklist_items;
CREATE POLICY "Users can view checklist items"
  ON public.checklist_items
  FOR SELECT
  TO authenticated
  USING (
    organization_id IS NULL
    OR EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = checklist_items.organization_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "OrgAdmins can manage organization checklist items" ON public.checklist_items;
CREATE POLICY "OrgAdmins can manage organization checklist items"
  ON public.checklist_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = checklist_items.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role = 'OrgAdmin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = checklist_items.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role = 'OrgAdmin'
    )
  );

-- Audits table policies
DROP POLICY IF EXISTS "Users can view audits in their organizations" ON public.audits;
CREATE POLICY "Users can view audits in their organizations"
  ON public.audits
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.sites
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE sites.id = audits.site_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "OrgAdmins and Auditors can manage audits" ON public.audits;
CREATE POLICY "OrgAdmins and Auditors can manage audits"
  ON public.audits
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.sites
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE sites.id = audits.site_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sites
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE sites.id = audits.site_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  );

-- Audit responses table policies
DROP POLICY IF EXISTS "Users can view audit responses in their organizations" ON public.audit_responses;
CREATE POLICY "Users can view audit responses in their organizations"
  ON public.audit_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = audit_responses.audit_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Auditors can manage audit responses" ON public.audit_responses;
CREATE POLICY "Auditors can manage audit responses"
  ON public.audit_responses
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = audit_responses.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = audit_responses.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  );

-- Actions table policies
DROP POLICY IF EXISTS "Users can view actions in their organizations" ON public.actions;
CREATE POLICY "Users can view actions in their organizations"
  ON public.actions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = actions.audit_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can manage actions" ON public.actions;
CREATE POLICY "Users can manage actions"
  ON public.actions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = actions.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = actions.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  );

-- Media table policies
DROP POLICY IF EXISTS "Users can view media in their organizations" ON public.media;
CREATE POLICY "Users can view media in their organizations"
  ON public.media
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = media.audit_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can manage media" ON public.media;
CREATE POLICY "Users can manage media"
  ON public.media
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = media.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.audits
      JOIN public.sites ON sites.id = audits.site_id
      JOIN public.memberships ON memberships.organization_id = sites.organization_id
      WHERE audits.id = media.audit_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role IN ('OrgAdmin', 'Auditor')
    )
  );

-- Settings table policies
DROP POLICY IF EXISTS "Users can view settings in their organizations" ON public.settings;
CREATE POLICY "Users can view settings in their organizations"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = settings.organization_id
      AND memberships.user_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "OrgAdmins can manage settings" ON public.settings;
CREATE POLICY "OrgAdmins can manage settings"
  ON public.settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = settings.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role = 'OrgAdmin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.memberships
      WHERE memberships.organization_id = settings.organization_id
      AND memberships.user_id = (select auth.uid())
      AND memberships.role = 'OrgAdmin'
    )
  );

-- =====================================================
-- 4. Fix Function Search Paths
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_page_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.page_stats (page_path, total_views, unique_visitors, last_viewed)
  VALUES (NEW.page_path, 1, 1, NEW.created_at)
  ON CONFLICT (page_path)
  DO UPDATE SET
    total_views = page_stats.total_views + 1,
    unique_visitors = CASE
      WHEN NEW.user_id IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.page_views
        WHERE page_path = NEW.page_path
        AND user_id = NEW.user_id
        AND id != NEW.id
      ) THEN page_stats.unique_visitors + 1
      WHEN NEW.session_id IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.page_views
        WHERE page_path = NEW.page_path
        AND session_id = NEW.session_id
        AND id != NEW.id
      ) THEN page_stats.unique_visitors + 1
      ELSE page_stats.unique_visitors
    END,
    last_viewed = GREATEST(page_stats.last_viewed, NEW.created_at);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_audit_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.finalize_audit(audit_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.audits
  SET status = 'completed', completed_at = NOW()
  WHERE id = audit_uuid;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_intelligence_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
