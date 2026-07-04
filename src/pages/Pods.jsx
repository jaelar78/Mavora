import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';
import { TIER_LIMITS } from '../lib/stripe';

export default function PodsPage({ session, subscription }) {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseConfigured || !session?.user?.id) {
      setLoading(false);
      return;
    }
    supabase
      .from('pods')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPods(data || []);
        setLoading(false);
      });
  }, [session?.user?.id]);

  const tier = subscription?.tier || 'free';
  const maxPods = TIER_LIMITS[tier]?.maxPods || 0;

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Pods ({pods.length}/{maxPods})</p>
          <h3>All AI marketing pods</h3>
          <p className="subtle">
            Create a dedicated pod for each brand, product, offer, or campaign.
          </p>
        </div>
        <NavLink className="button button-primary" to="/pods/new">
          Create Pod
        </NavLink>
      </header>

      {tier === 'free' && (
        <article className="panel detail-card" style={{ borderColor: 'var(--gold)' }}>
          <h4>Subscribe to create pods</h4>
          <p className="subtle">
            Free users cannot create pods. Choose a plan to get started.
          </p>
          <NavLink className="button button-primary" to="/pricing">
            View Pricing
          </NavLink>
        </article>
      )}

      <section className="cards-grid cards-grid-wide">
        {loading && <p className="subtle">Loading pods...</p>}

        {!loading && pods.length === 0 && tier !== 'free' && (
          <article className="panel detail-card">
            <h4>No pods yet</h4>
            <p className="subtle">
              Create your first AI marketing pod to get started.
            </p>
            <NavLink className="button button-primary" to="/pods/new">
              Create Pod
            </NavLink>
          </article>
        )}

        {pods.map((pod) => (
          <article key={pod.id} className="panel pod-card">
            <div className="pod-card-head">
              <h3>{pod.pod_name}</h3>
              <span className="status-tag">{pod.status}</span>
            </div>
            <div className="pod-card-meta">
              <p><strong>Type:</strong> {pod.pod_type}</p>
              {pod.brand_name && <p><strong>Brand:</strong> {pod.brand_name}</p>}
              {pod.source_url && <p><strong>Source:</strong> {pod.source_url}</p>}
              <p><strong>Country:</strong> {pod.target_country}</p>
              {pod.accepted_tone && <p><strong>Tone:</strong> {pod.accepted_tone}</p>}
            </div>
            <div className="action-buttons">
              <NavLink className="button button-ghost" to={`/pods/${pod.id}`}>
                Open pod
              </NavLink>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
