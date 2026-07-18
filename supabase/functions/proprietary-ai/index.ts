// Proprietary Dovroyn AI Engine
// Generates content using brand DNA, templates, and rules — no external AI API needed for 80% of tasks

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// ============================================
// PROPRIETARY CONTENT TEMPLATES
// ============================================

const AD_COPY_TEMPLATES = {
  luxury: [
    "Experience {product} — crafted for those who refuse to compromise on {benefit}.",
    "Your {audience} deserves {product}. {benefit}, guaranteed.",
    "Not just {product}. A statement. {benefit} for the discerning {audience}.",
    "Stop settling. {product} delivers {benefit} that {audience} expect.",
    "The {product} {audience} have been waiting for. {benefit} from day one.",
  ],
  playful: [
    "Okay but {product} is actually *that* good. {benefit} without the drama. ✨",
    "POV: You finally found {product} and your {audience} era begins. {benefit} guaranteed.",
    "Not to be dramatic, but {product} just changed everything. {benefit} fr.",
    "your {audience} called. they want {product}. (and {benefit})",
    "main character energy = {product}. {benefit} but make it iconic.",
  ],
  professional: [
    "Introducing {product} — engineered for {benefit} that {audience} demand.",
    "{product}: Proven {benefit} for {audience} who prioritize results.",
    "Trusted by {audience} worldwide. {product} delivers {benefit} you can measure.",
    "The {product} advantage: {benefit}, backed by data.",
    "For {audience} who expect more. {product} — {benefit}, consistently.",
  ],
  urgent: [
    "⚡ {audience} are switching to {product}. Here's why: {benefit}",
    "Limited time: {product} with {benefit}. Your {audience} competitors already know.",
    "Don't wait. {product} — {benefit} for {audience} who act fast.",
    "The {product} window is closing. {benefit} won't wait for {audience}.",
  ],
};

const CAPTION_TEMPLATES = {
  luxury: [
    "A moment of quiet confidence. {product} — because {benefit} speaks louder than noise. #elevated",
    "Some things don't need explaining. {product}. {benefit}. That's it. ✨",
    "For the {audience} who know that less is more. {product} — {benefit}, refined.",
  ],
  playful: [
    "me when i finally found {product} and {benefit} hit different 😭✨",
    "no thoughts, just {product} and {benefit} 💅",
    "if {audience} energy was a product, it'd be {product}. {benefit} fr fr.",
  ],
  professional: [
    "{product} isn't just a tool — it's how {audience} stay ahead. {benefit}, delivered.",
    "Behind every successful {audience} is {product}. Here's the {benefit} difference.",
    "The data doesn't lie: {product} drives {benefit} for {audience}.",
  ],
};

const HEADLINE_TEMPLATES = {
  luxury: [
    "The {product} {audience} Whisper About",
    "Why {audience} Choose {product} — {benefit}",
    "{product}: When Only {benefit} Will Do",
    "The {audience}'s Secret Weapon? {product}",
  ],
  playful: [
    "Okay But {product} Is Actually *That* Good",
    "POV: You Found {product} and {benefit} Hit Different",
    "Not To Be Dramatic, But {product} Just Changed Everything",
    "Your {audience} Called. They Want {product}.",
  ],
  professional: [
    "{product}: The {benefit} {audience} Demand",
    "Why {audience} Trust {product} for {benefit}",
    "{product} — Proven {benefit}, Real Results",
    "The {product} Advantage for {audience}",
  ],
  urgent: [
    "⚡ {audience}: {product} Won't Wait",
    "Last Call: {product} + {benefit}",
    "Don't Let {audience} Beat You to {product}",
  ],
};

const HASHTAG_SETS = {
  luxury: ['#luxury', '#premium', '#elevated', '#exclusive', '#refined', '#quality', '#sophisticated'],
  playful: ['#vibes', '#aesthetic', '#maincharacter', '#iconic', '#nostalgia', '#trending', '#viral'],
  professional: ['#business', '#growth', '#success', '#strategy', '#leadership', '#results', '#professional'],
  ecommerce: ['#shopnow', '#newarrival', '#musthave', '#trending', '#limitededition', '#shoplocal'],
  service: ['#booknow', '#consultation', '#expert', '#trusted', '#results', '#transformation'],
};

