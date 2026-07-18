// AI client for Dovroyn — calls Supabase Edge Functions
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function supabaseFunction(name, body, token) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

// AI Chat with pod context
export async function sendChatMessage({ message, pod_id, user_id, token }) {
  return supabaseFunction('ai-chat', { message, pod_id, user_id }, token);
}

// Website Analysis
export async function analyzeWebsite({ pod_id, user_id, url, token }) {
  return supabaseFunction('website-analyzer', { pod_id, user_id, url }, token);
}

// Generate Calendar
export async function generateCalendar({ pod_id, user_id, platforms, days, start_date, token }) {
  return supabaseFunction('generate-calendar', { pod_id, user_id, platforms, days, start_date }, token);
}

// Fetch pod analysis from Supabase table
export async function fetchPodAnalysis(supabase, podId) {
  const { data, error } = await supabase
    .from('pod_analysis')
    .select('*')
    .eq('pod_id', podId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Fetch calendar items
export async function fetchCalendarItems(supabase, podId) {
  const { data, error } = await supabase
    .from('calendar_items')
    .select('*')
    .eq('pod_id', podId)
    .order('scheduled_date', { ascending: true });
  if (error) throw error;
  return data || [];
}
