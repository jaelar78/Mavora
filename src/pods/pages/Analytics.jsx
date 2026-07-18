import React from 'react';
import { usePod } from '../PodContext';

export default function Analytics() {
  const { pod } = usePod();

  const metrics = [
    { label: 'Total Reach', value: '124,500', change: '+12%', positive: true },
    { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', positive: true },
    { label: 'Click-Through Rate', value: '2.3%', change: '-0.2%', positive: false },
    { label: 'Conversions', value: '847', change: '+18%', positive: true },
  ];

  const platforms = [
    { name: 'Instagram', reach: '45,200', engagement: '5.2%', color: '#E1306C' },
    { name: 'TikTok', reach: '38,100', engagement: '6.8%', color: '#00F2EA' },
    { name: 'Facebook', reach: '28,400', engagement: '3.1%', color: '#1877F2' },
    { name: 'LinkedIn', reach: '12,800', engagement: '2.4%', color: '#0A66C2' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1A1A1A]">Analytics</h2>
        <p className="text-[#8A7A6B] text-sm">{pod?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-[#D4C5B0] rounded-xl p-6">
            <p className="text-[#8A7A6B] text-sm mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">{m.value}</p>
            <p className={`text-sm mt-1 ${m.positive ? 'text-green-600' : 'text-red-500'}`}>
              {m.change} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#D4C5B0] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Platform Performance</h3>
        <div className="space-y-4">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-[#1A1A1A] font-medium w-24">{p.name}</span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8A7A6B]">Reach: {p.reach}</span>
                  <span className="text-[#8A7A6B]">Engagement: {p.engagement}</span>
                </div>
                <div className="h-2 bg-[#F5EFE6] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: p.engagement, backgroundColor: p.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#D4C5B0] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">AI Insight</h3>
        <p className="text-[#8A7A6B]">
          TikTok is your highest-engagement platform. Consider shifting 15% of your Instagram budget to TikTok for the next 30 days to maximize ROI.
        </p>
      </div>
    </div>
  );
}
