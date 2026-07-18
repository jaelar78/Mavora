/******  AI POD ASSISTANT — Smart Suggestions & Voice Chat  ******/
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Mic, X, Bot, User, Loader2 } from 'lucide-react';
import { askDovroynAI } from '../lib/aiClient';
import { usePod } from '../pods/PodContext';

const QUICK_PROMPTS = [
  'Write a caption for my next post',
  'What should I post today?',
  'Analyze my latest content performance',
  'Generate hashtag suggestions',
  'Help me plan this week\'s content',
];

export default function AiPodAssistant({ collapsed = false }) {
  const { currentPod } = usePod();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hey! I'm your Dovroyn AI for **${currentPod?.name || 'this pod'}**. Ask me anything about content, strategy, or growth.` },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    try {
      const reply = await askDovroynAI(text, { podId: currentPod?.id });
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'Sorry, I had trouble connecting. Try again?' }]);
    } finally {
      setTyping(false);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-2xl shadow-purple-600/30 flex items-center justify-center hover:scale-110 transition-transform"
        title="AI Assistant"
      >
        <Sparkles size={22} />
      </button>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-2xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all"
      >
        <Sparkles size={18} />
        <span>Ask AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[520px] bg-[#0E0E16] border border-purple-500/20 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-600/20 to-pink-500/10 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-purple-400" />
          <span className="font-semibold text-white text-sm">Dovroyn AI</span>
          <span className="px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 rounded-full">BETA</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-300'}`}>
              {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-purple-500/10 text-gray-200 border border-purple-500/10' : 'bg-gray-700 text-white'}`}>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-purple-500/10 border border-purple-500/10 px-3 py-2 rounded-xl">
              <Loader2 size={16} className="text-purple-400 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick prompts</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-lg hover:bg-purple-500/10 hover:text-purple-300 transition-all border border-gray-800">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-800">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 bg-[#1a1a24] border border-gray-700 rounded-xl px-3 py-2 focus-within:border-purple-500/50 transition-colors"
        >
          <Mic size={16} className="text-gray-500 cursor-pointer hover:text-purple-400 transition-colors" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          />
          <button type="submit" disabled={!input.trim() || typing} className="text-purple-400 hover:text-purple-300 disabled:text-gray-600 transition-colors">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}