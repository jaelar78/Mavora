import { MapPinned, Palette, Share2, Sparkles, Users } from 'lucide-react';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

const DASHBOARD_ROWS = [
  {
    icon: Palette,
    label: 'Brand Colours',
    detail: 'Primary palette used across templates, creative direction, and ad assets.',
    type: 'swatches',
    swatches: [
      { label: 'Gold', color: '#B88A32' },
      { label: 'Black', color: '#101214' },
      { label: 'Ivory', color: '#F6F2E8' },
    ],
  },
  {
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Voice profile applied to copy, hooks, captions, and campaign prompts.',
    type: 'chips',
    chips: ['Luxury', 'Refined', 'Aspirational'],
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'Core persona for high-conversion messaging and precision targeting.',
    value: 'Men 25–55, professionals, high intent buyers',
  },
  {
    icon: MapPinned,
    label: 'Geography',
    detail: 'Distribution and performance strategy optimised for global demand.',
    value: 'Worldwide',
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Channel mix weighted for visibility, trust, and conversion outcomes.',
    type: 'chips',
    chips: ['LinkedIn', 'Instagram', 'YouTube', 'TikTok'],
  },
];

function RowValue({ row }) {
  if (row.type === 'swatches') {
    return (
      <span className="tester-pod-swatches" aria-label="Brand colour swatches">
        {row.swatches.map((swatch) => (
          <span key={swatch.label} className="tester-pod-swatch-item">
            <span
              className="tester-pod-swatch-dot"
              style={{ backgroundColor: swatch.color }}
              aria-hidden="true"
            />
            <span>{swatch.label}</span>
          </span>
        ))}
      </span>
    );
  }

  if (row.type === 'chips') {
    return (
      <span className="tester-pod-row-chips" aria-label={`${row.label} values`}>
        {row.chips.map((chip) => (
          <span key={chip} className="tester-pod-chip">
            {chip}
          </span>
        ))}
      </span>
    );
  }

  return <span className="tester-pod-row-value">{row.value}</span>;
}

function TesterPodDashboard() {
  return (
    <div className="tester-pod-card" aria-label="House of Magnum AI pod preview">
      <header className="tester-pod-header">
        <div className="tester-pod-header-main">
          <span className="tester-pod-avatar" aria-hidden="true">
            HM
          </span>
          <div>
            <p className="tester-pod-title">House of Magnum</p>
            <p className="tester-pod-subtitle">Luxury Watches</p>
          </div>
        </div>
        <div className="tester-pod-controls">
          <span className="tester-pod-status-pill">
            <Sparkles size={12} strokeWidth={2} aria-hidden="true" />
            AI Brain Active
          </span>
          <button type="button" className="tester-pod-style-button">
            Ready to be styled &#10022;
          </button>
        </div>
      </header>

      <div className="tester-pod-tabs" role="tablist" aria-label="AI pod sections">
        {DASHBOARD_NAV_ITEMS.map((item, index) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={index === 0}
            className={`tester-pod-tab ${index === 0 ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="tester-pod-content-panel" aria-label="AI Brain data rows">
        <div className="tester-pod-content-shell">
          {DASHBOARD_ROWS.map((row) => {
            const RowIcon = row.icon;

            return (
              <article key={row.label} className="tester-pod-dashboard-row">
                <span className="tester-pod-row-icon" aria-hidden="true">
                  <RowIcon size={16} strokeWidth={1.9} />
                </span>
                <div className="tester-pod-row-main">
                  <span className="tester-pod-row-label">{row.label}</span>
                  <p className="tester-pod-row-detail">{row.detail}</p>
                  <RowValue row={row} />
                </div>
                <button type="button" className="tester-pod-row-action">
                  Override
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="tester-pod-section">
      <h2 className="section-title">See one of Dovroyn's AI pods.</h2>
      <p className="lede">
        This preview highlights one dedicated Dovroyn AI pod after brand analysis with its AI brain profile,
        platform strategy, and campaign controls.
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
