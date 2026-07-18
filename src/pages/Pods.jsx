/******  PODS LIST — All Your Pods  ******/
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, TrendingUp, BarChart3, Sparkles } from 'lucide-react';
import { usePod } from '../pods/PodContext';

export default function Pods() {
  const { pods } = usePod();

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Pods</h1>
            <p className="text-sm text-gray-400 mt-1">Manage all your content pods in one place</p>
          </div>
          <Link to="/pods/new" className="btn-primary flex items-center gap-2">
            <Plus size={16} /> New Pod
          </Link>
        </div>

        {/* Pods Grid */}
        {pods.length === 0 ? (
          <div className="pod-card text-center py-16">
            <Sparkles size={48} className="text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No pods yet</h3>
            <p className="text-sm text-gray-400 mb-6">Create your first pod to get started</p>
            <Link to="/pods/new" className="btn-primary inline-flex items-center gap-2">
              <Plus size={16} /> Create First Pod
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pods.map((pod) => (
              <Link
                key={pod.id}
                to={`/pods/${pod.id}`}
                className="pod-card group hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {pod.name.charAt(0).toUpperCase()}
                  </div>
                  <ArrowRight size={18} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{pod.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{pod.type}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><TrendingUp size={12} /> {pod.platforms?.join(', ') || 'All Platforms'}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800/60">
                  <span className="pod-badge-purple">{pod.status || 'Active'}</span>
                  {pod.goals?.slice(0, 2).map((g) => (
                    <span key={g} className="pod-badge bg-gray-800 text-gray-400">{g}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}