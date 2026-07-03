import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import { supabase, supabaseConfigured } from './lib/supabaseClient';

const APP_NAME = 'Dovroyn';
const APP_DOMAIN = 'dovroyn.com';

// Stripe configuration (add keys to environment variables)
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
    heading: 'Analyse your website, app, offer, or teaser images.',
    body: 'Add a link or upload images. Dovroyn reads the source, understands the brand, and builds a clear marketing direction inside a dedicated AI pod.',
  },
  {
    heading: 'Lock in the direction before anything goes live.',
    body: "Accept the AI's strategy or push back with your own choice. Once the direction is approved, every content idea, ad angle, calendar post, and campaign move follows that locked-in tone.",
  },
  {
    heading: 'Plan your content calendar by tier.',
    body: 'Generate content only for the months you have paid for and the number of content days your tier allows. Preview, edit, approve, and schedule before anything posts.',
  },
  {
    heading: 'Connect socials safely.',
    body: 'Users connect each platform themselves and grant permission before Dovroyn can post content or ads. No connected account, no posting.',
  },
  {
    heading: 'Track budget, results, and better moves.',
    body: 'See what has been spent, what came back, what performed best, and what the AI recommends improving next, with approval required before changes go live.',
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
      '10 content calendar days per month',
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
      '20 content calendar days per month',
      'Holiday-aware calendar planning',
      'Budget tracking',
      'Ad analysis preview',
    ],
    stripeKey: 'growth',
  },
  {
    name: 'Pro Marketing Pods',
    monthly: '$599',
    yearly: '$5,750',
    bestFor: 'Best for brands running multiple campaigns.',
    features: [
      'Up to 10 active pods',
      'Full pod analysis',
      'Launch planning',
      'Content calendar generation',
      '30 content calendar days per month',
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
      'Up to 30 active pods',
      'Multi-brand campaign planning',
      'Advanced calendar generation',
      '30 content calendar days per month per pod',
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
  { to: '/pricing', label: 'Pricing' },
  { to: '/settings', label: 'Settings' },
];

function App() {
  const [session, setSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

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
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
        <Route path="/demo-pod" element={<DemoPodPage />} />

        <Route element={<ProtectedRoute session={session} />}>
          <Route
            element={(
              <AppLayout
                user={session?.user}
                onSignOut={async () => {
                  if (!supabaseConfigured) return;
                  await supabase.auth.signOut();
                }}
              />
            )}
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pods" element={<PodsPage />} />
            <Route path="/pods/new" element={<CreatePodPage />} />
            <Route path="/pods/:podId" element={<PodDashboardPage />} />
            <Route path="/settings" element={<SettingsPage user={session?.user} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={session ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ session }) {
  const location = useLocation();

  if (!supabaseConfigured) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

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
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('');

  const handleWaitlist = async (e) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    // Save to Supabase waitlist table if configured
    if (supabaseConfigured) {
      await supabase.from('waitlist').insert({ email: waitlistEmail.trim() }).select();
    }

    setWaitlistStatus('Thank you! You will receive early access updates and founder pricing soon.');
    setWaitlistEmail('');
  };

  return (
    <main className="landing-shell">
      {/* Header */}
      <header className="top-nav">
        <Wordmark />
        <nav className="top-nav-links">
          <NavLink className="nav-link-subtle" to="/pricing">
            Pricing
          </NavLink>
          <NavLink className="nav-link-subtle" to="/login">
            Login
          </NavLink>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-block panel">
        <p className="eyebrow">Luxury AI Marketing Pods</p>
        <div className="divider-line" />
        <div className="hero-content-centered">
          <h1>
            AI marketing pods that turn your <span className="hero-emphasis">website</span>, launch, or campaign into a full growth plan.
          </h1>
          <p className="hero-gold-line">
            Drop in a website, app, offer, campaign, or teaser images. Dovroyn analyses it, builds your campaign direction, recommends content, maps your calendar, and keeps every marketing move inside one intelligent pod.
          </p>
          <p className="lede">
            Each pod learns what you are building, who you are selling to, what tone fits best, what platforms matter, what content should go out, and what marketing move comes next.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#waitlist">
              Join Early Access
            </a>
            <NavLink className="button button-ghost" to="/demo-pod">
              View Demo Pod
            </NavLink>
          </div>
        </div>
      </section>

      {/* Early Access / Coming Soon */}
      <section className="waitlist-section panel" id="waitlist">
        <p className="eyebrow">Coming Soon</p>
        <h2 className="waitlist-heading">Marketing pods built for brands ready to move.</h2>
        <p className="lede">Enter your email to get early access. Free to join. Early users get launch updates, first access, and founder pricing.</p>
        <form className="waitlist-form" onSubmit={handleWaitlist}>
          <input
            type="email"
            placeholder="Enter your email to get early access"
            value={waitlistEmail}
            onChange={(e) => setWaitlistEmail(e.target.value)}
            required
          />
          <button className="button button-primary" type="submit">
            Join Early Access
          </button>
        </form>
        {waitlistStatus && <p className="waitlist-confirmation">{waitlistStatus}</p>}
        <p className="waitlist-note">Free to join. Early users get launch updates, first access, and founder pricing.</p>
      </section>

      {/* Dashboard Preview Cards */}
      <section className="dashboard-preview">
        <p className="eyebrow">Demo Pod Preview</p>
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

      {/* Content Sections */}
      <section className="landing-sections">
        {LANDING_SECTIONS.map((section) => (
          <article key={section.heading} className="landing-section-item">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>

      {/* Pricing Preview */}
      <section className="pricing-section">
        <p className="eyebrow">Early Access Pricing</p>
        <h2 className="section-title">Four tiers. Scale when you are ready.</h2>
        <div className="pricing-grid">
          {PRICING_TIERS.map((tier) => (
            <article key={tier.name} className="panel pricing-card">
              <h3 className="pricing-tier-name">{tier.name}</h3>
              <p className="pricing-price">{tier.monthly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/month</span></p>
              <p className="pricing-price-yearly">{tier.yearly}/year</p>
              <p className="pricing-best-for">{tier.bestFor}</p>
              <ul className="pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="button button-primary"
                href={STRIPE_PRICING_LINKS[`${tier.stripeKey}_monthly`] || '#waitlist'}
              >
                {STRIPE_PRICING_LINKS[`${tier.stripeKey}_monthly`] ? 'Subscribe' : 'Join Early Access'}
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-billing-note">Save 20% with yearly billing.</p>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Dovroyn. Built by Anglow Digital PTY LTD.</p>
        <nav className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

/* ─── DEMO POD PAGE ─── */
function DemoPodPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [directionAccepted, setDirectionAccepted] = useState(false);
  const [userDirection, setUserDirection] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="pod-section-content">
            <h4>Pod: Aurora Skincare Launch</h4>
            <p><strong>Pod type:</strong> Website analysis</p>
            <p><strong>Status:</strong> {directionAccepted ? 'Direction locked' : 'Awaiting direction approval'}</p>
            <p><strong>Goal:</strong> Increase qualified leads and repeat purchases</p>
            <p><strong>Target country:</strong> Australia</p>
            <p><strong>Current stage:</strong> {directionAccepted ? 'Content planning' : 'Strategy review'}</p>
            <p><strong>Next best marketing move:</strong> Launch hydration-focused ad set to warm traffic</p>
          </div>
        );
      case 'Source':
        return (
          <div className="pod-section-content">
            <h4>Source / Intake</h4>
            <p><strong>Website URL:</strong> https://auroraskincare.co</p>
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
                <button className="button button-primary" onClick={() => setDirectionAccepted(true)}>
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
            <p><strong>Tone of voice:</strong> Expert, reassuring, modern luxury</p>
            <p><strong>Brand personality:</strong> Confident, knowledgeable, warm</p>
            <p><strong>Visual/style notes:</strong> Soft lighting, close-up textures, botanical elements</p>
            <p><strong>Words to use:</strong> Nourish, restore, glow, ritual, radiance</p>
            <p><strong>Words to avoid:</strong> Cheap, basic, quick fix, miracle</p>
            <p><strong>Locked-in tone:</strong> {directionAccepted ? 'Expert luxury' : 'Pending approval'}</p>
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
                <button className="button button-primary" style={{ marginTop: '0.5rem' }} onClick={() => setDirectionAccepted(true)}>
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
            <p><strong>Why act now:</strong> Prevention is easier than repair — start before the cold hits</p>
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
            <p><strong>Funnel direction:</strong> Awareness reel → Education carousel → Bundle offer → Retarget</p>
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
          </div>
        );
      case 'Ad Angles':
        return (
          <div className="pod-section-content">
            <h4>Ad Angles</h4>
            <ul className="simple-list compact-list">
              <li><strong>Pain-point:</strong> "Your skin barrier is breaking down and you might not even know"</li>
              <li><strong>Desire:</strong> "Wake up to plump, hydrated skin every morning"</li>
              <li><strong>Before/after:</strong> "Week 1 vs Week 4 — same routine, visible glow"</li>
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
            <p><strong>Recommended platforms:</strong></p>
            <div className="cards-grid" style={{ marginTop: '0.5rem' }}>
              {['Instagram', 'TikTok', 'Pinterest', 'Facebook'].map((platform) => (
                <article key={platform} className="panel detail-card">
                  <h4>{platform}</h4>
                  <p className="subtle">Platform-specific content direction ready</p>
                  <button className="button button-ghost button-sm">Connect Account</button>
                  <p className="subtle" style={{ fontSize: '0.75rem' }}>Posting: Coming soon</p>
                </article>
              ))}
            </div>
            <p className="subtle" style={{ marginTop: '0.8rem' }}>Ad permissions: Requires connected account and explicit user approval before Dovroyn can post or run ads.</p>
          </div>
        );
      case 'Calendar':
        return (
          <div className="pod-section-content">
            <h4>Content Calendar</h4>
            <p><strong>Tier:</strong> Growth (20 content days/month)</p>
            <p><strong>Target country:</strong> Australia</p>
            <p><strong>Calendar status:</strong> Ready to generate</p>
            <div style={{ marginTop: '0.5rem' }}>
              <button className="button button-primary">Generate Calendar</button>
            </div>
            <p className="subtle" style={{ marginTop: '0.5rem' }}>Calendar will be generated based on locked-in tone, selected platforms, and paid tier. Content posts to all selected platforms on the same campaign day.</p>
            <p className="subtle">Preview, edit, approve, and schedule before anything posts.</p>
          </div>
        );
      case 'Holidays':
        return (
          <div className="pod-section-content">
            <h4>Public Holidays / Seasonal Marketing</h4>
            <p><strong>Target country:</strong> Australia</p>
            <p><strong>Upcoming opportunities:</strong></p>
            <ul className="simple-list compact-list">
              <li>Mother's Day (May) — Gift bundle campaign</li>
              <li>EOFY Sales (June) — Clearance + new season launch</li>
              <li>Black Friday (November) — Biggest sale of the year</li>
              <li>Christmas (December) — Gift sets and luxury packaging</li>
            </ul>
            <p className="subtle">AI will recommend content close to seasonal dates and factor holidays into calendar generation.</p>
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
            </div>
            <p className="subtle">Manual input for MVP. Real ad platform spend syncing coming soon.</p>
          </div>
        );
      case 'Ad Analysis':
        return (
          <div className="pod-section-content">
            <h4>Ad Analysis</h4>
            <p><strong>Best performing:</strong> Hydration reel hook — 4.2% CTR</p>
            <p><strong>Worst performing:</strong> Anti-ageing static — 0.8% CTR</p>
            <p><strong>Best hooks:</strong> "Your evening routine is missing one step", "3 signs your barrier is damaged"</p>
            <p><strong>What to test next:</strong> Founder story video, before/after carousel</p>
            <p><strong>Competitor observation:</strong> Luma Botanics using ingredient transparency with strong results</p>
            <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'var(--card)', borderRadius: '12px' }}>
              <p><strong>AI Recommendation:</strong></p>
              <p className="subtle">Shift 40% of budget from static ads to Reels. Test founder story angle with hydration hook.</p>
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
              <li><strong>Accepted tone:</strong> Expert, reassuring, modern luxury</li>
              <li><strong>Rejected suggestions:</strong> "Playful" tone was rejected by user in Week 1</li>
              <li><strong>User preferences:</strong> Prefers carousel over single-image posts</li>
              <li><strong>Best hooks:</strong> Hydration-focused hooks outperform anti-ageing by 27%</li>
              <li><strong>Brand rules:</strong> Never use the word "cheap" or "basic"</li>
              <li><strong>Past notes:</strong> Evening skincare content gets best saves and shares</li>
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
            <p><strong>Needs writing:</strong> Email sequence copy, reel script</p>
            <p><strong>Needs posting:</strong> Monday authority reel, Wednesday carousel</p>
            <p><strong>Needs designing:</strong> Bundle product shot, carousel frames</p>
            <p><strong>Needs testing:</strong> Hydration hook vs barrier repair hook in ads</p>
            <p><strong>Needs approval:</strong> Budget reallocation from static to Reels</p>
            <p><strong>Blocking progress:</strong> Bundle product photography not yet received</p>
          </div>
        );
      default:
        return <div className="pod-section-content"><p>Select a tab to view pod section.</p></div>;
    }
  };

  return (
    <main className="landing-shell">
      <header className="top-nav">
        <Wordmark />
        <nav className="top-nav-links">
          <NavLink className="nav-link-subtle" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link-subtle" to="/pricing">
            Pricing
          </NavLink>
          <NavLink className="nav-link-subtle" to="/login">
            Login
          </NavLink>
        </nav>
      </header>

      <section className="hero-block panel" style={{ padding: '1.5rem' }}>
        <p className="eyebrow">Demo Pod</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }}>Aurora Skincare — AI Marketing Pod</h2>
        <p className="subtle">This is a demo pod showing how Dovroyn analyses a website and builds a complete marketing direction.</p>
      </section>

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

      <footer className="landing-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Dovroyn. Built by Anglow Digital PTY LTD.</p>
        <nav className="footer-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
        </nav>
      </footer>
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

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, session]);

  const submitLabel = mode === 'login' ? 'Log in' : 'Create account';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!supabaseConfigured) {
      setError('Missing Supabase environment variables.');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');

    const action =
      mode === 'login'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: name.trim() },
            },
          });

    const { error: authError } = await action;

    if (authError) {
      setError(authError.message);
    } else if (mode === 'signup') {
      setMessage('Check your inbox to confirm your email, then log in.');
      navigate('/login', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <main className="auth-shell">
      <div className="auth-card panel">
        <Wordmark />
        <h1 style={{ fontSize: '1.5rem' }}>{mode === 'login' ? 'Welcome back to Dovroyn' : 'Create your first Dovroyn pod'}</h1>
        <p>Secure pod access powered by Supabase authentication.</p>

        {!supabaseConfigured && (
          <div className="alert">
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your
            environment to enable authentication.
          </div>
        )}

        <form onSubmit={handleSubmit} className="stack">
          {mode === 'signup' && (
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
          )}

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}
          {message && <p className="subtle">{message}</p>}

          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? 'Working...' : submitLabel}
          </button>
        </form>

        <button
          className="button button-link"
          type="button"
          onClick={() => {
            setError('');
            setMessage('');
            const nextMode = mode === 'login' ? 'signup' : 'login';
            setMode(nextMode);
            navigate(`/${nextMode}`);
          }}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
        </button>
      </div>
    </main>
  );
}

