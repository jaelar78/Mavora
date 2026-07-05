import { useState } from 'react';

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
    chips: ['Source analysed', 'Website pod'],
    items: [
      'Source: www.gidgeeco.au — Australian western hat and lifestyle brand',
      'Pod type: website launch pod, target country Australia',
      'Products detected: western hats, headwear, and country lifestyle accessories',
      'Brand story, product range, and imagery pulled from the site for analysis',
    ],
  },
  'AI Analysis': {
    chips: ['Analysis complete', '4 signals found'],
    items: [
      'Western hat and lifestyle brand signals identified',
      'Brand tone detected: earthy, premium, Australian, bold',
      'Audience mapped for Australian country, western, rodeo, festival, and outdoor style buyers',
      'Next campaign move suggested based on analysis',
    ],
  },
  'Brand DNA': {
    chips: ['Tone locked', 'Voice mapped'],
    items: [
      'Brand tone detected: earthy, premium, Australian, bold',
      'Brand voice: grounded confidence with outback character',
      'Words to use: crafted, country, heritage, wide open, wild at heart',
      'Words to avoid: cheap, costume, gimmick, fast fashion',
    ],
  },
  Audience: {
    chips: ['3 segments', 'AU focus'],
    items: [
      'Audience mapped for Australian country, western, rodeo, festival, and outdoor style buyers',
      'Pain points: hard to find quality western hats that suit everyday Australian life',
      'Buying triggers: authentic country style, quality craftsmanship, limited product drops',
      'Where they are: Instagram, TikTok, Facebook, Pinterest',
    ],
  },
  Offer: {
    chips: ['Launch drop', 'Offer shaped'],
    items: [
      'Core offer: premium crafted western hats built for real Australian wear',
      'Launch angle: limited first drop with early access for the brand community',
      'Value framing: heritage craftsmanship over fast fashion, built to last seasons',
      'Suggested hook: one hat that works from the paddock to the festival',
    ],
  },
  'Campaign Strategy': {
    chips: ['Direction locked', '4-step funnel'],
    items: [
      'Campaign goal selected: launch and grow brand awareness',
      'Main campaign message: crafted western hats for country, rodeo, festival, and everyday wear',
      'Funnel: Brand story reel → Styling carousel → Launch drop offer → Retarget',
      'Best channels for this pod: Instagram, TikTok, Facebook, Pinterest, Google',
    ],
  },
  'Content Ideas': {
    chips: ['12 ideas ready', '4 shortlisted'],
    items: [
      'Content ideas for hats, styling, launches, product drops, and social posts',
      'Styling reel: one hat, three looks — paddock, festival, weekend',
      'Founder story video on building an Australian western lifestyle brand',
      'Behind-the-scenes launch countdown building to the first product drop',
    ],
  },
  'Ad Angles': {
    chips: ['5 angles drafted', 'Awaiting approval'],
    items: [
      'Craftsmanship angle: built by hand, made for wide open country',
      'Lifestyle angle: from rodeo weekends to festival season in one hat',
      'Scarcity angle: first drop is limited — join before it sells out',
      'Identity angle: for the wild at heart who live the country life',
    ],
  },
  Socials: {
    chips: ['4 platforms planned', 'Connect to post'],
    items: [
      'Recommended platforms: Instagram, TikTok, Facebook, Pinterest',
      'Instagram: styling reels, launch countdown, and product drop posts',
      'TikTok: behind-the-scenes making-of and founder story clips',
      'Posting requires each account to be securely connected and approved first',
    ],
  },
  Calendar: {
    chips: ['3 weeks mapped', 'Launch scheduled'],
    items: [
      'Week 1: brand story reel and founder introduction posts',
      'Week 2: styling carousels and behind-the-scenes launch countdown',
      'Week 3: launch drop announcement, offer posts, and retargeting content',
      'Calendar planned around the pod, selected platforms, and target country',
    ],
  },
  Holidays: {
    chips: ['AU calendar', '3 moments flagged'],
    items: [
      'Australian seasonal moments mapped around the launch window',
      'Rodeo and country show season flagged as a high-relevance content moment',
      'Festival season styling content planned ahead of peak demand',
      'Gift-giving periods marked for future hat bundle campaigns',
    ],
  },
  Budget: {
    chips: ['Tracker active', 'Launch budget set'],
    items: [
      'Launch budget split across Instagram, TikTok, and Facebook ads',
      'Planned spend, used spend, leads, and sales tracked inside the pod',
      'Spend weighted toward the launch drop week for maximum impact',
      'Return tracked per channel so the next campaign starts smarter',
    ],
  },
  'Ad Analysis': {
    chips: ['Monitoring ready', 'Needs approval'],
    items: [
      'Ad performance reviewed against the locked campaign direction',
      'Creative fatigue flagged early with fresh angle suggestions',
      'Best-performing hooks and styling content surfaced for reuse',
      'AI suggestions are shown for review before anything changes',
    ],
  },
  'AI Notes': {
    chips: ['Pod memory', 'Always learning'],
    items: [
      'Pod remembers the approved tone, strategy, and audience for every suggestion',
      'Note: limited drops and craftsmanship story are the strongest brand levers',
      'Note: styling content outperforms plain product shots for this audience',
      'Every new idea stays consistent with the locked Gidgee & Co direction',
    ],
  },
  'Next Moves': {
    chips: ['3 actions queued', '1 ready to go'],
    items: [
      'Next campaign move suggested based on pod analysis',
      'Actions prioritised: what to write, post, test, and approve',
      'What needs designing, scheduling, and reviewing',
      'AI flags what is ready to go and what is still pending',
    ],
  },
};

