import { useState } from 'react';
import {
  TrendingUp,
  Lightbulb,
  Target,
  ArrowRight,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

const ADVICE_DATA = [
  {
    id: 1,
    category: 'SEO',
    title: 'Optimize product pages for long-tail keywords',
    description: 'Your product pages are ranking for generic terms. Target specific long-tail keywords like "natural face serum for dry skin Australia" to capture high-intent buyers.',
    impact: 'High',
    effort: 'Medium',
    status: 'pending',
  },
  {
    id: 2,
    category: 'Social Media',
    title: 'Increase TikTok posting frequency to 5x/week',
    description: 'TikTok accounts posting 5+ times per week see 3.2x more follower growth. Your current 2x/week schedule is leaving reach on the table.',
    impact: 'High',
    effort: 'Low',
    status: 'pending',
  },
  {
    id: 3,
    category: 'Email Marketing',
    title: 'Set up abandoned cart email sequence',
    description: 'Your cart abandonment rate is 72%. A 3-email recovery sequence could recover 15-20% of lost sales with minimal setup.',
    impact: 'High',
    effort: 'Low',
    status: 'pending',
  },
  {
    id: 4,
    category: 'Content',
    title: 'Create comparison content vs. competitors',
    description: 'Comparison posts ("vs" and "alternative to") drive high-intent traffic. Create 3-4 comparison blog posts targeting your top competitors.',
    impact: 'Medium',
    effort: 'Medium',
    status: 'pending',
  },
  {
    id: 5,
    category: 'Paid Ads',
    title: 'Split test video creatives on Meta Ads',
    description: 'Video ads on Meta are outperforming static images by 40% on average. Test UGC-style video creatives against your current static ad set.',
    impact: 'Medium',
    effort: 'Low',
    status: 'pending',
  },
  {
    id: 6,
    category: 'Partnerships',
    title: 'Partner with micro-influencers (10k-50k followers)',
    description: 'Micro-influencers have 3.5x higher engagement rates than macro. Partner with 5 Australian beauty micro-influencers for authentic product reviews.',
    impact: 'Medium',
    effort: 'High',
    status: 'pending',
  },
];

const IMPACT_COLORS = {
  High: 'bg-emerald-50 text-emerald-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-[#E8E2D9] text-[#6B6560]',
};

export default function GrowthAdvice() {
  const [advice, setAdvice] = useState(ADVICE_DATA);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleAccept = (id) => {
    setAdvice(advice.map((a) => (a.id === id ? { ...a, status: 'accepted' } : a)));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filtered = filter === 'all' ? advice : advice.filter((a) => a.category === filter);
  const categories = ['all', ...new Set(ADVICE_DATA.map((a) => a.category))];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Growth Advice</h1>
          <p className="text-sm text-[#9E9484] mt-0.5">AI-powered growth recommendations for your brand.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E2D9] rounded-lg text-sm font-medium text-[#6B6560] hover:border-[#C9A96E]/30 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-[#C9A96E]" />
            <span className="text-xs font-medium text-[#6B6560]">Total Recommendations</span>
          </div>
          <p className="text-2xl font-semibold text-[#3D3632] font-serif">{advice.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-[#C9A96E]" />
            <span className="text-xs font-medium text-[#6B6560]">High Impact</span>
          </div>
          <p className="text-2xl font-semibold text-[#3D3632] font-serif">
            {advice.filter((a) => a.impact === 'High').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-emerald-500" />
            <span className="text-xs font-medium text-[#6B6560]">Accepted</span>
          </div>
          <p className="text-2xl font-semibold text-[#3D3632] font-serif">
            {advice.filter((a) => a.status === 'accepted').length}
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filter === cat
                ? 'bg-[#3D3632] text-[#FAF9F7]'
                : 'bg-white border border-[#E8E2D9] text-[#6B6560] hover:border-[#C9A96E]/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advice cards */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border p-5 shadow-premium transition-all ${
              item.status === 'accepted' ? 'border-emerald-200 bg-emerald-50/30' : 'border-[#E8E2D9] card-lift'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E8E2D9] rounded-md text-[10px] font-medium text-[#6B6560]">
                    {item.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${IMPACT_COLORS[item.impact]}`}>
                    {item.impact} impact
                  </span>
                  <span className="px-2 py-0.5 bg-[#E8E2D9]/50 rounded-md text-[10px] font-medium text-[#6B6560]">
                    {item.effort} effort
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#3D3632]">{item.title}</h3>
                <p className="text-xs text-[#6B6560] mt-1 leading-relaxed">{item.description}</p>
              </div>

              {item.status === 'pending' ? (
                <button
                  onClick={() => handleAccept(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D3632] text-[#FAF9F7] rounded-lg text-xs font-medium hover:bg-[#4A433E] transition-colors flex-shrink-0"
                >
                  <ArrowRight size={13} />
                  Accept
                </button>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium flex-shrink-0">
                  <CheckCircle size={13} />
                  Accepted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
