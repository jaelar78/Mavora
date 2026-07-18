import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// ── Auth helpers ──────────────────────────────────────────────────────────────

export async function signUp(email, password, metadata = {}) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithOAuth(provider) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}

export function onAuthStateChange(callback) {
  if (!supabase) return { subscription: { unsubscribe: () => {} } };
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data;
}

// ── Data helpers ──────────────────────────────────────────────────────────────

export async function fetchProfile(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchUserSettings(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data;
}

export async function upsertUserSettings(userId, settings) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('user_settings')
    .upsert({ user_id: userId, ...settings, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchWebsites(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createWebsite(website) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('websites').insert(website).select().single();
  if (error) throw error;
  return data;
}

export async function fetchMedia(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('media_library')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function uploadMedia(userId, file, metadata = {}) {
  if (!supabase) throw new Error('Supabase not configured');
  const path = `${userId}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage.from('media').upload(path, file);
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(path);

  const { data, error } = await supabase
    .from('media_library')
    .insert({
      user_id: userId,
      name: file.name,
      storage_path: path,
      public_url: urlData.publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      ...metadata,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchCampaigns(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createCampaign(campaign) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('campaigns').insert(campaign).select().single();
  if (error) throw error;
  return data;
}

export async function fetchArtistSubmissions(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('artist_submissions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function submitArtist(artist) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.from('artist_submissions').insert(artist).select().single();
  if (error) throw error;
  return data;
}
