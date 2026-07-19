export function Crown({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" fill="none" className={className} aria-hidden>
      <path
        d="M2 15 L1 4 L7 8.5 L12 1.5 L17 8.5 L23 4 L22 15 Z"
        fill="#C6A266"
        stroke="#A8823F"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="1.4" r="1.1" fill="#A8823F" />
      <circle cx="1" cy="3.6" r="1" fill="#A8823F" />
      <circle cx="23" cy="3.6" r="1" fill="#A8823F" />
    </svg>
  );
}

export default function Logo({
  size = 'md',
  href = 'https://dovroyn.com',
}: {
  size?: 'md' | 'lg';
  href?: string;
}) {
  const text = size === 'lg' ? 'text-[34px]' : 'text-[26px]';
  const crown = size === 'lg' ? 'w-5 -top-3 left-[62px]' : 'w-4 -top-2.5 left-[47px]';
  return (
    <a href={href} className="inline-flex items-baseline select-none" aria-label="Dovroyn home">
      <span className={`relative font-serif-display font-medium tracking-[0.02em] text-[#2B2620] ${text}`}>
        dovroyn
        <Crown className={`absolute ${crown}`} />
      </span>
    </a>
  );
}
