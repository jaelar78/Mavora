import { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        setDismissed(true);
      }
    };
    const timer = setTimeout(() => {
      setShow(true);
      setDismissed(true);
    }, 45000);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B2620]/45 backdrop-blur-[2px] px-6"
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-[0_40px_90px_-30px_rgba(43,38,32,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#9a8f78] hover:text-[#2B2620] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-[#f6efdd] border border-[#ead9b8]">
          <Sparkles className="w-5 h-5 text-[#A8823F]" />
        </span>
        <h3 className="mt-5 font-serif-display text-[30px] leading-tight text-[#2B2620]">
          Wait — try Dovroyn free for 3 days
        </h3>
        <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-[#6b6255]">
          Get a dedicated AI social media manager for your brand. No charge for 3 days — cancel anytime.
        </p>
        <a
          href="https://dovroyn.com/signup"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#C6A266] py-3.5 text-[15px] font-medium text-white hover:bg-[#b8935a] transition-colors"
        >
          Start my free trial <ArrowRight className="w-4 h-4" />
        </a>
        <p className="mt-3.5 text-[11.5px] text-[#9a8f78]">$89/mo after trial. Cancel before day 3 and pay nothing.</p>
      </div>
    </div>
  );
}
