import { supabase } from './supabase';
import { IntelligenceEntry, IntelligenceCategory } from '../types/intelligence';

export async function getPublishedIntelligence(filters?: {
  category?: IntelligenceCategory;
  severity?: string;
  geography?: string;
  limit?: number;
}): Promise<IntelligenceEntry[]> {
  let query = supabase
    .from('intelligence_entries')
    .select('*')
    .eq('is_published', true)
    .order('publish_date', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.severity) {
    query = query.eq('severity_level', filters.severity);
  }

  if (filters?.geography) {
    query = query.ilike('geography', `%${filters.geography}%`);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching intelligence entries:', error);
    return [];
  }

  return data || [];
}

export async function getIntelligenceBySlug(slug: string): Promise<IntelligenceEntry | null> {
  const { data, error } = await supabase
    .from('intelligence_entries')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching intelligence entry:', error);
    return null;
  }

  return data;
}

export async function getFeaturedIntelligence(limit: number = 5): Promise<IntelligenceEntry[]> {
  const { data, error } = await supabase
    .from('intelligence_entries')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('publish_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured intelligence:', error);
    return [];
  }

  return data || [];
}

export async function createIntelligenceEntry(entry: Partial<IntelligenceEntry>): Promise<IntelligenceEntry | null> {
  const { data, error } = await supabase
    .from('intelligence_entries')
    .insert([entry])
    .select()
    .single();

  if (error) {
    console.error('Error creating intelligence entry:', error);
    return null;
  }

  return data;
}

export async function updateIntelligenceEntry(id: string, updates: Partial<IntelligenceEntry>): Promise<IntelligenceEntry | null> {
  const { data, error } = await supabase
    .from('intelligence_entries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating intelligence entry:', error);
    return null;
  }

  return data;
}
