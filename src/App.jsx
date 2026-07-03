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

const LANDING_SECTIONS = [
  {
    heading: 'One pod per brand, launch, or campaign.',
    body: 'Create a dedicated AI marketing pod for each brand, product, offer, or launch. Each pod keeps your strategy, content ideas, campaign direction, and audience notes in one focused space.',
  },
  {
    heading: 'Marketing strategy that builds itself.',
    body: 'Each pod analyses your brand positioning, surfaces high-value campaign angles, recommends content hooks, and suggests ad direction so you always know what to run next.',
  },
  {
    heading: 'Content, campaigns, and growth moves in one place.',
    body: 'Plan social posts, shape ad creative, map offer funnels, and track what is working across every brand without switching between scattered tools.',
  },
  {
    heading: 'Your next marketing move, always visible.',
    body: 'See which campaigns need attention, which content is ready to go, and which growth opportunities are waiting to be actioned.',
  },
];

const DASHBOARD_PREVIEW_CARDS = [
  { title: 'Active pods', metric: '12 Active', description: 'Brands, launches, and campaigns currently being managed by AI.' },
  { title: 'Marketing ideas', metric: '24 Surfaced', description: 'Content hooks, ad angles, and campaign concepts ready to review.' },
  { title: 'Campaign angles', metric: '8 Ready', description: 'Tested creative directions waiting to be launched or scheduled.' },
  { title: 'Content plans', metric: '6 Drafts', description: 'Weekly post and ad plans shaped by pod intelligence.' },
  { title: 'Launch moves', metric: '3 Queued', description: 'Upcoming product or offer launches with strategy mapped.' },
  { title: 'Audience insights', metric: '5 New', description: 'Fresh targeting signals and audience behaviour patterns found.' },
];

