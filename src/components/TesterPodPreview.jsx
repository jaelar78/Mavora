import {
  Globe2,
  Palette,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
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
  { label: 'Gold', hex: '#B88A32' },
  { label: 'Black', hex: '#07162D' },
  { label: 'Ivory', hex: '#F1E7D3' },
];

const BRAND_TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];

const RECOMMENDED_PLATFORMS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const AI_BRAIN_ROWS = [
  {
    key: 'brand-colours',
    icon: Palette,
    label: 'Brand Colours',
    detail: 'The palette the pod uses across every campaign asset.',
    render: () => (
      <div className="pod-preview-swatches" aria-label="Brand colours">
        {BRAND_SWATCHES.map((swatch) => (
          <span key={swatch.label} className="pod-preview-swatch">
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
    key: 'brand-tone',
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'How the pod writes captions, ads, and creative briefs.',
    render: () => (
      <div className="pod-preview-chips" aria-label="Brand tone">
        {BRAND_TONE_CHIPS.map((chip) => (
          <span key={chip} className="pod-preview-chip">
            {chip}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: 'target-audience',
    icon: Users,
    label: 'Target Audience',
    detail: 'The buyer the pod optimises every campaign around.',
    render: () => (
      <p className="pod-preview-value">
        Men 25–55 · Professionals · High-intent buyers
      </p>
    ),
  },
  {
    key: 'geography',
    icon: Globe2,
    label: 'Geography',
    detail: 'Where the pod focuses reach and paid distribution.',
    render: () => <p className="pod-preview-value">Worldwide</p>,
  },
  {
    key: 'recommended-platforms',
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'The channel mix the pod prioritises for this brand.',
    render: () => (
      <div className="pod-preview-chips" aria-label="Recommended platforms">
        {RECOMMENDED_PLATFORMS.map(({ label, Icon }) => (
          <span key={label} className="pod-preview-chip pod-preview-chip-icon">
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
        <span className="pod-preview-avatar" aria-hidden="true">
          H
        </span>
        <div className="pod-preview-brand-text">
          <p className="pod-preview-brand-name">House of Magnum</p>
          <p className="pod-preview-brand-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="pod-preview-header-meta">
        <span className="pod-preview-status" aria-label="AI Brain Active">
          <span className="pod-preview-status-dot" aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="pod-preview-header-cta">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </header>
  );
}

function PodPreviewTabs() {
  return (
    <nav className="pod-preview-tabs" aria-label="Pod sections">
      <div className="pod-preview-tabs-track">
        {DASHBOARD_TABS.map((tab, index) => (
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
  const RowIcon = row.icon;
  return (
    <article className="pod-preview-row">
      <div className="pod-preview-row-heading">
        <span className="pod-preview-row-icon" aria-hidden="true">
          <RowIcon size={16} strokeWidth={1.8} />
        </span>
        <div className="pod-preview-row-titles">
          <p className="pod-preview-row-label">{row.label}</p>
          <p className="pod-preview-row-detail">{row.detail}</p>
        </div>
        <button type="button" className="pod-preview-override">
          Override
        </button>
      </div>
      <div className="pod-preview-row-value-wrap">{row.render()}</div>
    </article>
  );
}

function PodPreviewBody() {
  return (
    <div className="pod-preview-body">
      <div className="pod-preview-body-head">
        <h3 className="pod-preview-body-title">AI Brain</h3>
        <p className="pod-preview-body-lede">
          What the pod has learned about this brand.
        </p>
      </div>
      <div className="pod-preview-rows">
        {AI_BRAIN_ROWS.map((row) => (
          <PodPreviewRow key={row.key} row={row} />
        ))}
      </div>
    </div>
  );
}

function PodPreviewCard() {
  return (
    <div className="pod-preview-card" role="group" aria-label="House of Magnum AI marketing pod preview">
      <PodPreviewHeader />
      <PodPreviewTabs />
      <PodPreviewBody />
    </div>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="pod-preview-section">
      <div className="pod-preview-section-head">
        <p className="eyebrow">AI Marketing Pod · Preview</p>
        <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
        <p className="lede pod-preview-section-lede">
          A single Dovroyn AI pod after it has analysed a brand. Each pod has its own AI brain, brand memory, content calendar, platform strategy, ad view, files, and budget tracker.
        </p>
      </div>

      <PodPreviewCard />

      <div className="pod-preview-cta">
        <button className="button button-primary" onClick={onJoinEarlyAccess}>
          Join Early Access
        </button>
        <p className="pod-preview-note">
          Preview only. Live posting and ad actions require connected accounts and user approval.
        </p>
      </div>
    </section>
  );
}
