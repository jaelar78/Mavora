// OpenAI API key — set this in Supabase Dashboard > Edge Functions > Secrets
// Name: OPENAI_API_KEY
// Value: your OpenAI API key

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!;
const OPENAI_MODEL = 'gpt-4o';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callOpenAI(
  messages: ChatMessage[],
  temperature = 0.7,
  maxTokens = 1500
): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${error}`);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}
