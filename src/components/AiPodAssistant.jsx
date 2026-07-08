import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'For skincare, four channels do the heavy lifting: Instagram for visual proof and social trust (before/afters, routines, reviews), TikTok for discovery and ingredient education, Pinterest for evergreen “routine for X skin” searches, and email to turn first orders into repeat buyers. Start with Instagram + TikTok and post consistently for 30 days before adding the rest. A Dovroyn pod would build the full platform plan, content pillars, hooks, calendar, and ad angles straight from your brand website.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Three angles that convert for cafés — Ritual: “The 8am you deserve: golden crema, warm pastry, zero rush.” Scarcity: “Our almond croissants sell out by 10am. You’ve been warned.” Community: “Tag the friend who says ‘one quick coffee’ and stays for three.” Lead with the food shot, keep the hook in the first line, and post during commute hours. A Dovroyn pod would turn this into a month of captions in your café’s own voice.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A great hook names your exact viewer and opens a curiosity gap inside two seconds. Proven formulas: “If you run a [niche] brand, stop doing this,” “I tested this for 30 days — here’s what nobody tells you,” and “The $0 marketing move that beat our paid ads.” Say the hook out loud and put it in the text overlay, then pay it off fast — no slow intros. A Dovroyn pod writes hooks matched to your audience and offer, then ranks them by scroll-stopping potential.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'Treat your profile as the funnel: your headline should state who you help and the outcome — not your job title. Then post 2–3 times a week rotating three angles: a client-story lesson, a contrarian take on your industry, and a practical how-to. Spend 15 minutes a day commenting on your ideal buyers’ posts; comments drive more inbound than posting alone. First move: rewrite your headline today. A Dovroyn pod would map your positioning and draft your first 30-day content calendar.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey! I’m Dovroyn — your AI marketing pod assistant. Tell me about your brand or ask me anything about campaign strategy, and I’ll show you what a pod can do.',
};

const TYPED_RESPONSE =
  'Good question — here’s how a live Dovroyn pod would tackle it: first pin down who you’re selling to and where they already spend attention, then pick the one or two platforms that fit, choose a content angle that proves your offer works, and ship a first campaign within the week. In a live pod I’d pull all of that from your brand website automatically — platform plan, content pillars, hooks, calendar, and ad angles included. Try one of the suggested questions below to see the depth of a real answer.';

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