const EMAIL_TEMPLATES = {
  subject: {
    luxury: [
      "Your {audience} deserve {product}",
      "{product}: {benefit}, delivered",
      "A quiet moment with {product}",
    ],
    playful: [
      "okay so {product} is kind of insane 😳",
      "your {audience} era starts with {product}",
      "not to alarm you but {product}...",
    ],
    professional: [
      "{product}: {benefit} for {audience}",
      "Introducing {product} — built for results",
      "The {audience} advantage: {product}",
    ],
  },
  body: {
    luxury: `Hi {name},

Some products don't need to shout. {product} is one of them.

{audience} who demand {benefit} have found their match. Quiet confidence. Undeniable results.

Discover {product} — {benefit}, refined.

Best,
{brand}`,
    playful: `Hey {name},

Real talk: {product} is *that* good.

Like, {benefit} but make it fun. Your {audience} era is calling and it wants {product}.

No cap, just results. Check it out.

xoxo,
{brand}`,
    professional: `Hi {name},

I wanted to reach out about {product} — specifically how it's delivering {benefit} for {audience} like yours.

The numbers speak for themselves, but I'd rather show you.

Let's connect.

Best regards,
{brand}`,
  },
};

const VIRAL_HOOKS = {
  luxury: [
    "Stop scrolling if you're not ready for {benefit}.",
    "The {audience} secret no one talks about? {product}.",
    "I stopped searching when I found {product}. Here's why.",
  ],
  playful: [
    "POV: You finally found {product} and {benefit} hits different.",
    "Tell me you use {product} without telling me you use {product}.",
    "The {product} glow-up is REAL. {benefit} edition.",
  ],
  professional: [
    "I spent years looking for {benefit}. Then I found {product}.",
    "The {audience} mistake costing you money (and how {product} fixes it).",
    "What {audience} won't tell you about {product}.",
  ],
};

// ============================================
// BRAND DNA EXTRACTOR
// ============================================

function extractBrandDNA(pod, analysis) {
  const tone = pod?.accepted_tone?.toLowerCase() || analysis?.tone?.toLowerCase() || 'professional';
  
  let brandStyle = 'professional';
  if (tone.includes('luxury') || tone.includes('premium') || tone.includes('sophisticated')) brandStyle = 'luxury';
  else if (tone.includes('playful') || tone.includes('fun') || tone.includes('casual') || tone.includes('cheeky')) brandStyle = 'playful';
  else if (tone.includes('urgent') || tone.includes('bold') || tone.includes('aggressive')) brandStyle = 'urgent';
  
  const brandName = pod?.brand_name || pod?.pod_name || 'Your Brand';
  const product = analysis?.brand_summary?.split(' ').slice(0, 3).join(' ') || brandName;
  const benefit = analysis?.offer_direction || 'results that matter';
  const audience = analysis?.audience?.split(' ').slice(0, 3).join(' ') || 'customers';
  
  return { brandStyle, brandName, product, benefit, audience };
}

function fillTemplate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match);
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================
// CONTENT GENERATORS
// ============================================

function generateAdCopy(brandDNA, count = 3) {
  const templates = AD_COPY_TEMPLATES[brandDNA.brandStyle] || AD_COPY_TEMPLATES.professional;
  const shuffled = shuffleArray(templates);
  return shuffled.slice(0, count).map(t => fillTemplate(t, brandDNA));
}

function generateCaptions(brandDNA, count = 3) {
  const templates = CAPTION_TEMPLATES[brandDNA.brandStyle] || CAPTION_TEMPLATES.professional;
  const shuffled = shuffleArray(templates);
  return shuffled.slice(0, count).map(t => fillTemplate(t, brandDNA));
}

function generateHeadlines(brandDNA, count = 3) {
  const templates = HEADLINE_TEMPLATES[brandDNA.brandStyle] || HEADLINE_TEMPLATES.professional;
  const shuffled = shuffleArray(templates);
  return shuffled.slice(0, count).map(t => fillTemplate(t, brandDNA));
}

function generateHashtags(brandDNA, count = 7) {
  const baseTags = HASHTAG_SETS[brandDNA.brandStyle] || HASHTAG_SETS.professional;
  const brandTag = `#${brandDNA.brandName.replace(/\s+/g, '')}`;
  const shuffled = shuffleArray(baseTags);
  return [brandTag, ...shuffled.slice(0, count - 1)];
}

