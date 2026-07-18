/******  MEDIA LIBRARY — Asset Organization  ******/
import React, { useState } from 'react';
import {
  Image, Video, FileText, Music, Search, Grid, List, Upload,
  Folder, Tag, Filter, Download, Trash2, Copy, Star, Clock
} from 'lucide-react';

const SAMPLE_ASSETS = [
  { id: 1, name: 'Summer Collection Hero', type: 'image', size: '2.4 MB', dimensions: '1080x1080', tags: ['fashion', 'summer', 'hero'], favorite: true, date: '2026-01-15', pod: 'Fashion Forward' },
  { id: 2, name: 'Workout Tutorial Reel', type: 'video', size: '45.2 MB', duration: '0:45', tags: ['fitness', 'tutorial', 'reel'], favorite: false, date: '2026-01-14', pod: 'Fitness Daily' },
  { id: 3, name: 'Brand Guidelines 2026', type: 'document', size: '5.1 MB', pages: 12, tags: ['brand', 'guidelines'], favorite: true, date: '2026-01-13', pod: 'Fashion Forward' },
  { id: 4, name: 'Morning Routine BTS', type: 'video', size: '32.8 MB', duration: '1:23', tags: ['lifestyle', 'bts', 'morning'], favorite: false, date: '2026-01-12', pod: 'Fitness Daily' },
  { id: 5, name: 'Product Lineup', type: 'image', size: '3.7 MB', dimensions: '1920x1080', tags: ['product', 'lineup', 'ecommerce'], favorite: false, date: '2026-01-11', pod: 'Fashion Forward' },
  { id: 6, name: 'Podcast Intro', type: 'audio', size: '8.2 MB', duration: '0:15', tags: ['audio', 'podcast', 'intro'], favorite: false, date: '2026-01-10', pod: 'Art Studio' },
  { id: 7, name: 'Instagram Story Set', type: 'image', size: '1.8 MB', dimensions: '1080x1920', tags: ['story', 'instagram', 'set'], favorite: true, date: '2026-01-09', pod: 'Fashion Forward' },
  { id: 8, name: 'Testimonial Compilation', type: 'video', size: '28.5 MB', duration: '2:15', tags: ['testimonial', 'social-proof'], favorite: false, date: '2026-01-08', pod: 'Fitness Daily' },
];

const TYPE_ICONS = { image: <Image size={16} />, video: <Video size={16} />, document: <FileText size={16} />, audio: <Music size={16} /> };
const TYPE_COLORS = { image: 'text-purple-400', video: 'text-pink-400', document: 'text-blue-400', audio: 'text-amber-400' };

export default function MediaLibrary() {
  const [assets, setAssets] = useState(SAMPLE_ASSETS);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [podFilter, setPodFilter] = useState('all');

  const filtered = assets.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (podFilter !== 'all' && a.pod !== podFilter) return false;
    return true;
  });

  const pods = [...new Set(assets.map((a) => a.pod))];

  const toggleFavorite = (id) => {
    setAssets((prev) => prev.map((a) => a.id === id ? { ...a, favorite: !a.favorite } : a));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-sm text-gray-400 mt-1">Organize and manage all your creative assets</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Upload size={16} /> Upload
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center flex-1 min-w-[200px] bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="input-field">
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="document">Documents</option>
          <option value="audio">Audio</option>
        </select>
        <select value={podFilter} onChange={(e) => setPodFilter(e.target.value)} className="input-field">
          <option value="all">All Pods</option>
          {pods.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div className="flex items-center bg-[#1a1a24] border border-gray-800 rounded-lg p-1">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><Grid size={14} /></button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><List size={14} /></button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{filtered.length} assets</span>
        <span>{assets.filter((a) => a.favorite).length} favorites</span>
        <span>{(assets.reduce((s, a) => s + parseFloat(a.size), 0)).toFixed(1)} MB total</span>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((asset) => (
            <div key={asset.id} className="pod-card group cursor-pointer hover:border-purple-500/30 transition-all">
              <div className="aspect-video bg-[#0a0a0f] rounded-lg mb-3 flex items-center justify-center">
                <div className={TYPE_COLORS[asset.type]}>{TYPE_ICONS[asset.type]}</div>
              </div>
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.size} &middot; {asset.pod}</p>
                </div>
                <button onClick={() => toggleFavorite(asset.id)} className="text-gray-500 hover:text-amber-400 transition-colors shrink-0">
                  <Star size={14} className={asset.favorite ? 'fill-amber-400 text-amber-400' : ''} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {asset.tags.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 text-[10px] bg-gray-800 text-gray-400 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="pod-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Asset</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Size</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Pod</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Date</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={TYPE_COLORS[asset.type]}>{TYPE_ICONS[asset.type]}</div>
                      <div>
                        <p className="text-sm font-medium text-white">{asset.name}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {asset.tags.slice(0, 3).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 text-[10px] bg-gray-800 text-gray-400 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300 capitalize">{asset.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{asset.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{asset.pod}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{asset.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleFavorite(asset.id)} className="p-1.5 text-gray-400 hover:text-amber-400"><Star size={14} className={asset.favorite ? 'fill-amber-400 text-amber-400' : ''} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white"><Download size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}