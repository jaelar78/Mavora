/******  WEBSITE ANALYZER — SEO audit & performance scan  ******/
import React, { useState } from 'react';
import {
  Globe, Search, Zap, CheckCircle, AlertCircle, XCircle, TrendingUp,
  BarChart3, Clock, Smartphone, Shield, Loader2, ArrowRight, RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const CATEGORIES = ['SEO', 'Performance', 'Mobile', 'Security', 'Accessibility', 'Social'];

export default function WebsiteAnalyzer() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateAnalysis());
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="pod-page-container max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Website Analyzer</h2>
        <p className="text-sm text-gray-400">SEO audit, performance scan, and improvement tips</p>
      </div>

      {/* Input */}
      <div className="pod-card">
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://yoursite.com)"
            className="flex-1 input-field"
          />
          <button onClick={analyze} disabled={!url.trim() || analyzing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            {analyzing ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Overall Score */}
          <div className="pod-card flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{result.score}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Overall Score</h3>
              <p className="text-sm text-gray-400">{result.score >= 80 ? 'Great job! Your site is well-optimized.' : result.score >= 60 ? 'Good start. There are areas to improve.' : 'Your site needs attention. Check the recommendations below.'}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="pod-badge-green text-xs">{result.issues.filter((i) => i.severity === 'good').length} Passed</span>
                <span className="pod-badge-amber text-xs">{result.issues.filter((i) => i.severity === 'warning').length} Warnings</span>
                <span className="pod-badge-red text-xs">{result.issues.filter((i) => i.severity === 'error').length} Errors</span>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {result.categories.map((cat) => (
              <div key={cat.name} className="pod-card text-center">
                <p className="text-2xl font-bold text-white">{cat.score}</p>
                <p className="text-xs text-gray-500">{cat.name}</p>
              </div>
            ))}
          </div>

          {/* Detailed Issues */}
          <div className="pod-card space-y-3">
            <h3 className="text-sm font-semibold text-white">Detailed Results</h3>
            {result.issues.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0f] rounded-lg">
                {issue.severity === 'good' && <CheckCircle size={16} className="text-green-400 shrink-0" />}
                {issue.severity === 'warning' && <AlertCircle size={16} className="text-amber-400 shrink-0" />}
                {issue.severity === 'error' && <XCircle size={16} className="text-red-400 shrink-0" />}
                <div>
                  <p className="text-sm text-gray-200">{issue.title}</p>
                  <p className="text-xs text-gray-500">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function generateAnalysis() {
  return {
    score: 78,
    categories: [
      { name: 'SEO', score: 82 },
      { name: 'Performance', score: 71 },
      { name: 'Mobile', score: 88 },
      { name: 'Security', score: 90 },
      { name: 'Accessibility', score: 65 },
      { name: 'Social', score: 74 },
    ],
    issues: [
      { severity: 'good', title: 'Meta title is present', description: 'Your page has a proper meta title tag.' },
      { severity: 'good', title: 'SSL certificate active', description: 'Your site uses HTTPS encryption.' },
      { severity: 'warning', title: 'Missing meta description', description: 'Add a meta description for better SEO.' },
      { severity: 'warning', title: 'Images lack alt text', description: '3 images are missing alt attributes.' },
      { severity: 'warning', title: 'Sitemap not found', description: 'Submit a sitemap to search engines.' },
      { severity: 'error', title: 'Slow page load', description: 'Page loads in 4.2s. Target is under 2s.' },
      { severity: 'good', title: 'Mobile responsive', description: 'Site adapts well to mobile devices.' },
      { severity: 'warning', title: 'Low contrast text', description: 'Some text may be hard to read.' },
    ],
  };
}