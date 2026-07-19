import { useEffect, useState } from 'react';
import Logo from '@/components/dovroyn/Logo';

const links = [
  { label: 'Agencies', href: 'https://dovroyn.com/agency' },
  { label: 'Pricing', href: 'https://dovroyn.com/pricing' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#FAF6EE]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(43,38,32,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-[72px] flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-7 text-[14px] text-[#4a443b]">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-[#A8823F] transition-colors hidden sm:block">
              {l.label}
            </a>
          ))}
          <a
            href="https://dovroyn.com/login"
            className="px-4 py-2 rounded-lg border border-[#e3d9c4] bg-white/70 hover:bg-white transition-colors hidden sm:block"
          >
            Log in
          </a>
          <a
            href="https://dovroyn.com/signup"
            className="px-4 py-2 rounded-lg bg-[#C6A266] text-white font-medium shadow-[0_6px_16px_-6px_rgba(166,134,74,0.6)] hover:bg-[#b8935a] transition-colors"
          >
            Start Free Trial
          </a>
        </nav>
      </div>
    </header>
  );
}
