import { Globe, Palette, Share2, Sparkles, Users } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const DASHBOARD_TABS = [
  'AI Brain',
  'Content Calendar',
  'Platforms',
  'Files',
  'Ad Performance',
  'Budget',
];

const BRAND_SWATCHES = [
  { name: 'Gold', hex: '#C6A15B' },
  { name: 'Black', hex: '#14110B' },
  { name: 'Ivory', hex: '#F4EEDF' },
];

const RECOMMENDED_PLATFORMS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const AI_BRAIN_ROWS = [
  {
    id: 'colours',
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Signature palette pulled from the brand identity.',
    swatches: BRAND_SWATCHES,
  },
  {
    id: 'tone',
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Voice applied across every caption and campaign.',
    chips: ['Luxury', 'Refined', 'Aspirational'],
  },
  {
    id: 'audience',
    icon: Users,
    label: 'Target Audience',
    detail: 'The buyers this pod is built to reach.',
    chips: ['Men 25–55', 'Professionals', 'High intent buyers'],
  },
  {
    id: 'geography',
    icon: Globe,
    label: 'Geography',
    detail: 'Where campaigns are prioritised.',
    value: 'Worldwide',
  },
  {
    id: 'platforms',
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channel mix chosen for this brand.',
    platforms: RECOMMENDED_PLATFORMS,
  },
];

function PodCardHeader() {
  return (
    <header className="pod-card-header">
      <div className="pod-card-brand">
        <span className="pod-card-avatar" aria-hidden="true">M</span>
        <div className="pod-card-brand-text">
          <p className="pod-card-brand-name">House of Magnum</p>
          <p className="pod-card-brand-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="pod-card-header-actions">
        <span className="pod-card-status" role="status">
          <span className="pod-card-status-dot" aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="pod-card-style-button">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </header>
  );
}

function PodCardTabs() {
  return (
    <div className="pod-card-tabs" role="tablist" aria-label="AI pod sections">
      {DASHBOARD_TABS.map((tab, index) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={index === 0}
          className={`pod-card-tab${index === 0 ? ' active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function PodCardRowValue({ row }) {
  if (row.swatches) {
    return (
      <div className="pod-card-swatches" aria-label="Brand colours">
        {row.swatches.map((swatch) => (
          <span key={swatch.name} className="pod-card-swatch">
            <span
              className="pod-card-swatch-chip"
              style={{ backgroundColor: swatch.hex }}
              aria-hidden="true"
            />
            {swatch.name}
          </span>
        ))}
      </div>
    );
  }

  if (row.platforms) {
    return (
      <div className="pod-card-chips" aria-label="Recommended platforms">
        {row.platforms.map(({ label, Icon }) => (
          <span key={label} className="pod-card-chip pod-card-chip-platform">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    );
  }

  if (row.chips) {
    return (
      <div className="pod-card-chips">
        {row.chips.map((chip) => (
          <span key={chip} className="pod-card-chip">{chip}</span>
        ))}
      </div>
    );
  }

  return <p className="pod-card-value">{row.value}</p>;
}

function PodCardBrain() {
  return (
    <div className="pod-card-brain">
      {AI_BRAIN_ROWS.map((row) => {
        const RowIcon = row.icon;
        return (
          <div key={row.id} className="pod-card-row">
            <span className="pod-card-row-icon" aria-hidden="true">
              <RowIcon size={18} strokeWidth={1.8} />
            </span>
            <div className="pod-card-row-body">
              <div className="pod-card-row-heading">
                <span className="pod-card-row-label">{row.label}</span>
                <p className="pod-card-row-detail">{row.detail}</p>
              </div>
              <PodCardRowValue row={row} />
            </div>
            <button type="button" className="pod-card-override">Override</button>
          </div>
        );
      })}
    </div>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="pod-preview-section">
      <p className="eyebrow">One AI Pod · Preview</p>
      <h2 className="section-title">See inside one Dovroyn AI pod.</h2>
      <p className="lede pod-preview-lede">
        A single Dovroyn pod after it studies a brand — its own AI brain, brand memory,
        platform strategy, and next moves in one calm dashboard.
      </p>

      <div className="pod-card" aria-label="House of Magnum AI pod preview">
        <PodCardHeader />
        <PodCardTabs />
        <section className="pod-card-panel" aria-label="AI Brain analysis">
          <PodCardBrain />
        </section>
      </div>

      <div className="pod-preview-cta">
        <button className="button button-primary" onClick={onJoinEarlyAccess}>
          Join Early Access
        </button>
        <p className="pod-preview-note">
          Preview only. Live posting and ad actions require connected accounts and your approval.
        </p>
      </div>
    </section>
  );
}
