import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'Focus Instagram for visual proof and social trust, TikTok for discovery and education, Pinterest for evergreen search, and email for retention. Next: a Dovroyn pod would build your platform plan, content pillars, hooks, calendar, and ad angles from your brand website.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'For locals and weekend browsers, sell the cafe moment: 1) "Your 8am reset: espresso, flaky layers, zero rush." 2) "POV: you found the table everyone asks about." 3) "Today\'s special: a quiet corner, a warm cup, and something buttery." Pair with a close-up plus a human moment; a Dovroyn pod would turn this into weekly pillars and Reels hooks.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A strong TikTok hook names the audience, teases a payoff, and earns the next 3 seconds. Use: "If you buy [product], watch this first," "3 mistakes costing [audience] [result]," or "We tested [claim] so you do not have to." Next: a Dovroyn pod maps hooks to your offer, proof points, and posting calendar.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'Choose one buyer and one painful problem; LinkedIn rewards sharp positioning. Post diagnosis posts, teardown/proof posts, and founder POV, then comment on your buyers\' conversations before you publish. Next action: rewrite your headline around the outcome you create. A Dovroyn pod would turn your expertise into a weekly authority plan.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey! I’m Dovroyn — your AI marketing pod assistant. Tell me about your brand or ask me anything about campaign strategy, and I’ll show you what a pod can do.',
};

const TYPED_RESPONSE =
  'Strong move: start with the audience, the platform where they already look for proof, one clear content angle, and the next conversion step. In a live Dovroyn pod, I would analyse your brand, offer, website, and campaign goal, then turn that into hooks, content pillars, platform priorities, and next actions.';

export default function AiPodAssistant() {
  const [messages, setMessages] = useState([INTRO_MESSAGE]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const queuePreviewReply = (question, answer, activeKey = null) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || thinking) return;

    clearTimeout(timerRef.current);
    setActiveQuestion(activeKey);
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, sender: 'user', text: cleanQuestion },
    ]);
    setThinking(true);
    timerRef.current = setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: `assistant-${Date.now()}`, sender: 'assistant', text: answer },
      ]);
      setThinking(false);
    }, 650);
  };

  const handleSuggestedAsk = (qa, index) => {
    queuePreviewReply(qa.question, qa.answer, index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    setDraft('');
    queuePreviewReply(question, TYPED_RESPONSE, null);
  };

  return (
    <section className="ai-assistant-section">
      <p className="eyebrow">AI Assistant Preview</p>
      <h2 className="section-title">Chat with your AI marketing pod.</h2>
      <p className="lede ai-assistant-lede">
        Try a live-feeling preview of how Dovroyn answers content, platform, and growth questions.
      </p>

      <div className="panel ai-assistant-card" aria-label="Interactive Dovroyn chat preview">
        <div className="ai-assistant-header">
          <span className="ai-assistant-orb" aria-hidden="true">
            <span className="ai-assistant-orb-ring" />
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <div>
            <p className="ai-assistant-name">Dovroyn</p>
            <p className="ai-assistant-subtitle">AI Marketing Pod · Preview</p>
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
                <span className="ai-assistant-dot" />
                <span className="ai-assistant-dot" />
                <span className="ai-assistant-dot" />
                <span className="ai-assistant-thinking-label">Dovroyn is typing...</span>
              </div>
            </div>
          )}
        </div>

        <div className="ai-assistant-questions" role="group" aria-label="Suggested questions">
          {ASSISTANT_QA.map((qa, index) => (
            <button
              key={qa.question}
              type="button"
              className={`ai-assistant-question${activeQuestion === index ? ' active' : ''}`}
              onClick={() => handleSuggestedAsk(qa, index)}
              aria-pressed={activeQuestion === index}
              disabled={thinking}
            >
              {qa.question}
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
            <Send size={16} strokeWidth={1.9} />
          </button>
        </form>

        <p className="ai-assistant-note">
          Interactive preview only. Live Dovroyn pods will generate answers from your own brand and campaign data.
        </p>
      </div>
    </section>
  );
}
