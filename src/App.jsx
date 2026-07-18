import React, { lazy, Suspense, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { supabase } from './lib/supabaseClient';

// Lazy-loaded pages for code-splitting
const LandingPage   = lazy(() => import('./pages/Landing'));
const PricingPage   = lazy(() => import('./pages/Pricing'));
const AboutPage     = lazy(() => import('./pages/About'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudy'));
const WaitlistPage  = lazy(() => import('./pages/Waitlist'));
const PodsPage      = lazy(() => import('./pages/Pods'));
const NewPodPage    = lazy(() => import('./pages/NewPod'));
const AccountPage   = lazy(() => import('./pages/Account'));
const DDashboard    = lazy(() => import('./dashboard/pages/Dashboard'));
const DCampaigns    = lazy(() => import('./dashboard/pages/Campaigns'));
const DContentEngine= lazy(() => import('./dashboard/pages/ContentEngine'));
const DGrowthAdvice = lazy(() => import('./dashboard/pages/GrowthAdvice'));
const DMediaLibrary = lazy(() => import('./dashboard/pages/MediaLibrary'));
const DArtistSubmissions = lazy(() => import('./dashboard/pages/ArtistSubmissions'));
const DWebsites     = lazy(() => import('./dashboard/pages/Websites'));
const DSettings     = lazy(() => import('./dashboard/pages/Settings'));
const DashboardLayout= lazy(() => import('./dashboard/components/Layout'));
const PodLayout     = lazy(() => import('./pods/PodLayout'));
const PodOverview   = lazy(() => import('./pods/pages/PodOverview'));
const ContentGenerator = lazy(() => import('./pods/pages/ContentGenerator'));
const ContentCalendar  = lazy(() => import('./pods/pages/ContentCalendar'));
const AIAssistant   = lazy(() => import('./pods/pages/AIAssistant'));
const CalendarGenerator = lazy(() => import('./pods/pages/CalendarGenerator'));
const AIOptimizer   = lazy(() => import('./pods/pages/AIOptimizer'));
const Analytics     = lazy(() => import('./pods/pages/Analytics'));
const Tools         = lazy(() => import('./pods/pages/Tools'));
const Playbooks     = lazy(() => import('./pods/pages/Playbooks'));
const Integrations  = lazy(() => import('./pods/pages/Integrations'));
const GlobalSettings= lazy(() => import('./pods/pages/GlobalSettings'));
const Collaborations= lazy(() => import('./pods/pages/Collaborations'));
const AdCampaignManager = lazy(() => import('./pods/pages/AdCampaignManager'));
const BudgetTracker = lazy(() => import('./pods/pages/BudgetTracker'));
const WebsiteAnalyzer = lazy(() => import('./pods/pages/WebsiteAnalyzer'));
const ComingSoonBuilder = lazy(() => import('./pods/pages/ComingSoonBuilder'));
const Assets        = lazy(() => import('./pods/pages/Assets'));
const SocialAccounts = lazy(() => import('./pods/pages/SocialAccounts'));
const PodSettings   = lazy(() => import('./pods/pages/PodSettings'));

import { Spinner } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#03001E]">
        <Spinner className="w-10 h-10 text-[#9F7AEA] animate-spin" />
      </div>
    );
  }

  const PublicOnly = ({ children }) => {
    if (session) return <Navigate to="/dashboard" replace />;
    return children;
  };

  const Protected = ({ children }) => {
    if (!session) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <HashRouter>
      <Toaster position="top-center" toastOptions={{ style: { background: '#111827', color: '#F3F4F6', border: '1px solid #374151', fontFamily: 'Inter, sans-serif' } }} />
      <Suspense fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#03001E]">
          <Spinner className="w-10 h-10 text-[#9F7AEA] animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/login" element={<PublicOnly><LoginRedirect /></PublicOnly>} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route element={<Protected><DashboardLayout /></Protected>}>
            <Route path="/dashboard" element={<DDashboard />} />
            <Route path="/dashboard/campaigns" element={<DCampaigns />} />
            <Route path="/dashboard/content-engine" element={<DContentEngine />} />
            <Route path="/dashboard/growth-advice" element={<DGrowthAdvice />} />
            <Route path="/dashboard/media-library" element={<DMediaLibrary />} />
            <Route path="/dashboard/artist-submissions" element={<DArtistSubmissions />} />
            <Route path="/dashboard/websites" element={<DWebsites />} />
            <Route path="/dashboard/settings" element={<DSettings />} />
          </Route>

          <Route path="/pods" element={<Protected><PodsPage /></Protected>} />
          <Route path="/pods/new" element={<Protected><NewPodPage /></Protected>} />
          <Route path="/account" element={<Protected><AccountPage /></Protected>} />

          <Route path="/pods/:podId/*" element={<Protected><PodLayout /></Protected>}>
            <Route index element={<PodOverview />} />
            <Route path="overview" element={<PodOverview />} />
            <Route path="content" element={<ContentGenerator />} />
            <Route path="calendar" element={<ContentCalendar />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="calendar-generator" element={<CalendarGenerator />} />
            <Route path="optimizer" element={<AIOptimizer />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="tools" element={<Tools />} />
            <Route path="playbooks" element={<Playbooks />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="campaigns" element={<AdCampaignManager />} />
            <Route path="budget" element={<BudgetTracker />} />
            <Route path="website-analyzer" element={<WebsiteAnalyzer />} />
            <Route path="coming-soon" element={<ComingSoonBuilder />} />
            <Route path="assets" element={<Assets />} />
            <Route path="social-accounts" element={<SocialAccounts />} />
            <Route path="pod-settings" element={<PodSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

function LoginRedirect() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (forgotMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/#/auth/callback?type=recovery`,
        });
        if (error) throw error;
        toast.success('Password reset email sent. Check your inbox.');
        setForgotMode(false);
        setIsLoading(false);
        return;
      }
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/#/auth/callback` },
        });
        if (error) throw error;
        toast.success('Account created! Check your email to verify.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/#/auth/callback` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03001E] px-4">
      <div className="w-full max-w-sm bg-[#0A0A0A] border border-[#9F7AEA]/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center mb-1">
          {forgotMode ? 'Reset Password' : isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          {forgotMode ? 'Enter your email to receive a reset link' : isSignup ? 'Join Dovroyn today' : 'Sign in to your Dovroyn account'}
        </p>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#9F7AEA] focus:outline-none transition"
              placeholder="you@example.com" required />
          </div>
          {!forgotMode && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#9F7AEA] focus:outline-none transition"
                placeholder="••••••••" required />
            </div>
          )}
          <button type="submit" disabled={isLoading}
            className="w-full py-3 bg-[#9F7AEA] text-white font-semibold rounded-lg hover:bg-[#B794F4] transition-all disabled:opacity-50">
            {isLoading ? 'Please wait…' : forgotMode ? 'Send Reset Link' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        {!forgotMode && !isSignup && (
          <button onClick={() => setForgotMode(true)} className="mt-3 text-xs text-[#9F7AEA] hover:text-[#B794F4] w-full text-center block">Forgot password?</button>
        )}
        {forgotMode && (
          <button onClick={() => setForgotMode(false)} className="mt-3 text-xs text-[#9F7AEA] hover:text-[#B794F4] w-full text-center block">Back to sign in</button>
        )}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="px-3 text-gray-500 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>
        <button onClick={() => handleOAuth('google')}
          className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <p className="text-center text-gray-400 text-sm mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-[#9F7AEA] hover:text-[#B794F4] font-medium">
            {isSignup ? 'Sign in' : 'Get started'}
          </button>
        </p>
      </div>
    </div>
  );
}

function AuthCallback() {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (s) {
        window.location.href = '/#/dashboard';
      } else {
        setError('Session not found. Please try again.');
        setProcessing(false);
      }
    });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03001E]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Authentication Error</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => { window.location.href = '/#/login'; }}
            className="px-6 py-2 bg-[#9F7AEA] text-white rounded-lg hover:bg-[#B794F4] transition-all">Back to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#03001E]">
      <Spinner className="w-10 h-10 text-[#9F7AEA] animate-spin" />
    </div>
  );
}

export default App;