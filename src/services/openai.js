const API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Generic ChatGPT call.
 */
export async function generateContent(prompt, model = 'gpt-4', temperature = 0.7) {
  const apiKey =
    localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Add it in Settings.')
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// ── Platform-specific content generators ──────────────────────────────────────

export async function generateInstagramCaption(brand, product, tone) {
  const prompt = `Write an Instagram caption for ${brand}, an Australian ${product} brand. 
Tone: ${tone}. Include relevant hashtags (10-15). Make it engaging and authentic. Keep under 2200 characters.`
  return generateContent(prompt)
}

export async function generateFacebookAd(brand, product, cta, audience) {
  const prompt = `Write a Facebook ad for ${brand}, an Australian ${product} brand.
Target audience: ${audience}. Call to action: ${cta}. Include headline and primary text.`
  return generateContent(prompt)
}

export async function generateTikTokScript(brand, product, hook) {
  const prompt = `Write a TikTok video script for ${brand}, an Australian ${product} brand.
Hook/first 3 seconds: ${hook}. Include scene breakdown and captions.`
  return generateContent(prompt)
}

export async function generateBlogPost(brand, product, title, keywords) {
  const prompt = `Write an SEO-optimized blog post for ${brand}, an Australian ${product} brand.
Title: ${title}. Keywords: ${keywords}. Include meta description.`
  return generateContent(prompt, 'gpt-4', 0.8)
}

export async function generateGoogleAds(brand, product, keywords) {
  const prompt = `Write Google Ads for ${brand}, an Australian ${product} brand.
Keywords: ${keywords}. Create 3 headlines (max 30 chars each) and 2 descriptions (max 90 chars each).`
  return generateContent(prompt)
}

export async function generateGrowthAdvice(brand, product, platform, currentMetrics) {
  const prompt = `Give 3 specific growth advice suggestions for ${brand}, an Australian ${product} brand on ${platform}.
Current situation: ${currentMetrics}. Each suggestion should include: category, impact level (High/Medium/Low), and expected outcome.`
  return generateContent(prompt, 'gpt-4', 0.9)
}

export async function generateCampaignContent(brand, product, campaignType, platforms) {
  const prompt = `Create a ${campaignType} campaign content plan for ${brand}, an Australian ${product} brand.
Platforms: ${platforms.join(', ')}. Include 5-7 post ideas with dates, platforms, and content themes.`
  return generateContent(prompt)
}

// ── Streaming helpers (for real-time content generation UI) ───────────────────

export async function* streamContent(prompt, model = 'gpt-4', temperature = 0.7) {
  const apiKey =
    localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) throw new Error('OpenAI API key not configured.')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
      stream: true,
      max_tokens: 2000,
    }),
  })

  if (!response.ok || !response.body) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `OpenAI streaming error: ${response.status}`)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed === 'data: [DONE]') continue
      if (trimmed.startsWith('data: ')) {
        try {
          const json = JSON.parse(trimmed.slice(6))
          const chunk = json.choices?.[0]?.delta?.content
          if (chunk) yield chunk
        } catch {
          // ignore malformed SSE lines
        }
      }
    }
  }
}

export function isOpenAIConfigured() {
  return !!(localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY)
}
