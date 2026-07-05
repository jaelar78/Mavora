import { useState } from 'react';

const TESTER_TABS = [
  'AI Analysis',
  'Brand DNA',
  'Audience',
  'Campaign Strategy',
  'Content Ideas',
  'Next Moves',
];

function TesterTabContent({ tab }) {
  switch (tab) {
    case 'AI Analysis':
      return (
        <div className="pod-section-content">
          <h4>AI Analysis</h4>
          <ul className="simple-list compact-list">
            <li>Western hat and lifestyle brand signals identified</li>
            <li>Brand tone detected: earthy, premium, Australian, bold</li>
            <li>Audience mapped for Australian country, western, rodeo, festival, and outdoor style buyers</li>
            <li>Next campaign move suggested based on analysis</li>
          </ul>
        </div>
      );
    case 'Brand DNA':
      return (
        <div className="pod-section-content">
          <h4>Brand DNA</h4>
          <ul className="simple-list compact-list">
            <li>Brand tone detected: earthy, premium, Australian, bold</li>
            <li>Brand voice: grounded confidence with outback character</li>
            <li>Words to use: crafted, country, heritage, wide open, wild at heart</li>
            <li>Words to avoid: cheap, costume, gimmick, fast fashion</li>
          </ul>
        </div>
      );
    case 'Audience':
      return (
        <div className="pod-section-content">
          <h4>Audience</h4>
          <ul className="simple-list compact-list">
            <li>Audience mapped for Australian country, western, rodeo, festival, and outdoor style buyers</li>
            <li>Pain points: hard to find quality western hats that suit everyday Australian life</li>
            <li>Buying triggers: authentic country style, quality craftsmanship, limited product drops</li>
            <li>Where they are: Instagram, TikTok, Facebook, Pinterest</li>
          </ul>
        </div>
      );
    case 'Campaign Strategy':
      return (
        <div className="pod-section-content">
          <h4>Campaign Strategy</h4>
          <ul className="simple-list compact-list">
            <li>Campaign goal selected: launch and grow brand awareness</li>
            <li>Main campaign message: crafted western hats for country, rodeo, festival, and everyday wear</li>
            <li>Funnel: Brand story reel → Styling carousel → Launch drop offer → Retarget</li>
            <li>Best channels for this pod: Instagram, TikTok, Facebook, Pinterest, Google</li>
          </ul>
        </div>
      );
    case 'Content Ideas':
      return (
        <div className="pod-section-content">
          <h4>Content Ideas</h4>
          <ul className="simple-list compact-list">
            <li>Content ideas for hats, styling, launches, product drops, and social posts</li>
            <li>Styling reel: one hat, three looks — paddock, festival, weekend</li>
            <li>Founder story video on building an Australian western lifestyle brand</li>
            <li>Behind-the-scenes launch countdown building to the first product drop</li>
          </ul>
        </div>
      );
    case 'Next Moves':
      return (
        <div className="pod-section-content">
          <h4>Next Moves</h4>
          <ul className="simple-list compact-list">
            <li>Next campaign move suggested based on pod analysis</li>
            <li>Actions prioritised: what to write, post, test, and approve</li>
            <li>What needs designing, scheduling, and reviewing</li>
            <li>AI flags what is ready to go and what is still pending</li>
          </ul>
        </div>
      );
    default:
      return (
        <div className="pod-section-content">
          <p className="subtle">Select a tab to preview this pod section.</p>
        </div>
      );
  }
}

export default function TesterPodPreview({ onJoinEarlyAccess }) {
  const [activeTab, setActiveTab] = useState('AI Analysis');

  return (
    <section className="tester-pod-section">
      <p className="eyebrow">Tester Pod Preview</p>
      <h2 className="section-title">See what a Dovroyn pod gives you.</h2>
      <p className="lede">
        Every website, offer, launch, or campaign gets its own AI marketing pod. Explore a few
        highlights from a real example pod below.
      </p>

      <div className="tester-pod-card panel">
        <div className="tester-pod-header">
          <div>
            <p className="tester-pod-title">Gidgee &amp; Co Launch</p>
            <p className="tester-pod-subtitle">Example AI marketing pod using www.gidgeeco.au</p>
          </div>
          <span className="status-chip-gold">Preview</span>
        </div>

        <div className="pod-tabs">
          {TESTER_TABS.map((tab) => (
            <button
              key={tab}
              className={`pod-tab ${activeTab === tab ? 'active' : ''}`}
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
