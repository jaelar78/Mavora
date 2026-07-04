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

function TesterTabContent({ tab }) {
  switch (tab) {
    case 'Source / Intake':
      return (
        <div className="pod-section-content">
          <h4>Source / Intake</h4>
          <ul className="simple-list compact-list">
            <li>Website URL analysed: www.gidgeeco.au</li>
            <li>Product direction detected</li>
            <li>Campaign goal selected: launch and grow brand awareness</li>
            <li>Target country chosen: Australia</li>
          </ul>
        </div>
      );
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
    case 'Offer':
      return (
        <div className="pod-section-content">
          <h4>Offer</h4>
          <ul className="simple-list compact-list">
            <li>Launch angle: launch and grow brand awareness for a western lifestyle label</li>
            <li>Main campaign message: hats made for the Australian way of life</li>
            <li>Offer: launch drop with early-access styling guide</li>
            <li>CTA: Shop the Launch Drop</li>
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
    case 'Ad Angles':
      return (
        <div className="pod-section-content">
          <h4>Ad Angles</h4>
          <ul className="simple-list compact-list">
            <li><strong>Lifestyle:</strong> "Made for the paddock, the rodeo, and everywhere in between"</li>
            <li><strong>Craftsmanship:</strong> "A hat built to earn its character"</li>
            <li><strong>Identity:</strong> "Wear the country you come from"</li>
            <li><strong>Limited drop:</strong> "Launch drop. Once they're gone, they're gone."</li>
          </ul>
        </div>
      );
    case 'Socials':
      return (
        <div className="pod-section-content">
          <h4>Socials</h4>
          <p><strong>Social planning for Instagram, TikTok, Facebook, Pinterest, and Google:</strong></p>
          <ul className="simple-list compact-list" style={{ marginTop: '0.3rem' }}>
            <li>Instagram — primary brand content, styling Reels, and launch posts</li>
            <li>TikTok — short-form western lifestyle hooks and behind-the-scenes</li>
            <li>Facebook — community reach and offer ads</li>
            <li>Pinterest — hat styling boards and outfit inspiration</li>
            <li>Google — search intent for western hats and Australian country style</li>
          </ul>
          <p className="subtle" style={{ fontSize: '0.8rem' }}>Posting and ads require account connection and user approval.</p>
        </div>
      );
    case 'Calendar':
      return (
        <div className="pod-section-content">
          <h4>Content Calendar</h4>
          <ul className="simple-list compact-list">
            <li>Weekly posting allowance set by your paid tier</li>
            <li>Holiday-aware planning included</li>
            <li>Calendar generated from pod analysis, accepted tone, and platforms</li>
            <li>Preview, edit, and approve before anything is scheduled</li>
          </ul>
        </div>
      );
    case 'Holidays':
      return (
        <div className="pod-section-content">
          <h4>Public Holidays / Seasonal Planning</h4>
          <ul className="simple-list compact-list">
            <li>Holiday-aware campaign planning based on target country</li>
            <li>Seasonal campaign angles mapped to your calendar</li>
            <li>Key dates flagged: rodeo season, country festivals, Melbourne Cup, Christmas</li>
            <li>AI recommends content in advance of seasonal windows</li>
          </ul>
        </div>
      );
    case 'Budget':
      return (
        <div className="pod-section-content">
          <h4>Budget Tracker</h4>
          <ul className="simple-list compact-list">
            <li>Planned ad budget entered per pod</li>
            <li>Budget and ad testing notes tracked against plan</li>
            <li>Leads and sales recorded per campaign</li>
            <li>Return on ad spend calculated automatically</li>
          </ul>
        </div>
      );
    case 'Ad Analysis':
      return (
        <div className="pod-section-content">
          <h4>Ad Analysis</h4>
          <ul className="simple-list compact-list">
            <li>What performed best shown per ad and platform</li>
            <li>Weakest creative flagged with suggested improvements</li>
            <li>Best-performing hooks identified and saved</li>
            <li>AI recommendations require approval before posting or ads</li>
          </ul>
        </div>
      );
    case 'AI Notes':
      return (
        <div className="pod-section-content">
          <h4>AI Notes</h4>
          <ul className="simple-list compact-list">
            <li>Accepted tone and direction saved to pod memory</li>
            <li>Rejected suggestions noted to avoid repeating them</li>
            <li>User preferences stored and applied to future suggestions</li>
            <li>Campaign decisions logged for continuity</li>
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
  const [activeTab, setActiveTab] = useState('Source / Intake');

  return (
    <section className="tester-pod-section">
      <p className="eyebrow">Tester Pod Preview</p>
      <h2 className="section-title">See what a Dovroyn pod gives you.</h2>
      <p className="lede">
        Every website, offer, launch, or campaign gets its own AI marketing pod. The tester pod shows
        how Dovroyn organises analysis, brand direction, audience insights, content ideas, social
        planning, calendar planning, budget tracking, and ad improvement notes.
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
