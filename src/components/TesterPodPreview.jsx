import { useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  CalendarDays,
  DollarSign,
  FileText,
  Flag,
  Lightbulb,
  MapPin,
  Megaphone,
  NotebookText,
  Palette,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaTiktok } from 'react-icons/fa6';
import { SiGoogleads } from 'react-icons/si';

const TESTER_TABS = [
  'Source / Intake',
  'AI Analysis',
  'Brand DNA',
  'Audience',
  'Offer',
  'Campaign Strategy',
  'Content Ideas',
  'Ad Angles',
  'Socials',
  'Calendar',
  'Holidays',
  'Budget',
  'Ad Analysis',
  'AI Notes',
  'Next Moves',
];

const TAB_ICONS = {
  'Source / Intake': Search,
  'AI Analysis': Bot,
  'Brand DNA': Palette,
  Audience: Users,
  Offer: Target,
  'Campaign Strategy': Megaphone,
  'Content Ideas': Lightbulb,
  'Ad Angles': Rocket,
  Socials: Share2,
  Calendar: CalendarDays,
  Holidays: Flag,
  Budget: DollarSign,
  'Ad Analysis': BarChart3,
  'AI Notes': NotebookText,
  'Next Moves': Sparkles,
};

const PLATFORM_CHIPS = [
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'TikTok', Icon: FaTiktok },
  { label: 'Facebook', Icon: FaFacebookF },
  { label: 'Pinterest', Icon: FaPinterestP },
  { label: 'Google', Icon: SiGoogleads },
];

const FALLBACK_ROW_LABELS = ['Core finding', 'Launch context', 'Planning signal', 'Approval note'];
const FALLBACK_ROW_DETAILS = [
  'Primary takeaway for this dashboard screen.',
  'Context the pod uses for campaign planning.',
  'Signal that shapes the next recommendation.',
  'Guardrail kept visible before action.',
];

