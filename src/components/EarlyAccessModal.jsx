import { useState, useEffect } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

export default function EarlyAccessModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!open) {
      setEmail('');
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      if (supabaseConfigured && supabase) {
        const { error } = await supabase
          .from('waitlist')
          .insert({ email: email.trim(), source: 'early-access-modal' });
        if (error) throw new Error(error.message);
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="early-access-modal-heading" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>&#215;</button>

        {status === 'success' ? (
          <div className="modal-success">
            <p className="eyebrow">You are on the list</p>
            <h2 id="early-access-modal-heading" className="waitlist-heading">Thank you for joining.</h2>
            <p className="lede">
              You will receive early access updates and founder pricing information soon.
            </p>
            <button className="button button-ghost" style={{ marginTop: '1.2rem' }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Early Access</p>
            <h2 id="early-access-modal-heading" className="waitlist-heading">Join the Dovroyn waitlist.</h2>
            <p className="lede">
              Be among the first to access AI-powered marketing pods. Free to join. Early users
              receive launch updates, first access, and founder pricing.
            </p>
            <form className="waitlist-form" onSubmit={handleSubmit} style={{ marginTop: '1.2rem' }}>
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
            {status === 'error' && <p className="form-error" style={{ marginTop: '0.6rem' }}>{errorMsg}</p>}
            <p className="waitlist-note">Free to join. No card required. Unsubscribe any time.</p>
          </>
        )}
      </div>
    </div>
  );
}
