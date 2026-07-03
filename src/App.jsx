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
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import { supabase, supabaseConfigured } from './lib/supabaseClient';

const APP_NAME = 'Dovroyn';
const APP_DOMAIN = 'dovroyn.com';
const COMPANY_NAME = 'Anglow Digital PTY LTD';

const NAV_ITEMS = [
  { to: '/assistant', label: 'Assistant' },
  { to: '/brand-pods', label: 'Brand Pods' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/settings', label: 'Settings' },
];

const HERO_PODS = [
  {
    name: 'Gidgee & Co',
    status: 'Building',
    nextTask: 'Finalize winter launch storyboard',
    aiNotes: 'Refined hero narrative for seasonal campaign.',
    progress: 62,
  },
  {
    name: 'Luxara',
    status: 'Planning',
    nextTask: 'Approve editorial shoot list',
    aiNotes: 'Suggested premium channel mix for launch phase.',
    progress: 44,
  },
  {
    name: 'Cheeky Drawers',
    status: 'Testing',
    nextTask: 'Review conversion copy sprint',
    aiNotes: 'Drafted playful tone options with CTA variants.',
    progress: 73,
  },
  {
    name: 'The Cleaning Hub',
    status: 'Launched',
    nextTask: 'Schedule post-launch recap',
    aiNotes: 'Surface top retention opportunities this week.',
    progress: 86,
  },
  {
    name: 'Anglow Digital',
    status: 'Planning',
    nextTask: 'Map Q3 service packaging',
    aiNotes: 'Outlined consultancy bundle structure.',
    progress: 38,
  },
  {
    name: 'Dovroyn',
    status: 'Building',
    nextTask: 'Prioritize dashboard release scope',
    aiNotes: 'Ranked critical UX flows by impact.',
    progress: 67,
  },
];

const LANDING_FEATURES = [
  {
    title: 'Brand Pods',
    description: 'Each business, idea, or project gets its own organised workspace.',
  },
  {
    title: 'AI Strategy Assistant',
    description:
      'Ask Dovroyn to turn messy thoughts into plans, copy, campaigns, or next steps.',
  },
  {
    title: 'Content Calendar',
    description: 'Plan posts, campaigns, launches, and platform activity across brands.',
  },
  {
    title: 'Project Tracker',
    description: 'Track what is planning, building, testing, launched, or paused.',
  },
  {
    title: 'Business Vault',
    description: 'Save supplier notes, product ideas, brand copy, links, and useful decisions.',
  },
  {
    title: 'Next Move Board',
    description: 'See what matters today and what needs action next.',
  },
];

const DASHBOARD_NEXT_MOVES = [
  'Approve Luxara launch narrative',
  'Confirm campaign hooks for Gidgee & Co',
  'Review AI brief for Dovroyn onboarding update',
];

const DASHBOARD_LAUNCHES = [
  { name: 'Cheeky Drawers Awareness Sprint', window: '2 days', stage: 'Testing' },
  { name: 'Anglow Digital Offer Stack', window: '5 days', stage: 'Planning' },
  { name: 'Dovroyn Product Narrative', window: '7 days', stage: 'Building' },
];

const DASHBOARD_CONVERSATIONS = [
  'Launch sequence for a new service bundle',
  'Organise notes into a quarterly content campaign',
  'Decide this week’s highest impact growth task',
];

const CONTENT_CALENDAR_PREVIEW = [
  { day: 'Mon', level: 'full' },
  { day: 'Tue', level: 'mid' },
  { day: 'Wed', level: 'mid' },
  { day: 'Thu', level: 'low' },
  { day: 'Fri', level: 'full' },
  { day: 'Sat', level: 'low' },
  { day: 'Sun', level: 'none' },
];

const IDEA_STATUS = ['New', 'Reviewing', 'Building', 'Paused', 'Launched'];
const IDEA_PRIORITY = ['High', 'Medium', 'Low'];

const SAMPLE_IDEAS = [
  {
    title: 'Premium referral partnership program',
    category: 'Growth',
    status: 'Reviewing',
    priority: 'High',
    nextAction: 'Prepare partner shortlist and outreach note.',
  },
  {
    title: 'Podcast-backed brand authority series',
    category: 'Content',
    status: 'New',
    priority: 'Medium',
    nextAction: 'Outline pilot episode themes and guests.',
  },
  {
    title: 'AI-powered onboarding concierge',
    category: 'Product',
    status: 'Building',
    priority: 'High',
    nextAction: 'Validate the first guided setup flow.',
  },
  {
    title: 'Supplier intelligence vault template',
    category: 'Operations',
    status: 'Paused',
    priority: 'Low',
    nextAction: 'Archive notes and revisit next sprint.',
  },
];

const BRAND_PODS = [
  {
    name: 'Gidgee & Co',
    status: 'Building',
    nextAction: 'Lock the launch content arc.',
    notesCount: 14,
    tasksCount: 8,
    progress: 62,
  },
  {
    name: 'Luxara',
    status: 'Planning',
    nextAction: 'Approve campaign concept moodboard.',
    notesCount: 11,
    tasksCount: 6,
    progress: 44,
  },
  {
    name: 'Cheeky Drawers',
    status: 'Testing',
    nextAction: 'Finalize paid social test variants.',
    notesCount: 18,
    tasksCount: 10,
    progress: 73,
  },
  {
    name: 'The Cleaning Hub',
    status: 'Launched',
    nextAction: 'Prepare retention content sprint.',
    notesCount: 9,
    tasksCount: 4,
    progress: 86,
  },
  {
    name: 'Anglow Digital',
    status: 'Planning',
    nextAction: 'Define offer stack landing sequence.',
    notesCount: 13,
    tasksCount: 7,
    progress: 38,
  },
  {
    name: 'Dovroyn',
    status: 'Building',
    nextAction: 'Ship command centre dashboard polish.',
    notesCount: 22,
    tasksCount: 12,
    progress: 67,
  },
];

const TASK_COLUMNS = {
  Today: [
    'Approve Dovroyn onboarding copy',
    'Ask Dovroyn for launch priority stack',
    'Review Luxara campaign timeline',
  ],
  'This week': [
    'Map content sequence for Gidgee & Co',
    'Ship Brand Pod status update',
    'Organise supplier notes in Business Vault',
  ],
  Waiting: [
    'Client feedback on The Cleaning Hub assets',
    'Final artwork exports for Cheeky Drawers',
  ],
  Completed: [
    'Defined command centre navigation model',
    'Set premium dashboard copy direction',
  ],
};

function createLocalId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

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
            <Route path="/dashboard" element={<DashboardPage user={session?.user} />} />
            <Route path="/assistant" element={<AssistantPage user={session?.user} />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/brand-pods" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/settings" element={<SettingsPage user={session?.user} />} />
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

function Wordmark({ darkOnCream = false }) {
  return (
    <span className={`logo-wordmark ${darkOnCream ? 'dark-wordmark' : ''}`} aria-label="Dovroyn logo">
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-orbit" />
      </span>
      <span>DOVROYN</span>
    </span>
  );
}

function PodCalendarDots({ compact = false }) {
  return (
    <div className={`calendar-dots ${compact ? 'compact' : ''}`}>
      {CONTENT_CALENDAR_PREVIEW.map((item) => (
        <span key={item.day} className={`dot ${item.level}`} title={item.day} />
      ))}
    </div>
  );
}

function LandingPage({ session }) {
  return (
    <main className="landing-shell">
      <header className="top-nav">
        <Wordmark />
        <div className="top-nav-actions">
          <NavLink className="button button-ghost" to="/login">
            Login
          </NavLink>
          <NavLink className="button button-primary" to={session ? '/dashboard' : '/signup'}>
            Get Started
          </NavLink>
        </div>
      </header>

      <section className="hero-block panel">
        <p className="eyebrow">Premium AI workspace · {APP_DOMAIN}</p>
        <h1>
          YOUR AI COMMAND CENTRE
          <br />
          FOR EVERY IDEA, BRAND &amp; PROJECT
        </h1>
        <p className="lede">
          Dovroyn helps you capture ideas, organise projects, plan content, track tasks, and build
          your business ecosystem without the agency overhead.
        </p>
        <div className="hero-actions">
          <NavLink className="button button-primary" to={session ? '/assistant' : '/login'}>
            Start with AI
          </NavLink>
          <NavLink className="button button-ghost" to={session ? '/dashboard' : '/login'}>
            Open Dashboard
          </NavLink>
          <NavLink className="button button-ghost" to={session ? '/signup' : '/signup'}>
            Get Started
          </NavLink>
        </div>
      </section>

      <section className="pod-preview-grid">
        {HERO_PODS.map((pod) => (
          <article key={pod.name} className="pod-card cream-card">
            <div className="pod-card-header">
              <h3>{pod.name}</h3>
              <span className="status-tag">{pod.status}</span>
            </div>
            <p className="card-label">Next task</p>
            <p className="subtle dark">{pod.nextTask}</p>
            <p className="card-label">AI notes</p>
            <p className="subtle dark">{pod.aiNotes}</p>
            <p className="card-label">Content calendar</p>
            <PodCalendarDots compact />
            <div className="pod-meta-row">
              <span className="platform-pill">IG</span>
              <span className="platform-pill">FB</span>
              <span className="platform-pill">TT</span>
              <span className="platform-pill">YT</span>
            </div>
            <div className="progress-track dark-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pod.progress} aria-label={`${pod.name} progress`}>
              <span style={{ width: `${pod.progress}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="statement-grid">
        <article className="panel statement-card">
          <p className="eyebrow">Section 1</p>
          <h2>YOUR DEDICATED BRAND POD ECOSYSTEM</h2>
          <p>
            Manage every brand, project, idea, launch, and AI conversation inside one calm command
            centre.
          </p>
        </article>
        <article className="panel statement-card">
          <p className="eyebrow">Section 2</p>
          <h2>DITCH THE AGENCY OVERHEAD</h2>
          <p>
            Use AI to plan campaigns, write content, organise ideas, track launches, and map your
            next business move without juggling ten different tools.
          </p>
        </article>
      </section>

      <section className="feature-grid">
        {LANDING_FEATURES.map((feature) => (
          <article key={feature.title} className="cream-card feature-card">
            <h3>{feature.title}</h3>
            <p className="subtle dark">{feature.description}</p>
          </article>
        ))}
      </section>

      <footer className="landing-footer">{APP_NAME} by {COMPANY_NAME}.</footer>
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
        <h1>{mode === 'login' ? 'Welcome back to Dovroyn' : 'Create your Dovroyn workspace'}</h1>
        <p>Secure access powered by Supabase authentication.</p>

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
          {NAV_ITEMS.map((item) => (
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
          <p className="eyebrow">Brand Command Centre</p>
          <h2>{user?.email}</h2>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

function DashboardPage({ user }) {
  const [status, setStatus] = useState('');
  const [recentIdeas, setRecentIdeas] = useState(SAMPLE_IDEAS.slice(0, 3));

  useEffect(() => {
    let ignore = false;

    const loadIdeas = async () => {
      if (!supabaseConfigured || !user?.id) {
        setStatus('Showing sample workspace data until Supabase is configured.');
        return;
      }

      const { data, error } = await supabase
        .from('ideas')
        .select('title, status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (ignore) return;

      if (error || !data?.length) {
        setStatus('Connect an ideas table in Supabase to replace sample content.');
      } else {
        setRecentIdeas(data);
        setStatus('Connected to Supabase workspace data.');
      }
    };

    loadIdeas();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <div className="page-stack">
      {status && <p className="subtle">{status}</p>}

      <section className="cards-grid cards-grid-wide">
        <article className="cream-card welcome-card">
          <Wordmark darkOnCream />
          <h3>Welcome back</h3>
          <p className="subtle dark">Your ecosystem is ready. Here is what needs focus today.</p>
        </article>

        <article className="panel quick-actions">
          <p className="eyebrow">Quick actions</p>
          <div className="action-buttons">
            <NavLink className="button button-ghost" to="/assistant">
              Ask Dovroyn
            </NavLink>
            <NavLink className="button button-ghost" to="/brand-pods">
              New brand pod
            </NavLink>
            <NavLink className="button button-ghost" to="/ideas">
              New idea
            </NavLink>
            <NavLink className="button button-ghost" to="/tasks">
              New task
            </NavLink>
            <NavLink className="button button-primary" to="/assistant">
              Plan campaign
            </NavLink>
          </div>
        </article>
      </section>

      <section className="cards-grid cards-grid-wide">
        <article className="panel">
          <h3>Today’s next move</h3>
          <ul className="simple-list">
            {DASHBOARD_NEXT_MOVES.map((move) => (
              <li key={move}>{move}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Active launches</h3>
          <ul className="simple-list">
            {DASHBOARD_LAUNCHES.map((launch) => (
              <li key={launch.name}>
                <span>{launch.name}</span>
                <span className="status-tag">{launch.stage}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Saved ideas</h3>
          <ul className="simple-list">
            {recentIdeas.map((idea) => (
              <li key={idea.title}>
                <span>{idea.title}</span>
                <span className="status-tag">{idea.status}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="cards-grid cards-grid-wide">
        <article className="panel">
          <h3>Brand pod grid</h3>
          <div className="mini-pod-grid">
            {BRAND_PODS.slice(0, 6).map((pod) => (
              <article key={pod.name} className="mini-pod-card">
                <h4>{pod.name}</h4>
                <p className="subtle">{pod.status}</p>
                <div className="progress-track" role="progressbar" aria-label={`${pod.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pod.progress}>
                  <span style={{ width: `${pod.progress}%` }} />
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Recent AI conversations</h3>
          <ul className="simple-list">
            {DASHBOARD_CONVERSATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="cream-card">
          <h3>Content calendar preview</h3>
          <p className="subtle dark">Weekly campaign rhythm across your active brand pods.</p>
          <PodCalendarDots />
        </article>
      </section>
    </div>
  );
}

function AssistantPage({ user }) {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadMessages = async () => {
      if (!supabaseConfigured || !user?.id) return;

      const { data, error } = await supabase
        .from('assistant_messages')
        .select('id, role, content, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (ignore) return;

      if (error) {
        setStatus('Create assistant_messages in Supabase to persist chats.');
      } else {
        setMessages(data ?? []);
      }
    };

    loadMessages();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  const handleSend = async (event) => {
    event.preventDefault();
    const content = prompt.trim();
    if (!content) return;

    const userMessage = {
      id: createLocalId(),
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    const assistantMessage = {
      id: createLocalId(),
      role: 'assistant',
      content: `Here’s a suggested action plan for: "${content}".`,
      created_at: new Date().toISOString(),
    };

    setPrompt('');
    setSubmitting(true);
    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    if (supabaseConfigured && user?.id) {
      const payload = [userMessage, assistantMessage].map((message) => ({
        user_id: user.id,
        role: message.role,
        content: message.content,
      }));

      const { error } = await supabase.from('assistant_messages').insert(payload);
      if (error) {
        setStatus('Messages shown locally. Create assistant_messages table to persist history.');
      } else {
        setStatus('Conversation synced to Supabase.');
      }
    } else {
      setStatus('Running in local mode until Supabase is configured.');
    }

    setSubmitting(false);
  };

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Assistant</p>
          <h3>Heart of your product workflow</h3>
        </div>
      </header>

      <div className="panel chat-window">
        {messages.length === 0 ? (
          <p className="subtle">
            Ask Dovroyn to plan a launch, organise an idea, write brand copy, build a campaign, or
            decide your next move.
          </p>
        ) : (
          messages.map((message) => (
            <article key={message.id} className={`chat-bubble ${message.role}`}>
              <p>{message.content}</p>
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="panel chat-form">
        <input
          placeholder="Ask Dovroyn to plan a launch, organise an idea, write brand copy, build a campaign, or decide your next move."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send'}
        </button>
      </form>

      {status && <p className="subtle">{status}</p>}
    </div>
  );
}

function IdeasPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Ideas</p>
          <h3>Idea board</h3>
        </div>
        <button className="button button-primary" type="button">
          Add idea
        </button>
      </header>

      <section className="cards-grid cards-grid-wide">
        {SAMPLE_IDEAS.map((idea) => (
          <article key={idea.title} className="cream-card idea-card">
            <h3>{idea.title}</h3>
            <p className="subtle dark">{idea.nextAction}</p>
            <div className="idea-fields">
              <p>
                <strong>Category:</strong> {idea.category}
              </p>
              <p>
                <strong>Status:</strong> {idea.status}
              </p>
              <p>
                <strong>Priority:</strong> {idea.priority}
              </p>
              <p>
                <strong>Next action:</strong> {idea.nextAction}
              </p>
            </div>
            <div className="status-row">
              {IDEA_STATUS.map((status) => (
                <span key={status} className={`status-tag ${status === idea.status ? 'active-tag' : ''}`}>
                  {status}
                </span>
              ))}
              {IDEA_PRIORITY.map((priority) => (
                <span
                  key={priority}
                  className={`status-tag muted ${priority === idea.priority ? 'active-tag' : ''}`}
                >
                  {priority}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Brand Pods</p>
          <h3>Business ecosystem cards</h3>
        </div>
      </header>

      <section className="cards-grid cards-grid-wide">
        {BRAND_PODS.map((pod) => (
          <article key={pod.name} className="cream-card">
            <div className="pod-card-header">
              <h3>{pod.name}</h3>
              <span className="status-tag">{pod.status}</span>
            </div>
            <p className="subtle dark">
              <strong>Next action:</strong> {pod.nextAction}
            </p>
            <p className="subtle dark">
              <strong>Notes:</strong> {pod.notesCount}
            </p>
            <p className="subtle dark">
              <strong>Tasks:</strong> {pod.tasksCount}
            </p>
            <p className="card-label">Content calendar preview</p>
            <PodCalendarDots compact />
            <div className="progress-track dark-track" role="progressbar" aria-label={`${pod.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pod.progress}>
              <span style={{ width: `${pod.progress}%` }} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function TasksPage() {
  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Tasks</p>
          <h3>Execution board</h3>
        </div>
      </header>

      <section className="task-board">
        {Object.entries(TASK_COLUMNS).map(([title, items]) => (
          <article key={title} className="cream-card task-column">
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

function SettingsPage({ user }) {
  const [settings, setSettings] = useState({
    workspace_name: 'Dovroyn Workspace',
    theme: 'Premium Dark',
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
          workspace_name: data.workspace_name ?? 'Dovroyn Workspace',
          theme: data.theme ?? 'Premium Dark',
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
        Profile
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
        Brand name
        <input value={APP_NAME} readOnly />
      </label>

      <label>
        Domain
        <input value={APP_DOMAIN} readOnly />
      </label>

      <label>
        Connected account
        <input value={supabaseConfigured ? 'Supabase connected' : 'Supabase not configured'} readOnly />
      </label>

      <label>
        Theme
        <select
          value={settings.theme}
          onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value }))}
        >
          <option value="Premium Dark">Premium Dark</option>
          <option value="Olive Editorial">Olive Editorial</option>
          <option value="Cream Contrast">Cream Contrast</option>
        </select>
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
          onChange={(e) => setSettings((prev) => ({ ...prev, email_notifications: e.target.checked }))}
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