const TAB_CONTENT = {
  'Source / Intake': {
    items: [
      'Source: www.gidgeeco.au — Australian western hat and lifestyle brand',
      'Pod type: website launch pod, target country Australia',
      'Products detected: western hats, headwear, and country lifestyle accessories',
      'Brand story, product range, and imagery pulled from the site for analysis',
    ],
  },
  'AI Analysis': {
    rows: [
      {
        icon: Palette,
        label: 'Brand tone',
        value: 'Earthy · premium · Australian · bold',
        detail: 'Western hat and lifestyle brand signals identified.',
        action: 'Review',
      },
      {
        icon: Users,
        label: 'Audience',
        value: 'Country, western, rodeo, festival, outdoor style buyers',
        detail: 'Primary buyers mapped around authentic Australian lifestyle intent.',
      },
      {
        icon: MapPin,
        label: 'Geography / market',
        value: 'Australia',
        detail: 'Launch direction weighted to local country, rodeo, and festival moments.',
      },
      {
        icon: Share2,
        label: 'Recommended platforms',
        platforms: PLATFORM_CHIPS,
        detail: 'Small-channel mix for launch content, retargeting, and product discovery.',
      },
      {
        icon: Megaphone,
        label: 'Campaign direction',
        value: 'Brand story reel → styling carousel → launch drop offer → retarget',
        detail: 'Launch story builds from identity to product demand.',
      },
      {
        icon: Rocket,
        label: 'Next move',
        value: 'Launch first styling reel and queue launch countdown assets',
        detail: 'First action is ready for review before scheduling.',
        action: 'Review',
      },
    ],
  },
  'Brand DNA': {
    items: [
      'Brand tone detected: earthy, premium, Australian, bold',
      'Brand voice: grounded confidence with outback character',
      'Words to use: crafted, country, heritage, wide open, wild at heart',
      'Words to avoid: cheap, costume, gimmick, fast fashion',
    ],
  },
  Audience: {
    items: [
      'Audience mapped for Australian country, western, rodeo, festival, and outdoor style buyers',
      'Pain points: hard to find quality western hats that suit everyday Australian life',
      'Buying triggers: authentic country style, quality craftsmanship, limited product drops',
      'Where they are: Instagram, TikTok, Facebook, Pinterest',
    ],
  },
  Offer: {
    items: [
      'Core offer: premium crafted western hats built for real Australian wear',
      'Launch angle: limited first drop with early access for the brand community',
      'Value framing: heritage craftsmanship over fast fashion, built to last seasons',
      'Suggested hook: one hat that works from the paddock to the festival',
    ],
  },
  'Campaign Strategy': {
    items: [
      'Campaign goal selected: launch and grow brand awareness',
      'Main campaign message: crafted western hats for country, rodeo, festival, and everyday wear',
      'Funnel: Brand story reel → Styling carousel → Launch drop offer → Retarget',
      'Best channels for this pod: Instagram, TikTok, Facebook, Pinterest, Google',
    ],
  },
  'Content Ideas': {
    items: [
      'Content ideas for hats, styling, launches, product drops, and social posts',
      'Styling reel: one hat, three looks — paddock, festival, weekend',
      'Founder story video on building an Australian western lifestyle brand',
      'Behind-the-scenes launch countdown building to the first product drop',
    ],
  },
  'Ad Angles': {
    items: [
      'Craftsmanship angle: built by hand, made for wide open country',
      'Lifestyle angle: from rodeo weekends to festival season in one hat',
      'Scarcity angle: first drop is limited — join before it sells out',
      'Identity angle: for the wild at heart who live the country life',
    ],
  },
  Socials: {
    items: [
      'Recommended platforms: Instagram, TikTok, Facebook, Pinterest',
      'Instagram: styling reels, launch countdown, and product drop posts',
      'TikTok: behind-the-scenes making-of and founder story clips',
      'Posting requires each account to be securely connected and approved first',
    ],
  },
  Calendar: {
    items: [
      'Week 1: brand story reel and founder introduction posts',
      'Week 2: styling carousels and behind-the-scenes launch countdown',
      'Week 3: launch drop announcement, offer posts, and retargeting content',
      'Calendar planned around the pod, selected platforms, and target country',
    ],
  },
  Holidays: {
    items: [
      'Australian seasonal moments mapped around the launch window',
      'Rodeo and country show season flagged as a high-relevance content moment',
      'Festival season styling content planned ahead of peak demand',
      'Gift-giving periods marked for future hat bundle campaigns',
    ],
  },
  Budget: {
    items: [
      'Launch budget split across Instagram, TikTok, and Facebook ads',
      'Planned spend, used spend, leads, and sales tracked inside the pod',
      'Spend weighted toward the launch drop week for maximum impact',
      'Return tracked per channel so the next campaign starts smarter',
    ],
  },
  'Ad Analysis': {
    items: [
      'Ad performance reviewed against the locked campaign direction',
      'Creative fatigue flagged early with fresh angle suggestions',
      'Best-performing hooks and styling content surfaced for reuse',
      'AI suggestions are shown for review before anything changes',
    ],
  },
  'AI Notes': {
    items: [
      'Pod remembers the approved tone, strategy, and audience for every suggestion',
      'Note: limited drops and craftsmanship story are the strongest brand levers',
      'Note: styling content outperforms plain product shots for this audience',
      'Every new idea stays consistent with the locked Gidgee & Co direction',
    ],
  },
  'Next Moves': {
    items: [
      'Next campaign move suggested based on pod analysis',
      'Actions prioritised: what to write, post, test, and approve',
      'What needs designing, scheduling, and reviewing',
      'AI flags what is ready to go and what is still pending',
    ],
  },
};

function getTabRows(tab, content) {
  if (content.rows) {
    return content.rows;
  }

  const Icon = TAB_ICONS[tab] || FileText;

  return content.items.map((item, index) => ({
    icon: Icon,
    label: item.includes(':') ? item.split(':')[0] : FALLBACK_ROW_LABELS[index] || 'Dashboard note',
    value: item.includes(':') ? item.slice(item.indexOf(':') + 1).trim() : item,
    detail: FALLBACK_ROW_DETAILS[index] || 'Additional pod context for this screen.',
  }));
}

