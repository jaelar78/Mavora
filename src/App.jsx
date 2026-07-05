import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Target,
  CheckCircle,
  Megaphone,
  PenTool,
  Calendar,
  BarChart3,
  Users,
  Rocket,
  Sparkles,
  Upload,
  Search,
  Brain,
  Dna,
  Gift,
  Share2,
  PartyPopper,
  DollarSign,
  MonitorPlay,
  StickyNote,
  ThumbsUp,
  Camera,
  Clapperboard,
  Play,
  Hash,
  Pin,
  Ghost,
  MessageSquare,
  MessageCircle,
  Send,
  Gamepad2,
  AtSign,
  Smartphone,
  Globe,
  Music,
  Mic,
  Aperture,
  Cloud,
  HelpCircle,
  BookOpen,
  Feather,
  Mail,
  ShoppingBag,
  Newspaper,
  MapPin,
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import { supabase, supabaseConfigured } from './lib/supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import EarlyAccessModal from './components/EarlyAccessModal';
import { redirectToCheckout, canCreatePod, getContentDays, TIER_LIMITS } from './lib/stripe';
import TesterPodPreview from './components/TesterPodPreview';
import WaitlistPage from './pages/Waitlist';
import PodsPage from './pages/Pods';
import NewPodPage from './pages/NewPod';
import AccountPage from './pages/Account';

const APP_NAME = 'Dovroyn';
const APP_DOMAIN = 'dovroyn.com';

const STRIPE_PRICING_LINKS = {
  starter_monthly: import.meta.env.VITE_STRIPE_STARTER_MONTHLY || null,
  starter_yearly: import.meta.env.VITE_STRIPE_STARTER_YEARLY || null,
  growth_monthly: import.meta.env.VITE_STRIPE_GROWTH_MONTHLY || null,
  growth_yearly: import.meta.env.VITE_STRIPE_GROWTH_YEARLY || null,
  pro_monthly: import.meta.env.VITE_STRIPE_PRO_MONTHLY || null,
  pro_yearly: import.meta.env.VITE_STRIPE_PRO_YEARLY || null,
  scale_monthly: import.meta.env.VITE_STRIPE_SCALE_MONTHLY || null,
  scale_yearly: import.meta.env.VITE_STRIPE_SCALE_YEARLY || null,
};

const LANDING_SECTIONS = [
  {
    heading: "Analyse your website, offer, or campaign.",
    body: "Drop in a website, app, offer, or teaser images. Dovroyn reads the source, understands the brand, and builds a clear marketing direction inside a dedicated AI pod.",
  },
  {
    heading: "Lock in the direction before anything goes live.",
    body: "Accept the AI's strategy or push back with your own choice. Once approved, every content idea, ad angle, calendar post, and campaign move follows that locked-in tone.",
  },
  {
    heading: "Plan campaigns for the platforms that matter.",
    body: "Dovroyn recommends the best social, search, content, and community platforms for your campaign. Posting and ads require the user to connect each account and approve permissions first.",
  },
];

const DASHBOARD_PREVIEW_CARDS = [
  { title: 'Website analysed', metric: 'Ready', description: 'Brand, offer, audience, and tone extracted from the source.' },
  { title: 'Campaign direction', metric: 'Locked', description: 'The approved strategy controls all content, ads, and calendar suggestions.' },
  { title: 'Content calendar', metric: 'Generated', description: 'Posts planned around the pod, selected platforms, paid tier, and target country.' },
  { title: 'Socials connected', metric: 'Pending', description: 'Connect each platform securely before posting or ad permissions are enabled.' },
  { title: 'Budget tracker', metric: 'Active', description: 'Track planned spend, used spend, leads, sales, and return.' },
  { title: 'Ad improvement', metric: 'Needs approval', description: 'AI suggestions are shown for review before anything changes.' },
];

const PLATFORMS = [
  { name: 'Facebook', icon: ThumbsUp },
  { name: 'Instagram', icon: Camera },
  { name: 'TikTok', icon: Clapperboard },
  { name: 'Google Ads', icon: Search },
  { name: 'YouTube', icon: Play },
  { name: 'LinkedIn', icon: Users },
  { name: 'X / Twitter', icon: Hash },
  { name: 'Pinterest', icon: Pin },
  { name: 'Snapchat', icon: Ghost },
  { name: 'Reddit', icon: MessageSquare },
  { name: 'WhatsApp', icon: MessageCircle },
  { name: 'Telegram', icon: Send },
  { name: 'Discord', icon: Gamepad2 },
  { name: 'Threads', icon: AtSign },
  { name: 'WeChat', icon: Smartphone },
  { name: 'LINE', icon: MessageCircle },
  { name: 'Weibo', icon: Globe },
  { name: 'VK', icon: Share2 },
  { name: 'Twitch', icon: MonitorPlay },
  { name: 'Spotify', icon: Music },
  { name: 'Clubhouse', icon: Mic },
  { name: 'BeReal', icon: Aperture },
  { name: 'Mastodon', icon: Globe },
  { name: 'Bluesky', icon: Cloud },
  { name: 'Quora', icon: HelpCircle },
  { name: 'Medium', icon: BookOpen },
  { name: 'Tumblr', icon: Feather },
  { name: 'Substack', icon: Mail },
  { name: 'Bing Ads', icon: Search },
  { name: 'Amazon Ads', icon: ShoppingBag },
  { name: 'Apple News', icon: Newspaper },
  { name: 'Nextdoor', icon: MapPin },
];

