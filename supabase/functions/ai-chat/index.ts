// Edge Function: ai-chat
// Accepts user message + pod context, fetches pod data from Supabase,
// sends to OpenAI GPT-4, returns AI response as JSON.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/openai.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { message, pod_id, user_id, session_token } = await req.json();

    if (!message || !pod_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: message, pod_id, user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create admin client to fetch pod data (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch pod data
    const { data: pod, error: podError } = await supabase
      .from('pods')
      .select('*')
      .eq('id', pod_id)
      .eq('user_id', user_id)
      .single();

    if (podError || !pod) {
      return new Response(
        JSON.stringify({ error: 'Pod not found or access denied' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch pod analysis if exists
    const { data: analysis } = await supabase
      .from('pod_analysis')
      .select('*')
      .eq('pod_id', pod_id)
      .maybeSingle();

    // Fetch pod sources
    const { data: sources } = await supabase
      .from('pod_sources')
      .select('*')
      .eq('pod_id', pod_id);

    // Fetch recent calendar items for context
    const { data: calendarItems } = await supabase
      .from('calendar_items')
      .select('*')
      .eq('pod_id', pod_id)
      .order('scheduled_date', { ascending: false })
      .limit(10);

    // Build context for the AI
    const podContext = buildPodContext(pod, analysis, sources, calendarItems);

    // Call OpenAI
    const systemPrompt = `You are Dovroyn, an AI marketing pod assistant. You help brands with campaign strategy, content ideas, platform recommendations, ad angles, and marketing direction.

You have deep knowledge of social media marketing, paid advertising, content strategy, and brand positioning. You speak in a confident, expert tone — like a senior marketing strategist.

When answering:
- Be specific and actionable
- Reference the brand's actual context when available
- Suggest concrete next steps
- If the user asks about content, provide ready-to-use copy
- If the user asks about strategy, explain the reasoning
- Keep responses concise but valuable (2-4 paragraphs max)

Current pod context:
${podContext}`;

    const aiResponse = await callOpenAI([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ], 0.7, 1200);

    // Return response
    return new Response(
      JSON.stringify({
        success: true,
        response: aiResponse,
        pod_id,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('ai-chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildPodContext(
  pod: any,
  analysis: any,
  sources: any[] | null,
  calendarItems: any[] | null
): string {
  const lines: string[] = [];

  lines.push(`Pod Name: ${pod.pod_name}`);
  lines.push(`Brand: ${pod.brand_name || 'Not specified'}`);
  lines.push(`Type: ${pod.pod_type}`);
  lines.push(`Status: ${pod.status}`);
  lines.push(`Target Country: ${pod.target_country}`);
  lines.push(`Tone: ${pod.accepted_tone || 'Not set'}`);

  if (pod.source_url) {
    lines.push(`Website: ${pod.source_url}`);
  }

  if (analysis) {
    lines.push('');
    lines.push('=== AI ANALYSIS ===');
    if (analysis.brand_summary) lines.push(`Brand Summary: ${analysis.brand_summary}`);
    if (analysis.tone) lines.push(`Detected Tone: ${analysis.tone}`);
    if (analysis.audience) lines.push(`Target Audience: ${analysis.audience}`);
    if (analysis.offer_direction) lines.push(`Offer Direction: ${analysis.offer_direction}`);
    if (analysis.campaign_angles) lines.push(`Campaign Angles: ${analysis.campaign_angles}`);
    if (analysis.content_ideas) lines.push(`Content Ideas: ${analysis.content_ideas}`);
    if (analysis.ad_angles) lines.push(`Ad Angles: ${analysis.ad_angles}`);
    if (analysis.social_recommendations) lines.push(`Social Recommendations: ${analysis.social_recommendations}`);
  }

  if (sources && sources.length > 0) {
    lines.push('');
    lines.push('=== SOURCES ===');
    sources.forEach((s, i) => {
      lines.push(`Source ${i + 1}: ${s.source_type}${s.source_url ? ` - ${s.source_url}` : ''}`);
      if (s.notes) lines.push(`  Notes: ${s.notes}`);
    });
  }

  if (calendarItems && calendarItems.length > 0) {
    lines.push('');
    lines.push('=== RECENT CALENDAR ITEMS ===');
    calendarItems.forEach((item) => {
      lines.push(`- ${item.platform} | ${item.scheduled_date} | ${item.content_type} | Status: ${item.status}`);
    });
  }

  return lines.join('\n');
}