function TesterTabContent({ tab }) {
  const content = TAB_CONTENT[tab];
  if (!content) {
    return (
      <div className="tester-pod-content-shell">
        <p className="subtle">Select a tab to preview this pod section.</p>
      </div>
    );
  }
  const rows = getTabRows(tab, content);

  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <h4>{tab}</h4>
        <span className="tester-pod-panel-chip">Active screen</span>
      </div>
      <div className="tester-pod-dashboard-list">
        {rows.map((row, index) => {
          const RowIcon = row.icon || FileText;

          return (
            <div key={index} className="tester-pod-dashboard-row">
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
              {row.action && <span className="tester-pod-row-action">{row.action}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TesterTabButton({ tab, index, tabContext, handlers }) {
  const TabIcon = TAB_ICONS[tab] || FileText;
  const { activeTab, tabPanelId, tabRefs } = tabContext;

  return (
    <button
      id={`gidgee-pod-tab-${index}`}
      ref={(node) => {
        tabRefs.current[index] = node;
      }}
      type="button"
      role="tab"
      aria-controls={tabPanelId}
      aria-selected={activeTab === tab}
      tabIndex={activeTab === tab ? 0 : -1}
      className={`tester-pod-tab ${activeTab === tab ? 'active' : ''}`}
      onClick={() => handlers.onClick(tab)}
      onFocus={handlers.onFocus}
      onKeyDown={(event) => handlers.onKeyDown(event, index)}
    >
      <TabIcon size={12} strokeWidth={1.9} aria-hidden="true" />
      {tab}
    </button>
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
      <span className="status-chip-gold">Preview</span>
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

function TesterPodTabs({ activeTab, tabRefs, tabPanelId, onTabClick, onTabFocus, onTabKeyDown }) {
  return (
    <div className="tester-pod-tabs" role="tablist" aria-label="Gidgee pod sections">
      {TESTER_TABS.map((tab, index) => (
        <TesterTabButton
          key={tab}
          tab={tab}
          index={index}
          tabContext={{ activeTab, tabPanelId, tabRefs }}
          handlers={{ onClick: onTabClick, onFocus: onTabFocus, onKeyDown: onTabKeyDown }}
        />
      ))}
    </div>
  );
}

function TesterPodPanel({ activeTab, activeTabIndex, tabPanelId }) {
  return (
    <section
      id={tabPanelId}
      role="tabpanel"
      aria-labelledby={`gidgee-pod-tab-${activeTabIndex}`}
      className="panel tester-pod-content-panel"
    >
      <TesterTabContent tab={activeTab} />
    </section>
  );
}

function TesterPodDashboard({ activeTab, activeTabIndex, tabRefs, tabPanelId, handlers }) {
  return (
    <TesterPodChrome>
      <TesterPodHeader />
      <TesterPodTabs
        activeTab={activeTab}
        tabRefs={tabRefs}
        tabPanelId={tabPanelId}
        onTabClick={handlers.onTabClick}
        onTabFocus={handlers.onTabFocus}
        onTabKeyDown={handlers.onTabKeyDown}
      />
      <TesterPodPanel activeTab={activeTab} activeTabIndex={activeTabIndex} tabPanelId={tabPanelId} />
    </TesterPodChrome>
  );
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  const [activeTab, setActiveTab] = useState('AI Analysis');
  const tabRefs = useRef([]);
  const activeTabIndex = TESTER_TABS.indexOf(activeTab);
  const tabPanelId = 'gidgee-pod-tabpanel';

  const handleTabScrollIntoView = (event) => {
    event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  const handleTabKeyDown = (event, currentIndex) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % TESTER_TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + TESTER_TABS.length) % TESTER_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = TESTER_TABS.length - 1;
    }

    setActiveTab(TESTER_TABS[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="tester-pod-section">
      <h2 className="section-title">See what a Dovroyn pod gives you.</h2>
      <p className="lede">
        Every website, offer, launch, or campaign gets its own AI marketing pod. Explore every
        section of a real example pod below.
      </p>

      <TesterPodDashboard
        activeTab={activeTab}
        activeTabIndex={activeTabIndex}
        tabRefs={tabRefs}
        tabPanelId={tabPanelId}
        handlers={{
          onTabClick: setActiveTab,
          onTabFocus: handleTabScrollIntoView,
          onTabKeyDown: handleTabKeyDown,
        }}
      />

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