/* ─── APP LAYOUT ─── */
function AppLayout({ user, onSignOut }) {
  return (
    <div className="app-layout">
      <aside className="sidebar panel">
        <Wordmark />
        <nav>
          {SIDEBAR_NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-item">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="button button-ghost" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </aside>
      <section className="content">
        <header className="content-header panel">
          <p className="eyebrow">Dovroyn — Luxury AI Marketing Pods</p>
          <h2>{user?.email}</h2>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

/* ─── DASHBOARD PAGE ─── */
function DashboardPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h3>Your marketing pods</h3>
          <p className="subtle">Every brand gets its own AI marketing pod. Each pod keeps strategy, content, and marketing moves in one place.</p>
        </div>
        <NavLink className="button button-primary" to="/pods/new">
          Create Pod
        </NavLink>
      </header>

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

/* ─── PODS PAGE ─── */
function PodsPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pods</p>
          <h3>All AI marketing pods</h3>
          <p className="subtle">Create a dedicated pod for each brand, product, offer, or campaign.</p>
        </div>
        <NavLink className="button button-primary" to="/pods/new">
          Create Pod
        </NavLink>
      </header>

      <section className="cards-grid cards-grid-wide">
        <article className="panel pod-card">
          <div className="pod-card-head">
            <h3>Aurora Skincare</h3>
            <span className="status-tag">Demo</span>
          </div>
          <div className="pod-card-meta">
            <p><strong>Type:</strong> Website analysis</p>
            <p><strong>Source:</strong> https://auroraskincare.co</p>
            <p><strong>Direction:</strong> Expert luxury tone (locked)</p>
            <p><strong>Next move:</strong> Launch hydration-focused ad set</p>
          </div>
          <div className="action-buttons">
            <NavLink className="button button-ghost" to="/demo-pod">
              Open pod
            </NavLink>
          </div>
        </article>
      </section>
    </div>
  );
}

/* ─── CREATE POD PAGE ─── */
function CreatePodPage() {
  const [form, setForm] = useState({
    podName: '',
    podType: 'website',
    sourceUrl: '',
    targetCountry: 'Australia',
    notes: '',
  });
  const [step, setStep] = useState(1);

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Create Pod</p>
          <h3>Create a new AI marketing pod</h3>
          <p className="subtle">Each pod is a dedicated marketing workspace for one brand, launch, or campaign.</p>
        </div>
      </header>

      {step === 1 && (
        <form className="card-form panel" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
          <h4>Step 1: Pod details</h4>
          <div className="field-grid">
            <label>
              Pod name
              <input
                value={form.podName}
                onChange={(e) => setForm((prev) => ({ ...prev, podName: e.target.value }))}
                placeholder="e.g. Aurora Skincare Launch"
                required
              />
            </label>

            <label>
              Pod type
              <select
                value={form.podType}
                onChange={(e) => setForm((prev) => ({ ...prev, podType: e.target.value }))}
              >
                <option value="website">Website URL</option>
                <option value="app">App URL</option>
                <option value="product">Product URL</option>
                <option value="campaign">Offer/campaign notes</option>
                <option value="images">Uploaded photos/images</option>
                <option value="teaser">Coming soon teaser images</option>
                <option value="brand">Brand notes</option>
              </select>
            </label>

            <label>
              Source URL (if applicable)
              <input
                value={form.sourceUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, sourceUrl: e.target.value }))}
                placeholder="https://yourbrand.com"
              />
            </label>

            <label>
              Target country
              <select
                value={form.targetCountry}
                onChange={(e) => setForm((prev) => ({ ...prev, targetCountry: e.target.value }))}
              >
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Campaign/brand notes (optional)
              <textarea
                rows={4}
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Anything the AI should know about your brand, offer, or campaign..."
              />
            </label>
          </div>

          <button className="button button-primary" type="submit">
            Next: Add Source
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="card-form panel">
          <h4>Step 2: Add your source</h4>
          <p className="subtle">The AI will analyse your website, app, images, or notes to build your marketing direction.</p>

          <div className="cards-grid">
            <article className="panel detail-card">
              <h4>Website/App Analysis</h4>
              <p className="subtle">Paste a URL and Dovroyn reads the source</p>
              <span className="status-chip">Ready</span>
            </article>
            <article className="panel detail-card">
              <h4>Image Upload</h4>
              <p className="subtle">Upload product photos or teaser images</p>
              <span className="status-chip">Coming soon</span>
            </article>
            <article className="panel detail-card">
              <h4>Campaign Notes</h4>
              <p className="subtle">Paste your offer, campaign, or brand notes</p>
              <span className="status-chip">Ready</span>
            </article>
          </div>

          <button className="button button-primary" onClick={() => setStep(3)}>
            Analyse
          </button>
          <button className="button button-ghost" onClick={() => setStep(1)}>
            Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="card-form panel">
          <h4>Step 3: AI Analysis Complete</h4>
          <p className="subtle">The AI has analysed your source and built a marketing direction. Review it below.</p>

          <article className="panel detail-card">
            <h4>AI Direction Summary</h4>
            <p><strong>Brand direction:</strong> Professional, trustworthy, results-focused</p>
            <p><strong>Audience:</strong> Business owners and marketers ready to scale</p>
            <p><strong>Tone:</strong> Confident, knowledgeable, direct</p>
            <p><strong>Campaign angle:</strong> Authority-led content with clear next steps</p>
          </article>

          <div className="direction-actions">
            <button className="button button-primary">Accept AI Direction</button>
            <button className="button button-ghost" onClick={() => setStep(2)}>Change Direction</button>
          </div>

          <p className="subtle">Once accepted, all pod sections (content, ads, calendar, budget) will follow this locked-in direction.</p>
        </div>
      )}
    </div>
  );
}

