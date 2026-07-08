import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'I run a skincare brand — what platforms should I focus on?',
    answer:
      "Instagram is your visual proof engine — before/afters, ingredient breakdowns, and UGC build the social trust that converts browsers into buyers. TikTok is your discovery channel; educational hooks and skin-concern tutorials drive organic reach to cold audiences fast. Pinterest is evergreen — product-linked pins around skin conditions generate search traffic for months with minimal upkeep. Email is where you own the relationship — segment by skin type, trigger flows after first purchase, and turn one-time buyers into loyal customers.\n\nA Dovroyn pod takes your brand website and returns your full platform plan, content pillars, hook library, posting calendar, and ad angles — built around your specific audience and offer.",
  },
  {
    question: 'Give me 3 Instagram caption ideas for a café',
    answer:
      'Here are three angles built to perform:\n\n"Your 8am ritual, made golden." — sells the feeling, not just the coffee. Pair with a close-up latte art or steam shot.\n\n"We made 40 of these today. There are never leftovers." — limited supply creates urgency without discounting.\n\n"The table by the window is yours. Get here before 9." — builds belonging; regulars share posts like this.\n\nA Dovroyn pod builds your full monthly caption bank with hooks, hashtag sets, and a content calendar mapped to your busiest trading days.',
  },
  {
    question: 'What makes a good TikTok hook?',
    answer:
      "The first 2 seconds decide everything. Four patterns that consistently work:\n\nProblem-first: \"If your posts get zero engagement, watch this.\" — leads with pain, earns the watch.\n\nContrarian: \"Stop using trending audio. Here's why it's hurting your reach.\" — challenges a common belief.\n\nResult-led: \"We grew this brand from 0 to 12k followers in 6 weeks — here's every video we posted.\" — proof upfront, curiosity earned.\n\nPattern interrupt: start mid-sentence, mid-action, or with a visual that doesn't match expectations.\n\nA Dovroyn pod generates hook frameworks specific to your niche, audience, and offer — not generic templates you've already seen.",
  },
  {
    question: 'How do I grow on LinkedIn as a consultant?',
    answer:
      "LinkedIn rewards specificity and consistency. Here's what actually moves the needle:\n\nPost twice a week — one insight post (a lesson from client work, no names) and one opinion post (a sharp take on your industry). Keep both under 150 words.\n\nComment strategically — 15 minutes a day on posts by your ideal clients. Thoughtful, specific comments are free visibility to exactly the audience you want.\n\nFix your headline — it shouldn't be your job title. It should name who you help and the outcome you deliver. \"I help B2B founders turn dead pipelines into booked calls\" outperforms \"Independent Consultant\" every time.\n\nA Dovroyn pod builds your content pillars, post templates, hook library, and 30-day calendar — so you show up consistently without staring at a blank page.",
  },
];

const INTRO_MESSAGE = {
  id: 'intro',
  sender: 'assistant',
  text: "Hey — I'm Dovroyn, your AI marketing pod. I give real answers on platform strategy, content hooks, audience positioning, and campaign angles. Try a suggested question below, or ask me about your brand.",
};

const TYPED_RESPONSE =
  "Good brief. In a live Dovroyn pod, I'd pull your brand website, map your audience by intent and purchase stage, audit your current platforms, and return a full strategy — platform priorities, content pillars, hook frameworks, a 30-day calendar, and ad angles — in one session. Tell me more about your brand and I'll show you exactly what that looks like.";

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
