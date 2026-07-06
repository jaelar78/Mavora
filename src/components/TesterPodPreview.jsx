import {
  Bot,
  MapPin,
  Palette,
  Share2,
  Users,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const TABS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

const BRAND_SWATCHES = [
  { label: 'Gold', hex: '#B88A32' },
  { label: 'Black', hex: '#0A0A0A' },
  { label: 'Ivory', hex: '#F3E9D8' },
];

const BRAND_TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];

const PLATFORM_CHIPS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'YouTube', Icon: FaYoutube },
  { label: 'TikTok', Icon: FaTiktok },
];

const DASHBOARD_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Palette locked into all creative briefs and content.',
    type: 'swatches',
    swatches: BRAND_SWATCHES,
  },
  {
    icon: Bot,
    label: 'Brand Tone',
    detail: 'Voice applied across captions, ads, and copy.',
    type: 'chips',
    chips: BRAND_TONE_CHIPS,
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Primary buyers mapped around high purchase intent.',
    type: 'text',
    value: 'Men 25–55, professionals, high intent buyers',
  },
  {
    icon: MapPin,
    label: 'Geography',
    detail: 'Global audience with no regional restriction.',
    type: 'text',
    value: 'Worldwide',
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channel mix for brand discovery and retargeting.',
    type: 'platforms',
    platforms: PLATFORM_CHIPS,
  },
];

function RowValue({ row }) {
  if (row.type === 'swatches') {
    return (
      <span className="hm-swatches" aria-label="Brand colour swatches">
        {row.swatches.map(({ label, hex }) => (
          <span key={label} className="hm-swatch-item">
            <span className="hm-swatch" style={{ background: hex }} aria-hidden="true" />
            <span className="hm-swatch-label">{label}</span>
          </span>
        ))}
      </span>
    );
  }

  if (row.type === 'chips') {
    return (
      <span className="hm-tone-chips" aria-label="Brand tone descriptors">
        {row.chips.map((chip) => (
          <span key={chip} className="hm-tone-chip">{chip}</span>
        ))}
      </span>
    );
  }

  if (row.type === 'platforms') {
    return (
      <span className="tester-pod-platforms" aria-label="Recommended platforms">
        {row.platforms.map(({ label, Icon }) => (
          <span key={label} className="tester-pod-platform-chip">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </span>
    );
  }

  return <span className="tester-pod-row-value">{row.value}</span>;
}

function TesterPodContent() {
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <h4>AI Brain analysis</h4>
        <span className="tester-pod-panel-chip">Live preview</span>
      </div>
      <div className="tester-pod-dashboard-list">
        {DASHBOARD_ROWS.map((row) => {
          const RowIcon = row.icon;
          return (
            <div key={row.label} className="tester-pod-dashboard-row">
              <span className="tester-pod-row-icon" aria-hidden="true">
                <RowIcon size={14} strokeWidth={1.9} />
              </span>
              <div className="tester-pod-row-main">
                <span className="tester-pod-row-label">{row.label}</span>
                <RowValue row={row} />
              </div>
              <p className="tester-pod-row-detail">{row.detail}</p>
              <span className="tester-pod-row-action">Override</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TesterPodHeader() {
  return (
    <div className="tester-pod-header">
      <div className="tester-pod-header-main">
        <span className="tester-pod-avatar" aria-hidden="true">HM</span>
        <div>
          <p className="tester-pod-title">House of Magnum</p>
          <p className="tester-pod-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="tester-pod-controls" aria-label="Preview controls">
        <span className="hm-active-chip">
          <span className="hm-active-dot" aria-hidden="true" />
          AI Brain Active
        </span>
        <button className="hm-style-btn" type="button">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </div>
  );
}

function TesterPodChrome({ children }) {
  return (
    <div className="tester-pod-card panel">
      <div className="tester-pod-window-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
}

function TesterPodTabs() {
  return (
    <div className="tester-pod-tabs" aria-label="House of Magnum pod sections">
      {TABS.map((item, index) => (
        <span key={item} className={`tester-pod-tab${index === 0 ? ' active' : ''}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function TesterPodDashboard() {
  return (
    <TesterPodChrome>
      <TesterPodHeader />
      <TesterPodTabs />
      <section className="tester-pod-content-panel">
        <TesterPodContent />
      </section>
    </TesterPodChrome>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="tester-pod-section">
      <h2 className="section-title">See one of Dovroyn&apos;s AI pods.</h2>
      <p className="lede">
        This preview shows one dedicated Dovroyn AI pod after it has analysed a brand. Each pod has its own AI brain, brand memory, content calendar, platform strategy, ad view, files, and budget tracker.
      </p>

      <TesterPodDashboard />

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
