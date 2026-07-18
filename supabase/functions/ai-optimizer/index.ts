// Edge Function: ai-optimizer
// Runs a pulse check on pod performance and suggests optimizations

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/openai.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { pod_id, user_id } = await req.json();

    if (!pod_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: pod_id, user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify pod ownership
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

    // Fetch all pod data for analysis
    const [{ data: analysis }, { data: budget }, { data: calendar }, { data: adAnalysis }] = await Promise.all([
      supabase.from('pod_analysis').select('*').eq('pod_id', pod_id).maybeSingle(),
      supabase.from('budgets').select('*').eq('pod_id', pod_id).single(),
      supabase.from('calendar_items').select('*').eq('pod_id', pod_id).order('scheduled_date', { ascending: false }).limit(20),
      supabase.from('ad_analysis').select('*').eq('pod_id', pod_id).maybeSingle(),
    ]);

    const brandName = pod.brand_name || pod.pod_name;

    // Build performance context
    const performanceContext = [];
    performanceContext.push(`Pod: ${brandName}`);
    performanceContext.push(`Status: ${pod.status}`);
    performanceContext.push(`Target: ${pod.target_country}`);
    performanceContext.push(`Tone: ${pod.accepted_tone || 'Not set'}`);

    if (budget) {
      performanceContext.push(`\nBudget: $${budget.planned_budget} planned, $${budget.spend_used} spent`);
      performanceContext.push(`Leads: ${budget.leads}, Sales: ${budget.sales}, Revenue: $${budget.revenue}`);
      const roas = budget.spend_used > 0 ? (budget.revenue / budget.spend_used).toFixed(2) : 'N/A';
      performanceContext.push(`ROAS: ${roas}x`);
    }

    if (calendar) {
      performanceContext.push(`\nCalendar items: ${calendar.length}`);
      const posted = calendar.filter((c) => c.status === 'posted').length;
      const scheduled = calendar.filter((c) => c.status === 'scheduled').length;
      const draft = calendar.filter((c) => c.status === 'draft').length;
      performanceContext.push(`Posted: ${posted}, Scheduled: ${scheduled}, Draft: ${draft}`);
    }

    if (analysis) {
      performanceContext.push(`\nAI Analysis: ${analysis.brand_summary ? 'Completed' : 'Not done'}`);
      performanceContext.push(`Campaign angles: ${analysis.campaign_angles || 'None'}`);
      performanceContext.push(`Social platforms: ${analysis.social_recommendations || 'None'}`);
    }

    if (adAnalysis) {
      performanceContext.push(`\nAd performance: ${adAnalysis.performance_summary || 'No data'}`);
      performanceContext.push(`Recommendations: ${adAnalysis.recommendation || 'None'}`);
    }

    const optimizerPrompt = `You are the Dovroyn AI Optimizer — a proprietary marketing intelligence system that audits campaign performance and recommends strategic improvements.

Analyze the following pod data and provide a comprehensive pulse check:

${performanceContext.join('\n')}

Provide a JSON response with these fields:
- health_score: A number from 0-100 representing overall pod health
- summary: One paragraph summary of the current state (max 150 chars)
- strengths: 2-3 things this pod is doing well
- weaknesses: 2-3 areas needing improvement
- recommendations: 3-5 specific, actionable recommendations prioritized by impact
- budget_reallocation: If budget data exists, suggest how to reallocate spend for better ROI
- content_gaps: Missing content types or platforms that should be addressed
- next_actions: Top 3 actions to take this week

Respond ONLY with valid JSON. No markdown, no code blocks.`;

    const aiResponse = await callOpenAI([
      { role: 'system', content: 'You are a marketing performance analysis engine. Always respond with valid JSON only.' },
      { role: 'user', content: optimizerPrompt },
    ], 0.6, 2000);

    // Parse AI response
    let optimizer: Record<string, any>;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;
      optimizer = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse optimizer response:', aiResponse);
      optimizer = {
        health_score: 50,
        summary: 'Analysis completed but parsing encountered an issue.',
        strengths: ['Pod is active', 'Data collection in progress'],
        weaknesses: ['Incomplete data', 'Need more campaign history'],
        recommendations: ['Complete AI analysis', 'Add more calendar items', 'Track budget spend'],
        budget_reallocation: 'Insufficient data for reallocation recommendations.',
        content_gaps: 'Calendar and content strategy need development.',
        next_actions: ['Run AI analysis', 'Generate content calendar', 'Review budget'],
      };
    }

    // Save snapshot to database
    const { data: snapshot } = await supabase
      .from('ai_optimizer_snapshots')
      .insert({
        pod_id,
        user_id,
        health_score: Math.min(100, Math.max(0, optimizer.health_score || 50)),
        summary: optimizer.summary || '',
        strengths: Array.isArray(optimizer.strengths) ? optimizer.strengths.join('\n') : optimizer.strengths || '',
        weaknesses: Array.isArray(optimizer.weaknesses) ? optimizer.weaknesses.join('\n') : optimizer.weaknesses || '',
        recommendations: Array.isArray(optimizer.recommendations) ? optimizer.recommendations.join('\n') : optimizer.recommendations || '',
        budget_reallocation: optimizer.budget_reallocation || '',
      })
      .select()
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        snapshot: {
          ...snapshot,
          content_gaps: optimizer.content_gaps || '',
          next_actions: Array.isArray(optimizer.next_actions) ? optimizer.next_actions : [optimizer.next_actions || ''],
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('ai-optimizer error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
