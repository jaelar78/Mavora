import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { supabase, supabaseConfigured } from '../lib/supabaseClient';
import { TIER_LIMITS } from '../lib/stripe';

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
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [podCount, setPodCount] = useState(0);

  const tier = subscription?.tier || 'free';
  const maxPods = TIER_LIMITS[tier]?.maxPods || 0;
  const atLimit = podCount >= maxPods;

  useEffect(() => {
    if (session?.user?.id && supabaseConfigured) {
      supabase.from('pods').select('id', { count: 'exact' }).eq('user_id', session.user.id)
        .then(({ count }) => setPodCount(count || 0));
    }
  }, [session?.user?.id]);

  const needsUrl = ['website', 'app', 'product'].includes(form.campaignType);
  const needsFiles = ['images', 'teaser'].includes(form.campaignType);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + files.length > 10) {
      setError('Maximum 10 files allowed.');
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (podId) => {
    if (!files.length || !supabaseConfigured) return [];

    const uploaded = [];
    for (const file of files) {
      const filePath = `${session.user.id}/${podId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('app-uploads')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('app-uploads')
        .getPublicUrl(filePath);

      uploaded.push({
        name: file.name,
        url: urlData?.publicUrl,
        path: filePath,
      });
    }
    return uploaded;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (tier === 'free') {
      setError('Please subscribe to a plan to create pods.');
      return;
    }
    if (atLimit) {
      setError(`Your ${tier} plan allows ${maxPods} ${maxPods === 1 ? 'pod' : 'pods'}. Upgrade to create more.`);
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

      // Upload files if any
      if (files.length > 0) {
        setUploading(true);
        const uploaded = await uploadFiles(data.id);
        setUploading(false);

        if (uploaded.length > 0) {
          await supabase.from('pod_sources').insert({
            pod_id: data.id,
            source_type: form.campaignType,
            source_url: uploaded[0]?.url || null,
            notes: `${form.description.trim() || ''}\n\nUploaded files: ${uploaded.map((f) => f.name).join(', ')}`,
          });
        }
      } else if (form.sourceUrl.trim() || form.description.trim()) {
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

  if (atLimit) {
    return (
      <div className="page-stack">
        <header className="section-header panel">
          <div>
            <p className="eyebrow">Create Pod</p>
            <h3>Pod limit reached</h3>
            <p className="subtle">
              Your {tier} plan includes {maxPods} {maxPods === 1 ? 'pod' : 'pods'}. You've used {podCount}.
            </p>
          </div>
        </header>
        <NavLink className="button button-primary" to="/pricing">
          Upgrade to {tier === 'starter' ? 'Growth' : tier === 'growth' ? 'Pro' : 'Scale'}
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
          <p className="subtle" style={{ marginTop: '0.3rem' }}>
            Plan: {tier} — {podCount}/{maxPods} pods used
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

          {needsFiles && (
            <label>
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="pod-file-upload"
              />
              <button
                type="button"
                className="button button-ghost"
                onClick={() => document.getElementById('pod-file-upload').click()}
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Upload size={18} />
                {files.length > 0 ? `${files.length} file(s) selected` : 'Select images'}
              </button>
              {files.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {files.map((file, i) => (
                    <div key={i} className="panel" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}>
                      <span>{file.name}</span>
                      <button type="button" onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

        <button className="button button-primary" type="submit" disabled={saving || uploading}>
          {uploading ? 'Uploading files...' : saving ? 'Creating pod...' : 'Create Pod'}
        </button>
      </form>
    </div>
  );
}
