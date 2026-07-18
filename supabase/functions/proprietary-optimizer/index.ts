// Proprietary Dovroyn AI Optimizer
// Performance analysis engine using formulas and rules — no external AI API needed

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// ============================================
// SCORING ENGINE
// ============================================

function calculateHealthScore(pod, analysis, budget, calendarItems, adAnalysis) {
  let score = 50; // baseline
  
  // Analysis completeness (+20 max)
  if (analysis?.brand_summary) score += 10;
  if (analysis?.campaign_angles) score += 5;
  if (analysis?.social_recommendations) score += 5;
  
  // Calendar activity (+20 max)
  if (calendarItems.length > 0) score += 5;
  if (calendarItems.filter(c => c.status === 'posted').length > 5) score += 10;
  if (calendarItems.filter(c => c.status === 'scheduled').length > 3) score += 5;
  
  // Budget tracking (+20 max)
  if (budget?.planned_budget > 0) score += 5;
  if (budget?.spend_used > 0) score += 5;
  if (budget?.leads > 0) score += 5;
  if (budget?.revenue > 0) score += 5;
  
  // Direction lock (+10)
  if (pod?.status === 'direction_locked' || pod?.status === 'active') score += 10;
  
  // Ad analysis (+10)
  if (adAnalysis?.performance_summary) score += 5;
  if (adAnalysis?.recommendation) score += 5;
  
  // Pod age bonus (+10)
  const podAge = pod?.created_at ? (Date.now() - new Date(pod.created_at).getTime()) / (1000 * 60 * 60 * 24) : 0;
  if (podAge > 7) score += 5;
  if (podAge > 30) score += 5;
  
  return Math.min(100, Math.max(0, score));
}

function identifyStrengths(pod, analysis, budget, calendarItems) {
  const strengths = [];
  
  if (analysis?.brand_summary) strengths.push('Brand identity clearly defined with AI analysis');
  if (pod?.accepted_tone) strengths.push(`Tone of voice locked in: ${pod.accepted_tone}`);
  if (calendarItems.length > 10) strengths.push('Strong content pipeline with 10+ planned posts');
  if (calendarItems.filter(c => c.status === 'posted').length > 5) strengths.push('Consistent posting schedule maintained');
  if (budget?.planned_budget > 0) strengths.push('Budget actively tracked and managed');
  if (budget?.revenue > budget?.spend_used * 2) strengths.push('Strong ROAS — revenue exceeds spend significantly');
  if (pod?.target_country) strengths.push(`Geographic targeting set for ${pod.target_country}`);
  if (analysis?.social_recommendations) strengths.push('Platform strategy defined by AI analysis');
  
  if (strengths.length === 0) {
    strengths.push('Pod is set up and ready for optimization');
    strengths.push('Clean slate for building strong performance');
  }
  
  return strengths.slice(0, 3);
}

function identifyWeaknesses(pod, analysis, budget, calendarItems, adAnalysis) {
  const weaknesses = [];
  
  if (!analysis?.brand_summary) weaknesses.push('No AI brand analysis completed — run website analysis');
  if (!pod?.accepted_tone) weaknesses.push('Brand tone not locked in — approve AI direction');
  if (calendarItems.length === 0) weaknesses.push('No content calendar generated — create posting schedule');
  if (calendarItems.filter(c => c.status === 'posted').length === 0 && calendarItems.length > 0) {
    weaknesses.push('Calendar exists but no posts published yet');
  }
  if (!budget?.planned_budget) weaknesses.push('No budget set — define spend limits for better tracking');
  if (budget?.spend_used > 0 && !budget?.leads) weaknesses.push('Spend tracked but no lead attribution — add conversion data');
  if (!adAnalysis?.performance_summary) weaknesses.push('No ad performance analysis — review and log results');
  if (pod?.status === 'created') weaknesses.push('Pod still in draft — lock in direction to activate');
  
  if (weaknesses.length === 0) {
    weaknesses.push('Consider increasing content frequency for better reach');
    weaknesses.push('Test new platforms to expand audience');
  }
  
  return weaknesses.slice(0, 3);
}

function generateRecommendations(pod, analysis, budget, calendarItems, adAnalysis, healthScore) {
  const recs = [];
  
  // Critical fixes first
  if (healthScore < 40) {
    recs.push('🚨 PRIORITY: Complete AI website analysis to establish brand foundation');
    recs.push('🚨 PRIORITY: Lock in brand direction and tone of voice');
    recs.push('🚨 PRIORITY: Generate first content calendar (14-day plan)');
  }
  
  if (!analysis?.brand_summary) {
    recs.push('Run AI Analysis on your website to extract brand DNA, audience, and tone');
  }
  
  if (pod?.status !== 'direction_locked' && pod?.status !== 'active') {
    recs.push('Approve AI direction to unlock content generation and calendar planning');
  }
  
  if (calendarItems.length === 0) {
    recs.push('Generate a 14-day content calendar with platform-specific posts');
  }
  
  if (!budget?.planned_budget) {
    recs.push('Set your monthly ad budget to enable spend tracking and optimization');
  }
  
  // Performance-based
  if (budget?.spend_used > 0) {
    const roas = budget.spend_used > 0 ? (budget.revenue / budget.spend_used) : 0;
    if (roas < 2) {
      recs.push('ROAS below 2x — review ad creative and targeting. Test new angles.');
    } else if (roas > 3) {
      recs.push(`Strong ROAS (${roas.toFixed(1)}x) — consider scaling budget by 20%`);
    }
  }
  
  if (calendarItems.filter(c => c.status === 'posted').length < 3 && calendarItems.length > 0) {
    recs.push('Low posting frequency — aim for at least 3 posts per week minimum');
  }
  
  if (!adAnalysis?.performance_summary) {
    recs.push('Schedule weekly ad performance review and log results in Ad Analysis tab');
  }
  
  // Strategic
  if (analysis?.social_recommendations) {
    const platforms = analysis.social_recommendations;
    if (!platforms.includes('TikTok') && pod?.target_country !== 'Australia') {
      recs.push('Consider testing TikTok — high engagement potential for visual brands');
    }
  }
  
  if (calendarItems.length > 20) {
    recs.push('Strong content library — review top performers and create variations');
  }
  
  recs.push('Run this optimizer weekly to track progress and adjust strategy');
  
  return recs.slice(0, 5);
}

