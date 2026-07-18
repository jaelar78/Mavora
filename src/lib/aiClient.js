/******  AI CLIENT — Unified interface for OpenAI & local AI  ******/
import openaiService from '../services/openai';

const { generateContent, analyzeContent } = openaiService;

/**
 * Ask the Dovroyn AI assistant a question.
 * @param {string} prompt - The user's question/prompt
 * @param {object} context - Optional context (podId, podType, etc.)
 * @returns {Promise<string>} AI response
 */
export async function askDovroynAI(prompt, context = {}) {
  const systemPrompt = buildSystemPrompt(context);
  try {
    const response = await generateContent({
      prompt: `${systemPrompt}\n\nUser: ${prompt}`,
      maxTokens: 800,
    });
    return response;
  } catch (error) {
    console.error('AI Error:', error);
    return getLocalFallbackResponse(prompt, context);
  }
}

/**
 * Generate content (caption, hashtags, etc.) for a pod.
 * @param {object} params - { type, topic, tone, platform, podContext }
 */
export async function generatePodContent({ type, topic, tone = 'Casual', platform = 'Instagram', podContext = {} }) {
  const prompt = buildContentPrompt({ type, topic, tone, platform, podContext });
  try {
    return await generateContent({ prompt, maxTokens: 600 });
  } catch {
    return getLocalContentFallback({ type, topic, tone, platform });
  }
}

/**
 * Analyze content performance.
 * @param {object} metrics - Content metrics
 * @returns {Promise<object>} Analysis and recommendations
 */
export async function analyzePerformance(metrics) {
  try {
    const prompt = `Analyze these social media metrics and provide recommendations:\n${JSON.stringify(metrics, null, 2)}`;
    const response = await analyzeContent({ content: prompt });
    return JSON.parse(response);
  } catch {
    return getLocalAnalysisFallback(metrics);
  }
}

// ─── System Prompt Builder ───
function buildSystemPrompt(context) {
  const { podId, podType, podName } = context;
  let prompt = `You are Dovroyn AI, a creative marketing assistant specialized in social media growth, content strategy, and brand building.`;
  if (podName) prompt += `\nYou're assisting with the "${podName}" pod.`;
  if (podType) prompt += `\nThis is a ${podType}-focused pod.`;
  prompt += `\nProvide actionable, specific advice. Use formatting (bold, lists) for readability. Keep responses concise but valuable.`;
  return prompt;
}

// ─── Content Prompt Builder ───
function buildContentPrompt({ type, topic, tone, platform }) {
  const prompts = {
    caption: `Write a ${tone.toLowerCase()} Instagram caption about "${topic}". Include a hook, 2-3 sentences, a call-to-action, and relevant emojis.`,
    hashtags: `Generate 20 optimized hashtags for a ${platform} post about "${topic}". Mix popular (1M+), medium (100K-1M), and niche (10K-100K) tags. Format as space-separated.`,
    carousel: `Create a 5-slide carousel outline about "${topic}". Each slide should have a title and 1-2 sentences.`,
    script: `Write a 30-second ${platform} video script about "${topic}". Include a hook (0-3s), value (3-20s), and CTA (20-30s).`,
    blog: `Write a blog post outline about "${topic}" with introduction, 3 main sections, and conclusion.`,
    email: `Write a marketing email about "${topic}" with subject line, body, and call-to-action.`,
  };
  return prompts[type] || prompts.caption;
}

// ─── Local Fallbacks (no API needed) ───
function getLocalFallbackResponse(prompt, context) {
  const { podName } = context;
  const responses = [
    `Great question! For ${podName || 'your pod'}, I'd recommend focusing on consistent content creation and engaging with your community regularly.`,
    `Here's a strategy that works well: post 4-5 times per week, use a mix of educational and entertaining content, and always include a clear call-to-action.`,
    `Based on current trends, video content (Reels/TikToks) is getting the highest engagement. Try creating short-form videos around your key topics.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getLocalContentFallback({ type, topic, tone, platform }) {
  const fallbacks = {
    caption: `✨ ${topic} is changing the game! Here's what you need to know:\n\n1. Start with the fundamentals\n2. Consistency is everything\n3. Your unique voice matters\n\nWhat's your take on ${topic}? Comment below! 👇`,
    hashtags: `#${topic.toLowerCase().replace(/\s+/g, '')} #${platform.toLowerCase()} #contentcreator #growth #strategy #trending #viral #community #creatorlife #socialmedia`,
    carousel: `Slide 1: Introduction to ${topic}\nSlide 2: Why it matters\nSlide 3: Common mistakes\nSlide 4: Pro tips\nSlide 5: Call to action`,
    script: `[0-3s] Stop scrolling! ${topic} is about to change everything.\n[3-20s] Here's the secret nobody tells you...\n[20-30s] Follow for more tips!`,
    blog: `# ${topic}: The Complete Guide\n\n## Introduction\n## Why ${topic} Matters\n## Key Strategies\n## Common Mistakes\n## Conclusion`,
    email: `Subject: Your ${topic} guide is here!\n\nHi there,\n\nWe've put together the ultimate guide on ${topic}.\n\n[Read More]\n\nBest,\nThe Team`,
  };
  return fallbacks[type] || fallbacks.caption;
}

function getLocalAnalysisFallback(metrics) {
  return {
    score: 72,
    strengths: ['Good posting consistency', 'Strong engagement rate'],
    weaknesses: ['Low reach on weekdays', 'Inconsistent hashtag usage'],
    recommendations: [
      'Post between 10 AM - 2 PM for maximum reach',
      'Use 20-25 hashtags per post',
      'Engage with 15 accounts daily',
    ],
  };
}