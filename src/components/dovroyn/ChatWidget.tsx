import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, RotateCcw } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import type { ChatMessage } from '@contracts/chat';
import { Crown } from '@/components/dovroyn/Logo';

const GREETING =
  "Hey! I'm Dovroyn — your AI social media manager. Tell me about your brand or ask me anything about content strategy, and I'll show you what I can do.";

const suggestions = [
  'I run a skincare brand — what platforms should I focus on?',
  'Give me 3 Instagram caption ideas for a café',
  'What makes a good TikTok hook?',
  'How do I grow on LinkedIn as a consultant?',
];

type Msg = { from: 'ai' | 'user'; text: string };

/** Render AI plain-text replies: preserve line breaks & list items */
function AiText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;
        return (
          <p key={i} className="text-[13.5px] leading-relaxed text-[#4a443b]">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-[#f6efdd] border border-[#ead9b8] flex items-center justify-center">
        <Sparkles className="w-3.5 h-3.5 text-[#A8823F]" />
      </span>
      <div className="rounded-2xl rounded-tl-md bg-white border border-[#f0e6d0] px-4 py-3.5 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C6A266] animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Msg[]>([{ from: 'ai', text: GREETING }]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  const sendMutation = trpc.chat.send.useMutation();
  const busy = sendMutation.isPending;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || sendingRef.current || busy) return;
    sendingRef.current = true;
    setError(null);
    setInput('');

    const history: ChatMessage[] = messages
      .filter((m) => m.text !== GREETING)
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    const next: ChatMessage[] = [...history, { role: 'user', content: text }];

    setMessages((m) => [...m, { from: 'user', text }]);

    sendMutation.mutate(
      { messages: next },
      {
        onSuccess: (data) => {
          setMessages((m) => [...m, { from: 'ai', text: data.reply }]);
          sendingRef.current = false;
        },
        onError: (err) => {
          setError(err.message || 'Something went wrong — try again.');
          sendingRef.current = false;
        },
      },
    );
  };

  const reset = () => {
    setMessages([{ from: 'ai', text: GREETING }]);
    setError(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e9ddc3] bg-white shadow-[0_30px_70px_-35px_rgba(43,38,32,0.35)]">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-[#f1e8d5] px-5 py-4">
        <span className="w-10 h-10 rounded-full bg-[#f6efdd] border border-[#ead9b8] flex items-center justify-center">
          <span className="relative font-serif-display text-[19px] leading-none text-[#2B2620]">
            d
            <Crown className="absolute w-2.5 -top-1.5 left-[3px]" />
          </span>
        </span>
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold text-[#2B2620]">Dovroyn</p>
          <p className="text-[11.5px] text-[#9a8f78]">AI Social Media Manager · Preview</p>
        </div>
        <button
          onClick={reset}
          title="Restart conversation"
          className="mr-2 text-[#b3a684] hover:text-[#A8823F] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#4a9d5d]">
          <span className="pulse-dot w-2 h-2 rounded-full bg-[#4a9d5d]" /> Online
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="h-[340px] overflow-y-auto px-5 py-5 space-y-3.5 bg-[#fdfbf5]">
        {messages.map((m, i) =>
          m.from === 'ai' ? (
            <div key={i} className="flex gap-2.5">
              <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-[#f6efdd] border border-[#ead9b8] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#A8823F]" />
              </span>
              <div className="rounded-2xl rounded-tl-md bg-white border border-[#f0e6d0] px-4 py-3 max-w-[85%]">
                <AiText text={m.text} />
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <p className="rounded-2xl rounded-tr-md bg-[#C6A266] px-4 py-3 text-[13.5px] leading-relaxed text-white max-w-[85%]">
                {m.text}
              </p>
            </div>
          ),
        )}
        {busy && <TypingDots />}
        {error && (
          <p className="text-center text-[12px] text-[#b0563f] bg-[#fbf0ec] border border-[#f0d5cc] rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </div>

      {/* suggestion chips */}
      <div className="flex flex-wrap gap-2 px-5 pt-4 bg-[#fdfbf5]">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={busy}
            className="rounded-full border border-[#e7dcc3] bg-white px-3.5 py-1.5 text-[12px] text-[#8a6f35] hover:bg-[#fbf6ea] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <div className="flex items-center gap-2.5 px-5 py-4 bg-[#fdfbf5]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Ask Dovroyn anything about social media…"
          maxLength={1200}
          className="flex-1 rounded-xl border border-[#e7dcc3] bg-white px-4 py-3 text-[13.5px] text-[#2B2620] placeholder:text-[#b3a684] outline-none focus:border-[#C6A266]"
        />
        <button
          onClick={() => send(input)}
          disabled={busy || !input.trim()}
          aria-label="Send"
          className="w-11 h-11 rounded-full bg-[#C6A266] text-white flex items-center justify-center hover:bg-[#b8935a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