const POD_DASHBOARD_SUMMARY = [
  { label: 'Brand tone', value: 'Earthy, premium, Australian, bold' },
  {
    label: 'Audience',
    value: 'Australian country, western, rodeo, festival, and outdoor style buyers',
  },
  { label: 'Recommended platforms', value: 'Instagram, TikTok, Facebook, Pinterest, Google' },
  {
    label: 'Campaign direction',
    value: 'Brand story reel → Styling carousel → Launch drop offer → Retarget',
  },
  { label: 'Next move', value: 'Launch the first styling reel and queue launch countdown assets' },
  { label: 'Budget / ad note', value: 'Weight spend into launch week and monitor hook fatigue early' },
];

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
      <div className="tester-pod-chip-row">
        {content.chips.map((chip) => (
          <span key={chip} className="status-chip">{chip}</span>
        ))}
      </div>
      <dl className="tester-pod-summary-grid">
        {POD_DASHBOARD_SUMMARY.map((entry) => (
          <div key={entry.label} className="tester-pod-summary-card">
            <dt>{entry.label}</dt>
            <dd>{entry.value}</dd>
          </div>
        ))}
      </dl>
      <div className="tester-pod-insights">
        <p className="tester-pod-insights-title">{tab} insights</p>
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

        <div className="tester-pod-stats">
          <div className="tester-pod-stat">
            <span className="tester-pod-stat-value">Locked</span>
            <span className="tester-pod-stat-label">Direction</span>
          </div>
          <div className="tester-pod-stat">
            <span className="tester-pod-stat-value">12</span>
            <span className="tester-pod-stat-label">Content ideas</span>
          </div>
          <div className="tester-pod-stat">
            <span className="tester-pod-stat-value">3 wks</span>
            <span className="tester-pod-stat-label">Calendar mapped</span>
          </div>
          <div className="tester-pod-stat">
            <span className="tester-pod-stat-value">3</span>
            <span className="tester-pod-stat-label">Next moves queued</span>
          </div>
        </div>

        <div className="tester-pod-tabs" role="tablist" aria-label="Gidgee pod sections">
          {TESTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`tester-pod-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="panel tester-pod-content-panel">
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
