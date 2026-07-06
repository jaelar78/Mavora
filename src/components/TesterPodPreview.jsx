import { Globe2, Palette, Share2, Sparkles, Users } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

const DASHBOARD_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Core palette locked across landing pages, paid creative, and packaging moments.',
    type: 'swatches',
    items: [
      { label: 'Gold', color: '#B88A32', textColor: '#FFFDF8' },
      { label: 'Black', color: '#07162D', textColor: '#FFFDF8' },
      { label: 'Ivory', color: '#F7F2E8', textColor: '#07162D' },
    ],
  },
  {
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Prompt guidance keeps every caption, script, and ad variation elevated.',
    type: 'chips',
    items: ['Luxury', 'Refined', 'Aspirational'],
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'High-value buyer segments are prioritised for messaging, offers, and spend.',
    type: 'chips',
    items: ['Men 25–55', 'Professionals', 'High intent buyers'],
  },
  {
    icon: Globe2,
    label: 'Geography',
    detail: 'Creative and offer recommendations stay broad enough for international demand.',
    type: 'chips',
    items: ['Worldwide'],
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channel mix selected for executive audiences, visual storytelling, and watch intent.',
    type: 'platforms',
    items: [
      { label: 'LinkedIn', Icon: FaLinkedinIn },
      { label: 'Instagram', Icon: FaInstagram },
      { label: 'YouTube', Icon: FaYoutube },
      { label: 'TikTok', Icon: FaTiktok },
    ],
  },
];

function RowValues({ row }) {
  if (row.type === 'swatches') {
    return (
      <div className="tester-pod-row-values" aria-label={`${row.label} values`}>
        {row.items.map((item) => (
          <span key={item.label} className="tester-pod-swatch-chip">
            <span
              className="tester-pod-swatch-dot"
              style={{ backgroundColor: item.color, color: item.textColor }}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </div>
    );
  }

  if (row.type === 'platforms') {
    return (
      <div className="tester-pod-row-values tester-pod-platforms" aria-label={`${row.label} values`}>
        {row.items.map(({ label, Icon }) => (
          <span key={label} className="tester-pod-platform-chip">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="tester-pod-row-values" aria-label={`${row.label} values`}>
      {row.items.map((item) => (
        <span key={item} className="tester-pod-value-chip">
          {item}
        </span>
      ))}
    </div>
  );
}

function TesterPodContent() {
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <div>
          <p className="tester-pod-panel-label">AI Brain snapshot</p>
          <h4>Brand foundations are aligned and ready for execution.</h4>
        </div>
        <span className="tester-pod-panel-chip">Premium pod preview</span>
      </div>

      <div className="tester-pod-dashboard-list">
        {DASHBOARD_ROWS.map((row) => {
          const RowIcon = row.icon;

          return (
            <article key={row.label} className="tester-pod-dashboard-row">
              <div className="tester-pod-row-top">
                <div className="tester-pod-row-head">
                  <span className="tester-pod-row-icon" aria-hidden="true">
                    <RowIcon size={18} strokeWidth={1.9} />
                  </span>
                  <div className="tester-pod-row-copy">
                    <span className="tester-pod-row-label">{row.label}</span>
                    <p className="tester-pod-row-detail">{row.detail}</p>
                  </div>
                </div>
                <button type="button" className="tester-pod-row-action">
                  Override
                </button>
              </div>

              <RowValues row={row} />
            </article>
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
          <span className="tester-pod-avatar-mark">HM</span>
        </span>
        <div className="tester-pod-brand-copy">
          <p className="tester-pod-overline">Dovroyn AI pod</p>
          <p className="tester-pod-title">House of Magnum</p>
          <p className="tester-pod-subtitle">Luxury Watches</p>
        </div>
      </div>

      <div className="tester-pod-controls" aria-label="Preview controls">
        <span className="tester-pod-status-pill">
          <span aria-hidden="true" />
          AI Brain Active
        </span>
        <button type="button" className="tester-pod-style-button">
          Ready to be styled <span aria-hidden="true">✦</span>
        </button>
      </div>
    </div>
  );
}

function TesterPodChrome({ children }) {
  return <div className="tester-pod-card">{children}</div>;
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
      <h2 className="section-title">Preview one Dovroyn AI pod.</h2>
      <p className="lede">
        This is a single-brand preview of how one Dovroyn pod captures brand memory, audience direction,
        platform priorities, files, performance views, and budget controls in one polished workspace.
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
