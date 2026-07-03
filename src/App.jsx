import { useEffect, useMemo, useState } from 'react';
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

const LANDING_FEATURES = [
  {
    title: 'AI Assistant',
    description:
      'Capture ideas, ask questions, and turn messy thoughts into clear next steps.',
  },
  {
    title: 'Idea Tracker',
    description:
      'Save business ideas, app concepts, product plans, and random sparks before they disappear.',
  },
  {
    title: 'Project Dashboard',
    description: 'See what you’re building, what matters next, and what needs attention.',
  },
  {
    title: 'Task Planning',
    description: 'Break ideas into tasks, priorities, and simple execution steps.',
  },
  {
    title: 'Conversation Memory',
    description: 'Keep useful AI outputs connected to your projects and decisions.',
  },
  {
    title: 'Cloud Sync',
    description: 'Use Supabase-backed login and data storage so your workspace stays connected.',
  },
];

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assistant', label: 'Assistant' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/settings', label: 'Settings' },
];

const IDEA_STATUS = ['New', 'Reviewing', 'Building', 'Paused', 'Launched'];

const SAMPLE_IDEAS = [
  { title: 'Client onboarding flow with AI handoff', status: 'Reviewing' },
  { title: 'Family logistics dashboard', status: 'Building' },
  { title: 'Brand voice system for content ops', status: 'New' },
  { title: 'Internal admin automations', status: 'Paused' },
  { title: 'Weekly planning ritual template', status: 'Launched' },
];

const SAMPLE_PROJECTS = [
  { name: 'Revenue Command Center', category: 'business', progress: 72, status: 'Active' },
  { name: 'Mobile Launch Tracker', category: 'app', progress: 48, status: 'In Planning' },
  { name: 'Identity Refresh System', category: 'brand', progress: 64, status: 'Active' },
  { name: 'Household Ops Board', category: 'family', progress: 33, status: 'At Risk' },
  { name: 'Quarterly Admin Pipeline', category: 'admin', progress: 82, status: 'Stable' },
  { name: 'Personal Growth Map', category: 'personal', progress: 57, status: 'Active' },
];

const TASK_COLUMNS = {
  Today: ['Refine onboarding checklist', 'Review AI assistant output for sprint scope'],
  'This week': ['Ship dashboard KPI cards', 'Plan copy for dovroyn.com launch page'],
  Later: ['Map automation integrations', 'Document workspace playbooks'],
  Completed: ['Organise current project backlog'],
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
    return <div className="center-screen">Loading {APP_NAME}...</div>;
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

function Wordmark() {
  return (
    <span className="logo-wordmark" aria-label="Dovroyn logo">
      <span className="logo-mark" aria-hidden="true">
        ◉
      </span>
      <span>DOVROYN</span>
    </span>
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
            Get started
          </NavLink>
        </div>
      </header>

      <section className="hero-block panel">
        <p className="eyebrow">AI operations workspace · dovroyn.com</p>
        <h1>Turn scattered ideas into organised action.</h1>
        <p className="lede">
          Dovroyn helps you plan, track, and build your ideas with AI support, project memory,
          dashboards, and task management in one focused workspace.
        </p>
        <div className="hero-actions">
          <NavLink className="button button-primary" to="/signup">
            Get started
          </NavLink>
          <NavLink className="button button-ghost" to="/assistant">
            Open AI assistant
          </NavLink>
          <NavLink className="button button-ghost" to="/dashboard">
            Explore dashboard
          </NavLink>
        </div>
      </section>

      <section className="features-grid">
        {LANDING_FEATURES.map((feature) => (
          <article key={feature.title} className="panel feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <footer className="landing-footer">Dovroyn by Anglow Digital PTY LTD.</footer>
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

          {error && <p className="form-message">{error}</p>}
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
            navigate(nextMode === 'login' ? '/login' : '/signup');
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
          <p className="eyebrow">Dovroyn workspace</p>
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
        <article className="panel welcome-card">
          <p className="eyebrow">Welcome card</p>
          <h3>Welcome to Dovroyn</h3>
          <p>Focus your ideas, tasks, and projects in one coordinated workspace.</p>
        </article>

        <article className="panel quick-actions">
          <p className="eyebrow">Quick actions</p>
          <div className="action-buttons">
            <NavLink className="button button-ghost" to="/ideas">
              New idea
            </NavLink>
            <NavLink className="button button-ghost" to="/tasks">
              New task
            </NavLink>
            <NavLink className="button button-ghost" to="/assistant">
              Open assistant
            </NavLink>
            <NavLink className="button button-ghost" to="/projects">
              View projects
            </NavLink>
          </div>
        </article>
      </section>

      <section className="cards-grid">
        <article className="panel">
          <h3>Recent ideas</h3>
          <ul className="simple-list">
            {recentIdeas.map((idea) => (
              <li key={idea.title}>
                <span>{idea.title}</span>
                <span className="status-tag">{idea.status}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Active projects</h3>
          <ul className="simple-list">
            {SAMPLE_PROJECTS.slice(0, 3).map((project) => (
              <li key={project.name}>
                <span>{project.name}</span>
                <span className="subtle">{project.progress}%</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Today’s tasks</h3>
          <ul className="simple-list">
            {TASK_COLUMNS.Today.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
          <NavLink className="button button-ghost" to="/assistant">
            AI assistant shortcut
          </NavLink>
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
      <div className="panel chat-window">
        {messages.length === 0 ? (
          <p className="subtle">
            Ask Dovroyn to organise an idea, create a plan, write copy, break down a task, or
            track your next move.
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
          placeholder="Ask Dovroyn to organise an idea, create a plan, write copy, break down a task, or track your next move."
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
          <h3>Idea cards</h3>
        </div>
        <button className="button button-primary" type="button">
          Add idea
        </button>
      </header>

      <section className="cards-grid">
        {SAMPLE_IDEAS.map((idea) => (
          <article key={idea.title} className="panel">
            <h3>{idea.title}</h3>
            <p className="subtle">Capture and move this idea into focused execution.</p>
            <div className="status-row">
              {IDEA_STATUS.map((status) => (
                <span
                  key={status}
                  className={`status-tag ${status === idea.status ? 'active-tag' : ''}`}
                >
                  {status}
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
          <p className="eyebrow">Projects</p>
          <h3>Project cards</h3>
        </div>
      </header>

      <section className="cards-grid">
        {SAMPLE_PROJECTS.map((project) => (
          <article key={project.name} className="panel">
            <p className="eyebrow">{project.category}</p>
            <h3>{project.name}</h3>
            <p className="subtle">Status: {project.status}</p>
            <div className="progress-track" aria-label={`${project.name} progress`}>
              <span style={{ width: `${project.progress}%` }} />
            </div>
            <p className="subtle">Progress: {project.progress}%</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function TasksPage() {
  const columns = useMemo(() => Object.entries(TASK_COLUMNS), []);

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Tasks</p>
          <h3>Execution board</h3>
        </div>
      </header>

      <section className="task-board">
        {columns.map(([title, items]) => (
          <article key={title} className="panel task-column">
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
        <input value={user?.email ?? 'Not signed in'} disabled />
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
          <option value="Premium Dark">Premium Dark</option>
          <option value="Midnight Blue">Midnight Blue</option>
          <option value="Electric Violet">Electric Violet</option>
        </select>
      </label>

      <label>
        Connected account
        <input value={supabaseConfigured ? 'Supabase connected' : 'Supabase not configured'} disabled />
      </label>

      <label>
        Domain
        <input value="dovroyn.com" disabled />
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
