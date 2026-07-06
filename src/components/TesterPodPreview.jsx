import {
  Bot,
  Globe2,
  MapPin,
  Palette,
  Share2,
  Users,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const DASHBOARD_NAV_ITEMS = [
  'AI Brain',
  'Content Calendar',
  'Platforms',
  'Files',
  'Ad Performance',
  'Budget',
];

const BRAND_SWATCHES = [
  { label: 'Gold', color: '#B88A32' },
  { label: 'Black', color: '#07162D' },
  { label: 'Ivory', color: '#F7F2E8' },
];

const TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];

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
    detail: 'Palette extracted from product imagery, typography, and brand presence.',
    swatches: BRAND_SWATCHES,
  },
  {
    icon: Bot,
    label: 'Brand Tone',
    detail: 'Voice profile for captions, scripts, ads, and creative direction.',
    chips: TONE_CHIPS,
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Primary buyer profile mapped from offer positioning and purchase intent.',
    value: 'Men 25–55, professionals, high intent buyers',
  },
  {
    icon: MapPin,
    label: 'Geography',
    detail: 'Market reach weighted for global luxury watch demand.',
    value: 'Worldwide',
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channel mix for storytelling, discovery, and high-intent demand.',
    platforms: PLATFORM_CHIPS,
  },
];

function BrandSwatches({ swatches }) {
  return (
    <div className="tester-pod-swatches" aria-label="Brand colour palette">
      {swatches.map((swatch) => (
        <span key={swatch.label} className="tester-pod-swatch-item">
          <span
            className="tester-pod-swatch"
            style={{ backgroundColor: swatch.color }}
            aria-hidden="true"
          />
          <span className="tester-pod-swatch-label">{swatch.label}</span>
        </span>
      ))}
    </div>
  );
}

function ValueChips({ chips }) {
  return (
    <div className="tester-pod-value-chips" aria-label="Brand tone attributes">
      {chips.map((chip) => (
        <span key={chip} className="tester-pod-value-chip">
          {chip}
        </span>
      ))}
    </div>
  );
}

function PlatformChips({ platforms }) {
  return (
    <div className="tester-pod-platforms" aria-label="Recommended platforms">
      {platforms.map(({ label, Icon }) => (
        <span key={label} className="tester-pod-platform-chip">
          <Icon aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}

function TesterPodContent() {
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <div className="tester-pod-content-head-copy">
          <h4>AI Brain analysis</h4>
          <p>Brand intelligence generated from your source material.</p>
        </div>
        <span className="tester-pod-panel-chip">Static preview</span>
      </div>

      <div className="tester-pod-dashboard-list">
        {DASHBOARD_ROWS.map((row) => {
          const RowIcon = row.icon;

          return (
            <div key={row.label} className="tester-pod-dashboard-row">
              <div className="tester-pod-row-leading">
                <span className="tester-pod-row-icon" aria-hidden="true">
                  <RowIcon size={16} strokeWidth={1.85} />
                </span>
                <div className="tester-pod-row-copy">
                  <span className="tester-pod-row-label">{row.label}</span>
                  <p className="tester-pod-row-detail">{row.detail}</p>
                </div>
              </div>

              <div className="tester-pod-row-value-wrap">
                {row.swatches && <BrandSwatches swatches={row.swatches} />}
                {row.chips && <ValueChips chips={row.chips} />}
                {row.platforms && <PlatformChips platforms={row.platforms} />}
                {row.value && <span className="tester-pod-row-value">{row.value}</span>}
              </div>

              <button type="button" className="tester-pod-row-action">
                Override
              </button>
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
        <span className="tester-pod-avatar" aria-hidden="true">
          HM
        </span>
        <div>
          <p className="tester-pod-title">House of Magnum</p>
          <p className="tester-pod-subtitle">Luxury Watches</p>
        </div>
      </div>

      <div className="tester-pod-controls" aria-label="Pod status">
        <span className="tester-pod-status-pill">
          <Globe2 size={12} strokeWidth={2} aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="tester-pod-style-button">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </div>
  );
}

function TesterPodTabs() {
  return (
    <div className="tester-pod-tabs" role="tablist" aria-label="Pod dashboard sections">
      {DASHBOARD_NAV_ITEMS.map((item, index) => (
        <span
          key={item}
          role="tab"
          aria-selected={index === 0}
          className={`tester-pod-tab ${index === 0 ? 'active' : ''}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function TesterPodDashboard() {
  return (
    <div className="tester-pod-card">
      <TesterPodHeader />
      <TesterPodTabs />
      <section className="tester-pod-content-panel" aria-label="AI Brain preview panel">
        <TesterPodContent />
      </section>
    </div>
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
