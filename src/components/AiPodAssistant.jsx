import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'For skincare, four channels do the heavy lifting. Instagram is your proof engine — before/afters, texture shots, and reviews build social trust. TikTok drives discovery: ingredient education and routine content reach buyers who’ve never heard of you. Pinterest captures evergreen search like “routine for oily skin,” so pins keep converting for months. Email is your retention layer — replenishment reminders and routine tips turn one order into a habit. Your next move: pick one hero product and build a two-week content sprint around it. A Dovroyn pod would do this from your website alone — full platform plan, content pillars, hooks, posting calendar, and ad angles, ready to run.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Café captions work when they sell the ritual, not the menu. Three angles: 1) Identity — “You’re not late. You’re exactly one flat white away from ready.” 2) Sensory POV — “POV: the croissant cabinet made eye contact first.” 3) Local belonging — “The corner table knows your order. So do we.” Post the identity one first with a warm morning-rush shot — those pull the strongest saves and shares for local spots. A Dovroyn pod would generate a month of these in your café’s voice, matched to photo prompts and best posting times.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A good hook earns the next two seconds by opening a loop the viewer needs closed. Four formats that consistently hold attention: call out the audience (“If you run a service business, stop scrolling”), challenge a belief (“You’re posting at the wrong time — here’s proof”), tease the payoff (“This one change doubled our replies”), and stakes-first (“I spent $500 testing this so you don’t have to”). Say it in the first line of speech AND the on-screen text — most viewers watch muted. Next step: write five hooks per video idea and film the best two. A Dovroyn pod writes hooks in your brand voice for every script it plans, so you never start from a blank page.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'LinkedIn rewards consultants who post like practitioners, not marketers. Three moves: fix your headline to name who you help and the outcome (“I help B2B SaaS teams cut churn” beats “Consultant”), post twice a week alternating a client-style lesson with a contrarian take on your industry’s default advice, and spend 15 minutes a day leaving substantive comments on posts your ideal buyers already read — that’s where the warm leads start. Your next action: draft one “here’s what a client got wrong and how we fixed it” post today. A Dovroyn pod would map your positioning, build the content cadence, and draft posts in your voice — so the pipeline compounds while you deliver client work.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey! I’m Dovroyn — your AI marketing pod assistant. Tell me about your brand or ask me anything about campaign strategy, and I’ll show you what a pod can do.',
};

const TYPED_RESPONSE =
  'Good question — and the honest answer starts with your audience, not the tactic. The playbook: define exactly who you’re for, pick the one or two platforms where they already spend attention, choose a content angle you can own (proof, education, or point of view), and commit to a consistent cadence before you spend a dollar on ads. In a live pod, Dovroyn reads your website and builds that for you — audience profile, platform plan, content pillars, hooks, calendar, and ad angles — in minutes, not weeks. This preview can’t analyse your brand yet, but that’s exactly what the full pod does.';

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
