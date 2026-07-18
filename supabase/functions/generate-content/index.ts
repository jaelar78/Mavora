// Edge Function: generate-content
// Generates marketing content (ad copy, captions, hashtags, etc.) using Dovroyn AI Engine

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/openai.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { pod_id, user_id, content_type, prompt, platform, tone } = await req.json();

    if (!pod_id || !user_id || !content_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: pod_id, user_id, content_type' }),
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

    // Fetch analysis for context
    const { data: analysis } = await supabase
      .from('pod_analysis')
      .select('*')
      .eq('pod_id', pod_id)
      .maybeSingle();

    const brandName = pod.brand_name || pod.pod_name;
    const brandTone = tone || pod.accepted_tone || analysis?.tone || 'Professional, confident';
    const audience = analysis?.audience || 'Target audience';
    const offer = analysis?.offer_direction || 'Core offer';

    // Build prompt based on content type
    const prompts: Record<string, string> = {
      'ad_copy': `Generate 3 short ad copy variations for ${brandName}.

Target: ${audience}
Offer: ${offer}
Tone: ${brandTone}
Platform: ${platform || 'General'}

Provide 3 variations, each under 100 words. Make them compelling and conversion-focused.`,

      'caption': `Generate 3 social media caption variations for ${brandName}.

Target: ${audience}
Tone: ${brandTone}
Platform: ${platform || 'Instagram'}
${prompt ? `Specific request: ${prompt}` : ''}

Provide 3 captions with optional CTA. Keep them platform-appropriate.`,

      'hashtags': `Generate 20-30 relevant hashtags for ${brandName}.

Target: ${audience}
Platform: ${platform || 'Instagram'}
${prompt ? `Topic: ${prompt}` : ''}

Provide a mix of popular (1M+), medium (100K-1M), and niche (<100K) hashtags.`,

      'headline': `Generate 5 attention-grabbing headline variations for ${brandName}.

Target: ${audience}
Offer: ${offer}
Tone: ${brandTone}
${prompt ? `Context: ${prompt}` : ''}

Make them punchy, benefit-driven, and scroll-stopping.`,

      'email': `Write a marketing email for ${brandName}.

Target: ${audience}
Offer: ${offer}
Tone: ${brandTone}
${prompt ? `Purpose: ${prompt}` : 'General promotional email'}

Include: Subject line (5 options), preview text, body copy, and CTA.`,

      'description': `Write a product/service description for ${brandName}.

Target: ${audience}
Offer: ${offer}
Tone: ${brandTone}
${prompt ? `Details: ${prompt}` : ''}

Make it compelling, benefits-focused, and under 150 words.`,

      'rewrite': `Rewrite the following marketing copy for ${brandName} to improve it:

"${prompt || 'No text provided'}"

Tone: ${brandTone}
Target: ${audience}

Provide 3 improved versions, each with a brief explanation of why it's better.`,

      'hook': `Generate 5 viral hook/opening lines for ${brandName} content.

Target: ${audience}
Platform: ${platform || 'TikTok/Instagram'}
Tone: ${brandTone}

Make them scroll-stopping, curiosity-driven, and platform-native.`,
    };

    const contentPrompt = prompts[content_type] || `Generate marketing content for ${brandName}.

Type: ${content_type}
Target: ${audience}
Tone: ${brandTone}
${prompt ? `Request: ${prompt}` : ''}

Provide high-quality, ready-to-use marketing copy.`;

    const aiResponse = await callOpenAI([
      {
        role: 'system',
        content: `You are the Dovroyn AI Engine — a proprietary marketing intelligence system. You generate high-converting marketing content. Be specific, creative, and brand-aware. Never say "as an AI" or reference being a language model.`
      },
      { role: 'user', content: contentPrompt },
    ], 0.75, 1500);

    // Save to evergreen content library
    const { error: saveError } = await supabase
      .from('evergreen_content')
      .insert({
        pod_id,
        user_id,
        content_type,
        platform: platform || 'general',
        content: aiResponse,
        prompt: prompt || '',
        tone: brandTone,
      });

    if (saveError) {
      console.error('Save to evergreen failed:', saveError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        content: aiResponse,
        content_type,
        platform: platform || 'general',
        pod_id,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('generate-content error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
