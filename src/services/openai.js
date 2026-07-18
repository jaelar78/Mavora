/******  OPENAI SERVICE — Content generation & analysis  ******/

const API_BASE = '/api/openai';

const openaiService = {
  /**
   * Generate content using GPT
   */
  async generateContent(params) {
    const { prompt, maxTokens = 500, temperature = 0.7, model = 'gpt-4' } = params;
    try {
      const response = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, maxTokens, temperature, model }),
      });
      if (!response.ok) throw new Error('Generation failed');
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw error;
    }
  },

  /**
   * Analyze content performance
   */
  async analyzeContent(params) {
    const { content, metrics } = params;
    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, metrics }),
      });
      if (!response.ok) throw new Error('Analysis failed');
      return await response.json();
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw error;
    }
  },

  /**
   * Generate image using DALL-E
   */
  async generateImage(params) {
    const { prompt, size = '1024x1024', n = 1 } = params;
    try {
      const response = await fetch(`${API_BASE}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size, n }),
      });
      if (!response.ok) throw new Error('Image generation failed');
      const data = await response.json();
      return data.images;
    } catch (error) {
      console.error('DALL-E error:', error);
      throw error;
    }
  },

  /**
   * Generate embeddings for similarity search
   */
  async createEmbedding(text) {
    try {
      const response = await fetch(`${API_BASE}/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Embedding failed');
      const data = await response.json();
      return data.embedding;
    } catch (error) {
      console.error('Embedding error:', error);
      throw error;
    }
  },
};

export default openaiService;