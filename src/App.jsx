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
import './index.css';
import { supabase, supabaseConfigured } from './lib/supabaseClient';

const FALLBACK_METRICS = [
  { label: 'Ideas in progress', value: '14', delta: '+6 this week' },
  { label: 'Open tasks', value: '27', delta: '9 due soon' },
  { label: 'Plans drafted', value: '5', delta: '+2 this month' },
];

const LANDING_FEATURES = [
  {
    title: 'AI Assistant',
    description: 'Brainstorm, break down work, and turn rough notes into action plans instantly.',
    to: '/assistant',
  },
  {
    title: 'Idea Tracker',
    description: 'Capture opportunities, prioritise them, and keep momentum across every project.',
    to: '/ideas',
  },
  {
    title: 'Business Dashboard',
    description: 'Track the numbers and signals that matter without losing strategic context.',
    to: '/dashboard',
  },
  {
    title: 'Task Planning',
    description: 'Convert plans into clear tasks with owners, progress updates, and deadlines.',
    to: '/tasks',
  },
  {
    title: 'Conversation Memory',
    description: 'Keep AI conversations and decisions searchable so every session builds forward.',
    to: '/assistant',
  },
  {
    title: 'Supabase Login & Sync',
    description: 'Secure sign-in and synced workspace data backed by Supabase authentication.',
    to: '/login',
  },
];

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/settings', label: 'Settings' },
];

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
    return <div className="center-screen">Loading Mavora...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage session={session} />} />
        <Route path="/login" element={<AuthPage session={session} mode="login" />} />
        <Route path="/signup" element={<AuthPage session={session} mode="signup" />} />

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
            <Route path="/ideas" element={<IdeasPage user={session?.user} />} />
            <Route path="/tasks" element={<TasksPage user={session?.user} />} />
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

  if (!supabaseConfigured || !session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function LandingPage({ session }) {
  return (
    <main className="landing-shell">
      <header className="top-nav">
        <span className="brand">Mavora</span>
        <div className="top-nav-actions">
          <NavLink className="button button-ghost" to="/login">
            Login
          </NavLink>
          <NavLink className="button button-primary" to={session ? '/dashboard' : '/signup'}>
            Get started
          </NavLink>
        </div>
      </header>

      <section className="hero-grid">
        <div>
          <p className="eyebrow">AI operations workspace</p>
          <h1>Turn scattered ideas into organised action.</h1>
          <p className="lede">
            Mavora helps you plan, track, and build your ideas with AI support, dashboards, and
            project memory in one workspace.
          </p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to="/signup">
              Get started
            </NavLink>
            <NavLink className="button button-ghost" to="/assistant">
              Open AI assistant
            </NavLink>
          </div>
        </div>

        <div className="feature-grid">
          {LANDING_FEATURES.map((feature) => (
            <NavLink key={feature.title} className="glass-panel feature-card" to={feature.to}>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </NavLink>
          ))}
        </div>
      </section>

      <footer className="landing-footer">Mavora by Anglow Digital PTY LTD</footer>
    </main>
  );
}

function AuthPage({ session, mode }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, session]);

  const isSignup = mode === 'signup';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!supabaseConfigured) {
      setError('Missing Supabase environment variables.');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');

    const action = isSignup
      ? supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name.trim() },
          },
        })
      : supabase.auth.signInWithPassword({ email, password });

    const { error: authError } = await action;

    if (authError) {
      setError(authError.message);
    } else if (isSignup) {
      setMessage('Account created. Check your email to confirm, then log in.');
      navigate('/login', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>{isSignup ? 'Create your Mavora account' : 'Welcome back to Mavora'}</h1>
        <p>Secure login and synced workspace data powered by Supabase.</p>

        {!supabaseConfigured && (
          <div className="alert">
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your
            environment to enable authentication.
          </div>
        )}

        <form onSubmit={handleSubmit} className="stack">
          {isSignup && (
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
            {submitting ? 'Working...' : isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <NavLink className="button button-link" to={isSignup ? '/login' : '/signup'}>
          {isSignup ? 'Already have an account? Log in' : 'Need an account? Sign up'}
        </NavLink>
      </div>
    </main>
  );
}

function AppLayout({ user, onSignOut }) {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <p className="brand">Mavora</p>
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
        <header className="content-header">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2>{user?.email}</h2>
          </div>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

function DashboardPage({ user }) {
  const [metrics, setMetrics] = useState(FALLBACK_METRICS);
  const [status, setStatus] = useState('Loading dashboard...');

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (!supabaseConfigured || !user?.id) {
        setStatus('Showing demo metrics until Supabase is connected.');
        return;
      }

      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('label, value, delta')
        .eq('user_id', user.id)
        .order('id', { ascending: true });

      if (ignore) return;

      if (error) {
        setStatus('Using fallback metrics. Create dashboard_metrics to customise this view.');
      } else if (data?.length) {
        setMetrics(data);
        setStatus('Connected to Supabase dashboard metrics.');
      } else {
        setStatus('No metrics yet. Add rows in dashboard_metrics to populate this dashboard.');
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <div className="page-stack">
      <p className="subtle">{status}</p>
      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass-panel">
            <p className="subtle">{metric.label}</p>
            <h3>{metric.value}</h3>
            <p className="positive">{metric.delta}</p>
          </article>
        ))}
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
      content: `Mavora suggests this next action: break "${content}" into milestones and assign a first task today.`,
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
        setStatus('Messages shown locally. Create assistant_messages to persist history.');
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
      <div className="chat-window">
        {messages.length === 0 ? (
          <p className="subtle">Ask Mavora AI to turn an idea into a practical action plan.</p>
        ) : (
          messages.map((message) => (
            <article key={message.id} className={`chat-bubble ${message.role}`}>
              <p>{message.content}</p>
            </article>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="chat-form">
        <input
          placeholder="Ask Mavora AI anything..."
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

function IdeasPage({ user }) {
  const [ideas, setIdeas] = useState([
    { id: 'local-1', title: 'Launch onboarding template library', stage: 'Planning' },
    { id: 'local-2', title: 'Create AI-powered weekly review workflow', stage: 'Research' },
  ]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadIdeas = async () => {
      if (!supabaseConfigured || !user?.id) {
        setStatus('Showing local ideas until Supabase is connected.');
        return;
      }

      const { data, error } = await supabase
        .from('ideas')
        .select('id, title, stage')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ignore) return;

      if (error) {
        setStatus('Create an ideas table in Supabase to sync this view.');
      } else if (data?.length) {
        setIdeas(data);
        setStatus('Ideas synced from Supabase.');
      } else {
        setStatus('No ideas yet. Add rows in your ideas table to populate this page.');
      }
    };

    loadIdeas();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <section className="page-stack">
      <p className="subtle">{status}</p>
      <div className="card-list">
        {ideas.map((idea) => (
          <article key={idea.id} className="glass-panel">
            <p className="subtle">{idea.stage}</p>
            <h3>{idea.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function TasksPage({ user }) {
  const [tasks, setTasks] = useState([
    { id: 'task-1', title: 'Draft business plan milestones', state: 'In progress' },
    { id: 'task-2', title: 'Review AI assistant prompts', state: 'Next up' },
  ]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      if (!supabaseConfigured || !user?.id) {
        setStatus('Showing local tasks until Supabase is connected.');
        return;
      }

      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, state')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ignore) return;

      if (error) {
        setStatus('Create a tasks table in Supabase to sync this view.');
      } else if (data?.length) {
        setTasks(data);
        setStatus('Tasks synced from Supabase.');
      } else {
        setStatus('No tasks yet. Add rows in your tasks table to populate this page.');
      }
    };

    loadTasks();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  return (
    <section className="page-stack">
      <p className="subtle">{status}</p>
      <div className="card-list">
        {tasks.map((task) => (
          <article key={task.id} className="glass-panel">
            <p className="subtle">{task.state}</p>
            <h3>{task.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function SettingsPage({ user }) {
  const [settings, setSettings] = useState({
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
        .select('timezone, email_notifications, weekly_digest')
        .eq('user_id', user.id)
        .maybeSingle();

      if (ignore) return;

      if (error) {
        setStatus('Create user_settings table to persist preferences.');
      } else if (data) {
        setSettings({
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
    <form className="card-form" onSubmit={saveSettings}>
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
