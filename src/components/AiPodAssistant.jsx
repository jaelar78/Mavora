import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'Focus on Instagram for visual proof and social trust, TikTok for discovery and education, Pinterest for evergreen search, and email for retention. A Dovroyn pod would turn your website into a platform plan, content pillars, hooks, calendar, and ad angles built around your audience and hero products.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Aim at locals deciding where to meet, work, or treat themselves. Try: “Your 8am ritual, poured properly.” “POV: the pastry cabinet won.” “Bring the friend who says they only want a coffee.” Pair each with a warm table shot, tag the neighbourhood, and let a Dovroyn pod build weekly angles around menu moments, foot traffic, and repeat visits.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A good TikTok hook makes the right viewer stop in two seconds: name the audience, show the payoff, then create tension. Use angles like “If you’re buying X, watch this first,” “3 mistakes keeping you from Y,” or “We tested this so you don’t have to.” Next action: film one hook as a talking-head, one as a demo, and one as text-on-screen; a Dovroyn pod would score which hook fits the platform and campaign goal.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'Pick one buyer, one expensive problem, and one proof-led point of view. Post 3x weekly: a sharp lesson, a client-style teardown, and a practical framework your audience can save. Comment daily where decision-makers already gather, then send warm follow-ups tied to the topic. A Dovroyn pod would turn your offer into content pillars, hooks, proof points, and a weekly authority calendar.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey, I’m Dovroyn — your AI marketing pod. Ask about platforms, content, hooks, or growth and I’ll give you a focused next move.',
};

const TYPED_RESPONSE =
  'Strong starting point: define the audience, choose the platform where they already trust or discover brands, then build one clear content angle and next action. In a live Dovroyn pod, I’d use your website, offer, and campaign goal to create the exact channel mix, hooks, calendar, and ad angles.';

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
