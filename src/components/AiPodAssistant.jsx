import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'Instagram is your trust engine — ingredient education, before/afters, and UGC build social proof fast. TikTok is your discovery channel — tutorials, founder POVs, and "get ready with me" formats reach new audiences daily. Pinterest drives evergreen search traffic directly to your product pages. Email owns retention — post-purchase sequences and launch drops convert one-time buyers into loyal subscribers.\n\nA Dovroyn pod maps all four into one connected strategy: content pillars, a monthly calendar, hook angles, and paid ad briefs — all pulled from your brand website in minutes.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Three that stop the scroll: "Your 8am ritual, made better. [location]" — steam rising, flat white front and centre. "The table by the window is always free at 7:30." — sells the experience, not the menu. "We don\'t do rushed. Neither should you." — identity-driven, builds community.\n\nStrong café content runs on atmosphere and ritual. A Dovroyn pod builds your full caption library, story prompts, and a weekly content calendar built around your busiest hours and seasonal menu.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'The first two seconds decide everything. Top-performing structures: "I tried [X] for 30 days — here\'s what nobody tells you." / "Stop doing this if you want [outcome]." / "POV: you finally figured out [relatable struggle]." / "The [industry] secret that took me three years to learn."\n\nThe pattern: open a gap between what they know and what they\'re about to find out. A Dovroyn pod generates 30+ hook angles per month, matched to your brand voice, audience pain points, and trending formats.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'Post twice a week: one tactical insight (a framework, a common mistake, a lesson from client work) and one story post (a decision, a result, a turning point). Comment on your ideal buyers\' posts with a real point of view — not "great post." Your headline should name who you help and the outcome you create, not your job title.\n\nMost consultants blend in because they post about their process, not their clients\' problems. A Dovroyn pod builds your content strategy around the exact language your buyers use, so every post speaks directly to them.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: "I'm Dovroyn — your AI marketing pod. Built for founders who want sharp strategy without the agency overhead. Ask me about platforms, content, hooks, or campaigns — or tell me about your brand and I'll show you exactly what a pod can do.",
};

const TYPED_RESPONSE =
  "Good question. A live Dovroyn pod starts by reading your brand website and building your audience profile, platform fit, and content pillars — then gives you specific recommendations grounded in your actual brand, not a generic template. The demo pod shows you exactly what that looks like.";

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
              <div className={`ai-assistant-bubble ai-assistant-bubble-${message.sender}`}>
                {message.text.split('\n\n').map((para, i) => (
                  <p key={i} style={{ margin: i > 0 ? '0.5em 0 0' : '0' }}>{para}</p>
                ))}
              </div>
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
