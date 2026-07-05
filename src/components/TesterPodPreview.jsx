import { useRef, useState } from 'react';

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
    items: [
      'Western hat and lifestyle brand signals identified',
      'Brand tone: earthy, premium, Australian, bold',
      'Audience: Australian country, western, rodeo, festival, and outdoor style buyers',
      'Next move: launch first styling reel and queue launch countdown assets',
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

function TesterTabContent({ tab }) {
  const content = TAB_CONTENT[tab];
  if (!content) {
    return (
      <div className="tester-pod-content-shell">
        <p className="subtle">Select a tab to preview this pod section.</p>
      </div>
    );
  }
  return (
    <div className="tester-pod-content-shell">
      <div className="tester-pod-content-head">
        <h4>{tab}</h4>
      </div>
      <div className="tester-pod-insights">
        <div className="tester-pod-insights-list">
          {content.items.map((item, index) => (
            <div key={item} className="tester-pod-insight-row">
              <span className="tester-pod-insight-index">{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
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

      <div className="tester-pod-card panel">
        <div className="tester-pod-header">
          <div>
            <p className="tester-pod-title">Gidgee &amp; Co Launch</p>
            <p className="tester-pod-subtitle">Example AI marketing pod using www.gidgeeco.au</p>
          </div>
          <span className="status-chip-gold">Preview</span>
        </div>

        <div className="tester-pod-tabs" role="tablist" aria-label="Gidgee pod sections">
          {TESTER_TABS.map((tab, index) => (
            <button
              key={tab}
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
              onClick={() => setActiveTab(tab)}
              onFocus={handleTabScrollIntoView}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <section
          id={tabPanelId}
          role="tabpanel"
          aria-labelledby={`gidgee-pod-tab-${activeTabIndex}`}
          className="panel tester-pod-content-panel"
        >
          <TesterTabContent tab={activeTab} />
        </section>
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
