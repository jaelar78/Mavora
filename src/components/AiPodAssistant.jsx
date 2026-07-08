import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      'For skincare, run a 4-channel stack: Instagram for visual proof and trust (before/after, UGC, routines), TikTok for discovery and education (ingredient myths, quick demos), Pinterest for evergreen search traffic (skin concerns and routines), and email for retention/repeat purchase (flows + launch drops). Next action: map one message per channel for the next 30 days. A Dovroyn pod can turn your website into the platform plan, content pillars, hooks, calendar, and ad angles automatically.',
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Use caption angles that match café intent: morning ritual, product craving, and local belonging. Try: “Your 8:07 reset: flat white, warm croissant, zero chaos.” “If your coffee needs a personality, start with this pour.” “Your neighborhood table is ready — tag your coffee person.” Platform fit: pair with Reels of steam/pour close-ups and geotags for local reach. Next action: test one angle per day this week and keep the top-saves format. A Dovroyn pod can generate weekly caption banks tied to your menu, offers, and peak hours.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      'A winning TikTok hook earns the first 2 seconds with a specific promise for a specific audience. Best formats: “Stop scrolling if you’re [audience]…”, “3 mistakes killing your [result]…”, “I tested this for 7 days — here’s what changed.” Platform fit: open with outcome first, then proof, then CTA. Next action: script 10 hooks, film 3 variants each, and keep only hooks with strong 3-second hold. A Dovroyn pod can build your hook bank by offer, audience pain point, and funnel stage.',
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      'Grow on LinkedIn with authority + consistency: publish 3 posts/week (one POV, one framework, one client lesson), comment daily where your buyers already engage, and make your headline outcome-led (“I help X achieve Y”). Audience fit: speak to buyer pain in plain language, not theory. Content angle: teach from real work using before/after thinking. Next action: build a 4-week topic map around your core offer. A Dovroyn pod can generate your LinkedIn pillars, post hooks, and weekly publishing cadence from your consulting niche.',
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: 'Hey! I’m Dovroyn — your AI marketing pod assistant. Tell me about your brand or ask me anything about campaign strategy, and I’ll show you what a pod can do.',
};

const TYPED_RESPONSE =
  'Strong question. Start by locking four things: audience segment, platform priority, content angle, and one measurable next action for this week. In a live setup, your Dovroyn pod would analyze your brand source and return a focused plan with channel mix, hooks, calendar, and ad angles — not generic advice.';

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