const PRICING_TIERS = [
  {
    name: 'Starter Pod',
    monthly: '$89',
    yearly: '$855',
    bestFor: 'Best for one brand, launch, or campaign.',
    features: [
      '1 active pod',
      'Website or image analysis',
      'AI brand/tone summary',
      'Audience and offer direction',
      'Campaign angles',
      '2 social campaign posts per week',
      'Manual budget tracking',
      'Early access features',
    ],
    stripeKey: 'starter',
  },
  {
    name: 'Growth Pods',
    monthly: '$249',
    yearly: '$2,390',
    bestFor: 'Best for small businesses and creators with multiple offers.',
    features: [
      'Up to 3 active pods',
      'Website/app/image analysis',
      'Campaign strategy',
      'Social platform recommendations',
      '3 social campaign posts per week',
      'Holiday-aware calendar planning',
      'Budget tracking',
      'Ad analysis preview',
      'Extra posting days available as add-ons',
    ],
    stripeKey: 'growth',
  },
  {
    name: 'Pro Marketing Pods',
    monthly: '$599',
    yearly: '$5,750',
    bestFor: 'Best for brands running multiple campaigns.',
    features: [
      'Up to 7 active pods',
      'Full pod analysis',
      'Launch planning',
      'Content calendar generation',
      '6 social campaign posts per week',
      'Budget dashboard',
      'Ad analysis dashboard',
      'Approval workflow for AI recommendations',
    ],
    stripeKey: 'pro',
  },
  {
    name: 'Scale / Agency Pods',
    monthly: '$1,299',
    yearly: '$12,470',
    bestFor: 'Best for agencies, teams, or users managing many brands.',
    features: [
      'Up to 12 active pods',
      'Multi-brand campaign planning',
      'Advanced calendar generation',
      '7 social campaign posts per week',
      'Budget and performance tracking',
      'Ad analysis recommendations',
      'Priority early access',
      'Founder support',
    ],
    stripeKey: 'scale',
  },
];

const PRICING_PAGE_TIERS = [
  {
    name: 'Starter Pod',
    monthly: '$89',
    yearly: '$855',
    bestFor: 'Best for one brand, launch, or campaign.',
    features: [
      '1 active pod',
      'Website or image analysis',
      'AI brand/tone summary',
      'Audience and offer direction',
      'Campaign angles',
      '2 social campaign posts per week',
      'Manual budget tracking',
      'Early access features',
    ],
    stripeKey: 'starter',
  },
  {
    name: 'Growth Pods',
    monthly: '$249',
    yearly: '$2,390',
    bestFor: 'Best for small businesses and creators with multiple offers.',
    features: [
      'Up to 3 active pods',
      'Website/app/image analysis',
      'Campaign strategy',
      'Social platform recommendations',
      '3 social campaign posts per week',
      'Holiday-aware calendar planning',
      'Budget tracking',
      'Ad analysis preview',
      'Extra posting days available as add-ons',
    ],
    stripeKey: 'growth',
  },
  {
    name: 'Pro Marketing Pods',
    monthly: '$599',
    yearly: '$5,750',
    bestFor: 'Best for brands running multiple campaigns.',
    features: [
      'Up to 7 active pods',
      'Full pod analysis',
      'Launch planning',
      'Content calendar generation',
      '6 social campaign posts per week',
      'Budget dashboard',
      'Ad analysis dashboard',
      'Approval workflow for AI recommendations',
    ],
    stripeKey: 'pro',
  },
  {
    name: 'Scale / Agency Pods',
    monthly: '$1,299',
    yearly: '$12,470',
    bestFor: 'Best for agencies, teams, or users managing many brands.',
    features: [
      'Up to 12 active pods',
      'Multi-brand campaign planning',
      'Advanced calendar generation',
      '7 social campaign posts per week',
      'Budget and performance tracking',
      'Ad analysis recommendations',
      'Priority early access',
      'Founder support',
    ],
    stripeKey: 'scale',
  },
];

const POD_TABS = [
  'Overview', 'Source', 'AI Analysis', 'Brand DNA', 'Audience', 'Offer',
  'Campaign Strategy', 'Content Ideas', 'Ad Angles', 'Socials', 'Calendar',
  'Holidays', 'Budget', 'Ad Analysis', 'AI Notes', 'Next Moves',
];

const SIDEBAR_NAV_ITEMS = [
  { to: '/pods', label: 'Pods' },
  { to: '/pods/new', label: 'Create Pod' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/account', label: 'Account' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/settings', label: 'Settings' },
];

