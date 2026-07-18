// Edge Function: website-analyzer
// Scrapes a website URL, sends content to OpenAI for analysis,
// saves the analysis to the pod_analysis table.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { callOpenAI } from '../_shared/openai.ts';
import { scrapeWebsite } from '../_shared/scraper.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { url, pod_id, user_id } = await req.json();

    if (!url || !pod_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: url, pod_id, user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url);
      if (!['http:', 'https:'].includes(validatedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create admin client
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

    // Update pod status to analysing
    await supabase
      .from('pods')
      .update({ status: 'analysing', updated_at: new Date().toISOString() })
      .eq('id', pod_id);

    // Scrape the website
    let scrapedData: any;
    try {
      const scraped = await scrapeWebsite(validatedUrl.toString());
      scrapedData = JSON.parse(scraped);
    } catch (scrapeError) {
      console.error('Scrape error:', scrapeError);
      // Even if scrape fails, try to analyze with just the URL
      scrapedData = {
        url: validatedUrl.toString(),
        title: '',
        metaDescription: '',
        content: `Failed to scrape website content. URL: ${validatedUrl.toString()}`,
      };
    }

    // Build analysis prompt
    const analysisPrompt = `You are a senior marketing strategist. Analyze this website and provide a comprehensive marketing analysis.

Website: ${scrapedData.url}
Title: ${scrapedData.title || 'N/A'}
Meta Description: ${scrapedData.metaDescription || 'N/A'}
Content:
${scrapedData.content}

Provide a JSON response with these fields:
- brand_summary: One-paragraph summary of what this brand does and sells (max 200 chars)
- tone: The brand's tone of voice (e.g., "Expert, reassuring, modern luxury")
- audience: Who the target customer is (demographics + psychographics)
- offer_direction: The main offer/angle that would convert best
- campaign_angles: 3-5 campaign angle ideas, comma-separated
- content_ideas: 5 content ideas for social media, comma-separated
- ad_angles: 5 ad angle/hook ideas, comma-separated
- social_recommendations: Best 3-4 social platforms for this brand, comma-separated
- calendar_strategy: A brief content calendar strategy (1-2 sentences)
- budget_strategy: Brief budget allocation suggestion
- next_actions: Top 3 next actions for this brand

Respond ONLY with valid JSON. No markdown, no code blocks.`;

    // Call OpenAI for analysis
    const aiResponse = await callOpenAI([
      { role: 'system', content: 'You are a marketing analysis engine. Always respond with valid JSON only.' },
      { role: 'user', content: analysisPrompt },
    ], 0.5, 2000);

    // Parse AI response
    let analysis: Record<string, string>;
    try {
      // Try to extract JSON from the response (in case there's markdown)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Fallback: create a basic analysis
      analysis = {
        brand_summary: `Analysis of ${scrapedData.title || pod.pod_name}`,
        tone: 'Professional',
        audience: 'General consumers',
        offer_direction: 'Focus on core product value',
        campaign_angles: 'Value proposition, Social proof, Limited offer',
        content_ideas: 'Product showcase, Behind the scenes, Customer story, Tips and tricks, Industry news',
        ad_angles: 'Problem/solution, Before/after, Testimonial, Limited time offer, Free trial',
        social_recommendations: 'Instagram, Facebook, TikTok',
        calendar_strategy: 'Post 3-4 times per week across primary platforms',
        budget_strategy: 'Start with 70% awareness, 30% conversion',
        next_actions: 'Set up social accounts, Create content calendar, Launch first ad campaign',
      };
    }

    // Save analysis to database
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('pod_analysis')
      .upsert({
        pod_id,
        brand_summary: analysis.brand_summary || '',
        tone: analysis.tone || '',
        audience: analysis.audience || '',
        offer_direction: analysis.offer_direction || '',
        campaign_angles: analysis.campaign_angles || '',
        content_ideas: analysis.content_ideas || '',
        ad_angles: analysis.ad_angles || '',
        social_recommendations: analysis.social_recommendations || '',
        calendar_strategy: analysis.calendar_strategy || '',
        budget_strategy: analysis.budget_strategy || '',
        next_actions: analysis.next_actions || '',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'pod_id' })
      .select()
      .single();

    if (saveError) {
      console.error('Save error:', saveError);
      throw new Error(`Failed to save analysis: ${saveError.message}`);
    }

    // Update pod status
    await supabase
      .from('pods')
      .update({
        status: 'awaiting_direction',
        updated_at: new Date().toISOString(),
      })
      .eq('id', pod_id);

    return new Response(
      JSON.stringify({
        success: true,
        analysis: savedAnalysis,
        scraped: {
          title: scrapedData.title,
          metaDescription: scrapedData.metaDescription,
          contentLength: scrapedData.content?.length || 0,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('website-analyzer error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
