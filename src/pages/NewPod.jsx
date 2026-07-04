import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';

const CAMPAIGN_TYPES = [
  { value: 'website', label: 'Website URL' },
  { value: 'app', label: 'App URL' },
  { value: 'product', label: 'Product URL' },
  { value: 'campaign', label: 'Offer / Campaign Notes' },
  { value: 'images', label: 'Uploaded Photos / Images' },
  { value: 'teaser', label: 'Coming Soon Teaser Images' },
  { value: 'brand', label: 'Brand Notes' },
];

export default function NewPodPage({ session, subscription }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    podName: '',
    brandName: '',
    campaignType: 'website',
    description: '',
    sourceUrl: '',
    targetCountry: 'Australia',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const tier = subscription?.tier || 'free';
  const needsUrl = ['website', 'app', 'product'].includes(form.campaignType);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (tier === 'free') {
      setError('Please subscribe to a plan to create pods.');
      return;
    }
    if (!form.podName.trim()) {
      setError('Pod name is required.');
      return;
    }
    setSaving(true);
    setError('');

    if (supabaseConfigured && session?.user?.id) {
      const { data, error: dbError } = await supabase
        .from('pods')
        .insert({
          user_id: session.user.id,
          pod_name: form.podName.trim(),
          brand_name: form.brandName.trim() || null,
          pod_type: form.campaignType,
          source_url: form.sourceUrl.trim() || null,
          target_country: form.targetCountry,
          status: 'created',
        })
        .select()
        .single();

      if (dbError) {
        setError(dbError.message);
        setSaving(false);
        return;
      }

      if (form.sourceUrl.trim() || form.description.trim()) {
        await supabase.from('pod_sources').insert({
          pod_id: data.id,
          source_type: form.campaignType,
          source_url: form.sourceUrl.trim() || null,
          notes: form.description.trim() || null,
        });
      }

      await supabase.from('budgets').insert({ pod_id: data.id });
      navigate(`/pods/${data.id}`);
    } else {
      setError('Database not configured. Please check your setup and try again.');
      setSaving(false);
    }
  };

  if (tier === 'free') {
    return (
      <div className="page-stack">
        <header className="section-header panel">
          <div>
            <p className="eyebrow">Create Pod</p>
            <h3>Subscribe to create pods</h3>
            <p className="subtle">Pod creation requires a paid subscription.</p>
          </div>
        </header>
        <NavLink className="button button-primary" to="/pricing">
          View Pricing
        </NavLink>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <header className="section-header panel">
        <div>
          <p className="eyebrow">Create Pod</p>
          <h3>Create a new AI marketing pod</h3>
          <p className="subtle">
            Each pod is a dedicated marketing workspace for one brand, launch, or campaign.
          </p>
        </div>
      </header>

      {error && (
        <p className="form-error" style={{ padding: '0.5rem' }}>{error}</p>
      )}

      <form className="card-form panel" onSubmit={handleCreate}>
        <div className="field-grid">
          <label>
            Pod Name
            <input
              value={form.podName}
              onChange={(e) => setForm((p) => ({ ...p, podName: e.target.value }))}
              placeholder="e.g. Aurora Skincare Launch"
              required
            />
          </label>

          <label>
            Brand Name
            <input
              value={form.brandName}
              onChange={(e) => setForm((p) => ({ ...p, brandName: e.target.value }))}
              placeholder="e.g. Aurora Skincare"
            />
          </label>

          <label>Campaign Type</label>
          <div className="campaign-type-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {CAMPAIGN_TYPES.map((ct) => (
              <button
                key={ct.value}
                type="button"
                className={`button ${form.campaignType === ct.value ? 'button-primary' : 'button-ghost'}`}
                onClick={() => setForm((p) => ({ ...p, campaignType: ct.value }))}
              >
                {ct.label}
              </button>
            ))}
          </div>

          {needsUrl && (
            <label>
              Source URL
              <input
                value={form.sourceUrl}
                onChange={(e) => setForm((p) => ({ ...p, sourceUrl: e.target.value }))}
                placeholder="https://yourbrand.com"
              />
            </label>
          )}

          <label>
            Brief Description (optional)
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Anything the AI should know about this brand or campaign..."
            />
          </label>

          <label>
            Target Country
            <select
              value={form.targetCountry}
              onChange={(e) => setForm((p) => ({ ...p, targetCountry: e.target.value }))}
            >
              <option value="Australia">Australia</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <button className="button button-primary" type="submit" disabled={saving}>
          {saving ? 'Creating pod...' : 'Create Pod'}
        </button>
      </form>
    </div>
  );
}