const SIDEBAR_NAV_ITEMS = [
  { to: '/pods', label: 'Pods' },
  { to: '/website-analysis', label: 'Website Analysis' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/competitor-watch', label: 'Competitor Watch' },
  { to: '/content-planner', label: 'Content Planner' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/settings', label: 'Settings' },
];

const SAMPLE_PODS = [
  {
    id: 'aurora-skincare',
    brandName: 'Aurora Skincare',
    websiteUrl: 'https://auroraskincare.co',
    industry: 'Skincare',
    status: 'Analysed',
    lastAnalysis: '2 hours ago',
    targetMarketSummary: 'Women 24-40 seeking clean anti-ageing routines',
    nextRecommendedAction: 'Launch hydration-focused ad set to warm traffic',
    postsAvailableThisWeek: 6,
    connectedSocialsStatus: 'Instagram connected • TikTok setup required',
    brandColours: ['#A47B4A', '#E9DFC9', '#324033', '#1D211C'],
    brandAesthetic: 'Editorial minimalist with botanical luxury cues',
    toneOfVoice: 'Expert, reassuring, modern luxury',
    productsOrServices: 'Serums, moisturisers, seasonal treatment bundles',
    bestPagesToPromote: ['/collections/anti-ageing', '/quiz/skin-routine', '/products/night-serum'],
    recommendedPosts: [
      'Before/after hydration reel with derm-backed caption',
      'Myth-busting carousel on retinol and barrier repair',
      'Founder story short video with product stack CTA',
    ],
    recommendedAds: [
      'UGC style testimonial ad for winter repair kit',
      'Problem-solution static ad for night serum',
      'Lead magnet ad driving to skin routine quiz',
    ],
    competitorInsights: [
      {
        competitor: 'Luma Botanics',
        angle: 'Ingredient transparency and quick routine formats',
        whyWorking: 'Clear transformation promise and visual simplicity',
        response: 'Publish side-by-side ingredient education reels',
      },
      {
        competitor: 'PureDerm Lab',
        angle: 'Doctor-style authority hooks',
        whyWorking: 'Trust-led creative lowers purchase hesitation',
        response: 'Use practitioner-backed quote cards and FAQ ads',
      },
    ],
    performanceNotes: 'Quiz landing page converts strongest from social traffic. Product grid page has high bounce on mobile.',
    learningHistory: [
      'Week 1: Hydration hooks outperformed anti-ageing claims by 27%.',
      'Week 2: Evening skincare creative generated best saves and shares.',
      'Week 3: Landing page with shorter form increased lead conversion.',
    ],
    audienceProfile: 'Urban professionals who value premium but practical skincare',
    strongestPages: ['/quiz/skin-routine', '/products/night-serum'],
    weakPages: ['/blog', '/shipping-policy'],
    seoContentOpportunities: 'Expand ingredient education cluster and FAQ schema',
    conversionSuggestions: 'Shorten hero copy and test single primary CTA above fold',
    socialPlatforms: ['Instagram', 'TikTok', 'Pinterest'],
    mainGoal: 'Increase qualified leads and repeat purchases',
  },
  {
    id: 'forge-fitness',
    brandName: 'Forge Fitness Studio',
    websiteUrl: 'https://forgefitnessstudio.com',
    industry: 'Fitness',
    status: 'Learning',
    lastAnalysis: 'Yesterday',
    targetMarketSummary: 'Busy professionals 25-45 wanting structured programs',
    nextRecommendedAction: 'Push trial class landing page for commuter districts',
    postsAvailableThisWeek: 4,
    connectedSocialsStatus: 'Meta connected • YouTube coming soon',
    brandColours: ['#BC8A4B', '#EEE4D0', '#34322E', '#121210'],
    brandAesthetic: 'Industrial premium gym with disciplined performance style',
    toneOfVoice: 'Direct, motivating, no fluff',
    productsOrServices: 'Group classes, nutrition coaching, personal training',
    bestPagesToPromote: ['/trial-class', '/coaching', '/schedule'],
    recommendedPosts: [
      'Coach tip reel: 20-minute strength routine for office workers',
      'Client transformation carousel with weekly milestone proof',
      'Nutrition myth breakdown with call to book consult',
    ],
    recommendedAds: [
      'Trial class lead ad by suburb segment',
      'Transformation story video ad with urgency offer',
      'Retargeting ad for abandoned booking flow',
    ],
    competitorInsights: [
      {
        competitor: 'Atlas Strength Club',
        angle: 'Community challenge campaigns',
        whyWorking: 'Strong social proof and accountability positioning',
        response: 'Launch 21-day pod-tracked challenge creative',
      },
    ],
    performanceNotes: 'Trial class page has strong click-through but checkout drop-off remains high.',
    learningHistory: [
      'Week 1: Morning-focused hooks produced strongest CTR.',
      'Week 2: Suburb-specific copy lifted qualified leads.',
    ],
    audienceProfile: 'Time-poor workers aiming for strength and consistency',
    strongestPages: ['/trial-class', '/coaching'],
    weakPages: ['/about'],
    seoContentOpportunities: 'Create intent pages for suburb + personal training searches',
    conversionSuggestions: 'Add social proof near booking CTA and reduce checkout steps',
    socialPlatforms: ['Facebook', 'Instagram'],
    mainGoal: 'Increase trial-to-membership conversion rate',
  },
];

const CAMPAIGN_SUGGESTIONS = [
  {
    campaignName: 'Winter Barrier Reset',
    targetMarket: 'Dry-skin skincare buyers 24-40',
    platform: 'Instagram Reels',
    hook: 'Your evening routine is missing one recovery step',
    creativeDirection: 'Soft lighting, close-up textures, dermatologist cue cards',
    landingPage: '/quiz/skin-routine',
    suggestedBudget: 'Setup required',
    status: 'Ready for review',
  },
  {
    campaignName: 'Commuter Strength Sprint',
    targetMarket: 'Office professionals near CBD gyms',
    platform: 'Meta Feed + Stories',
    hook: 'Get stronger in 45 minutes before work',
    creativeDirection: 'High-contrast training clips with progress overlays',
    landingPage: '/trial-class',
    suggestedBudget: 'Coming soon',
    status: 'Drafting creative',
  },
];

const COMPETITOR_WATCH = [
  {
    competitorName: 'Luma Botanics',
    observedAngle: 'Ingredient transparency as premium proof',
    whyItMayBeWorking: 'Builds trust fast and handles objections in-feed',
    suggestedResponse: 'Publish ingredient comparison cards and testimonial overlays',
    recommendedIdea: 'Ad idea: "Know what your serum actually does."',
  },
  {
    competitorName: 'Atlas Strength Club',
    observedAngle: 'Challenge-based offer with countdown urgency',
    whyItMayBeWorking: 'Clear deadline pushes immediate signups',
    suggestedResponse: 'Run pod-specific 14-day challenge with weekly social proof',
    recommendedIdea: 'Content idea: coach-led challenge kickoff short video',
  },
];

const CONTENT_PLAN = [
  {
    title: 'Monday authority reel',
    type: 'Post idea',
    platform: 'Instagram',
    captionDraft: 'Three signs your current skincare routine is costing results.',
    creativeDirection: 'Close-up product texture clips with overlay tips',
    linkedLandingPage: '/collections/anti-ageing',
  },
  {
    title: 'Wednesday conversion ad',
    type: 'Ad idea',
    platform: 'Meta Ads',
    captionDraft: 'Start with one trial class. Leave with your 8-week roadmap.',
    creativeDirection: 'Fast cuts: warm-up, coaching cue, member win quote',
    linkedLandingPage: '/trial-class',
  },
  {
    title: 'Friday objection post',
    type: 'Post idea',
    platform: 'TikTok',
    captionDraft: '"I don\'t have time" is exactly why this routine works.',
    creativeDirection: 'Point-of-view style with text-first storytelling',
    linkedLandingPage: '/quiz/skin-routine',
  },
];

const PRICING_TIERS = [
  {
    name: 'Starter',
    features: [
      '2 pods',
      '2 posts per week',
      'Basic website analysis',
      'Basic content suggestions',
    ],
  },
  {
    name: 'Growth',
    features: [
      '5 pods',
      '5 posts per week',
      'Deeper website analysis',
      'Content planner',
      'Social connection placeholders',
    ],
  },
  {
    name: 'Scale',
    features: [
      '10 pods',
      'Daily content suggestions',
      'Competitor watch',
      'Campaign recommendations',
      'Pod learning history',
    ],
  },
  {
    name: 'Empire',
    features: [
      'Custom or unlimited pods',
      'Advanced competitor intelligence',
      'Ad campaign automation placeholders',
      'Team/client access',
      'Priority features',
    ],
  },
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
            <Route path="/website-analysis" element={<WebsiteAnalysisPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/competitor-watch" element={<CompetitorWatchPage />} />
            <Route path="/content-planner" element={<ContentPlannerPage />} />
            <Route path="/settings" element={<SettingsPage user={session?.user} />} />

            <Route path="/assistant" element={<Navigate to="/pods" replace />} />
            <Route path="/ideas" element={<Navigate to="/pods" replace />} />
            <Route path="/projects" element={<Navigate to="/campaigns" replace />} />
            <Route path="/tasks" element={<Navigate to="/content-planner" replace />} />
            <Route path="/profile" element={<Navigate to="/settings" replace />} />
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

function LandingPage({ session }) {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('');

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistStatus('Thank you! You will receive early access updates soon.');
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
        <p className="eyebrow">AI Marketing Pods</p>
        <div className="divider-line" />
        <div className="hero-content-centered">
          <h1>
            AI marketing pods for every <span className="hero-emphasis">brand</span>, launch, and campaign.
          </h1>
          <p className="hero-gold-line">
            A luxury AI marketing command centre built for founders running multiple brands at once.
          </p>
          <h2 className="hero-supporting">
            Dovroyn helps you plan content, shape offers, find campaign angles, and turn scattered marketing ideas into clear growth moves.
          </h2>
          <p className="lede">
            Create a dedicated AI pod for each brand, product, offer, or launch. Each pod keeps your strategy, content ideas, campaign direction, audience notes, and next marketing moves in one calm workspace.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#waitlist">
              Join the Waitlist
            </a>
            <NavLink className="button button-ghost" to={session ? '/pods' : '/login'}>
              View Demo Pods
            </NavLink>
          </div>
        </div>
      </section>

      {/* Waitlist / Early Access */}
      <section className="waitlist-section panel" id="waitlist">
        <p className="eyebrow">Early Access</p>
        <h2 className="waitlist-heading">AI marketing pods for every brand you are building.</h2>
        <form className="waitlist-form" onSubmit={handleWaitlist}>
          <input
            type="email"
            placeholder="Enter your email to get early access"
            value={waitlistEmail}
            onChange={(e) => setWaitlistEmail(e.target.value)}
            required
          />
          <button className="button button-primary" type="submit">
            Join the Waitlist
          </button>
        </form>
        {waitlistStatus && <p className="waitlist-confirmation">{waitlistStatus}</p>}
        <p className="waitlist-note">Free to join. Early users will receive launch updates and first access to Dovroyn.</p>
      </section>

      {/* Dashboard Preview Cards */}
      <section className="dashboard-preview">
        <p className="eyebrow">Your Marketing Command Centre</p>
        <h2 className="section-title">Every campaign visible. Every brand organised.</h2>
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

      {/* Footer */}
      <footer className="landing-footer">
        <p className="footer-copyright">&copy; 2026 Dovroyn. Built by Anglow Digital PTY LTD.</p>
        <nav className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

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
        <h1>{mode === 'login' ? 'Welcome back to Dovroyn' : 'Create your first Dovroyn pod'}</h1>
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
        <NavLink className="button button-primary" to="/pods/new">
          Create Pod
        </NavLink>
        <button className="button button-ghost" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </aside>
      <section className="content">
        <header className="content-header panel">
          <p className="eyebrow">Dovroyn AI marketing command centre</p>
          <h2>{user?.email}</h2>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

function DashboardPage() {
  const primaryPod = SAMPLE_PODS[0];

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h3>{primaryPod.brandName} pod dashboard</h3>
          <p className="subtle">Every brand gets its own AI marketing brain. This dashboard tracks what to run next.</p>
        </div>
        <NavLink className="button button-ghost" to={`/pods/${primaryPod.id}`}>
          Open full pod dashboard
        </NavLink>
      </header>

      <section className="cards-grid cards-grid-wide">
        <article className="panel detail-card">
          <h4>Website analysed</h4>
          <p>{primaryPod.websiteUrl}</p>
        </article>
        <article className="panel detail-card">
          <h4>Brand colours</h4>
          <div className="palette-row">
            {primaryPod.brandColours.map((colour) => (
              <span key={colour} className="palette-swatch" style={{ backgroundColor: colour }} title={colour} />
            ))}
          </div>
        </article>
        <article className="panel detail-card">
          <h4>Brand aesthetic</h4>
          <p>{primaryPod.brandAesthetic}</p>
        </article>
        <article className="panel detail-card">
          <h4>Target audience</h4>
          <p>{primaryPod.audienceProfile}</p>
        </article>
        <article className="panel detail-card">
          <h4>Best pages to promote</h4>
          <ul className="simple-list compact-list">
            {primaryPod.bestPagesToPromote.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </article>
        <article className="panel detail-card">
          <h4>Next best action</h4>
          <p>{primaryPod.nextRecommendedAction}</p>
        </article>
      </section>

      <section className="cards-grid">
        <article className="panel">
          <h3>Recommended posts</h3>
          <ul className="simple-list compact-list">
            {primaryPod.recommendedPosts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h3>Recommended ads</h3>
          <ul className="simple-list compact-list">
            {primaryPod.recommendedAds.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h3>Performance notes</h3>
          <p className="subtle">{primaryPod.performanceNotes}</p>
          <p className="status-chip">Learning history active</p>
        </article>
      </section>
    </div>
  );
}

function PodsPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pods</p>
          <h3>All AI marketing pods</h3>
        </div>
        <NavLink className="button button-primary" to="/pods/new">
          Create Pod
        </NavLink>
      </header>

      <section className="cards-grid cards-grid-wide">
        {SAMPLE_PODS.map((pod) => (
          <article key={pod.id} className="panel pod-card">
            <div className="pod-card-head">
              <h3>{pod.brandName}</h3>
              <span className="status-tag">{pod.status}</span>
            </div>
            <div className="pod-card-meta">
              <p><strong>Website URL:</strong> {pod.websiteUrl}</p>
              <p><strong>Last analysis:</strong> {pod.lastAnalysis}</p>
              <p><strong>Target market summary:</strong> {pod.targetMarketSummary}</p>
              <p><strong>Next recommended action:</strong> {pod.nextRecommendedAction}</p>
              <p><strong>Posts available this week:</strong> {pod.postsAvailableThisWeek}</p>
              <p><strong>Connected socials status:</strong> {pod.connectedSocialsStatus}</p>
            </div>
            <div className="action-buttons">
              <NavLink className="button button-ghost" to={`/pods/${pod.id}`}>
                Open pod dashboard
              </NavLink>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function CreatePodPage() {
  const [form, setForm] = useState({
    brandName: '',
    websiteUrl: '',
    industry: '',
    mainGoal: '',
    preferredPlatforms: '',
    toneStyleNotes: '',
  });

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Create Pod</p>
          <h3>Create a dedicated AI marketing pod</h3>
          <p className="subtle">Pod provisioning saves to frontend placeholder state until backend creation is wired.</p>
        </div>
      </header>

      <form className="card-form panel" onSubmit={(event) => event.preventDefault()}>
        <div className="field-grid">
          <label>
            Brand/business name
            <input
              value={form.brandName}
              onChange={(event) => setForm((prev) => ({ ...prev, brandName: event.target.value }))}
              placeholder="Example: Aurora Skincare"
            />
          </label>

          <label>
            Website URL
            <input
              value={form.websiteUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, websiteUrl: event.target.value }))}
              placeholder="https://yourbrand.com"
            />
          </label>

          <label>
            Industry
            <input
              value={form.industry}
              onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
              placeholder="Skincare, fitness, SaaS, ecommerce..."
            />
          </label>

          <label>
            Main goal
            <input
              value={form.mainGoal}
              onChange={(event) => setForm((prev) => ({ ...prev, mainGoal: event.target.value }))}
              placeholder="Lead generation, sales, awareness..."
            />
          </label>

          <label>
            Preferred platforms
            <input
              value={form.preferredPlatforms}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, preferredPlatforms: event.target.value }))
              }
              placeholder="Meta, Instagram, TikTok, YouTube..."
            />
          </label>

          <label>
            Tone/style notes
            <textarea
              rows={4}
              value={form.toneStyleNotes}
              onChange={(event) => setForm((prev) => ({ ...prev, toneStyleNotes: event.target.value }))}
              placeholder="Luxury, direct-response, conversational, technical..."
            />
          </label>
        </div>

        <section className="cards-grid">
          <article className="panel detail-card">
            <h4>Website scrape</h4>
            <p className="status-chip">Analyse</p>
            <p className="subtle">Setup required</p>
          </article>
          <article className="panel detail-card">
            <h4>Social publishing</h4>
            <p className="status-chip">Connect</p>
            <p className="subtle">Coming soon</p>
          </article>
          <article className="panel detail-card">
            <h4>Ad account publishing</h4>
            <p className="status-chip">Connect</p>
            <p className="subtle">Setup required</p>
          </article>
        </section>

        <button className="button button-primary" type="submit">
          Save pod details (placeholder)
        </button>
      </form>
    </div>
  );
}

function PodDashboardPage() {
  const { podId } = useParams();
  const pod = SAMPLE_PODS.find((item) => item.id === podId) ?? SAMPLE_PODS[0];

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pod Dashboard</p>
          <h3>{pod.brandName}</h3>
          <p className="subtle">Dedicated AI marketing hub for this single brand.</p>
        </div>
        <span className="status-tag">{pod.status}</span>
      </header>

      <section className="detail-grid">
        <article className="panel detail-card">
          <h4>Website analysis</h4>
          <p>{pod.websiteUrl}</p>
          <p className="subtle">Last analysis: {pod.lastAnalysis}</p>
        </article>
        <article className="panel detail-card">
          <h4>Brand profile</h4>
          <p>{pod.brandAesthetic}</p>
          <p className="subtle">Tone: {pod.toneOfVoice}</p>
          <p className="subtle">Products/services: {pod.productsOrServices}</p>
        </article>
        <article className="panel detail-card">
          <h4>Audience profile</h4>
          <p>{pod.audienceProfile}</p>
          <p className="subtle">Target market: {pod.targetMarketSummary}</p>
        </article>
        <article className="panel detail-card">
          <h4>Best pages to promote</h4>
          <ul className="simple-list compact-list">
            {pod.bestPagesToPromote.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </article>
        <article className="panel detail-card">
          <h4>Recommended content</h4>
          <ul className="simple-list compact-list">
            {pod.recommendedPosts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="panel detail-card">
          <h4>Recommended ads</h4>
          <ul className="simple-list compact-list">
            {pod.recommendedAds.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="cards-grid">
        <article className="panel">
          <h3>Competitor insights</h3>
          <ul className="simple-list compact-list">
            {pod.competitorInsights.map((insight) => (
              <li key={insight.competitor}>
                <div>
                  <strong>{insight.competitor}</strong>
                  <p className="subtle">{insight.angle}</p>
                  <p className="subtle">Why it may be working: {insight.whyWorking}</p>
                  <p className="subtle">Suggested response: {insight.response}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Learning history</h3>
          <ul className="simple-list compact-list">
            {pod.learningHistory.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Connected socials</h3>
          <p>{pod.connectedSocialsStatus}</p>
          <p className="status-chip">Connect</p>
          <h3>Performance summary</h3>
          <p className="subtle">{pod.performanceNotes}</p>
          <h3>Next best action</h3>
          <p>{pod.nextRecommendedAction}</p>
        </article>
      </section>
    </div>
  );
}

function WebsiteAnalysisPage() {
  const pod = SAMPLE_PODS[0];

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Website Analysis</p>
          <h3>{pod.brandName}</h3>
          <p className="subtle">Website intelligence snapshot from pod analysis.</p>
        </div>
      </header>

      <section className="cards-grid cards-grid-wide">
        <article className="panel detail-card">
          <h4>Colour palette pulled from site</h4>
          <div className="palette-row">
            {pod.brandColours.map((colour) => (
              <span key={colour} className="palette-swatch" style={{ backgroundColor: colour }} title={colour} />
            ))}
          </div>
        </article>
        <article className="panel detail-card">
          <h4>Aesthetic summary</h4>
          <p>{pod.brandAesthetic}</p>
        </article>
        <article className="panel detail-card">
          <h4>Product/service summary</h4>
          <p>{pod.productsOrServices}</p>
        </article>
        <article className="panel detail-card">
          <h4>Strongest pages</h4>
          <ul className="simple-list compact-list">
            {pod.strongestPages.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </article>
        <article className="panel detail-card">
          <h4>Weak pages</h4>
          <ul className="simple-list compact-list">
            {pod.weakPages.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </article>
        <article className="panel detail-card">
          <h4>SEO/content opportunities</h4>
          <p>{pod.seoContentOpportunities}</p>
        </article>
        <article className="panel detail-card">
          <h4>Conversion suggestions</h4>
          <p>{pod.conversionSuggestions}</p>
          <p className="status-chip">Analyse</p>
        </article>
      </section>
    </div>
  );
}

function CampaignsPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Campaigns</p>
          <h3>Suggested ad and post campaigns</h3>
        </div>
      </header>

      <section className="cards-grid cards-grid-wide">
        {CAMPAIGN_SUGGESTIONS.map((campaign) => (
          <article key={campaign.campaignName} className="panel detail-card">
            <h4>{campaign.campaignName}</h4>
            <p><strong>Target market:</strong> {campaign.targetMarket}</p>
            <p><strong>Platform:</strong> {campaign.platform}</p>
            <p><strong>Hook:</strong> {campaign.hook}</p>
            <p><strong>Creative direction:</strong> {campaign.creativeDirection}</p>
            <p><strong>Landing page:</strong> {campaign.landingPage}</p>
            <p><strong>Suggested budget placeholder:</strong> {campaign.suggestedBudget}</p>
            <p><strong>Status:</strong> {campaign.status}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function CompetitorWatchPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Competitor Watch</p>
          <h3>Competitor and ad insight cards</h3>
        </div>
      </header>

      <section className="cards-grid cards-grid-wide">
        {COMPETITOR_WATCH.map((item) => (
          <article key={item.competitorName} className="panel detail-card">
            <h4>{item.competitorName}</h4>
            <p><strong>Observed angle:</strong> {item.observedAngle}</p>
            <p><strong>Why it may be working:</strong> {item.whyItMayBeWorking}</p>
            <p><strong>Suggested response:</strong> {item.suggestedResponse}</p>
            <p><strong>Recommended content/ad idea:</strong> {item.recommendedIdea}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function ContentPlannerPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Content Planner</p>
          <h3>Weekly content plan per pod</h3>
        </div>
      </header>

      <section className="cards-grid cards-grid-wide">
        {CONTENT_PLAN.map((item) => (
          <article key={item.title} className="panel detail-card">
            <h4>{item.title}</h4>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Platform:</strong> {item.platform}</p>
            <p><strong>Caption draft:</strong> {item.captionDraft}</p>
            <p><strong>Creative direction:</strong> {item.creativeDirection}</p>
            <p><strong>Linked landing page:</strong> {item.linkedLandingPage}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

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
            Join Waitlist
          </a>
        </nav>
      </header>

      <section className="hero-block panel">
        <p className="eyebrow">Pricing</p>
        <h1>
          Select the <span className="hero-emphasis">capacity</span> that matches your marketing needs.
        </h1>
        <p className="lede">
          Scale from focused pod support to full multi-brand marketing intelligence with an elegant
          control layer for your team.
        </p>
      </section>

      <section className="cards-grid cards-grid-wide">
        {PRICING_TIERS.map((tier) => (
          <article key={tier.name} className="panel detail-card">
            <h3>{tier.name}</h3>
            <ul className="simple-list compact-list">
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <footer className="landing-footer">
        <p className="footer-copyright">&copy; 2026 Dovroyn. Built by Anglow Digital PTY LTD.</p>
        <nav className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </main>
  );
}

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
