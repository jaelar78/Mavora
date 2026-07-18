import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLink, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';
import { redirectToCheckout, createPortalSession } from '../lib/stripe';

// Tier display config — matches exact pricing and pod limits
const TIER_INFO = {
  free: {
    label: 'Free',
    pods: '0 pods',
    price: 'Free',
    posting: null,
    note: 'Waitlist only — no paid pod access.',
  },
  starter: {
    label: 'Starter Pod',
    pods: '1 active pod',
    price: '$89/mo',
    posting: '2 social campaign posts per week',
    note: null,
  },
  growth: {
    label: 'Growth Pods',
    pods: 'Up to 3 active pods',
    price: '$249/mo',
    posting: '3 social campaign posts per week',
    note: 'Extra posting days available as add-ons.',
  },
  pro: {
    label: 'Pro Marketing Pods',
    pods: 'Up to 7 active pods',
    price: '$599/mo',
    posting: '6 social campaign posts per week',
    note: null,
  },
  scale: {
    label: 'Scale / Agency Pods',
    pods: 'Up to 12 active pods',
    price: '$1,299/mo',
    posting: '7 social campaign posts per week',
    note: null,
  },
};

const TIER_ORDER = ['free', 'starter', 'growth', 'pro', 'scale'];

function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
}

function StatusBadge({ status }) {
  const colors = {
    active: { bg: '#E8F5E9', text: '#2E7D32', label: 'Active' },
    inactive: { bg: '#FFF3E0', text: '#EF6C00', label: 'Inactive' },
    cancelled: { bg: '#FFEBEE', text: '#C62828', label: 'Cancelled' },
    trialing: { bg: '#E3F2FD', text: '#1565C0', label: 'Trialing' },
    past_due: { bg: '#FFF3E0', text: '#EF6C00', label: 'Past Due' },
  };
  const style = colors[status] || colors.inactive;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        background: style.bg,
        color: style.text,
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: style.text,
        }}
      />
      {style.label}
    </span>
  );
}

function TierBadge({ subscription }) {
  const tier = subscription?.tier || 'free';
  const info = TIER_INFO[tier] || TIER_INFO.free;
  const periodEnd = subscription?.current_period_end;
  const status = subscription?.status || 'inactive';

  return (
    <article className="panel detail-card" style={{ borderColor: 'var(--gold)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <p className="eyebrow">Current plan</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", margin: '0.25rem 0 0.5rem' }}>
            {info.label}
          </h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="pricing-price" style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>
        {info.price}
      </p>

      {periodEnd && status !== 'cancelled' && (
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--muted)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Calendar size={14} />
          Renews on {formatDate(periodEnd)}
        </p>
      )}

      {status === 'cancelled' && periodEnd && (
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--muted)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <AlertCircle size={14} />
          Access until {formatDate(periodEnd)}
        </p>
      )}

      <ul className="simple-list" style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
        <li style={{ padding: '0.25rem 0', color: 'var(--navy)' }}>✓ {info.pods}</li>
        {info.posting && (
          <li style={{ padding: '0.25rem 0', color: 'var(--navy)' }}>✓ {info.posting}</li>
        )}
        {info.note && (
          <li style={{ padding: '0.25rem 0', color: 'var(--muted)', fontSize: '0.875rem' }}>
            {info.note}
          </li>
        )}
      </ul>
    </article>
  );
}

