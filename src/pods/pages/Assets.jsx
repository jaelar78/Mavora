/******  ASSETS — Pod Asset Manager  ******/
import React, { useState } from 'react';
import {
  Image, Video, FileText, Music, Upload, Search, Grid, List, Folder,
  Tag, Star, Download, Trash2, Copy, Check, Filter, Plus
} from 'lucide-react';

const SAMPLE_ASSETS = [
  { id: 1, name: 'Brand Logo Primary', type: 'image', format: 'PNG', size: '1.2 MB', dimensions: '1024x1024', tags: ['logo', 'brand', 'primary'], favorite: true, date: '2026-01-15', folder: 'Brand' },
  { id: 2, name: 'Product Shot - Summer', type: 'image', format: 'JPG', size: '3.4 MB', dimensions: '1920x1080', tags: ['product', 'summer'], favorite: false, date: '2026-01-14', folder: 'Products' },
  { id: 3, name: 'Tutorial Walkthrough', type: 'video', format: 'MP4', size: '45.2 MB', duration: '2:30', tags: ['tutorial', 'video'], favorite: true, date: '2026-01-13', folder: 'Videos' },
  { id: 4, name: 'Social Media Kit Q1', type: 'document', format: 'PDF', size: '8.5 MB', pages: 24, tags: ['social', 'kit', 'q1'], favorite: false, date: '2026-01-12', folder: 'Documents' },
  { id: 5, name: 'Podcast Intro Audio', type: 'audio', format: 'MP3', size: '4.1 MB', duration: '0:15', tags: ['audio', 'podcast', 'intro'], favorite: false, date: '2026-01-11', folder: 'Audio' },
  { id: 6, name: 'Instagram Story Templates', type: 'image', format: 'PSD', size: '12.8 MB', dimensions: '1080x1920', tags: ['story', 'template', 'instagram'], favorite: true, date: '2026-01-10', folder: 'Templates' },
  { id: 7, name: 'Behind the Scenes', type: 'video', format: 'MP4', size: '28.6 MB', duration: '1:45', tags: ['bts', 'video', 'content'], favorite: false, date: '2026-01-09', folder: 'Videos' },
  { id: 8, name: 'Brand Guidelines 2026', type: 'document', format: 'PDF', size: '5.2 MB', pages: 16, tags: ['brand', 'guidelines'], favorite: true, date: '2026-01-08', folder: 'Brand' },
];

const TYPE_ICONS = { image: <Image size={16} />, video: <Video size={16} />, document: <FileText size={16} />, audio: <Music size={16} /> };
const TYPE_COLORS = { image: 'text-purple-400', video: 'text-pink-400', document: 'text-blue-400', audio: 'text-amber-400' };

export default function Assets() {
  const [assets, setAssets] = useState(SAMPLE_ASSETS);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [folderFilter, setFolderFilter] = useState('all');

  const folders = [...new Set(assets.map((a) => a.folder))];

  const filtered = assets.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (folderFilter !== 'all' && a.folder !== folderFilter) return false;
    return true;
  });

  const toggleFavorite = (id) => {
    setAssets((prev) => prev.map((a) => a.id === id ? { ...a, favorite: !a.favorite } : a));
  };

  const typeCounts = { all: assets.length, image: assets.filter((a) => a.type === 'image').length, video: assets.filter((a) => a.type === 'video').length, document: assets.filter((a) => a.type === 'document').length, audio: assets.filter((a) => a.type === 'audio').length };

  return (
    <div className="pod-page-container space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Assets</h2>
          <p className="text-sm text-gray-400">Manage your pod's creative assets</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Upload size={16} /> Upload</button>
      </div>

      {/* Stats */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'image', 'video', 'document', 'audio'].map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 text-xs rounded-lg transition-all capitalize ${typeFilter === t ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#1a1a24] text-gray-400 border border-gray-800'}`}>
            {t} ({typeCounts[t]})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center flex-1 min-w-[200px] bg-[#1a1a24] border border-gray-800 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 mr-2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1" />
        </div>
        <select value={folderFilter} onChange={(e) => setFolderFilter(e.target.value)} className="input-field">
          <option value="all">All Folders</option>
          {folders.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <div className="flex items-center bg-[#1a1a24] border border-gray-800 rounded-lg p-1">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><Grid size={14} /></button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><List size={14} /></button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filtered.map((asset) => (
            <div key={asset.id} className="pod-card group hover:border-purple-500/30 transition-all">
              <div className="aspect-square bg-[#0a0a0f] rounded-lg mb-2 flex items-center justify-center">
                <div className={TYPE_COLORS[asset.type]}>{TYPE_ICONS[asset.type]}</div>
              </div>
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{asset.name}</p>
                  <p className="text-[10px] text-gray-500">{asset.size} &middot; {asset.folder}</p>
                </div>
                <button onClick={() => toggleFavorite(asset.id)} className="text-gray-500 hover:text-amber-400 shrink-0">
                  <Star size={12} className={asset.favorite ? 'fill-amber-400 text-amber-400' : ''} />
                </button>
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
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Name</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Type</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Size</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Folder</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id} className="border-b border-gray-800/50 hover:bg-white/5">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <div className={TYPE_COLORS[asset.type]}>{TYPE_ICONS[asset.type]}</div>
                    <span className="text-xs text-white">{asset.name}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-400 capitalize">{asset.type}</td>
                  <td className="px-3 py-2 text-xs text-gray-400">{asset.size}</td>
                  <td className="px-3 py-2 text-xs text-gray-400">{asset.folder}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button className="p-1 text-gray-500 hover:text-amber-400"><Star size={12} className={asset.favorite ? 'fill-amber-400 text-amber-400' : ''} /></button>
                      <button className="p-1 text-gray-500 hover:text-white"><Download size={12} /></button>
                      <button className="p-1 text-gray-500 hover:text-red-400"><Trash2 size={12} /></button>
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