import { MapPin, Palette, Share2, Sparkles, Users } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa6';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];

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
    detail: 'Primary palette ready for luxury creative direction, landing pages, and campaign approvals.',
    swatches: [
      { label: 'Gold', color: '#C79B3B' },
      { label: 'Black', color: '#141414' },
      { label: 'Ivory', color: '#F5ECDD' },
    ],
  },
  {
    icon: Sparkles,
    label: 'Brand Tone',
    detail: 'Voice guidance applied across prompts, scripts, and premium positioning.',
    chips: ['Luxury', 'Refined', 'Aspirational'],
  },
  {
    icon: Users,
    label: 'Target Audience',
    detail: 'High-value buyer profile mapped by age, profession, and purchase intent.',
    chips: ['Men 25–55', 'Professionals', 'High intent buyers'],
  },
  {
    icon: MapPin,
    label: 'Geography',
    detail: 'Regional targeting can expand without losing brand consistency.',
    chips: ['Worldwide'],
  },
  {
    icon: Share2,
    label: 'Recommended Platforms',
    detail: 'Distribution mix prioritised for authority, aspiration, and premium storytelling.',
    platforms: PLATFORM_CHIPS,
  },
];

function RowValues({ row }) {
  if (row.swatches) {
    return (
      <div className="tester-pod-row-values" aria-label={`${row.label} swatches`}>
        {row.swatches.map((swatch) => (
          <span key={swatch.label} className="tester-pod-swatch-chip">
            <span className="tester-pod-swatch" style={{ backgroundColor: swatch.color }} aria-hidden="true" />
            {swatch.label}
          </span>
        ))}
      </div>
    );
  }

  if (row.platforms) {
    return (
      <div className="tester-pod-row-values" aria-label={row.label}>
        {row.platforms.map(({ label, Icon }) => (
          <span key={label} className="tester-pod-platform-chip">
            <Icon aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="tester-pod-row-values" aria-label={row.label}>
      {row.chips.map((chip) => (
        <span key={chip} className="tester-pod-chip">
          {chip}
        </span>
      ))}
    </div>
  );
}

function TesterPodDashboard({ onJoinEarlyAccess }) {
  return (
    <div className="tester-pod-card panel" aria-label="House of Magnum Dovroyn AI marketing pod preview">
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
          <span className="tester-pod-status">AI Brain Active</span>
          <button type="button" className="tester-pod-style-button" onClick={onJoinEarlyAccess}>
            Ready to be styled ✦
          </button>
        </div>
      </div>

      <div className="tester-pod-tabs" aria-label="House of Magnum pod sections">
        {DASHBOARD_NAV_ITEMS.map((item, index) => (
          <span key={item} className={`tester-pod-tab ${index === 0 ? 'active' : ''}`}>
            {item}
          </span>
        ))}
      </div>

      <section className="tester-pod-content-panel">
        <div className="tester-pod-content-shell">
          <div className="tester-pod-content-head">
            <div>
              <p className="tester-pod-kicker">AI Marketing Pod · Preview</p>
              <h4>AI Brain</h4>
            </div>
            <span className="tester-pod-panel-chip">Single pod preview</span>
          </div>

          <div className="tester-pod-dashboard-list">
            {DASHBOARD_ROWS.map((row) => {
              const RowIcon = row.icon;

              return (
                <div key={row.label} className="tester-pod-dashboard-row">
                  <div className="tester-pod-row-leading">
                    <span className="tester-pod-row-icon" aria-hidden="true">
                      <RowIcon size={16} strokeWidth={1.9} />
                    </span>
                    <div className="tester-pod-row-copy">
                      <span className="tester-pod-row-label">{row.label}</span>
                      <p className="tester-pod-row-detail">{row.detail}</p>
                    </div>
                  </div>

                  <RowValues row={row} />

                  <button type="button" className="tester-pod-row-action" aria-label={`Override ${row.label}`}>
                    Override
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  return (
    <section className="tester-pod-section">
      <p className="eyebrow">AI Marketing Pod · Preview</p>
      <h2 className="section-title">A premium preview of one Dovroyn pod.</h2>
      <p className="lede tester-pod-lede">
        This card shows a single Dovroyn AI pod for House of Magnum, designed to hold brand intelligence, channel direction,
        files, performance, and budget planning in one executive dashboard view.
      </p>

      <TesterPodDashboard onJoinEarlyAccess={onJoinEarlyAccess} />

      <div className="tester-pod-cta">
        <p className="tester-pod-note">
          Preview only. Live approvals, connected channels, budgets, and posting actions remain under user control.
        </p>
      </div>
    </section>
  );
}
