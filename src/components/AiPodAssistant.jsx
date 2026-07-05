import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const ASSISTANT_QA = [
  {
    question: 'What should Gidgee post this week?',
    answer: {
      lead: 'This week, lean into styling content that shows the hats in real Australian moments.',
      points: [
        'Monday — styling reel: one hat, three looks (paddock, festival, weekend).',
        'Wednesday — behind-the-brand story post on craftsmanship and materials.',
        'Friday — community prompt: ask followers where their Gidgee hat has travelled.',
      ],
      closing: 'Keep the tone earthy and confident, and reuse the reel as a TikTok cut.',
    },
  },
  {
    question: 'Which platforms should this brand focus on?',
    answer: {
      lead: 'Gidgee & Co’s audience lives where western and country lifestyle content already performs.',
      points: [
        'Instagram — primary channel for styling reels, carousels, and brand story.',
        'TikTok — short-form styling and rodeo/festival culture content for reach.',
        'Pinterest — evergreen western style boards that drive steady product discovery.',
      ],
      closing: 'Facebook can support retargeting later; keep effort focused on these three first.',
    },
  },
  {
    question: 'Give me 3 campaign angles.',
    answer: {
      lead: 'Three angles that fit Gidgee & Co’s heritage-meets-modern positioning:',
      points: [
        '“Paddock to festival” — one hat that works across real Australian life.',
        '“Crafted, not costume” — quality and heritage over fast-fashion western wear.',
        '“Wild at heart” — community stories from rodeo, festival, and outback moments.',
      ],
      closing: 'Start with the first angle — it doubles as a content series and an ad hook.',
    },
  },
  {
    question: 'What offer should we test first?',
    answer: {
      lead: 'Test a limited first-drop offer before discounting anything.',
      points: [
        'Early access to the launch drop for email and social community members.',
        'Bundle a hat care kit with the first 50 orders instead of cutting price.',
        'Frame it as scarcity and craftsmanship — small batch, built to last seasons.',
      ],
      closing: 'This protects the premium positioning while still creating launch urgency.',
    },
  },
  {
    question: 'What is the next best marketing move?',
    answer: {
      lead: 'Lock in the launch story before spending on ads.',
      points: [
        'Publish the brand story reel — it becomes the anchor for every retarget.',
        'Set up the 4-step funnel: story reel → styling carousel → drop offer → retarget.',
        'Collect early-access signups now so launch week starts with a warm audience.',
      ],
      closing: 'Once the story reel is live, a small Instagram boost is the next smart spend.',
    },
  },
];

export default function AiPodAssistant() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [thinking, setThinking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleAsk = (index) => {
    if (index === activeIndex && !thinking) return;
    clearTimeout(timerRef.current);
    setActiveIndex(index);
    setThinking(true);
    timerRef.current = setTimeout(() => setThinking(false), 650);
  };

  const active = activeIndex !== null ? ASSISTANT_QA[activeIndex] : null;

  return (
    <section className="ai-assistant-section">
      <p className="eyebrow">Pod Assistant Preview</p>
      <h2 className="section-title">Ask your pod what to do next.</h2>
      <p className="lede ai-assistant-lede">
        Dovroyn helps turn brand confusion into clear campaign moves. Ask a pod about content,
        platforms, offers, ads, or next steps.
      </p>

      <div className="panel ai-assistant-card">
        <div className="ai-assistant-header">
          <span className="ai-assistant-orb" aria-hidden="true">
            <span className="ai-assistant-orb-ring" />
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <div>
            <p className="ai-assistant-name">Gidgee & Co Pod</p>
            <p className="ai-assistant-status">Pod guide ready — try a question below</p>
          </div>
        </div>

        <div className="ai-assistant-questions" role="group" aria-label="Suggested questions">
          {ASSISTANT_QA.map((qa, index) => (
            <button
              key={qa.question}
              type="button"
              className={`ai-assistant-question${activeIndex === index ? ' active' : ''}`}
              onClick={() => handleAsk(index)}
              aria-pressed={activeIndex === index}
            >
              {qa.question}
            </button>
          ))}
        </div>

        <div className="ai-assistant-answer-area" aria-live="polite">
          {active === null ? (
            <p className="ai-assistant-placeholder">
              Select a question to see how a Dovroyn pod answers.
            </p>
          ) : thinking ? (
            <div className="ai-assistant-thinking" role="status">
              <span className="ai-assistant-dot" />
              <span className="ai-assistant-dot" />
              <span className="ai-assistant-dot" />
              <span className="ai-assistant-thinking-label">Pod is thinking…</span>
            </div>
          ) : (
            <div className="ai-assistant-answer" key={activeIndex}>
              <p className="ai-assistant-answer-lead">{active.answer.lead}</p>
              <ul className="ai-assistant-answer-points">
                {active.answer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="ai-assistant-answer-closing">{active.answer.closing}</p>
            </div>
          )}
        </div>

        <p className="ai-assistant-note">
          Sample answers for preview only. Live pods generate answers from your own brand, offer, and campaign data.
        </p>
      </div>
    </section>
  );
}
