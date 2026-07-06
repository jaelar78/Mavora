import {
  Globe2,
  MessageSquareQuote,
  Palette,
  Share2,
  Users,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const POD_TABS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

const COLOUR_SWATCHES = [
  { name: 'Gold', hex: '#B88A32' },
  { name: 'Black', hex: '#101010' },
  { name: 'Ivory', hex: '#F5EFE2' },
];

const TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];

const PLATFORM_CHIPS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const BRAIN_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    explanation: 'Palette extracted from the brand source and locked for every asset.',
    render: () => (
      <span className="pod-preview-swatches" aria-label="Brand colour swatches">
        {COLOUR_SWATCHES.map((swatch) => (
          <span key={swatch.name} className="pod-preview-swatch">
            <i style={{ background: swatch.hex }} aria-hidden="true" />
            {swatch.name}
          </span>
        ))}
      </span>
    ),
  },
  {
    icon: MessageSquareQuote,
    label: 'Brand Tone',
    explanation: 'Voice applied to every caption, ad, and creative brief.',
    render: () => (
      <span className="pod-preview-chips" aria-label="Brand tone">
        {TONE_CHIPS.map((tone) => (
          <span key={tone} className="pod-preview-chip">{tone}</span>
        ))}
      </span>
    ),
  },
  {
    icon: Users,
    label: 'Target Audience',
    explanation: 'Primary buyers mapped from offer, price point, and positioning.',
    render: () => (
      <span className="pod-preview-value">Men 25–55, professionals, high intent buyers</span>
    ),
  },
  {
    icon: Globe2,
    label: 'Geography',
    explanation: 'Market focus shaping calendar timing and campaign reach.',
    render: () => <span className="pod-preview-value">Worldwide</span>,
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    explanation: 'Channel mix chosen for authority, discovery, and demand.',
    render: () => (
      <span className="pod-preview-chips" aria-label="Recommended platforms">
        {PLATFORM_CHIPS.map(({ label, Icon }) => (
          <span key={label} className="pod-preview-chip pod-preview-chip-platform">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </span>
    ),
  },
];

function PodPreviewHeader() {
  return (
    <header className="pod-preview-header">
      <div className="pod-preview-identity">
        <span className="pod-preview-avatar" aria-hidden="true">HM</span>
        <div className="pod-preview-identity-text">
          <p className="pod-preview-brand">House of Magnum</p>
          <p className="pod-preview-brand-sub">Luxury Watches</p>
        </div>
      </div>
      <div className="pod-preview-header-actions">
        <span className="pod-preview-status">
          <i aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="pod-preview-style-button">
          Ready to be styled ✦
        </button>
      </div>
    </header>
  );
}

function PodPreviewTabs() {
  return (
    <nav className="pod-preview-tabs" aria-label="Pod sections">
      <div className="pod-preview-tabs-track">
        {POD_TABS.map((tab, index) => (
          <span key={tab} className={`pod-preview-tab${index === 0 ? ' active' : ''}`}>
            {tab}
          </span>
        ))}
      </div>
    </nav>
  );
}

function PodPreviewRows() {
  return (
    <div className="pod-preview-rows">
      {BRAIN_ROWS.map((row) => {
        const RowIcon = row.icon;
        return (
          <article key={row.label} className="pod-preview-row">
            <span className="pod-preview-row-icon" aria-hidden="true">
              <RowIcon size={16} strokeWidth={1.8} />
            </span>
            <div className="pod-preview-row-body">
              <p className="pod-preview-row-label">{row.label}</p>
              <p className="pod-preview-row-explanation">{row.explanation}</p>
              {row.render()}
            </div>
            <button type="button" className="pod-preview-override">Override</button>
          </article>
        );
      })}
    </div>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="pod-preview-section">
      <p className="eyebrow">Pod Preview</p>
      <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
      <p className="lede pod-preview-lede">
        This is a preview of one Dovroyn AI pod after it has analysed a brand. Each pod carries its own AI brain, brand memory, content calendar, platform strategy, ad view, files, and budget tracker.
      </p>

      <div className="pod-preview-card" aria-label="House of Magnum AI pod preview">
        <PodPreviewHeader />
        <PodPreviewTabs />
        <PodPreviewRows />
      </div>

      <div className="pod-preview-cta">
        <button className="button button-primary" onClick={onJoinEarlyAccess}>
          Join Early Access
        </button>
        <p className="pod-preview-note">
          Static preview only. Live posting and ad actions require connected accounts and user approval.
        </p>
      </div>
    </section>
  );
}