function generateBudgetReallocation(pod, budget, analysis) {
  if (!budget || budget.planned_budget <= 0) {
    return 'No budget data available. Set your planned budget to see reallocation recommendations.';
  }
  
  const roas = budget.spend_used > 0 ? (budget.revenue / budget.spend_used) : 0;
  const remaining = budget.planned_budget - budget.spend_used;
  const percentUsed = budget.planned_budget > 0 ? (budget.spend_used / budget.planned_budget * 100) : 0;
  
  let recommendation = `Current spend: $${budget.spend_used} of $${budget.planned_budget} (${percentUsed.toFixed(1)}%). `;
  
  if (roas >= 3) {
    recommendation += `Excellent ROAS (${roas.toFixed(1)}x). Recommend allocating 60% to top performer, 30% to testing new creatives, 10% reserve.`;
  } else if (roas >= 2) {
    recommendation += `Good ROAS (${roas.toFixed(1)}x). Recommend 50% to proven ads, 35% to variations, 15% to new testing.`;
  } else if (roas > 0) {
    recommendation += `ROAS needs improvement (${roas.toFixed(1)}x). Recommend 40% to best performer, 40% to creative testing, 20% pause and review.`;
  } else {
    recommendation += `No revenue tracked yet. Start with 50% to awareness, 30% to consideration, 20% to retargeting.`;
  }
  
  if (remaining < budget.planned_budget * 0.2) {
    recommendation += ` ⚠️ Budget nearly exhausted — plan renewal or top-up.`;
  }
  
  return recommendation;
}

function generateNextActions(pod, analysis, calendarItems) {
  const actions = [];
  
  if (!analysis?.brand_summary) {
    actions.push('Run AI Website Analysis — extracts brand DNA, tone, audience');
  } else if (pod?.status !== 'direction_locked') {
    actions.push('Review AI Analysis and lock in brand direction');
  }
  
  if (calendarItems.length === 0) {
    actions.push('Generate 14-day Content Calendar');
  } else if (calendarItems.filter(c => c.status === 'draft').length > 0) {
    actions.push('Approve draft calendar items to schedule them');
  }
  
  actions.push('Run Content Generator to create 3 ad variations for testing');
  
  return actions.slice(0, 3);
}

// ============================================
// MAIN HANDLER
// ============================================

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

    // Fetch all pod data
    const [{ data: analysis }, { data: budget }, { data: calendarItems }, { data: adAnalysis }] = await Promise.all([
      supabase.from('pod_analysis').select('*').eq('pod_id', pod_id).maybeSingle(),
      supabase.from('budgets').select('*').eq('pod_id', pod_id).single(),
      supabase.from('calendar_items').select('*').eq('pod_id', pod_id).order('scheduled_date', { ascending: false }).limit(20),
      supabase.from('ad_analysis').select('*').eq('pod_id', pod_id).maybeSingle(),
    ]);

    // Run proprietary analysis
    const healthScore = calculateHealthScore(pod, analysis, budget, calendarItems || [], adAnalysis);
    const strengths = identifyStrengths(pod, analysis, budget, calendarItems || []);
    const weaknesses = identifyWeaknesses(pod, analysis, budget, calendarItems || [], adAnalysis);
    const recommendations = generateRecommendations(pod, analysis, budget, calendarItems || [], adAnalysis, healthScore);
    const budgetReallocation = generateBudgetReallocation(pod, budget, analysis);
    const nextActions = generateNextActions(pod, analysis, calendarItems || []);
    
    // Generate summary
    let summary = '';
    if (healthScore >= 80) summary = 'Pod is performing exceptionally well. Strong foundation with active content and tracking.';
    else if (healthScore >= 60) summary = 'Pod is in good shape. Core elements in place with room for optimization.';
    else if (healthScore >= 40) summary = 'Pod needs attention. Key components missing — prioritize analysis and calendar setup.';
    else summary = 'Pod requires immediate action. Complete setup steps to establish marketing foundation.';

    // Save snapshot
    const { data: snapshot } = await supabase
      .from('ai_optimizer_snapshots')
      .insert({
        pod_id,
        user_id,
        health_score: healthScore,
        summary,
        strengths: strengths.join('\n'),
        weaknesses: weaknesses.join('\n'),
        recommendations: recommendations.join('\n'),
        budget_reallocation: budgetReallocation,
      })
      .select()
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        snapshot: {
          ...snapshot,
          content_gaps: weaknesses.length > 0 ? weaknesses.join(', ') : 'None identified',
          next_actions: nextActions,
        },
        engine: 'Dovroyn Optimizer v1.0',
        proprietary: true,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('proprietary-optimizer error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