function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleManage = async () => {
    if (!supabaseConfigured || !supabase) return;
    setLoading(true);
    setError('');
    try {
      const url = await createPortalSession(supabase, window.location.origin + '/account');
      window.location.href = url;
    } catch (err) {
      setError(err.message || 'Unable to open billing portal. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="button button-primary"
        type="button"
        onClick={handleManage}
        disabled={loading}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <CreditCard size={16} />
        {loading ? 'Opening…' : 'Manage Subscription'}
        <ExternalLink size={14} />
      </button>
      {error && <p className="form-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
}

function PlanOptions({ currentTier }) {
  const tiers = [
    { key: 'starter', ...TIER_INFO.starter },
    { key: 'growth', ...TIER_INFO.growth },
    { key: 'pro', ...TIER_INFO.pro },
    { key: 'scale', ...TIER_INFO.scale },
  ];

  const currentIndex = TIER_ORDER.indexOf(currentTier || 'free');

  const upgrades = tiers.filter((t) => TIER_ORDER.indexOf(t.key) > currentIndex);
  const downgrades = tiers.filter((t) => TIER_ORDER.indexOf(t.key) < currentIndex && TIER_ORDER.indexOf(t.key) > 0);

  return (
    <>
      {upgrades.length > 0 && (
        <article className="panel detail-card">
          <p className="eyebrow">Upgrade your plan</p>
          <h4>Scale when you are ready.</h4>
          <div className="cards-grid" style={{ marginTop: '1rem' }}>
            {upgrades.map((t) => (
              <div key={t.key} className="panel" style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t.label}</p>
                <p style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {t.price}
                </p>
                <p className="subtle" style={{ marginBottom: '0.5rem' }}>{t.pods}</p>
                {t.posting && (
                  <p className="subtle" style={{ marginBottom: '0.75rem' }}>{t.posting}</p>
                )}
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => redirectToCheckout(t.key, 'monthly')}
                >
                  Upgrade to {t.label}
                </button>
              </div>
            ))}
          </div>
        </article>
      )}

      {downgrades.length > 0 && (
        <article className="panel detail-card">
          <p className="eyebrow">Downgrade options</p>
          <h4>Need fewer pods?</h4>
          <div className="cards-grid" style={{ marginTop: '1rem' }}>
            {downgrades.map((t) => (
              <div key={t.key} className="panel" style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t.label}</p>
                <p style={{ color: 'var(--gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {t.price}
                </p>
                <p className="subtle" style={{ marginBottom: '0.5rem' }}>{t.pods}</p>
                {t.posting && (
                  <p className="subtle" style={{ marginBottom: '0.75rem' }}>{t.posting}</p>
                )}
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => redirectToCheckout(t.key, 'monthly')}
                >
                  Switch to {t.label}
                </button>
              </div>
            ))}
          </div>
        </article>
      )}
    </>
  );
}

export default function AccountPage({ session, subscription }) {
  const user = session?.user;
  const tier = subscription?.tier || 'free';
  const isPaid = tier !== 'free' && subscription?.status === 'active';

  const handleSignOut = async () => {
    if (!supabaseConfigured || !supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Account</p>
          <h3>Your Dovroyn account</h3>
          <p className="subtle">Manage your subscription, profile, and billing.</p>
        </div>
        <button className="button button-ghost" type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      {/* Profile */}
      <article className="panel detail-card">
        <p className="eyebrow">Profile</p>
        <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div>
            <p className="subtle" style={{ fontSize: '0.8rem', marginBottom: '0.1rem' }}>Email</p>
            <p style={{ fontWeight: 500 }}>{user?.email || '—'}</p>
          </div>
          <div>
            <p className="subtle" style={{ fontSize: '0.8rem', marginBottom: '0.1rem' }}>User ID</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--muted)' }}>
              {user?.id || '—'}
            </p>
          </div>
        </div>
      </article>

      {/* Subscription */}
      <TierBadge subscription={subscription} />

      {/* Billing management */}
      {isPaid && (
        <article className="panel detail-card">
          <p className="eyebrow">Billing</p>
          <h4>Manage your subscription</h4>
          <p className="subtle" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            Update payment details, view invoices, or cancel your subscription through Stripe.
          </p>
          <ManageSubscriptionButton />
        </article>
      )}

      {/* Upgrade / downgrade options */}
      <PlanOptions currentTier={tier} />

      {/* Free-tier CTA */}
      {tier === 'free' && (
        <article className="panel detail-card" style={{ borderColor: 'var(--gold)' }}>
          <p className="eyebrow">Get started</p>
          <h4>Unlock your first pod</h4>
          <p className="subtle" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            Subscribe to a plan to create AI marketing pods and start building campaigns.
          </p>
          <NavLink className="button button-primary" to="/pricing">View Pricing</NavLink>
        </article>
      )}

      {/* Quick links */}
      <article className="panel detail-card">
        <p className="eyebrow">Quick links</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <NavLink className="button button-ghost" to="/pods">My Pods</NavLink>
          <NavLink className="button button-ghost" to="/pricing">Pricing</NavLink>
          <NavLink className="button button-ghost" to="/settings">Settings</NavLink>
        </div>
      </article>
    </div>
  );
}
