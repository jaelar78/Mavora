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
  { label: 'Active campaigns', value: '4', delta: '+18%' },
  { label: 'Automations', value: '12', delta: '+7%' },
  { label: 'Team velocity', value: '92%', delta: '+4%' },
];

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/profile', label: 'Profile' },
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
        <Route path="/auth" element={<AuthPage session={session} />} />

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
            <Route path="/profile" element={<ProfilePage user={session?.user} />} />
            <Route path="/settings" element={<SettingsPage user={session?.user} />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={session ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ session }) {
  const location = useLocation();

  if (!supabaseConfigured) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (!session) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function LandingPage({ session }) {
  return (
    <main className="landing-shell">
      <header className="top-nav">
        <span className="brand">Mavora</span>
        <div className="top-nav-actions">
          <NavLink className="button button-ghost" to="/auth">
            Login
          </NavLink>
          <NavLink className="button button-primary" to={session ? '/dashboard' : '/auth'}>
            {session ? 'Go to dashboard' : 'Get started'}
          </NavLink>
        </div>
      </header>

      <section className="hero-grid">
        <div>
          <p className="eyebrow">Deploy-ready workspace</p>
          <h1>Ship ideas faster with your AI-powered operations hub.</h1>
          <p className="lede">
            Mavora combines planning, execution, and AI collaboration in one responsive dark
            interface backed by Supabase auth and real-time data.
          </p>
          <div className="hero-actions">
            <NavLink className="button button-primary" to={session ? '/assistant' : '/auth'}>
              Open AI assistant
            </NavLink>
            <NavLink className="button button-ghost" to={session ? '/dashboard' : '/auth'}>
              Explore dashboard
            </NavLink>
          </div>
        </div>
        <aside className="glass-panel">
          <h2>Everything included</h2>
          <ul>
            <li>Supabase authentication with session persistence</li>
            <li>Dashboard and profile data integration</li>
            <li>AI assistant conversation storage</li>
            <li>Mobile-first responsive navigation</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

function AuthPage({ session }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
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
      setMode('login');
    } else {
      navigate('/dashboard', { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your Mavora account'}</h1>
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
            setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
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
  const [status, setStatus] = useState('Loading metrics...');

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (!supabaseConfigured || !user?.id) {
        setStatus('Showing demo metrics until Supabase is configured.');
        return;
      }

      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('label, value, delta')
        .eq('user_id', user.id)
        .order('id', { ascending: true });

      if (ignore) return;

      if (error) {
        setStatus('Using fallback metrics. Create dashboard_metrics to customize this view.');
      } else if (data?.length) {
        setMetrics(data);
        setStatus('Connected to Supabase database.');
      } else {
        setStatus('No metrics yet. Insert rows into dashboard_metrics to populate this view.');
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
      content: `Here's a suggested next step for: "${content}".`,
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
      <div className="chat-window">
        {messages.length === 0 ? (
          <p className="subtle">Ask Mavora AI to outline your next launch, campaign, or sprint.</p>
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

function ProfilePage({ user }) {
  const [form, setForm] = useState({ full_name: '', role: '', bio: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      if (!supabaseConfigured || !user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, role, bio')
        .eq('user_id', user.id)
        .maybeSingle();

      if (ignore) return;

      if (error) {
        setStatus('Create profiles table to load profile data from Supabase.');
      } else if (data) {
        setForm({
          full_name: data.full_name ?? '',
          role: data.role ?? '',
          bio: data.bio ?? '',
        });
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [user?.id]);

  const saveProfile = async (event) => {
    event.preventDefault();

    if (!supabaseConfigured || !user?.id) {
      setStatus('Configure Supabase to save profile changes.');
      return;
    }

    const { error } = await supabase.from('profiles').upsert({
      user_id: user.id,
      ...form,
      updated_at: new Date().toISOString(),
    });

    setStatus(error ? error.message : 'Profile saved.');
  };

  return (
    <form onSubmit={saveProfile} className="card-form">
      <label>
        Full name
        <input
          value={form.full_name}
          onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
        />
      </label>
      <label>
        Role
        <input
          value={form.role}
          onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
        />
      </label>
      <label>
        Bio
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
        />
      </label>
      <button className="button button-primary" type="submit">
        Save profile
      </button>
      {status && <p className="subtle">{status}</p>}
    </form>
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
