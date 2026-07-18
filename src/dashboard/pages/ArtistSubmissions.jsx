import { useState } from 'react';
import {
  Users,
  Mail,
  Calendar,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from 'lucide-react';

const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma@wilsonart.com',
    portfolio: 'https://wilsonart.com/portfolio',
    specialty: 'Digital Illustration',
    status: 'pending',
    submittedAt: '2025-06-15',
    message: 'I would love to collaborate on your upcoming summer campaign. My style aligns well with your brand aesthetic.',
  },
  {
    id: 2,
    name: 'James Chen',
    email: 'james@chenstudio.co',
    portfolio: 'https://chenstudio.co',
    specialty: 'Photography',
    status: 'approved',
    submittedAt: '2025-06-14',
    message: 'Specializing in product photography with a focus on lifestyle and beauty brands.',
  },
  {
    id: 3,
    name: 'Sofia Martinez',
    email: 'sofia@martinez.design',
    portfolio: 'https://martinez.design',
    specialty: 'Motion Graphics',
    status: 'pending',
    submittedAt: '2025-06-13',
    message: 'I create engaging motion graphics for social media campaigns. Would love to discuss a collaboration.',
  },
  {
    id: 4,
    name: 'Liam O\'Brien',
    email: 'liam@obrienmedia.au',
    portfolio: 'https://obrienmedia.au',
    specialty: 'Videography',
    status: 'rejected',
    submittedAt: '2025-06-12',
    message: 'Videographer based in Sydney with experience in brand storytelling.',
  },
  {
    id: 5,
    name: 'Aria Kim',
    email: 'aria@kimcreative.io',
    portfolio: 'https://kimcreative.io',
    specialty: 'UI/UX Design',
    status: 'pending',
    submittedAt: '2025-06-11',
    message: 'Looking to contribute design work for your digital platforms and campaign landing pages.',
  },
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-amber-50 text-amber-600' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'bg-red-50 text-red-500' },
};

export default function ArtistSubmissions() {
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
  const [filter, setFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const filtered = filter === 'all' ? submissions : submissions.filter((s) => s.status === filter);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Artist Submissions</h1>
          <p className="text-sm text-[#9E9484] mt-0.5">Review and manage artist collaboration requests.</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#9E9484]" />
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-[#3D3632] text-[#FAF9F7]'
                  : 'bg-white border border-[#E8E2D9] text-[#6B6560] hover:border-[#C9A96E]/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {['pending', 'approved', 'rejected'].map((status) => {
          const config = STATUS_CONFIG[status];
          const Icon = config.icon;
          return (
            <div key={status} className="bg-white rounded-xl border border-[#E8E2D9] p-4 shadow-premium">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className={config.color.split(' ')[1]} />
                <span className="text-[11px] text-[#9E9484] capitalize">{config.label}</span>
              </div>
              <p className="text-xl font-semibold text-[#3D3632] font-serif">
                {submissions.filter((s) => s.status === status).length}
              </p>
            </div>
          );
        })}
      </div>

      {/* Submissions list */}
      <div className="space-y-3">
        {filtered.map((sub) => {
          const statusConfig = STATUS_CONFIG[sub.status];
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-[#E8E2D9] p-5 shadow-premium card-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#3D3632]">{sub.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-[#9E9484]">
                    <span className="flex items-center gap-1">
                      <Mail size={11} />
                      {sub.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {sub.submittedAt}
                    </span>
                    <a
                      href={sub.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-0.5 text-[#C9A96E] hover:underline"
                    >
                      Portfolio
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  <div className="mt-2">
                    <span className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E8E2D9] rounded-md text-[10px] font-medium text-[#6B6560]">
                      {sub.specialty}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6560] mt-2 leading-relaxed bg-[#FAF9F7] rounded-lg p-3 border border-[#E8E2D9]">
                    {sub.message}
                  </p>
                </div>

                {sub.status === 'pending' && (
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleStatusChange(sub.id, 'approved')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle size={12} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(sub.id, 'rejected')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={12} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Users size={40} className="mx-auto text-[#E8E2D9] mb-3" />
          <p className="text-sm text-[#9E9484]">No submissions found</p>
        </div>
      )}
    </div>
  );
}
