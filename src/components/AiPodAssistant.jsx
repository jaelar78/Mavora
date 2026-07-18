import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../lib/aiClient';
import { supabase } from '../lib/supabaseClient';

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: "Hey! I'm Dovroyn — your AI marketing pod assistant. Tell me about your brand or ask me anything about campaign strategy, content ideas, or platform recommendations.",
};

const SUGGESTED_QUESTIONS = [
  'What platforms should I focus on for my brand?',
  'Give me 3 Instagram caption ideas',
  'What makes a good TikTok hook?',
  'How do I grow on LinkedIn?',
];

export default function AiPodAssistant({ podId, userId }) {
  const [messages, setMessages] = useState([INTRO_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question || thinking) return;

    setDraft('');
    setError(null);
    setThinking(true);

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: question },
    ]);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      if (!token) {
        throw new Error('Not authenticated. Please sign in.');
      }

      const result = await sendChatMessage({
        message: question,
        pod_id: podId || 'preview',
        user_id: userId || session.data.session.user.id,
        token,
      });

      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, sender: 'assistant', text: result.response },
      ]);
    } catch (err) {
      console.error('AI chat error:', err);
      setError(err.message || 'AI service unavailable. Please try again.');
      setMessages((prev) => [
        ...prev,
        { id: `error-${Date.now()}`, sender: 'assistant', text: `Sorry, I ran into an issue: ${err.message}` },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleSuggestedAsk = (question) => {
    setDraft(question);
    // Auto-submit after a brief delay so user sees it
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSubmit(fakeEvent);
    }, 100);
  };

  return (
    <section className="ai-assistant-section">
      <p className="eyebrow">AI Assistant</p>
      <h2 className="section-title">Chat with your AI marketing pod.</h2>
      <p className="lede ai-assistant-lede">
        Ask Dovroyn anything about your brand, campaign strategy, content ideas, or platform recommendations.
      </p>

      <div className="panel ai-assistant-card" aria-label="Dovroyn AI chat">
        <div className="ai-assistant-header">
          <span className="ai-assistant-orb" aria-hidden="true">
            <span className="ai-assistant-orb-ring" />
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <div>
            <p className="ai-assistant-name">Dovroyn</p>
            <p className="ai-assistant-subtitle">AI Marketing Pod</p>
            <p className="ai-assistant-status"><span aria-hidden="true" />Online</p>
          </div>
        </div>

        <div className="ai-assistant-chat" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`ai-assistant-message-row ai-assistant-message-row-${message.sender}`}
            >
              {message.sender === 'assistant' && (
                <span className="ai-assistant-mini-avatar" aria-hidden="true">
                  <Sparkles size={12} strokeWidth={1.8} />
                </span>
              )}
              <p className={`ai-assistant-bubble ai-assistant-bubble-${message.sender}`}>
                {message.text}
              </p>
            </div>
          ))}
          {thinking && (
            <div className="ai-assistant-message-row ai-assistant-message-row-assistant">
              <span className="ai-assistant-mini-avatar" aria-hidden="true">
                <Sparkles size={12} strokeWidth={1.8} />
              </span>
              <div className="ai-assistant-bubble ai-assistant-bubble-assistant ai-assistant-thinking" role="status">
                <Loader2 size={14} className="animate-spin" />
                <span className="ai-assistant-thinking-label">Dovroyn is thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="ai-assistant-questions" role="group" aria-label="Suggested questions">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              className="ai-assistant-question"
              onClick={() => handleSuggestedAsk(q)}
              disabled={thinking}
            >
              {q}
            </button>
          ))}
        </div>

        <form className="ai-assistant-input-bar" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="ai-assistant-input">
            Ask Dovroyn anything about your marketing pod
          </label>
          <input
            id="ai-assistant-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask Dovroyn anything about your marketing pod..."
            disabled={thinking}
          />
          <button type="submit" aria-label="Send message" disabled={thinking || !draft.trim()}>
            {thinking ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={1.9} />}
          </button>
        </form>

        {error && <p className="form-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
      </div>
    </section>
  );
}
