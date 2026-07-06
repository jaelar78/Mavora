import {
  Bot,
  Palette,
  Share2,
  Sparkles,
  Users,
  Globe2,
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];
const DASHBOARD_HEADING = 'AI Brain';

const BRAND_SWATCHES = [
  { label: 'Gold', color: '#B88A32' },
  { label: 'Black', color: '#111111' },
  { label: 'Ivory', color: '#F7F2E8' },
];

const TONE_CHIPS = ['Luxury', 'Refined', 'Aspirational'];
const AUDIENCE_CHIPS = ['Men 25-55', 'Professionals', 'High intent buyers'];

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
    detail: 'Core luxury palette for creative, campaigns, and landing pages.',
    swatches: BRAND_SWATCHES,
  },
  {
    icon: Bot,
    label: 'Brand Tone',
    detail: 'Editorial voice calibrated for high-value watch buyers.',
    chips: TONE_CHIPS,
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Buyer profile weighted toward professional luxury intent.',
    chips: AUDIENCE_CHIPS,
  },
  {
    icon: Globe2,
    label: 'Geography',
    detail: 'Campaign guidance prepared for global premium demand.',
    value: 'Worldwide',
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Priority channels for authority, discovery, and product storytelling.',
    platforms: PLATFORM_CHIPS,
  },
];

function TesterPodRowValue({ row }) {
  if (row.swatches) {
    return (
      <span className="tester-pod-swatches" aria-label="Gold, black, and ivory brand colours">
        {row.swatches.map((swatch) => (
          <span key={swatch.label} className="tester-pod-swatch-chip">
            <span
              className="tester-pod-swatch"
              style={{ background: swatch.color }}
              aria-hidden="true"
            />
            {swatch.label}
          </span>
        ))}
      </span>
    );
  }

  if (row.platforms) {
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

  if (row.chips) {
    return (
      <span className="tester-pod-value-chips">
        {row.chips.map((chip) => (
          <span key={chip} className="tester-pod-value-chip">
            {chip}
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
        <div>
          <p className="tester-pod-content-kicker">One pod preview</p>
          <h4>{DASHBOARD_HEADING}</h4>
        </div>
        <span className="tester-pod-panel-chip">Brand memory locked</span>
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
                <TesterPodRowValue row={row} />
              </div>
              <p className="tester-pod-row-detail">{row.detail}</p>
              <button type="button" className="tester-pod-row-action">Override</button>
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
      <div className="tester-pod-controls" aria-label="Preview controls">
        <span className="tester-pod-status"><Sparkles size={13} strokeWidth={1.8} />AI Brain Active</span>
        <button type="button" className="tester-pod-style-button">Ready to be styled ✦</button>
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
      {DASHBOARD_NAV_ITEMS.map((item, index) => (
        <span key={item} className={`tester-pod-tab ${index === 0 ? 'active' : ''}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function TesterPodPanel() {
  return (
    <section className="tester-pod-content-panel">
      <TesterPodContent />
    </section>
  );
}

function TesterPodDashboard() {
  return (
    <TesterPodChrome>
      <TesterPodHeader />
      <TesterPodTabs />
      <TesterPodPanel />
    </TesterPodChrome>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="tester-pod-section">
      <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
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
