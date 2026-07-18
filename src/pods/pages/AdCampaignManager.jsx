import React, { useState } from 'react';
import { usePod } from '../PodContext';
import { Megaphone, Target, DollarSign, BarChart3, Plus, Trash2 } from 'lucide-react';

export default function AdCampaignManager() {
  const { pod } = usePod();
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Product Launch', status: 'Active', budget: 500, spent: 342, conversions: 47, ctr: '3.2%' },
    { id: 2, name: 'Retargeting — Cart Abandoners', status: 'Paused', budget: 300, spent: 189, conversions: 23, ctr: '2.1%' },
  ]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBudget, setNewBudget] = useState('');

  const addCampaign = () => {
    if (!newName || !newBudget) return;
    setCampaigns([...campaigns, {
      id: Date.now(),
      name: newName,
      status: 'Draft',
      budget: Number(newBudget),
      spent: 0,
      conversions: 0,
      ctr: '0.0%',
    }]);
    setNewName('');
    setNewBudget('');
    setShowNew(false);
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const toggleStatus = (id) => {
    setCampaigns(campaigns.map((c) => {
      if (c.id !== id) return c;
      const next = c.status === 'Active' ? 'Paused' : c.status === 'Paused' ? 'Active' : 'Active';
      return { ...c, status: next };
    }));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Ad Campaigns</h2>
          <p className="text-[#8A7A6B] text-sm">{pod?.name}</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#B8983C] transition-all"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {showNew && (
        <div className="bg-white border border-[#D4C5B0] rounded-xl p-6 space-y-4">
          <h3 className="text-[#1A1A1A] font-semibold">Create New Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8A7A6B] mb-1">Campaign Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#D4C5B0] rounded-lg px-4 py-2 text-[#1A1A1A] focus:border-[#C9A84C] focus:outline-none"
                placeholder="e.g. Holiday Sale 2024"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8A7A6B] mb-1">Budget ($)</label>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#D4C5B0] rounded-lg px-4 py-2 text-[#1A1A1A] focus:border-[#C9A84C] focus:outline-none"
                placeholder="500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addCampaign} className="px-4 py-2 bg-[#C9A84C] text-white rounded-lg hover:bg-[#B8983C]">Create</button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 text-[#8A7A6B] hover:text-[#1A1A1A]">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D4C5B0] rounded-xl p-5">
          <div className="flex items-center gap-2 text-[#8A7A6B] mb-2">
            <Megaphone className="w-4 h-4" />
            <span className="text-sm">Total Campaigns</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{campaigns.length}</p>
        </div>
        <div className="bg-white border border-[#D4C5B0] rounded-xl p-5">
          <div className="flex items-center gap-2 text-[#8A7A6B] mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm">Active</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{campaigns.filter((c) => c.status === 'Active').length}</p>
        </div>
        <div className="bg-white border border-[#D4C5B0] rounded-xl p-5">
          <div className="flex items-center gap-2 text-[#8A7A6B] mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">${campaigns.reduce((a, c) => a + c.spent, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white border border-[#D4C5B0] rounded-xl p-5">
          <div className="flex items-center gap-2 text-[#8A7A6B] mb-2">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Avg CTR</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">3.2%</p>
        </div>
      </div>

      <div className="bg-white border border-[#D4C5B0] rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm text-[#8A7A6B] border-b border-[#D4C5B0]">
          <div className="col-span-3">Campaign</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Budget</div>
          <div className="col-span-2">Spent</div>
          <div className="col-span-2">Conversions</div>
          <div className="col-span-1"></div>
        </div>
        {campaigns.map((c) => (
          <div key={c.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#D4C5B0]/50 hover:bg-[#FAF9F6] transition">
            <div className="col-span-3">
              <p className="text-[#1A1A1A] font-medium">{c.name}</p>
              <p className="text-[#8A7A6B] text-xs">CTR: {c.ctr}</p>
            </div>
            <div className="col-span-2">
              <button
                onClick={() => toggleStatus(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  c.status === 'Active' ? 'bg-green-100 text-green-700' :
                  c.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}
              >
                {c.status}
              </button>
            </div>
            <div className="col-span-2 text-[#1A1A1A]">${c.budget.toLocaleString()}</div>
            <div className="col-span-2 text-[#1A1A1A]">${c.spent.toLocaleString()}</div>
            <div className="col-span-2 text-[#1A1A1A]">{c.conversions}</div>
            <div className="col-span-1 flex justify-end">
              <button onClick={() => deleteCampaign(c.id)} className="text-[#8A7A6B] hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {campaigns.length === 0 && (
          <div className="px-6 py-8 text-center text-[#8A7A6B]">
            No campaigns yet. Create your first one above.
          </div>
        )}
      </div>
    </div>
  );
}
