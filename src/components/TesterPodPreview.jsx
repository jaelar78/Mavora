import {
  Globe2,
  Palette,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa6';

const TABS = [
  'AI Brain',
  'Content Calendar',
  'Platforms',
  'Files',
  'Ad Performance',
  'Budget',
];

const BRAND_SWATCHES = [
  { label: 'Gold', hex: '#B88A32' },
  { label: 'Black', hex: '#0B0B0B' },
  { label: 'Ivory', hex: '#F3EAD5' },
];

const BRAND_TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];

const PLATFORM_CHIPS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const ROWS = [
  {
    id: 'colours',
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Signature palette locked from brand review.',
    render: () => (
      <div className="pod-preview-swatches" aria-label="Brand palette">
        {BRAND_SWATCHES.map((swatch) => (
          <span key={swatch.hex} className="pod-preview-swatch" title={`${swatch.label} · ${swatch.hex}`}>
            <span
              className="pod-preview-swatch-dot"
              style={{ background: swatch.hex }}
              aria-hidden="true"
            />
            <span className="pod-preview-swatch-label">{swatch.label}</span>
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 'tone',
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Voice tuned for aspirational luxury audiences.',
    render: () => (
      <div className="pod-preview-chips" aria-label="Brand tone">
        {BRAND_TONE_CHIPS.map((tone) => (
          <span key={tone} className="pod-preview-chip">{tone}</span>
        ))}
      </div>
    ),
  },
  {
    id: 'audience',
    icon: Users,
    label: 'Target Audience',
    detail: 'Buyers with intent, budget, and taste.',
    render: () => (
      <p className="pod-preview-row-value">
        Men 25–55 · Professionals · High intent buyers
      </p>
    ),
  },
  {
    id: 'geography',
    icon: Globe2,
    label: 'Geography',
    detail: 'Global reach with premium market weighting.',
    render: () => <p className="pod-preview-row-value">Worldwide</p>,
  },
  {
    id: 'platforms',
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channels chosen for prestige and reach.',
    render: () => (
      <div className="pod-preview-platforms" aria-label="Recommended platforms">
        {PLATFORM_CHIPS.map(({ label, Icon }) => (
          <span key={label} className="pod-preview-platform-chip">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    ),
  },
];

function PodPreviewHeader() {
  return (
    <header className="pod-preview-header">
      <div className="pod-preview-brand">
        <span className="pod-preview-avatar" aria-hidden="true">H</span>
        <div className="pod-preview-brand-copy">
          <p className="pod-preview-brand-name">House of Magnum</p>
          <p className="pod-preview-brand-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="pod-preview-header-actions">
        <span className="pod-preview-status" role="status">
          <span className="pod-preview-status-dot" aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="pod-preview-header-cta">
          Ready to be styled
          <span className="pod-preview-header-cta-glyph" aria-hidden="true">✦</span>
        </button>
      </div>
    </header>
  );
}

function PodPreviewTabs() {
  return (
    <nav className="pod-preview-tabs" aria-label="Pod sections">
      <div className="pod-preview-tabs-track">
        {TABS.map((tab, index) => (
          <span
            key={tab}
            className={`pod-preview-tab${index === 0 ? ' is-active' : ''}`}
          >
            {tab}
          </span>
        ))}
      </div>
    </nav>
  );
}

function PodPreviewRow({ row }) {
  const Icon = row.icon;
  return (
    <li className="pod-preview-row">
      <span className="pod-preview-row-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div className="pod-preview-row-body">
        <p className="pod-preview-row-label">{row.label}</p>
        <p className="pod-preview-row-detail">{row.detail}</p>
        <div className="pod-preview-row-content">{row.render()}</div>
      </div>
      <button type="button" className="pod-preview-row-override">
        Override
      </button>
    </li>
  );
}

function PodPreviewCard() {
  return (
    <article className="pod-preview-card" aria-label="House of Magnum AI marketing pod preview">
      <PodPreviewHeader />
      <PodPreviewTabs />
      <div className="pod-preview-panel">
        <ul className="pod-preview-rows">
          {ROWS.map((row) => (
            <PodPreviewRow key={row.id} row={row} />
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="pod-preview-section">
      <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
      <p className="lede pod-preview-lede">
        This is a preview of one Dovroyn AI pod after it has learned a brand. Each pod carries its own AI brain, brand memory, content calendar, platforms, ad view, files, and budget.
      </p>

      <PodPreviewCard />

      <div className="pod-preview-footer">
        <button type="button" className="button button-primary" onClick={onJoinEarlyAccess}>
          Join Early Access
        </button>
        <p className="pod-preview-note">
          Preview only. Live posting and ad actions require connected accounts and user approval.
        </p>
      </div>
    </section>
  );
}