/* ─── POD DASHBOARD (for authenticated user pods) ─── */
function PodDashboardPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pod Dashboard</p>
          <h3>Pod details</h3>
          <p className="subtle">Full pod view coming soon. Use the demo pod to preview the complete pod flow.</p>
        </div>
      </header>
      <NavLink className="button button-ghost" to="/demo-pod">
        View Demo Pod
      </NavLink>
    </div>
  );
}

/* ─── PRICING PAGE ─── */
function PricingPage() {
  return (
    <main className="landing-shell pricing-shell">
      <header className="top-nav">
        <Wordmark />
        <nav className="top-nav-links">
          <NavLink className="nav-link-subtle" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link-subtle" to="/login">
            Login
          </NavLink>
          <a className="button button-primary button-sm" href="/#waitlist">
            Join Early Access
          </a>
        </nav>
      </header>

      <section className="hero-block panel">
        <p className="eyebrow">Early Access Pricing</p>
        <h1>
          Select the <span className="hero-emphasis">pod capacity</span> that matches your marketing needs.
        </h1>
        <p className="lede">
          Scale from a focused single-brand pod to full multi-brand marketing intelligence. Every tier includes AI analysis, campaign strategy, and content direction.
        </p>
      </section>

      <section className="pricing-grid">
        {PRICING_TIERS.map((tier) => (
          <article key={tier.name} className="panel pricing-card">
            <h3 className="pricing-tier-name">{tier.name}</h3>
            <p className="pricing-price">{tier.monthly}<span style={{ fontSize: '0.6em', fontWeight: 400 }}>/month</span></p>
            <p className="pricing-price-yearly">{tier.yearly}/year</p>
            <p className="pricing-best-for">{tier.bestFor}</p>
            <ul className="pricing-features">
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              className="button button-primary"
              href={STRIPE_PRICING_LINKS[`${tier.stripeKey}_monthly`] || '/#waitlist'}
            >
              {STRIPE_PRICING_LINKS[`${tier.stripeKey}_monthly`] ? 'Subscribe Now' : 'Join Early Access'}
            </a>
          </article>
        ))}
      </section>

      <p className="pricing-billing-note" style={{ textAlign: 'center' }}>Save 20% with yearly billing.</p>

      <footer className="landing-footer">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Dovroyn. Built by Anglow Digital PTY LTD.</p>
        <nav className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

/* ─── SETTINGS PAGE ─── */
function SettingsPage({ user }) {
  const [settings, setSettings] = useState({
    workspace_name: 'Dovroyn Pod Command Centre',
    theme: 'Editorial Ivory and Navy',
    timezone: 'UTC',
    email_notifications: true,
    weekly_digest: true,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadSettings = async () => {
      if (!supabaseConfigured || !user?.id) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('timezone, email_notifications, weekly_digest, workspace_name, theme')
        .eq('user_id', user.id)
        .maybeSingle();

      if (ignore) return;

      if (error) {
        setStatus('Create user_settings table to persist preferences.');
      } else if (data) {
        setSettings({
          workspace_name: data.workspace_name ?? 'Dovroyn Pod Command Centre',
          theme: data.theme ?? 'Editorial Ivory and Navy',
          timezone: data.timezone ?? 'UTC',
          email_notifications: Boolean(data.email_notifications),
          weekly_digest: Boolean(data.weekly_digest),
        });
      }
    };

    loadSettings();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  const saveSettings = async (event) => {
    event.preventDefault();

    if (!supabaseConfigured || !user?.id) {
      setStatus('Configure Supabase to save settings.');
      return;
    }

    const { error } = await supabase.from('user_settings').upsert({
      user_id: user.id,
      ...settings,
      updated_at: new Date().toISOString(),
    });

    setStatus(error ? error.message : 'Settings updated.');
  };

  return (
    <form className="card-form panel" onSubmit={saveSettings}>
      <h3>Settings</h3>

      <label>
        Account
        <input value={user?.email ?? 'Not signed in'} readOnly />
      </label>

      <label>
        Workspace name
        <input
          value={settings.workspace_name}
          onChange={(e) => setSettings((prev) => ({ ...prev, workspace_name: e.target.value }))}
        />
      </label>

      <label>
        Theme
        <select
          value={settings.theme}
          onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value }))}
        >
          <option value="Editorial Ivory and Navy">Editorial Ivory and Navy</option>
          <option value="Antique Gold Luxe">Antique Gold Luxe</option>
          <option value="Soft Cream Contrast">Soft Cream Contrast</option>
        </select>
      </label>

      <label>
        Connected account
        <input value={supabaseConfigured ? 'Supabase connected' : 'Supabase not configured'} readOnly />
      </label>

      <label>
        Domain
        <input value={APP_DOMAIN} readOnly />
      </label>

      <label>
        Timezone
        <select
          value={settings.timezone}
          onChange={(e) => setSettings((prev) => ({ ...prev, timezone: e.target.value }))}
        >
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Singapore">Asia/Singapore</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
        </select>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={settings.email_notifications}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, email_notifications: e.target.checked }))
          }
        />
        Email notifications
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={settings.weekly_digest}
          onChange={(e) => setSettings((prev) => ({ ...prev, weekly_digest: e.target.checked }))}
        />
        Weekly digest
      </label>

      <button className="button button-primary" type="submit">
        Save settings
      </button>
      {status && <p className="subtle">{status}</p>}
    </form>
  );
}

export default App;
