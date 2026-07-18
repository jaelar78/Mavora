import { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle, Globe, Calendar, Upload, X, FileImage } from 'lucide-react';
import { analyzeWebsite, generateCalendar, fetchPodAnalysis, fetchCalendarItems } from '../lib/aiClient';
import { supabase } from '../lib/supabaseClient';

const POD_TABS = [
  'Overview', 'Source', 'AI Analysis', 'Brand DNA', 'Audience', 'Offer',
  'Campaign Strategy', 'Content Ideas', 'Ad Angles', 'Socials', 'Calendar',
  'Holidays', 'Budget', 'Ad Analysis', 'AI Notes', 'Next Moves',
];

function SourceTab({ pod }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [podSources, setPodSources] = useState([]);

  useEffect(() => {
    if (pod?.id) {
      supabase.from('pod_sources').select('*').eq('pod_id', pod.id).then(({ data }) => {
        if (data) setPodSources(data);
      });
    }
  }, [pod?.id]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + files.length > 10) {
      alert('Maximum 10 files allowed.');
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (!files.length || !pod?.id) return;
    setUploading(true);
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    if (!userId) return;

    const uploaded = [];
    for (const file of files) {
      const filePath = `${userId}/${pod.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('app-uploads')
        .upload(filePath, file);

      if (uploadError) continue;

      const { data: urlData } = supabase.storage
        .from('app-uploads')
        .getPublicUrl(filePath);

      uploaded.push({ name: file.name, url: urlData?.publicUrl, path: filePath });
    }

    if (uploaded.length > 0) {
      await supabase.from('pod_sources').insert({
        pod_id: pod.id,
        source_type: 'uploaded_image',
        source_url: uploaded[0]?.url,
        notes: `Uploaded files: ${uploaded.map((f) => f.name).join(', ')}`,
      });
      // Refresh
      const { data } = await supabase.from('pod_sources').select('*').eq('pod_id', pod.id);
      if (data) setPodSources(data);
    }
    setFiles([]);
    setUploading(false);
  };

  return (
    <div className="pod-section-content">
      <h4>Source / Intake</h4>
      <p><strong>Website URL:</strong> {pod?.source_url || 'Not provided'}</p>
      <p><strong>Pod type:</strong> {pod?.pod_type}</p>
      <p><strong>Target country:</strong> {pod?.target_country}</p>
      {pod?.source_url && (
        <a href={pod.source_url} target="_blank" rel="noopener noreferrer" className="button button-ghost">
          <Globe size={14} /> Visit Website
        </a>
      )}

      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <h5 style={{ marginBottom: '0.6rem' }}>Upload Files</h5>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="source-file-upload"
        />
        <button
          type="button"
          className="button button-ghost"
          onClick={() => document.getElementById('source-file-upload').click()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Upload size={16} /> Select files
        </button>
        {files.length > 0 && (
          <div style={{ marginTop: '0.6rem' }}>
            {files.map((file, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.2rem 0' }}>
                <FileImage size={14} />
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
            <button className="button button-primary" onClick={uploadFiles} disabled={uploading} style={{ marginTop: '0.5rem' }}>
              {uploading ? 'Uploading...' : 'Upload to Pod'}
            </button>
          </div>
        )}
      </div>

      {podSources.length > 0 && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <h5 style={{ marginBottom: '0.6rem' }}>Uploaded Sources</h5>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {podSources.map((source, i) => (
              <div key={i} className="panel" style={{ padding: '0.6rem', fontSize: '0.85rem' }}>
                <strong>{source.source_type}</strong>
                {source.source_url && (
                  <div><a href={source.source_url} target="_blank" rel="noopener noreferrer">View</a></div>
                )}
                {source.notes && <p className="subtle" style={{ marginTop: '0.3rem' }}>{source.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PodTabsView({ pod }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [directionAccepted, setDirectionAccepted] = useState(pod?.status === 'direction_locked' || pod?.status === 'active');
  const [userDirection, setUserDirection] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [calendarItems, setCalendarItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingCalendar, setGeneratingCalendar] = useState(false);
  const [error, setError] = useState(null);

  // Load analysis and calendar on mount
  useEffect(() => {
    if (pod?.id) {
      loadPodData();
    }
  }, [pod?.id]);

  const loadPodData = async () => {
    setLoading(true);
    try {
      const [analysisData, calendarData] = await Promise.all([
        fetchPodAnalysis(supabase, pod.id),
        fetchCalendarItems(supabase, pod.id),
      ]);
      setAnalysis(analysisData);
      setCalendarItems(calendarData);
    } catch (err) {
      console.error('Failed to load pod data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!pod?.source_url || !pod?.id) return;
    setAnalyzing(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not authenticated');

      await analyzeWebsite({
        pod_id: pod.id,
        user_id: session.data.session.user.id,
        url: pod.source_url,
        token,
      });

      // Reload analysis
      const newAnalysis = await fetchPodAnalysis(supabase, pod.id);
      setAnalysis(newAnalysis);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerateCalendar = async () => {
    if (!pod?.id) return;
    setGeneratingCalendar(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not authenticated');

      const platforms = ['Instagram', 'TikTok', 'Facebook'];
      await generateCalendar({
        pod_id: pod.id,
        user_id: session.data.session.user.id,
        platforms,
        days: 14,
        token,
      });

      // Reload calendar
      const newCalendar = await fetchCalendarItems(supabase, pod.id);
      setCalendarItems(newCalendar);
    } catch (err) {
      console.error('Calendar generation failed:', err);
      setError(err.message || 'Calendar generation failed.');
    } finally {
      setGeneratingCalendar(false);
    }
  };

  const handleAcceptDirection = async () => {
    setDirectionAccepted(true);
    if (pod?.id) {
      await supabase.from('pods').update({
        status: 'direction_locked',
        accepted_tone: userDirection || pod?.accepted_tone || 'Expert, reassuring, modern luxury',
        updated_at: new Date().toISOString(),
      }).eq('id', pod.id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="pod-section-content">
            <h4>Pod: {pod?.pod_name || 'Untitled Pod'}</h4>
            <p><strong>Pod type:</strong> {pod?.pod_type || 'Not specified'}</p>
            <p><strong>Status:</strong> {directionAccepted ? 'Direction locked' : 'Awaiting direction approval'}</p>
            <p><strong>Target country:</strong> {pod?.target_country || 'Not set'}</p>
            <p><strong>Tone:</strong> {pod?.accepted_tone || 'Not set'}</p>
            {analysis && (
              <>
                <p><strong>Brand summary:</strong> {analysis.brand_summary}</p>
                <p><strong>AI status:</strong> <span className="status-chip-gold">Analyzed</span></p>
              </>
            )}
          </div>
        );
      case 'Source':
        return <SourceTab pod={pod} />;
      case 'AI Analysis':
        return (
          <div className="pod-section-content">
            <h4>AI Analysis</h4>
            {!analysis && !analyzing && (
              <>
                <p className="subtle">No AI analysis yet. Run analysis to extract brand insights from your website.</p>
                {pod?.source_url && (
                  <button className="button button-primary" onClick={handleAnalyze}>
                    <Sparkles size={14} /> Run AI Analysis
                  </button>
                )}
              </>
            )}
            {analyzing && (
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>AI is analyzing your website...</span>
              </div>
            )}
            {analysis && (
              <>
                <p><strong>Brand summary:</strong> {analysis.brand_summary || 'Not analyzed'}</p>
                <p><strong>Tone detected:</strong> {analysis.tone || 'Not analyzed'}</p>
                <p><strong>Audience:</strong> {analysis.audience || 'Not analyzed'}</p>
                <p><strong>Offer direction:</strong> {analysis.offer_direction || 'Not analyzed'}</p>
                <div className="direction-actions">
                  <button className="button button-primary" onClick={handleAcceptDirection}>
                    <CheckCircle size={14} /> Accept AI Direction
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case 'Brand DNA':
        return (
          <div className="pod-section-content">
            <h4>Brand DNA</h4>
            <p><strong>Brand summary:</strong> {analysis?.brand_summary || 'Run AI Analysis first'}</p>
            <p><strong>Tone of voice:</strong> {pod?.accepted_tone || analysis?.tone || 'Not set'}</p>
            <p><strong>Locked-in tone:</strong> {directionAccepted ? (pod?.accepted_tone || 'Expert luxury') : 'Pending approval'}</p>
            {!directionAccepted && (
              <div style={{ marginTop: '0.8rem' }}>
                <label>
                  Your preferred direction (optional):
                  <textarea
                    rows={3}
                    value={userDirection}
                    onChange={(e) => setUserDirection(e.target.value)}
                    placeholder="e.g. Make it cheeky and bold instead of luxury..."
                  />
                </label>
                <button className="button button-primary" style={{ marginTop: '0.5rem' }} onClick={handleAcceptDirection}>
                  Lock In This Direction
                </button>
              </div>
            )}
          </div>
        );
      case 'Audience':
        return (
          <div className="pod-section-content">
            <h4>Audience</h4>
            <p><strong>Ideal customer:</strong> {analysis?.audience || 'Run AI Analysis first'}</p>
            <p><strong>Target country:</strong> {pod?.target_country}</p>
          </div>
        );
      case 'Offer':
        return (
          <div className="pod-section-content">
            <h4>Offer</h4>
            <p><strong>Offer direction:</strong> {analysis?.offer_direction || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Campaign Strategy':
        return (
          <div className="pod-section-content">
            <h4>Campaign Strategy</h4>
            <p><strong>Campaign angles:</strong> {analysis?.campaign_angles || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Content Ideas':
        return (
          <div className="pod-section-content">
            <h4>Content Ideas</h4>
            <p><strong>Ideas:</strong> {analysis?.content_ideas || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Ad Angles':
        return (
          <div className="pod-section-content">
            <h4>Ad Angles</h4>
            <p><strong>Angles:</strong> {analysis?.ad_angles || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Socials':
        return (
          <div className="pod-section-content">
            <h4>Socials</h4>
            <p><strong>Recommendations:</strong> {analysis?.social_recommendations || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Calendar':
        return (
          <div className="pod-section-content">
            <h4>Content Calendar</h4>
            <p><strong>Calendar strategy:</strong> {analysis?.calendar_strategy || 'Run AI Analysis first'}</p>
            <button
              className="button button-primary"
              onClick={handleGenerateCalendar}
              disabled={generatingCalendar}
            >
              {generatingCalendar ? (
                <><Loader2 size={14} className="animate-spin" /> Generating...</>
              ) : (
                <><Calendar size={14} /> Generate Calendar</>
              )}
            </button>
            {calendarItems.length > 0 && (
              <div className="calendar-list" style={{ marginTop: '1rem' }}>
                {calendarItems.map((item) => (
                  <div key={item.id} className="calendar-item">
                    <span className="calendar-platform">{item.platform}</span>
                    <span className="calendar-date">{item.scheduled_date}</span>
                    <p>{item.caption || item.content_type}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'Holidays':
        return (
          <div className="pod-section-content">
            <h4>Public Holidays / Seasonal Marketing</h4>
            <p><strong>Target country:</strong> {pod?.target_country}</p>
            <p className="subtle">Holiday-aware calendar generation is available. Generate a calendar to see seasonal recommendations.</p>
          </div>
        );
      case 'Budget':
        return (
          <div className="pod-section-content">
            <h4>Budget Tracker</h4>
            <p><strong>Budget strategy:</strong> {analysis?.budget_strategy || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'Ad Analysis':
        return (
          <div className="pod-section-content">
            <h4>Ad Analysis</h4>
            <p><strong>Next actions:</strong> {analysis?.next_actions || 'Run AI Analysis first'}</p>
          </div>
        );
      case 'AI Notes':
        return (
          <div className="pod-section-content">
            <h4>AI Notes / Memory</h4>
            <ul className="simple-list compact-list">
              <li><strong>Decisions made:</strong> {directionAccepted ? 'Direction accepted' : 'Pending'}</li>
              <li><strong>Accepted tone:</strong> {pod?.accepted_tone || 'Not set'}</li>
              {analysis && <li><strong>AI Analysis:</strong> Completed</li>}
            </ul>
          </div>
        );
      case 'Next Moves':
        return (
          <div className="pod-section-content">
            <h4>Next Marketing Moves</h4>
            <p><strong>Next actions:</strong> {analysis?.next_actions || 'Run AI Analysis first'}</p>
          </div>
        );
      default:
        return <div className="pod-section-content"><p>Select a tab to view pod section.</p></div>;
    }
  };

  return (
    <>
      <div className="pod-tabs">
        {POD_TABS.map((tab) => (
          <button
            key={tab}
            className={`pod-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <section className="panel">
        {error && <div className="form-error">{error}</div>}
        {renderTabContent()}
      </section>
    </>
  );
}
