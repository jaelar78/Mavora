// Dovroyn AI Engine — powered by proprietary marketing intelligence
// This is Dovroyn's custom AI brain, not a generic chatbot plugin.
// System prompts are engineered for brand marketing strategy, content creation,
// campaign optimization, and audience intelligence.

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
    throw new Error(`Dovroyn AI Engine error: ${res.status} ${error}`);
  }

  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}
