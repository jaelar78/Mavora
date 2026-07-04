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
            <li>Website URL analysed</li>
            <li>Product images added</li>
            <li>Campaign goal selected</li>
            <li>Target country chosen</li>
          </ul>
        </div>
      );
    case 'AI Analysis':
      return (
        <div className="pod-section-content">
          <h4>AI Analysis</h4>
          <ul className="simple-list compact-list">
            <li>Brand tone detected from website and images</li>
            <li>Offer direction mapped from product and campaign goal</li>
            <li>Audience signals identified from source content</li>
            <li>Next campaign move suggested based on analysis</li>
          </ul>
        </div>
      );
    case 'Brand DNA':
      return (
        <div className="pod-section-content">
          <h4>Brand DNA</h4>
          <ul className="simple-list compact-list">
            <li>Premium, calm, confident tone locked in</li>
            <li>Brand voice: reassuring luxury with editorial clarity</li>
            <li>Words to use: nourish, glow, ritual, restore, radiance</li>
            <li>Words to avoid: cheap, basic, quick fix, miracle</li>
          </ul>
        </div>
      );
    case 'Audience':
      return (
        <div className="pod-section-content">
          <h4>Audience</h4>
          <ul className="simple-list compact-list">
            <li>Ideal buyer profile: women 25–42, urban professionals</li>
            <li>Pain points: overwhelmed by choices, want simple effective routines</li>
            <li>Buying triggers: visible results, expert endorsement, limited offers</li>
            <li>Where they are: Instagram, TikTok, Pinterest</li>
          </ul>
        </div>
      );
    case 'Offer':
      return (
        <div className="pod-section-content">
          <h4>Offer</h4>
          <ul className="simple-list compact-list">
            <li>Launch angle: seasonal urgency meets skincare education</li>
            <li>Main campaign message: protect your skin before the season changes</li>
            <li>Offer: Limited bundle with free travel cleanser</li>
            <li>CTA: Get Your Launch Bundle</li>
          </ul>
        </div>
      );
    case 'Campaign Strategy':
      return (
        <div className="pod-section-content">
          <h4>Campaign Strategy</h4>
          <ul className="simple-list compact-list">
            <li>Launch angle: education-first, urgency-close</li>
            <li>Main campaign message: your skin routine needs one key upgrade</li>
            <li>Funnel: Awareness reel → Education carousel → Bundle offer → Retarget</li>
            <li>Best channels for this pod: Instagram, Meta Ads, Email</li>
          </ul>
        </div>
      );
    case 'Content Ideas':
      return (
        <div className="pod-section-content">
          <h4>Content Ideas</h4>
          <ul className="simple-list compact-list">
            <li>Before/after hydration reel with expert-backed caption</li>
            <li>Myth-busting carousel on skincare routines</li>
            <li>Founder story video with product stack CTA</li>
            <li>Email sequence: 3 emails over 5 days building to the launch offer</li>
          </ul>
        </div>
      );
    case 'Ad Angles':
      return (
        <div className="pod-section-content">
          <h4>Ad Angles</h4>
          <ul className="simple-list compact-list">
            <li><strong>Pain-point:</strong> "Your routine is missing one recovery step"</li>
            <li><strong>Desire:</strong> "Wake up to calm, glowing skin every morning"</li>
            <li><strong>Before/after:</strong> "Week 1 vs Week 4 — same routine, visible difference"</li>
            <li><strong>Limited drop:</strong> "Launch bundle. Once they sell, they sell."</li>
          </ul>
        </div>
      );
    case 'Socials':
      return (
        <div className="pod-section-content">
          <h4>Socials</h4>
          <p><strong>Platform recommendations for this pod:</strong></p>
          <ul className="simple-list compact-list" style={{ marginTop: '0.3rem' }}>
            <li>Instagram — primary content and Reels</li>
            <li>TikTok — short-form education and hooks</li>
            <li>Pinterest — product imagery and inspiration boards</li>
            <li>Facebook — retargeting and offer ads</li>
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
            <li>Holiday-aware planning based on target country</li>
            <li>Seasonal campaign angles mapped to your calendar</li>
            <li>Key dates flagged: Mother's Day, Black Friday, Christmas, New Year</li>
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
            <li>Spend used tracked against plan</li>
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
            <li>AI recommendations require approval before anything changes</li>
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
            <p className="tester-pod-title">Luxury Skincare Launch</p>
            <p className="tester-pod-subtitle">Example AI marketing pod</p>
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
