// Edge Function: generate-calendar
// Generates AI-powered content calendar items for a pod.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/openai.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { pod_id, user_id, platforms, days, start_date, target_country } = await req.json();

    if (!pod_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: pod_id, user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify ownership
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

    // Get pod analysis
    const { data: analysis } = await supabase
      .from('pod_analysis')
      .select('*')
      .eq('pod_id', pod_id)
      .maybeSingle();

    const platformList = platforms || ['Instagram', 'TikTok', 'Facebook'];
    const numDays = days || 7;
    const startDate = start_date || new Date().toISOString().split('T')[0];
    const country = target_country || pod.target_country || 'Australia';

    // Get holidays/seasonal context
    const now = new Date();
    const month = now.getMonth() + 1;
    const seasonalContext = getSeasonalContext(country, month);

    const prompt = `You are a content calendar generator for a marketing AI called Dovroyn.

Generate ${numDays} days of content calendar items for this brand:

Brand: ${pod.brand_name || pod.pod_name}
Type: ${pod.pod_type}
Target Country: ${country}
Tone: ${pod.accepted_tone || analysis?.tone || 'Professional'}
Platforms: ${platformList.join(', ')}
Start Date: ${startDate}

Brand Summary: ${analysis?.brand_summary || 'Not analyzed yet'}
Audience: ${analysis?.audience || 'General consumers'}
Content Ideas: ${analysis?.content_ideas || ''}
Campaign Angles: ${analysis?.campaign_angles || ''}

Seasonal Context for ${country}: ${seasonalContext}

Generate a JSON array of calendar items. Each item should have:
- platform: one of ${JSON.stringify(platformList)}
- scheduled_date: YYYY-MM-DD format, starting from ${startDate}
- content_type: e.g., "carousel", "reel", "story", "static_post", "blog", "email", "ad"
- caption: The actual post caption/copy (engaging, on-brand)
- creative_note: Brief note about visuals/creative direction

Distribute across platforms and vary content types. Make captions specific to the brand, not generic.

Respond ONLY with valid JSON array. No markdown, no code blocks.`;

    const aiResponse = await callOpenAI([
      { role: 'system', content: 'You are a content calendar generator. Always respond with valid JSON array only.' },
      { role: 'user', content: prompt },
    ], 0.7, 2500);

    // Parse response
    let calendarItems: any[];
    try {
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;
      calendarItems = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse calendar:', aiResponse);
      // Fallback items
      calendarItems = generateFallbackCalendar(pod, platformList, numDays, startDate);
    }

    // Save to database
    const itemsToInsert = calendarItems.map((item) => ({
      pod_id,
      platform: item.platform || platformList[0],
      scheduled_date: item.scheduled_date || startDate,
      content_type: item.content_type || 'static_post',
      caption: item.caption || '',
      creative_note: item.creative_note || '',
      status: 'draft',
    }));

    const { data: savedItems, error: insertError } = await supabase
      .from('calendar_items')
      .insert(itemsToInsert)
      .select();

    if (insertError) {
      throw new Error(`Failed to save calendar: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        items: savedItems,
        count: savedItems?.length || 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('generate-calendar error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getSeasonalContext(country: string, month: number): string {
  const contexts: Record<string, Record<number, string>> = {
    Australia: {
      1: 'Summer holidays, Australia Day (Jan 26), Back to school',
      2: 'Valentine\'s Day, End of summer',
      3: 'Autumn begins, Easter (variable)',
      4: 'Anzac Day (Apr 25), Autumn campaigns',
      5: 'Mother\'s Day (second Sunday), EOFY prep begins',
      6: 'EOFY sales, Winter begins',
      7: 'School holidays, Mid-year sales',
      8: 'Father\'s Day (first Sunday)',
      9: 'Spring begins, AFL Grand Final',
      10: 'Halloween, Spring racing',
      11: 'Black Friday prep, Melbourne Cup',
      12: 'Christmas, Summer holidays, Boxing Day sales',
    },
    'United States': {
      1: 'New Year, MLK Day',
      2: 'Valentine\'s Day, Presidents Day',
      3: 'St Patrick\'s Day, Spring break',
      4: 'Easter, Earth Day',
      5: 'Mother\'s Day, Memorial Day',
      6: 'Father\'s Day, Pride Month',
      7: 'Independence Day (Jul 4), Summer',
      8: 'Back to school, Labor Day prep',
      9: 'Labor Day, Hispanic Heritage',
      10: 'Halloween, Breast Cancer Awareness',
      11: 'Thanksgiving, Black Friday, Cyber Monday',
      12: 'Christmas, Hanukkah, New Year prep',
    },
    'United Kingdom': {
      5: 'Mother\'s Day (fourth Sunday of Lent)',
      6: 'Father\'s Day (third Sunday)',
    },
  };

  return contexts[country]?.[month] || 'No major holidays this month';
}

function generateFallbackCalendar(pod: any, platforms: string[], days: number, startDate: string): any[] {
  const items: any[] = [];
  const types = ['static_post', 'carousel', 'reel', 'story'];
  const date = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    items.push({
      platform: platforms[i % platforms.length],
      scheduled_date: dateStr,
      content_type: types[i % types.length],
      caption: `Check out ${pod.brand_name || pod.pod_name}! Great products, great value. #marketing`,
      creative_note: 'Product-focused visual',
    });
  }

  return items;
}