/* ─── SHARED POD TABS COMPONENT ─── */
function PodTabsView({ pod }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [directionAccepted, setDirectionAccepted] = useState(pod?.status === 'direction_locked' || pod?.status === 'active');
  const [userDirection, setUserDirection] = useState('');

  const podData = pod || {
    pod_name: 'Aurora Skincare Launch',
    pod_type: 'website',
    source_url: 'https://auroraskincare.co',
    target_country: 'Australia',
    accepted_tone: 'Expert, reassuring, modern luxury',
    status: 'awaiting_direction',
  };

  const handleAcceptDirection = async () => {
    setDirectionAccepted(true);
    if (supabaseConfigured && pod?.id) {
      await supabase.from('pods').update({
        status: 'direction_locked',
        accepted_tone: userDirection || 'Expert, reassuring, modern luxury',
        accepted_strategy: 'AI-recommended strategy accepted',
        updated_at: new Date().toISOString(),
      }).eq('id', pod.id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="pod-section-content">
            <h4>Pod: {podData.pod_name}</h4>
            <p><strong>Pod type:</strong> {podData.pod_type}</p>
            <p><strong>Status:</strong> {directionAccepted ? 'Direction locked' : 'Awaiting direction approval'}</p>
            <p><strong>Goal:</strong> Increase qualified leads and repeat purchases</p>
            <p><strong>Target country:</strong> {podData.target_country}</p>
            <p><strong>Current stage:</strong> {directionAccepted ? 'Content planning' : 'Strategy review'}</p>
            <p><strong>Next best marketing move:</strong> Launch hydration-focused ad set to warm traffic</p>
          </div>
        );
      case 'Source':
        return (
          <div className="pod-section-content">
            <h4>Source / Intake</h4>
            <p><strong>Website URL:</strong> {podData.source_url || 'Not provided'}</p>
            <p><strong>Uploaded images:</strong> 3 product photos, 1 lifestyle shot</p>
            <p><strong>Campaign notes:</strong> Winter barrier repair campaign targeting existing customers</p>
            <p><strong>Offer notes:</strong> Bundle discount on night serum + moisturiser</p>
            <p><strong>Product notes:</strong> Serums, moisturisers, seasonal treatment bundles</p>
          </div>
        );
      case 'AI Analysis':
        return (
          <div className="pod-section-content">
            <h4>AI Analysis</h4>
            <p><strong>What the website is about:</strong> Premium skincare brand focused on clean anti-ageing routines for women 24-40</p>
            <p><strong>What is being sold:</strong> Serums, moisturisers, and seasonal treatment bundles</p>
            <p><strong>Brand direction:</strong> Editorial minimalist with botanical luxury cues</p>
            <p><strong>What the customer wants:</strong> Simple, effective routines that feel premium without complexity</p>
            <p><strong>Strongest opportunity:</strong> Hydration-focused messaging outperforms anti-ageing claims by 27%</p>
            {!directionAccepted && (
              <div className="direction-actions">
                <button className="button button-primary" onClick={handleAcceptDirection}>
                  Accept AI Direction
                </button>
                <button className="button button-ghost" onClick={() => setActiveTab('Brand DNA')}>
                  Change Direction
                </button>
              </div>
            )}
            {directionAccepted && <p className="status-chip-gold">Direction accepted and locked</p>}
          </div>
        );
      case 'Brand DNA':
        return (
          <div className="pod-section-content">
            <h4>Brand DNA</h4>
            <p><strong>Brand summary:</strong> Premium skincare for modern women who value efficacy and elegance</p>
            <p><strong>Tone of voice:</strong> {podData.accepted_tone || 'Expert, reassuring, modern luxury'}</p>
            <p><strong>Brand personality:</strong> Confident, knowledgeable, warm</p>
            <p><strong>Visual/style notes:</strong> Soft lighting, close-up textures, botanical elements</p>
            <p><strong>Words to use:</strong> Nourish, restore, glow, ritual, radiance</p>
            <p><strong>Words to avoid:</strong> Cheap, basic, quick fix, miracle</p>
            <p><strong>Locked-in tone:</strong> {directionAccepted ? (podData.accepted_tone || 'Expert luxury') : 'Pending approval'}</p>
            {!directionAccepted && (
              <div style={{ marginTop: '0.8rem' }}>
                <label>
                  Your preferred direction (optional):
                  <textarea
                    rows={3}
                    value={userDirection}
                    onChange={(e) => setUserDirection(e.target.value)}
                    placeholder="e.g. Make it cheeky and bold instead of luxury..."
                  />
                </label>
                <button className="button button-primary" style={{ marginTop: '0.5rem' }} onClick={handleAcceptDirection}>
                  Lock In This Direction
                </button>
              </div>
            )}
          </div>
        );
      case 'Audience':
        return (
          <div className="pod-section-content">
            <h4>Audience</h4>
            <p><strong>Ideal customer:</strong> Women 24-40, urban professionals, value premium skincare</p>
            <p><strong>Pain points:</strong> Overwhelmed by options, worried about ageing, want simple routines</p>
            <p><strong>Desires:</strong> Glowing skin, confidence, feeling put-together without complexity</p>
            <p><strong>Objections:</strong> Price concerns, already have a routine, unsure what works</p>
            <p><strong>Buying triggers:</strong> Before/after results, expert endorsement, limited offers</p>
            <p><strong>Where they are online:</strong> Instagram, TikTok, Pinterest, beauty blogs</p>
            <p><strong>What they need to hear:</strong> Science-backed, visible results in weeks, simple to use</p>
          </div>
        );
      case 'Offer':
        return (
          <div className="pod-section-content">
            <h4>Offer</h4>
            <p><strong>Product:</strong> Winter Barrier Repair Bundle (Night Serum + Moisturiser)</p>
            <p><strong>Price:</strong> $89 bundle (save $24)</p>
            <p><strong>Main angle:</strong> Protect your skin barrier before winter strips it</p>
            <p><strong>Bonuses:</strong> Free travel-size cleanser with bundle</p>
            <p><strong>Urgency:</strong> Winter stock limited, seasonal bundle ends in 14 days</p>
            <p><strong>Why act now:</strong> Prevention is easier than repair \u2014 start before the cold hits</p>
            <p><strong>CTA:</strong> Get Your Winter Bundle</p>
          </div>
        );
      case 'Campaign Strategy':
        return (
          <div className="pod-section-content">
            <h4>Campaign Strategy</h4>
            <p><strong>Main goal:</strong> Drive bundle sales to existing warm audience</p>
            <p><strong>Campaign message:</strong> Your skin barrier needs protection before winter, not after</p>
            <p><strong>Launch angle:</strong> Seasonal urgency + education</p>
            <p><strong>Content theme:</strong> Hydration science meets cosy winter ritual</p>
            <p><strong>Funnel direction:</strong> Awareness reel \u2192 Education carousel \u2192 Bundle offer \u2192 Retarget</p>
            <p><strong>Best channels:</strong> Instagram Reels, Meta Ads, Email</p>
            <p><strong>What to test first:</strong> Hydration hooks vs barrier repair hooks in ad creative</p>
          </div>
        );
      case 'Content Ideas':
        return (
          <div className="pod-section-content">
            <h4>Content Ideas</h4>
            <p><strong>Social posts:</strong></p>
            <ul className="simple-list compact-list">
              <li>Before/after hydration reel with derm-backed caption</li>
              <li>Myth-busting carousel on retinol and barrier repair</li>
              <li>Founder story short video with product stack CTA</li>
            </ul>
            <p><strong>Reel/TikTok ideas:</strong></p>
            <ul className="simple-list compact-list">
              <li>"Your evening routine is missing one recovery step"</li>
              <li>"3 signs your barrier is already damaged"</li>
            </ul>
            <p><strong>Email ideas:</strong></p>
            <ul className="simple-list compact-list">
              <li>Winter prep sequence: 3 emails over 5 days</li>
              <li>Bundle launch announcement with early-bird bonus</li>
            </ul>
            <p><strong>Hook bank:</strong></p>
            <ul className="simple-list compact-list">
              <li>"Your moisturiser is not enough for winter"</li>
              <li>"3 signs your barrier is already damaged"</li>
              <li>"The one step your evening routine is missing"</li>
              <li>"Why hydration beats anti-ageing in winter"</li>
            </ul>
          </div>
        );
      case 'Ad Angles':
        return (
          <div className="pod-section-content">
            <h4>Ad Angles</h4>
            <ul className="simple-list compact-list">
              <li><strong>Pain-point:</strong> "Your skin barrier is breaking down and you might not even know"</li>
              <li><strong>Desire:</strong> "Wake up to plump, hydrated skin every morning"</li>
              <li><strong>Before/after:</strong> "Week 1 vs Week 4 \u2014 same routine, visible glow"</li>
              <li><strong>Founder story:</strong> "I created this because my own skin was suffering"</li>
              <li><strong>Limited drop:</strong> "Winter bundle. 200 units. Once they sell, they sell."</li>
              <li><strong>Problem/solution:</strong> "Dry skin in winter? Your moisturiser is not enough."</li>
              <li><strong>Luxury/status:</strong> "The routine women with great skin actually follow"</li>
              <li><strong>Price/value:</strong> "$89 for two products that replace your entire shelf"</li>
              <li><strong>Emotional:</strong> "You deserve to feel confident in your skin this winter"</li>
            </ul>
          </div>
        );
      case 'Socials':
        return (
          <div className="pod-section-content">
            <h4>Socials</h4>
            <p><strong>Recommended platforms for this pod:</strong></p>
            <div className="cards-grid" style={{ marginTop: '0.5rem' }}>
              {['Instagram', 'TikTok', 'Pinterest', 'Facebook'].map((platform) => (
                <article key={platform} className="panel detail-card">
                  <h4>{platform}</h4>
                  <p className="subtle">Platform-specific content direction ready</p>
                  <p className="subtle"><strong>Posting permission:</strong> Not connected</p>
                  <p className="subtle"><strong>Ad permission:</strong> Not connected</p>
                  <button className="button button-ghost button-sm">Connect Account</button>
                  <p className="subtle" style={{ fontSize: '0.75rem' }}>Posting and ads: Requires connection and user approval</p>
                </article>
              ))}
            </div>
            <p className="subtle" style={{ marginTop: '0.8rem' }}>Important: Users must connect each platform securely via OAuth. Dovroyn cannot post or run ads until you connect and grant permission. No passwords are stored.</p>
          </div>
        );
      case 'Calendar':
        return (
          <div className="pod-section-content">
            <h4>Content Calendar</h4>
            <p><strong>Tier:</strong> Growth (20 content days/month)</p>
            <p><strong>Target country:</strong> {podData.target_country}</p>
            <p><strong>Calendar length:</strong> Based on paid months</p>
            <p><strong>Calendar status:</strong> Ready to generate</p>
            <div style={{ marginTop: '0.5rem' }}>
              <button className="button button-primary">Generate Calendar</button>
            </div>
            <p className="subtle" style={{ marginTop: '0.5rem' }}>Calendar will be generated from the pod's analysed website/campaign/images, using the accepted/locked-in tone, selected platforms, paid tier, and target country.</p>
            <p className="subtle">Content posting to multiple platforms happens on the same campaign day unless you choose otherwise.</p>
            <p className="subtle">You can preview, edit, approve, or regenerate before anything posts.</p>
          </div>
        );
      case 'Holidays':
        return (
          <div className="pod-section-content">
            <h4>Public Holidays / Seasonal Marketing</h4>
            <p><strong>Target country:</strong> {podData.target_country}</p>
            <p><strong>Upcoming opportunities:</strong></p>
            <ul className="simple-list compact-list">
              <li>Mother's Day (May) \u2014 Gift bundle campaign</li>
              <li>EOFY Sales (June) \u2014 Clearance + new season launch</li>
              <li>Father's Day (September) \u2014 Gift sets for him</li>
              <li>Black Friday (November) \u2014 Biggest sale of the year</li>
              <li>Christmas (December) \u2014 Gift sets and luxury packaging</li>
              <li>New Year (January) \u2014 Fresh start / new routine angle</li>
              <li>Easter (April) \u2014 Seasonal reset campaign</li>
            </ul>
            <p className="subtle">AI will recommend content close to seasonal dates and factor holidays into calendar generation. Real holiday API integration coming soon.</p>
          </div>
        );
      case 'Budget':
        return (
          <div className="pod-section-content">
            <h4>Budget Tracker</h4>
            <div className="cards-grid">
              <article className="panel detail-card">
                <h4>Planned ad budget</h4>
                <p>$2,000/month</p>
              </article>
              <article className="panel detail-card">
                <h4>Ad spend used</h4>
                <p>$847 this month</p>
              </article>
              <article className="panel detail-card">
                <h4>Spend by platform</h4>
                <p>Meta: $520 | Instagram: $327</p>
              </article>
              <article className="panel detail-card">
                <h4>Leads generated</h4>
                <p>142</p>
              </article>
              <article className="panel detail-card">
                <h4>Sales/revenue</h4>
                <p>$4,230</p>
              </article>
              <article className="panel detail-card">
                <h4>Return on ad spend</h4>
                <p>4.99x</p>
              </article>
              <article className="panel detail-card">
                <h4>Cost per lead</h4>
                <p>$5.96</p>
              </article>
              <article className="panel detail-card">
                <h4>Cost per sale</h4>
                <p>$29.79</p>
              </article>
            </div>
            <p className="subtle" style={{ marginTop: '0.5rem' }}>Manual input for MVP. Real ad platform spend syncing coming soon.</p>
          </div>
        );
      case 'Ad Analysis':
        return (
          <div className="pod-section-content">
            <h4>Ad Analysis</h4>
            <p><strong>What is running:</strong> 3 active ad sets across Meta and Instagram</p>
            <p><strong>Best performing:</strong> Hydration reel hook \u2014 4.2% CTR</p>
            <p><strong>Worst performing:</strong> Anti-ageing static \u2014 0.8% CTR</p>
            <p><strong>Best hooks:</strong> "Your evening routine is missing one step", "3 signs your barrier is damaged"</p>
            <p><strong>What to test next:</strong> Founder story video, before/after carousel</p>
            <p><strong>Competitor observation:</strong> Luma Botanics using ingredient transparency with strong results</p>
            <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'var(--card)', borderRadius: '12px' }}>
              <p><strong>AI Recommendation:</strong></p>
              <p className="subtle">Shift 40% of budget from static ads to Reels. Test founder story angle with hydration hook.</p>
              <p className="subtle" style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>This change requires your approval before anything is modified.</p>
              <div className="direction-actions">
                <button className="button button-primary button-sm">Approve Change</button>
                <button className="button button-ghost button-sm">Reject</button>
              </div>
            </div>
          </div>
        );
      case 'AI Notes':
        return (
          <div className="pod-section-content">
            <h4>AI Notes / Memory</h4>
            <ul className="simple-list compact-list">
              <li><strong>Decisions made:</strong> Hydration-first messaging chosen over anti-ageing</li>
              <li><strong>Accepted tone:</strong> Expert, reassuring, modern luxury</li>
              <li><strong>Rejected suggestions:</strong> "Playful" tone rejected by user in Week 1</li>
              <li><strong>User preferences:</strong> Prefers carousel over single-image posts</li>
              <li><strong>Past campaign notes:</strong> Quiz landing page converts strongest from social traffic</li>
              <li><strong>Best hooks:</strong> Hydration-focused hooks outperform anti-ageing by 27%</li>
              <li><strong>Brand rules:</strong> Never use the word "cheap" or "basic"</li>
              <li><strong>Things to remember:</strong> Evening skincare content gets best saves and shares</li>
            </ul>
          </div>
        );
      case 'Next Moves':
        return (
          <div className="pod-section-content">
            <h4>Next Marketing Moves</h4>
            <p><strong>Next 3 actions:</strong></p>
            <ul className="simple-list compact-list">
              <li>1. Launch hydration-focused ad set to warm traffic</li>
              <li>2. Publish founder story reel with product stack CTA</li>
              <li>3. Send winter prep email sequence (3 emails over 5 days)</li>
            </ul>
            <p><strong>What needs writing:</strong> Email sequence copy, reel script</p>
            <p><strong>What needs posting:</strong> Monday authority reel, Wednesday carousel</p>
            <p><strong>What needs designing:</strong> Bundle product shot, carousel frames</p>
            <p><strong>What needs testing:</strong> Hydration hook vs barrier repair hook in ads</p>
            <p><strong>What needs approval:</strong> Budget reallocation from static to Reels</p>
            <p><strong>What is blocking progress:</strong> Bundle product photography not yet received</p>
          </div>
        );
      default:
        return <div className="pod-section-content"><p>Select a tab to view pod section.</p></div>;
    }
  };

  return (
    <>
      <div className="pod-tabs">
        {POD_TABS.map((tab) => (
          <button
            key={tab}
            className={`pod-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <section className="panel">
        {renderTabContent()}
      </section>
    </>
  );
}

/* ─── MAIN APP ─── */
function App() {
  const [session, setSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!supabaseConfigured) {
      setBootstrapping(false);
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session ?? null);
        setBootstrapping(false);
      }
    });

    const {
      data: { subscription: authSub },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      isMounted = false;
      authSub.unsubscribe();
    };
  }, []);

  // Load subscription status
  useEffect(() => {
    if (!supabaseConfigured || !session?.user?.id) return;
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setSubscription(data || { tier: 'free', status: 'inactive', max_pods: 0, monthly_content_days: 0 });
      });
  }, [session?.user?.id]);

  if (bootstrapping) {
    return (
      <div className="center-screen" aria-busy="true">
        <span role="status" aria-live="polite">
          Loading {APP_NAME}...
        </span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage session={session} />} />
        <Route path="/login" element={<AuthPage session={session} defaultMode="login" />} />
        <Route path="/signup" element={<AuthPage session={session} defaultMode="signup" />} />
        <Route path="/auth" element={<AuthPage session={session} defaultMode="login" />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/demo-pod" element={<DemoPodPage />} />

        <Route element={<ProtectedRoute session={session} />}>
          <Route
            element={(
              <AppLayout
                user={session?.user}
                subscription={subscription}
                onSignOut={async () => {
                  if (!supabaseConfigured) return;
                  await supabase.auth.signOut();
                }}
              />
            )}
          >
            <Route path="/dashboard" element={<DashboardPage subscription={subscription} />} />
            <Route path="/pods" element={<PodsPage session={session} subscription={subscription} />} />
            <Route path="/pods/new" element={<NewPodPage session={session} subscription={subscription} />} />
            <Route path="/pods/:podId" element={<PodDashboardPage session={session} />} />
            <Route path="/account" element={<AccountPage session={session} subscription={subscription} />} />
            <Route path="/settings" element={<SettingsPage user={session?.user} subscription={subscription} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={session ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ session }) {
  const location = useLocation();
  if (!supabaseConfigured) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

function Wordmark() {
  return (
    <span className="logo-wordmark" aria-label="Dovroyn logo">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-orbit" />
      </span>
      <span>DOVROYN</span>
    </span>
  );
}

/* ─── LANDING PAGE ─── */
function LandingPage({ session }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [billing, setBilling] = useState('monthly');

  useEffect(() => {
    if (localStorage.getItem('dovroynEarlyAccessDismissed') === 'true') return;
    const timer = setTimeout(() => setModalOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    localStorage.setItem('dovroynEarlyAccessDismissed', 'true');
    setModalOpen(false);
  };

  return (
    <main className="landing-shell">
      <Header />
      <EarlyAccessModal open={modalOpen} onClose={closeModal} />

      <section className="hero-block panel">
        <p className="eyebrow">AI Marketing Pods</p>
        <div className="divider-line" />
        <div className="hero-content-centered">
          <h1>AI marketing pods that turn your <span className="hero-emphasis">website</span>, launch, or campaign into a full growth plan.</h1>
          <p className="hero-gold-line">Built for founders and marketers who need sharper campaign direction without the chaos.</p>
          <p className="lede">Drop in a website, app, offer, campaign, or teaser images. Dovroyn analyses it, shapes the campaign direction, recommends content, maps the calendar, and keeps every marketing move inside one intelligent pod.</p>
          <p className="lede">Each pod learns what you are building, who you are selling to, what tone fits best, what platforms matter, what content should go out, and what marketing move comes next.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => setModalOpen(true)}>Join Early Access</button>
            <NavLink className="button button-ghost" to="/demo-pod">View Demo Pod</NavLink>
          </div>
        </div>
      </section>

      <TesterPodPreview onJoinEarlyAccess={() => setModalOpen(true)} />

      <section className="dashboard-preview">
        <p className="eyebrow">Inside Every Pod</p>
        <h2 className="section-title">Every marketing move visible. Every brand organised.</h2>
        <div className="preview-cards-grid">
          {DASHBOARD_PREVIEW_CARDS.map((card) => (
            <article key={card.title} className="panel preview-card">
              <p className="preview-label">{card.title}</p>
              <p className="preview-metric">{card.metric}</p>
              <p className="preview-note">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-sections">
        {LANDING_SECTIONS.map((section, index) => (
          <article key={section.heading} className="landing-section-item">
            <span className="landing-section-number">{String(index + 1).padStart(2, '0')}</span>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      <section className="platforms-section">
        <p className="eyebrow">Platform Planning</p>
        <h2 className="section-title">Plan campaigns for the places your audience already lives.</h2>
        <p className="lede">Dovroyn helps shape campaign direction for major social, search, content, and community platforms. Posting and ads require users to connect their own approved accounts before anything can go live.</p>
        <div className="platforms-grid">
          {PLATFORMS.map((platform) => {
            const PlatformIcon = platform.icon;
            return (
              <article key={platform.name} className="platform-tile">
                <span className="platform-icon" aria-hidden="true"><PlatformIcon size={16} strokeWidth={1.75} /></span>
                <span className="platform-name">{platform.name}</span>
              </article>
            );
          })}
        </div>
        <p className="platforms-note">Platform availability may depend on official account connection, permissions, region, and API access.</p>
      </section>

      <section className="pricing-section">
        <p className="eyebrow">Early Access Pricing</p>
        <h2 className="section-title">Four tiers. Scale when you are ready.</h2>
        <BillingToggle billing={billing} onChange={setBilling} />
        <div className="pricing-grid">
          {PRICING_TIERS.map((tier) => (
            <article key={tier.name} className="panel pricing-card">
              <h3 className="pricing-tier-name">{tier.name}</h3>
              {billing === 'monthly' ? (
                <>
                  <p className="pricing-price">{tier.monthly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/month</span></p>
                  <p className="pricing-price-yearly">{tier.yearly}/year</p>
                </>
              ) : (
                <>
                  <p className="pricing-price">{tier.yearly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/year</span></p>
                  <p className="pricing-price-yearly">{tier.monthly}/month</p>
                </>
              )}
              <p className="pricing-best-for">{tier.bestFor}</p>
              <ul className="pricing-features">
                {tier.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a className="button button-primary" href={STRIPE_PRICING_LINKS[`${tier.stripeKey}_${billing}`] || '#waitlist'}>
                {STRIPE_PRICING_LINKS[`${tier.stripeKey}_${billing}`] ? 'Subscribe' : 'Join Early Access'}
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-billing-note">Save 20% with yearly billing.</p>
      </section>

      <Footer variant="full" />
    </main>
  );
}

/* ─── BILLING TOGGLE ─── */
function BillingToggle({ billing, onChange }) {
  return (
    <div className="billing-toggle" role="radiogroup" aria-label="Billing period">
      <button
        type="button"
        role="radio"
        className={`billing-toggle-option${billing === 'monthly' ? ' active' : ''}`}
        aria-checked={billing === 'monthly'}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </button>
      <button
        type="button"
        role="radio"
        className={`billing-toggle-option${billing === 'yearly' ? ' active' : ''}`}
        aria-checked={billing === 'yearly'}
        onClick={() => onChange('yearly')}
      >
        Yearly <span className="billing-toggle-badge">Save 20%</span>
      </button>
    </div>
  );
}

/* ─── DEMO POD PAGE (public) ─── */
function DemoPodPage() {
  return (
    <main className="landing-shell">
      <Header variant="page" showNav />

      <section className="hero-block panel" style={{ padding: '1.5rem' }}>
        <p className="eyebrow">Demo Pod</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Aurora Skincare \u2014 AI Marketing Pod</h2>
        <p className="subtle">This demo shows how Dovroyn analyses a website and builds a complete marketing direction inside one pod.</p>
      </section>

      <PodTabsView pod={null} />

      <Footer />
    </main>
  );
}

/* ─── AUTH PAGE ─── */
function AuthPage({ session, defaultMode = 'login' }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => { setMode(defaultMode); }, [defaultMode]);
  useEffect(() => { if (session) navigate('/dashboard', { replace: true }); }, [navigate, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabaseConfigured) { setError('Missing Supabase environment variables.'); return; }
    setSubmitting(true); setError(''); setMessage('');
    const action = mode === 'login'
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { data: { full_name: name.trim() } } });
    const { error: authError } = await action;
    if (authError) { setError(authError.message); }
    else if (mode === 'signup') { setMessage('Check your inbox to confirm your email.'); navigate('/login', { replace: true }); }
    else { navigate('/dashboard', { replace: true }); }
    setSubmitting(false);
  };

  return (
    <main className="auth-shell">
      <div className="auth-card panel">
        <Wordmark />
        <h1 style={{ fontSize: '1.5rem' }}>{mode === 'login' ? 'Welcome back to Dovroyn' : 'Create your first Dovroyn pod'}</h1>
        <p>Secure pod access powered by Supabase authentication.</p>
        {!supabaseConfigured && <div className="alert">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to enable authentication.</div>}
        <form onSubmit={handleSubmit} className="stack">
          {mode === 'signup' && <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>}
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required /></label>
          {error && <p className="form-error">{error}</p>}
          {message && <p className="subtle">{message}</p>}
          <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Working...' : (mode === 'login' ? 'Log in' : 'Create account')}</button>
        </form>
        <button className="button button-link" type="button" onClick={() => { setError(''); setMessage(''); const next = mode === 'login' ? 'signup' : 'login'; setMode(next); navigate(`/${next}`); }}>
          {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </button>
      </div>
    </main>
  );
}

/* ─── APP LAYOUT ─── */
function AppLayout({ user, subscription, onSignOut }) {
  return (
    <div className="app-layout">
      <aside className="sidebar panel">
        <Wordmark />
        <nav>
          {SIDEBAR_NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-item">{item.label}</NavLink>
          ))}
        </nav>
        {subscription && <p style={{ color: 'var(--gold-soft)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tier: {subscription.tier || 'Free'}</p>}
        <button className="button button-ghost" type="button" onClick={onSignOut}>Sign out</button>
      </aside>
      <section className="content">
        <header className="content-header panel">
          <p className="eyebrow">Dovroyn \u2014 Luxury AI Marketing Pods</p>
          <h2>{user?.email}</h2>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

/* ─── DASHBOARD PAGE ─── */
function DashboardPage({ subscription }) {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h3>Your marketing pods</h3>
          <p className="subtle">Every brand gets its own AI marketing pod.</p>
        </div>
        <NavLink className="button button-primary" to="/pods/new">Create Pod</NavLink>
      </header>

      {subscription && subscription.tier === 'free' && (
        <article className="panel detail-card" style={{ borderColor: 'var(--gold)' }}>
          <h4>Upgrade to start creating pods</h4>
          <p className="subtle">You are on the free tier. Subscribe to a plan to create and manage marketing pods.</p>
          <NavLink className="button button-primary" to="/pricing">View Pricing</NavLink>
        </article>
      )}

      <section className="cards-grid cards-grid-wide">
        {DASHBOARD_PREVIEW_CARDS.map((card) => (
          <article key={card.title} className="panel detail-card">
            <h4>{card.title}</h4>
            <p className="preview-metric">{card.metric}</p>
            <p className="subtle">{card.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

/* ─── POD DASHBOARD (full 16-tab view for authenticated pods) ─── */
function PodDashboardPage({ session }) {
  const { podId } = useParams();
  const [pod, setPod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured || !podId) { setLoading(false); return; }
    supabase.from('pods').select('*').eq('id', podId).single()
      .then(({ data, error }) => {
        if (data) setPod(data);
        setLoading(false);
      });
  }, [podId]);

  if (loading) return <div className="page-stack"><p className="subtle">Loading pod...</p></div>;

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pod Dashboard</p>
          <h3>{pod?.pod_name || 'Pod'}</h3>
          <p className="subtle">{pod?.pod_type} pod \u2014 {pod?.target_country}</p>
        </div>
        <span className="status-tag">{pod?.status || 'created'}</span>
      </header>

      <PodTabsView pod={pod} />
    </div>
  );
}

/* ─── PRICING PAGE ─── */
function PricingPage() {
  const [billing, setBilling] = useState('monthly');
  return (
    <main className="landing-shell pricing-shell">
      <header className="top-nav">
        <Wordmark />
        <nav className="top-nav-links">
          <NavLink className="nav-link-subtle" to="/">Home</NavLink>
          <NavLink className="nav-link-subtle" to="/login">Login</NavLink>
          <a className="button button-primary button-sm" href="/#waitlist">Join Early Access</a>
        </nav>
      </header>

      <section className="hero-block panel">
        <p className="eyebrow">Early Access Pricing</p>
        <h1>Select the <span className="hero-emphasis">pod capacity</span> that matches your marketing needs.</h1>
        <p className="lede">Scale from a focused single-brand pod to full multi-brand marketing intelligence. Every tier includes AI analysis, campaign strategy, and content direction.</p>
      </section>

      <div className="pricing-toggle-row">
        <BillingToggle billing={billing} onChange={setBilling} />
      </div>

      <section className="pricing-grid">
        {PRICING_PAGE_TIERS.map((tier) => (
          <article key={tier.name} className="panel pricing-card">
            <h3 className="pricing-tier-name">{tier.name}</h3>
            {billing === 'monthly' ? (
              <>
                <p className="pricing-price">{tier.monthly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/month</span></p>
                <p className="pricing-price-yearly">{tier.yearly}/year</p>
              </>
            ) : (
              <>
                <p className="pricing-price">{tier.yearly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/year</span></p>
                <p className="pricing-price-yearly">{tier.monthly}/month</p>
              </>
            )}
            <p className="pricing-best-for">{tier.bestFor}</p>
            <ul className="pricing-features">
              {tier.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a className="button button-primary" href={STRIPE_PRICING_LINKS[`${tier.stripeKey}_${billing}`] || '/#waitlist'}>
              {STRIPE_PRICING_LINKS[`${tier.stripeKey}_${billing}`] ? 'Subscribe' : 'Join Early Access'}
            </a>
          </article>
        ))}
      </section>

      <p className="pricing-billing-note" style={{ textAlign: 'center' }}>Save 20% with yearly billing.</p>

      <Footer variant="full" />
    </main>
  );
}

/* ─── SETTINGS PAGE ─── */
function SettingsPage({ user, subscription }) {
  const [settings, setSettings] = useState({ workspace_name: 'Dovroyn Pod Command Centre', theme: 'Editorial Ivory and Navy', timezone: 'UTC', email_notifications: true, weekly_digest: true });
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;
    if (!supabaseConfigured || !user?.id) return;
    supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle()
      .then(({ data, error }) => {
        if (ignore) return;
        if (data) setSettings({ workspace_name: data.workspace_name || 'Dovroyn Pod Command Centre', theme: data.theme || 'Editorial Ivory and Navy', timezone: data.timezone || 'UTC', email_notifications: Boolean(data.email_notifications), weekly_digest: Boolean(data.weekly_digest) });
      });
    return () => { ignore = true; };
  }, [user?.id]);

  const saveSettings = async (event) => {
    event.preventDefault();
    if (!supabaseConfigured || !user?.id) { setStatus('Configure Supabase to save.'); return; }
    const { error } = await supabase.from('user_settings').upsert({ user_id: user.id, ...settings, updated_at: new Date().toISOString() });
    setStatus(error ? error.message : 'Settings updated.');
  };

  return (
    <form className="card-form panel" onSubmit={saveSettings}>
      <h3>Settings</h3>
      <label>Account<input value={user?.email || 'Not signed in'} readOnly /></label>
      <label>Subscription tier<input value={subscription?.tier || 'Free'} readOnly /></label>
      <label>Workspace name<input value={settings.workspace_name} onChange={(e) => setSettings((p) => ({ ...p, workspace_name: e.target.value }))} /></label>
      <label>Theme
        <select value={settings.theme} onChange={(e) => setSettings((p) => ({ ...p, theme: e.target.value }))}>
          <option value="Editorial Ivory and Navy">Editorial Ivory and Navy</option>
          <option value="Antique Gold Luxe">Antique Gold Luxe</option>
          <option value="Soft Cream Contrast">Soft Cream Contrast</option>
        </select>
      </label>
      <label>Timezone
        <select value={settings.timezone} onChange={(e) => setSettings((p) => ({ ...p, timezone: e.target.value }))}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Singapore">Asia/Singapore</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
        </select>
      </label>
      <label className="checkbox-row"><input type="checkbox" checked={settings.email_notifications} onChange={(e) => setSettings((p) => ({ ...p, email_notifications: e.target.checked }))} />Email notifications</label>
      <label className="checkbox-row"><input type="checkbox" checked={settings.weekly_digest} onChange={(e) => setSettings((p) => ({ ...p, weekly_digest: e.target.checked }))} />Weekly digest</label>
      <button className="button button-primary" type="submit">Save settings</button>
      {status && <p className="subtle">{status}</p>}
    </form>
  );
}

export default App;