function generateEmail(brandDNA, type = 'subject') {
  if (type === 'subject') {
    const templates = EMAIL_TEMPLATES.subject[brandDNA.brandStyle] || EMAIL_TEMPLATES.subject.professional;
    return fillTemplate(templates[Math.floor(Math.random() * templates.length)], brandDNA);
  }
  const bodyTemplate = EMAIL_TEMPLATES.body[brandDNA.brandStyle] || EMAIL_TEMPLATES.body.professional;
  return fillTemplate(bodyTemplate, { ...brandDNA, name: '{{first_name}}' });
}

function generateViralHooks(brandDNA, count = 3) {
  const templates = VIRAL_HOOKS[brandDNA.brandStyle] || VIRAL_HOOKS.professional;
  const shuffled = shuffleArray(templates);
  return shuffled.slice(0, count).map(t => fillTemplate(t, brandDNA));
}

function rewriteText(text, brandDNA) {
  // Simple but effective rewrite rules
  const rules = {
    luxury: {
      replace: [['cheap', 'accessible'], ['best', 'finest'], ['good', 'exceptional'], ['amazing', 'remarkable']],
      prefix: ['Experience ', 'Discover ', 'Indulge in '],
    },
    playful: {
      replace: [['good', 'fire'], ['amazing', 'insane'], ['great', 'iconic'], ['love', 'obsessed with']],
      prefix: ['Okay but ', 'Not to be dramatic, but ', 'POV: '],
    },
    professional: {
      replace: [['good', 'proven'], ['best', 'optimal'], ['amazing', 'significant'], ['love', 'highly recommend']],
      prefix: ['Introducing ', 'We are pleased to present ', 'Discover '],
    },
  };
  
  const style = rules[brandDNA.brandStyle] || rules.professional;
  let rewritten = text;
  
  for (const [find, replace] of style.replace) {
    const regex = new RegExp(`\\b${find}\\b`, 'gi');
    rewritten = rewritten.replace(regex, replace);
  }
  
  const prefix = style.prefix[Math.floor(Math.random() * style.prefix.length)];
  return prefix + rewritten;
}

function generateDescription(brandDNA) {
  return `${brandDNA.brandName} — ${brandDNA.benefit} for ${brandDNA.audience}. Experience the difference.`;
}

// ============================================
// MAIN HANDLER
// ============================================

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { pod_id, user_id, content_type, prompt, platform } = await req.json();

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

    // Fetch analysis data
    const { data: analysis } = await supabase
      .from('pod_analysis')
      .select('*')
      .eq('pod_id', pod_id)
      .maybeSingle();

    const brandDNA = extractBrandDNA(pod, analysis);
    
    // Incorporate user's custom prompt if provided
    if (prompt) {
      brandDNA.benefit = prompt.length > 5 ? prompt : brandDNA.benefit;
    }

    let result = '';
    let variations = [];

    switch (content_type) {
      case 'ad_copy':
        variations = generateAdCopy(brandDNA, 3);
        result = variations.join('\n\n---\n\n');
        break;
      case 'caption':
        variations = generateCaptions(brandDNA, 3);
        result = variations.join('\n\n---\n\n');
        break;
      case 'hashtags':
        variations = generateHashtags(brandDNA, 8);
        result = variations.join(' ');
        break;
      case 'headline':
        variations = generateHeadlines(brandDNA, 3);
        result = variations.join('\n\n---\n\n');
        break;
      case 'email':
        result = `SUBJECT: ${generateEmail(brandDNA, 'subject')}\n\n${generateEmail(brandDNA, 'body')}`;
        break;
      case 'description':
        result = generateDescription(brandDNA);
        break;
      case 'rewrite':
        result = prompt ? rewriteText(prompt, brandDNA) : 'Please provide text to rewrite.';
        break;
      case 'hook':
        variations = generateViralHooks(brandDNA, 3);
        result = variations.join('\n\n---\n\n');
        break;
      default:
        result = 'Unknown content type. Supported: ad_copy, caption, hashtags, headline, email, description, rewrite, hook';
    }

    // Save to evergreen library
    const { data: savedContent } = await supabase
      .from('evergreen_content')
      .insert({
        pod_id,
        user_id,
        content_type,
        platform: platform || 'general',
        content: result,
        prompt: prompt || '',
        tone: brandDNA.brandStyle,
      })
      .select()
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        content: result,
        variations,
        brand_dna: brandDNA,
        saved_id: savedContent?.id,
        engine: 'Dovroyn AI Engine v1.0',
        proprietary: true,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('proprietary-ai error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
