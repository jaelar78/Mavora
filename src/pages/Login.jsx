import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for confirmation!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.hash = '#/pods';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/#/pods` },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03001E] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/dovroyn-icon.svg" alt="Dovroyn" className="w-8 h-8" />
            <span className="text-xl font-bold text-white">Dovroyn</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isSignup ? 'Start your AI marketing journey' : 'Sign in to your pods'}
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-gray-800 rounded-2xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#9F7AEA] focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#9F7AEA] focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#9F7AEA] text-white font-semibold rounded-lg hover:bg-[#B794F4] transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="px-3 text-gray-500 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <button
            onClick={() => handleOAuth('google')}
            className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
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
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#9F7AEA] hover:text-[#B794F4] font-medium"
            >
              {isSignup ? 'Sign in' : 'Get started'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
