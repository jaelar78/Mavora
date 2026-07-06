import { Brain, Globe2, Palette, Share2, Sparkles, Users } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const POD_TABS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

const BRAND_SWATCHES = [
  { label: 'Gold', color: '#B88A32' },
  { label: 'Black', color: '#0B0B0C' },
  { label: 'Ivory', color: '#F6EEDD' },
];

const BRAND_TONE = ['Luxury', 'Refined', 'Aspirational'];

const AUDIENCE_CHIPS = ['Men 25–55', 'Professionals', 'High-intent buyers'];

const PLATFORM_CHIPS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const AI_BRAIN_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    detail: 'The signature palette the pod applies across every creative.',
    kind: 'swatches',
  },
  {
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'The voice guiding captions, ads, and campaign copy.',
    kind: 'chips',
    chips: BRAND_TONE,
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Who the pod prioritises for reach and conversion.',
    kind: 'chips',
    chips: AUDIENCE_CHIPS,
  },
  {
    icon: Globe2,
    label: 'Geography',
    detail: 'The markets weighted for distribution and spend.',
    kind: 'value',
    value: 'Worldwide',
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'The channel mix mapped for this brand’s growth.',
    kind: 'platforms',
  },
];

function RowValue({ row }) {
  if (row.kind === 'swatches') {
    return (
      <span className="mpod-swatches" aria-label="Brand colours">
        {BRAND_SWATCHES.map(({ label, color }) => (
          <span key={label} className="mpod-swatch">
            <span className="mpod-swatch-dot" style={{ background: color }} aria-hidden="true" />
            {label}
          </span>
        ))}
      </span>
    );
  }

  if (row.kind === 'platforms') {
    return (
      <span className="mpod-chips" aria-label="Recommended platforms">
        {PLATFORM_CHIPS.map(({ label, Icon }) => (
          <span key={label} className="mpod-chip mpod-chip-platform">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </span>
    );
  }

  if (row.kind === 'chips') {
    return (
      <span className="mpod-chips">
        {row.chips.map((chip) => (
          <span key={chip} className="mpod-chip">
            {chip}
          </span>
        ))}
      </span>
    );
  }

  return <span className="mpod-value">{row.value}</span>;
}

function PodHeader() {
  return (
    <header className="mpod-header">
      <div className="mpod-brand">
        <span className="mpod-avatar" aria-hidden="true">
          M
        </span>
        <div className="mpod-brand-meta">
          <p className="mpod-brand-name">House of Magnum</p>
          <p className="mpod-brand-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="mpod-header-actions">
        <span className="mpod-status">
          <span className="mpod-status-dot" aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="mpod-style-btn">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </header>
  );
}

function PodTabs() {
  return (
    <nav className="mpod-tabs" aria-label="Pod sections">
      {POD_TABS.map((tab, index) => (
        <span key={tab} className={`mpod-tab${index === 0 ? ' active' : ''}`}>
          {tab}
        </span>
      ))}
    </nav>
  );
}

function PodBrainPanel() {
  return (
    <section className="mpod-panel" aria-label="AI Brain analysis">
      <div className="mpod-panel-head">
        <span className="mpod-panel-icon" aria-hidden="true">
          <Brain size={16} strokeWidth={1.9} />
        </span>
        <div className="mpod-panel-head-text">
          <h3 className="mpod-panel-title">AI Brain</h3>
          <p className="mpod-panel-subtitle">What this pod has learned about the brand.</p>
        </div>
      </div>

      <ul className="mpod-rows">
        {AI_BRAIN_ROWS.map((row) => {
          const RowIcon = row.icon;
          return (
            <li key={row.label} className="mpod-row">
              <span className="mpod-row-icon" aria-hidden="true">
                <RowIcon size={16} strokeWidth={1.9} />
              </span>
              <div className="mpod-row-body">
                <span className="mpod-row-label">{row.label}</span>
                <p className="mpod-row-detail">{row.detail}</p>
                <RowValue row={row} />
              </div>
              <button type="button" className="mpod-row-override">
                Override
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="tester-pod-section">
      <p className="eyebrow">AI Marketing Pod · Preview</p>
      <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
      <p className="lede">
        This is a preview of one dedicated Dovroyn AI pod after it has studied a brand. Each pod carries its own AI
        brain, brand memory, content calendar, platform strategy, ad view, files, and budget tracker.
      </p>

      <div className="mpod-card">
        <PodHeader />
        <PodTabs />
        <PodBrainPanel />
      </div>

      <div className="tester-pod-cta">
        <button className="button button-primary" onClick={onJoinEarlyAccess}>
          Join Early Access
        </button>
        <p className="tester-pod-note">
          This is a preview. Live posting and ad actions require connected accounts and user approval.
        </p>
      </div>
    </section>
  );
}
