import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'For skincare buyers who need proof, routine guidance, and ingredient trust, prioritize Instagram for visual proof and social trust, TikTok for discovery and education, Pinterest for evergreen search, and email for retention. Lead with texture shots, before-and-afters, routine breakdowns, and myth-busting content. A Dovroyn pod would turn your website into the platform plan, content pillars, hooks, calendar, and ad angles.',
    matchers: ['skincare', 'platform', 'platforms', 'pinterest', 'email'],
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Try: 1) "Your 8am reset starts here." 2) "Flaky croissant, serious coffee, no bad mornings." 3) "Meet me where the espresso hits and the corner table feels earned." These work best for locals, commuters, and work-from-cafe regulars, paired with steam shots, pastry pulls, or a cozy table scene. A Dovroyn pod would turn your menu and audience into weekly caption banks, promos, and repeatable content angles.',
    matchers: ['caption', 'captions', 'cafe', 'café', 'coffee'],
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A good TikTok hook stops the scroll in two seconds and promises a payoff your audience cares about. Start with one of these angles: "3 mistakes brands make with...", "I tested this so you do not have to", "Before you buy this, watch this", or "How we got this result without...". Pick one buyer problem, write 10 hook variations around it, and let a Dovroyn pod turn the winners into a repeatable content system.',
    matchers: ['tiktok', 'hook', 'hooks'],
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'On LinkedIn, consultants grow by owning one buyer problem, not by posting generic motivation. Pick one audience like founders, CMOs, or ops leads, post three times a week using teardown, opinion, and mini case-study formats, and spend 20 minutes a day commenting where those buyers already pay attention. A Dovroyn pod would sharpen your positioning, post angles, hooks, and monthly content plan.',
    matchers: ['linkedin', 'consultant'],
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey! I’m Dovroyn — your AI marketing pod preview. Ask about channels, content, hooks, or growth and I’ll give you a direct answer plus what a pod would build next.',
};

const TYPED_RESPONSE =
  'Give me your brand, audience, offer, and growth goal. I’ll point to the right channels, the content angle that fits, and the next move to make. A live Dovroyn pod then turns that into a tailored platform plan, hooks, calendar, and campaign assets from your site.';

const normalizePreviewText = (value) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const resolvePreviewAnswer = (question) => {
  const normalizedQuestion = normalizePreviewText(question);

  const matchedQa = ASSISTANT_QA.find((qa) =>
    qa.matchers.some((matcher) => normalizedQuestion.includes(normalizePreviewText(matcher)))
  );

  return matchedQa?.answer ?? TYPED_RESPONSE;
};

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
    queuePreviewReply(question, resolvePreviewAnswer(question), null);
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
