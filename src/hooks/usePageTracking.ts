import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const isSupabaseAnalyticsEnabled = () =>
  import.meta.env.VITE_ENABLE_SUPABASE_ANALYTICS === 'true';

const scheduleIdle = (callback: () => void) => {
  let idleId: number | null = null;
  const timer = window.setTimeout(() => {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(callback, { timeout: 10000 });
      return;
    }

    callback();
  }, 3000);

  return () => {
    window.clearTimeout(timer);
    if (idleId !== null) {
      window.cancelIdleCallback(idleId);
    }
  };
};

const warnInDevelopment = (message: string, details?: unknown) => {
  if (import.meta.env.DEV) {
    console.warn(message, details);
  }
};

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!isSupabaseAnalyticsEnabled()) {
      return;
    }

    const cleanup = scheduleIdle(async () => {
      try {
        const { supabase } = await import('../lib/supabase');

        const pageData = {
          path: location.pathname,
          title: document.title,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase.from('page_views').insert(pageData);

        if (error) {
          warnInDevelopment('Supabase page_views insert failed.', {
            table: 'page_views',
            payloadKeys: Object.keys(pageData),
            error,
          });
        }
      } catch (error) {
        warnInDevelopment('Supabase page view tracking failed.', error);
      }
    });

    return cleanup;
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
    if (!isSupabaseAnalyticsEnabled()) {
      setLoading(false);
      return;
    }

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
        warnInDevelopment('Supabase page stats fetch failed.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    let cancelled = false;
    let subscription: { unsubscribe: () => void } | null = null;

    import('../lib/supabase')
      .then(({ supabase }) => {
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
      })
      .catch((error) => {
        warnInDevelopment('Supabase page stats subscription failed.', error);
      });

    return () => {
      cancelled = true;
      subscription?.unsubscribe();
    };
  }, [path]);

  return { stats, loading };
}
