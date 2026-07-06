import { Globe, Palette, Share2, Sparkles, Users } from 'lucide-react';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];
const DASHBOARD_HEADING = 'AI Brain';

const DASHBOARD_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Visual hierarchy locked for premium creative direction.',
    swatches: [
      { name: 'Gold', color: '#C8A561' },
      { name: 'Black', color: '#111318' },
      { name: 'Ivory', color: '#F5EEE0' },
    ],
  },
  {
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Applied to briefs, copy, and campaign messaging.',
    chips: ['Luxury', 'Refined', 'Aspirational'],
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Primary buyers prioritised for high intent conversions.',
    chips: ['Men 25–55', 'Professionals', 'High intent buyers'],
  },
  {
    icon: Globe,
    label: 'Geography',
    detail: 'Campaign recommendations localised by market signals.',
    chips: ['Worldwide'],
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Priority channels selected from audience behavior data.',
    chips: ['LinkedIn', 'Instagram', 'YouTube', 'TikTok'],
  },
];

function PodRowValues({ row }) {
  if (row.swatches) {
    return (
      <div className="tester-pod-swatches" aria-label={`${row.label} swatches`}>
        {row.swatches.map((swatch) => (
          <span key={swatch.name} className="tester-pod-swatch-chip">
            <span
              className="tester-pod-swatch-dot"
              style={{ backgroundColor: swatch.color }}
              aria-hidden="true"
            />
            {swatch.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="tester-pod-chips" aria-label={`${row.label} values`}>
      {row.chips?.map((chip) => (
        <span key={chip} className="tester-pod-value-chip">
          {chip}
        </span>
      ))}
    </div>
  );
}

function TesterPodContent() {
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <h4>{DASHBOARD_HEADING}</h4>
        <span className="tester-pod-panel-chip">Single pod preview</span>
      </div>
      <div className="tester-pod-dashboard-list">
        {DASHBOARD_ROWS.map((row) => {
          const RowIcon = row.icon;

          return (
            <article key={row.label} className="tester-pod-dashboard-row">
              <span className="tester-pod-row-icon" aria-hidden="true">
                <RowIcon size={15} strokeWidth={1.9} />
              </span>
              <div className="tester-pod-row-copy">
                <span className="tester-pod-row-label">{row.label}</span>
                <p className="tester-pod-row-detail">{row.detail}</p>
              </div>
              <PodRowValues row={row} />
              <button type="button" className="tester-pod-row-action">
                Override
              </button>
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
          HM
        </span>
        <div>
          <p className="tester-pod-title">House of Magnum</p>
          <p className="tester-pod-subtitle">Luxury Watches</p>
        </div>
      </div>
      <div className="tester-pod-controls" aria-label="Preview controls">
        <span className="tester-pod-status-pill">AI Brain Active</span>
        <button type="button" className="tester-pod-style-button">
          Ready to be styled ✦
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
        This preview shows one dedicated Dovroyn AI pod after it has analysed a luxury brand. The card below is a focused single-pod dashboard view with AI brain insights, platform direction, files, ad performance, and budget context.
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
