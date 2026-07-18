/******  ARTIST SUBMISSIONS  ******/
import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, Clock, Search, Filter, Star, Mail, ExternalLink } from 'lucide-react';

const SAMPLE_SUBMISSIONS = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@artstudio.com', type: 'Digital Art', portfolio: 'sarahchen.art', status: 'pending', rating: 4.8, date: '2026-01-15' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@mjdesigns.com', type: 'Photography', portfolio: 'mjdesigns.co', status: 'approved', rating: 4.5, date: '2026-01-14' },
  { id: 3, name: 'Yuki Tanaka', email: 'yuki@tanakastudio.jp', type: 'Illustration', portfolio: 'tanakastudio.jp', status: 'pending', rating: 4.9, date: '2026-01-13' },
  { id: 4, name: 'Elena Rodriguez', email: 'elena@erart.com', type: '3D Design', portfolio: 'erart.com', status: 'rejected', rating: 3.8, date: '2026-01-12' },
  { id: 5, name: 'Alex Kim', email: 'alex@kimcreative.io', type: 'Motion Graphics', portfolio: 'kimcreative.io', status: 'approved', rating: 4.7, date: '2026-01-11' },
];

export default function ArtistSubmissions() {
  const [submissions, setSubmissions] = useState(SAMPLE_SUBMISSIONS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = submissions.filter((s) => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateStatus = (id, status) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const statusCounts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === 'pending').length,
    approved: submissions.filter((s) => s.status === 'approved').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Artist Submissions</h1>
          <p className="text-sm text-gray-400 mt-1">Review and manage artist applications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: statusCounts.all, icon: <Users size={16} />, color: 'purple' },
          { label: 'Pending', value: statusCounts.pending, icon: <Clock size={16} />, color: 'amber' },
          { label: 'Approved', value: statusCounts.approved, icon: <CheckCircle size={16} />, color: 'green' },
          { label: 'Rejected', value: statusCounts.rejected, icon: <XCircle size={16} />, color: 'red' },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setFilter(stat.label.toLowerCase())}
            className={`pod-card flex items-center gap-3 text-left transition-all ${filter === stat.label.toLowerCase() ? 'border-purple-500/30' : ''}`}
          >
            <div className={`text-${stat.color}-400`}>{stat.icon}</div>
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center flex-1 bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search artists..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-white/5 text-sm">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Submissions Table */}
      <div className="pod-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Artist</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Rating</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
              <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                      {s.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">{s.type}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm text-gray-300">{s.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`pod-badge-${s.status === 'approved' ? 'green' : s.status === 'rejected' ? 'red' : 'amber'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{s.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateStatus(s.id, 'approved')} className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" title="Approve">
                      <CheckCircle size={16} />
                    </button>
                    <button onClick={() => updateStatus(s.id, 'rejected')} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Reject">
                      <XCircle size={16} />
                    </button>
                    <a href={`https://${s.portfolio}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-white transition-colors" title="View Portfolio">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
