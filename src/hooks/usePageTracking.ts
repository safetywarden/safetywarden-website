import { useEffect, useState } from 'react';

export function usePageTracking() {
  useEffect(() => {
    // Supabase page view tracking is intentionally disabled for the marketing website.
    // Vercel Analytics and Speed Insights are the production source of truth for page traffic.
  }, []);
}

export function usePageStats(_pagePath?: string) {
  const [stats, setStats] = useState<{
    total_views: number;
    unique_visitors: number;
    last_viewed_at: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(null);
    setLoading(false);
  }, []);

  return { stats, loading };
}
