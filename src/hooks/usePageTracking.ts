import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('page_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('page_session_id', sessionId);
  }

  return sessionId;
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const { supabase } = await import('../lib/supabase');
        const { data: { user } } = await supabase.auth.getUser();

        const pageData = {
          page_path: location.pathname,
          page_title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          session_id: getSessionId(),
          user_id: user?.id || null,
        };

        await supabase.from('page_views').insert(pageData);
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}

export function usePageStats(pagePath?: string) {
  const location = useLocation();
  const [stats, setStats] = useState<{
    total_views: number;
    unique_visitors: number;
    last_viewed_at: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const path = pagePath || location.pathname;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { supabase } = await import('../lib/supabase');
        const { data, error } = await supabase
          .from('page_stats')
          .select('total_views, unique_visitors, last_viewed_at')
          .eq('page_path', path)
          .maybeSingle();

        if (!error && data) {
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching page stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    let cancelled = false;
    let subscription: { unsubscribe: () => void } | null = null;

    import('../lib/supabase').then(({ supabase }) => {
      if (cancelled) {
        return;
      }

      subscription = supabase
        .channel(`page_stats_${path}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'page_stats',
            filter: `page_path=eq.${path}`,
          },
          (payload: { new: unknown }) => {
            if (payload.new) {
              setStats(payload.new as any);
            }
          }
        )
        .subscribe();
    });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [path]);

  return { stats, loading };
}
