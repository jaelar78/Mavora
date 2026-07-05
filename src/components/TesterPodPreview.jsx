import {
  Bot,
  MapPin,
  Megaphone,
  Palette,
  Share2,
  Users,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok } from 'react-icons/fa6';

const DASHBOARD_NAV_ITEMS = ['AI Brain', 'Content Calendar', 'Platforms', 'Files', 'Ad Performance', 'Budget'];
const DASHBOARD_HEADING = 'AI Brain analysis';

const PLATFORM_CHIPS = [
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'Facebook', Icon: FaFacebookF },
  { label: 'TikTok', Icon: FaTiktok },
  { label: 'Pinterest', Icon: FaPinterestP },
];

const DASHBOARD_ROWS = [
  {
    icon: Palette,
    label: 'Brand colours',
    value: 'Warm neutrals · brass accents · deep navy',
    detail: 'Palette inferred from Gidgee & Co launch styling.',
  },
  {
    icon: Bot,
    label: 'Brand tone',
    value: 'Earthy · premium · Australian · bold',
    detail: 'Voice locked for captions, ads, and creative briefs.',
  },
  {
    icon: Users,
    label: 'Target audience',
    value: 'Country, western, rodeo, festival, outdoor style buyers',
    detail: 'Primary buyers mapped around authentic lifestyle intent.',
  },
  {
    icon: MapPin,
    label: 'Geography',
    value: 'Australia',
    detail: 'Launch focus weighted to local country and event moments.',
  },
  {
    icon: Share2,
    label: 'Recommended platforms',
    platforms: PLATFORM_CHIPS,
    detail: 'Channel mix for launch content and product discovery.',
  },
  {
    icon: Megaphone,
    label: 'Campaign direction',
    value: 'Brand story → styling reel → launch drop → retarget',
    detail: 'Campaign path moves from identity into product demand.',
  },
];

function TesterPodContent() {
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <h4>{DASHBOARD_HEADING}</h4>
        <span className="tester-pod-panel-chip">Static preview</span>
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
                {row.platforms ? (
                  <span className="tester-pod-platforms" aria-label="Recommended platforms">
                    {row.platforms.map(({ label, Icon }) => (
                      <span key={label} className="tester-pod-platform-chip">
                        <Icon aria-hidden="true" />
                        {label}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="tester-pod-row-value">{row.value}</span>
                )}
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
        <span className="tester-pod-avatar" aria-hidden="true">
          G
        </span>
        <div>
          <p className="tester-pod-title">Gidgee &amp; Co Launch</p>
          <p className="tester-pod-subtitle">Example AI marketing pod using www.gidgeeco.au</p>
        </div>
      </div>
      <div className="tester-pod-controls" aria-label="Preview controls">
        <span>Project Actions</span>
        <span className="status-chip-gold">Preview</span>
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
    <div className="tester-pod-tabs" aria-label="Gidgee pod sections">
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
      <h2 className="section-title">See what a Dovroyn pod gives you.</h2>
      <p className="lede">
        Every website, offer, launch, or campaign gets its own AI marketing pod. Here is a static
        preview of what that workspace could look like.
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
