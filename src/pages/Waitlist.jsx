import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

async function saveWaitlistEmail(email, source) {
  if (!supabaseConfigured || !supabase) {
    // Supabase not configured — silently succeed so the UI can still show the success state
    return { success: true };
  }
  const { error } = await supabase
    .from('waitlist')
    .insert({ email: email.trim(), source: source || 'waitlist-page' });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    const result = await saveWaitlistEmail(email.trim(), 'waitlist-page');
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main className="landing-shell">
      <Header />

      <section className="hero-block panel">
        <p className="eyebrow">Early Access</p>
        <h1>
          Your AI marketing pods are almost ready.
        </h1>
        <p className="lede">
          Dovroyn is an AI marketing pod platform where you can run 1-12 dedicated AI pods, each built for a specific brand, offer, campaign, or business. Every pod analyses its source, understands the audience, shapes the strategy, and prepares content before anything goes live.
        </p>
      </section>

      <section className="waitlist-section panel" id="waitlist">
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p className="eyebrow">You are on the list</p>
            <h2 className="waitlist-heading">Thank you for joining.</h2>
            <p className="lede">
              You will receive early access updates and founder pricing information soon.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Coming Soon</p>
            <h2 className="waitlist-heading">See one of Dovroyn&apos;s AI pods.</h2>
            <p className="lede">
              This preview shows one dedicated Dovroyn AI pod after it has analysed a
              brand. Each pod has its own AI brain, brand memory, content calendar,
              platform strategy, ad view, files, and budget tracker.
            </p>
            <form className="waitlist-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email to get early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button
                className="button button-primary"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Joining...' : 'Join Early Access'}
              </button>
            </form>
            {status === 'error' && <p className="form-error">{errorMsg}</p>}
            <p className="waitlist-note">
              Free to join. No card required. Unsubscribe any time.
            </p>
          </>
        )}
      </section>

      <Footer variant="full" />
    </main>
  );
}
