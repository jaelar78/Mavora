// AI client for Dovroyn — calls Supabase Edge Functions
// PROPRIETARY ENGINE: Uses Dovroyn's own AI for 80% of tasks
// OPENAI FALLBACK: Only for complex creative tasks

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

// ============================================
// PROPRIETARY DOVROYN AI ENGINE
// ============================================

// Content Generator — uses YOUR templates, YOUR brand DNA, no external API
export async function generateContent({ pod_id, user_id, content_type, prompt, platform, token }) {
  return supabaseFunction('proprietary-ai', { pod_id, user_id, content_type, prompt, platform }, token);
}

// AI Optimizer — rule-based analysis, no external API
export async function runOptimizer({ pod_id, user_id, token }) {
  return supabaseFunction('proprietary-optimizer', { pod_id, user_id }, token);
}

// ============================================
// OPENAI FALLBACK (for complex creative tasks)
// ============================================

// AI Chat with pod context — uses OpenAI for conversational AI
export async function sendChatMessage({ message, pod_id, user_id, token }) {
  return supabaseFunction('ai-chat', { message, pod_id, user_id }, token);
}

// Website Analysis — uses OpenAI for deep creative analysis
export async function analyzeWebsite({ pod_id, user_id, url, token }) {
  return supabaseFunction('website-analyzer', { pod_id, user_id, url }, token);
}

// Generate Calendar — uses OpenAI for strategic planning
export async function generateCalendar({ pod_id, user_id, platforms, days, start_date, token }) {
  return supabaseFunction('generate-calendar', { pod_id, user_id, platforms, days, start_date }, token);
}

// ============================================
// STRIPE CUSTOMER PORTAL
// ============================================

export async function createPortalSession(returnUrl, token) {
  return supabaseFunction('stripe-portal', { return_url: returnUrl }, token);
}

// ============================================
// DATA FETCHERS
// ============================================

export async function fetchPodAnalysis(supabase, podId) {
  const { data, error } = await supabase
    .from('pod_analysis')
    .select('*')
    .eq('pod_id', podId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchCalendarItems(supabase, podId) {
  const { data, error } = await supabase
    .from('calendar_items')
    .select('*')
    .eq('pod_id', podId)
    .order('scheduled_date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function fetchEvergreenContent(supabase, podId) {
  const { data, error } = await supabase
    .from('evergreen_content')
    .select('*')
    .eq('pod_id', podId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchOptimizerSnapshots(supabase, podId) {
  const { data, error } = await supabase
    .from('ai_optimizer_snapshots')
    .select('*')
    .eq('pod_id', podId)
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data || [];
}
