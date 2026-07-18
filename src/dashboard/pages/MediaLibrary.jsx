import { useState, useRef } from 'react';
import {
  Image,
  Upload,
  Search,
  Grid3X3,
  List,
  Trash2,
  Download,
  FileImage,
  FileVideo,
  FileAudio,
} from 'lucide-react';

/* ─── Mock data ─── */
const INITIAL_MEDIA = [
  { id: 1, name: 'hero-beach-sunset.jpg', type: 'image', size: '2.4 MB', date: '2025-06-15', url: null },
  { id: 2, name: 'product-serum-lifestyle.jpg', type: 'image', size: '1.8 MB', date: '2025-06-14', url: null },
  { id: 3, name: 'brand-reel-summer.mp4', type: 'video', size: '12.6 MB', date: '2025-06-13', url: null },
  { id: 4, name: 'podcast-intro.mp3', type: 'audio', size: '3.2 MB', date: '2025-06-12', url: null },
  { id: 5, name: 'instagram-carousel-1.jpg', type: 'image', size: '1.1 MB', date: '2025-06-11', url: null },
  { id: 6, name: 'logo-white-transparent.png', type: 'image', size: '0.4 MB', date: '2025-06-10', url: null },
];

const TYPE_ICONS = {
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
};

const TYPE_COLORS = {
  image: 'bg-[#C9A96E]/10 text-[#C9A96E]',
  video: 'bg-[#9E9484]/10 text-[#9E9484]',
  audio: 'bg-[#6B6560]/10 text-[#6B6560]',
};

export default function MediaLibrary() {
  const [media, setMedia] = useState(INITIAL_MEDIA);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const fileInputRef = useRef(null);

  const filtered = media.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || m.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newItems = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      url: null,
    }));
    setMedia([...newItems, ...media]);
  };

  const handleDelete = (id) => setMedia(media.filter((m) => m.id !== id));

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#3D3632] font-serif">Media Library</h1>
          <p className="text-sm text-[#9E9484] mt-0.5">Manage images, videos, and audio files.</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-4 py-2 bg-[#3D3632] text-[#FAF9F7] rounded-lg text-sm font-medium hover:bg-[#4A433E] transition-colors"
        >
          <Upload size={16} />
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9484]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-9 pr-4 py-2 border border-[#E8E2D9] rounded-lg text-sm text-[#3D3632] placeholder:text-[#9E9484] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'image', 'video', 'audio'].map((f) => (
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
          <div className="flex items-center border border-[#E8E2D9] rounded-lg overflow-hidden ml-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#E8E2D9]' : 'bg-white'} transition-colors`}
            >
              <Grid3X3 size={14} className="text-[#6B6560]" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-[#E8E2D9]' : 'bg-white'} transition-colors`}
            >
              <List size={14} className="text-[#6B6560]" />
            </button>
          </div>
        </div>
      </div>

      {/* Media grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const Icon = TYPE_ICONS[item.type] || FileImage;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E8E2D9] p-4 shadow-premium card-lift group"
              >
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center mb-3 ${TYPE_COLORS[item.type]}`}>
                  <Icon size={32} />
                </div>
                <p className="text-xs font-medium text-[#3D3632] truncate">{item.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-[#9E9484]">{item.size}</span>
                  <span className="text-[10px] text-[#9E9484]">{item.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded hover:bg-[#E8E2D9]/50 transition-colors">
                    <Download size={12} className="text-[#9E9484]" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E2D9] shadow-premium overflow-hidden">
          {filtered.map((item, i) => {
            const Icon = TYPE_ICONS[item.type] || FileImage;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 px-4 py-3 ${
                  i < filtered.length - 1 ? 'border-b border-[#E8E2D9]/50' : ''
                }`}
              >
                <div className={`p-2 rounded-lg ${TYPE_COLORS[item.type]}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#3D3632] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#9E9484]">{item.type} · {item.size}</p>
                </div>
                <span className="text-[10px] text-[#9E9484]">{item.date}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#E8E2D9]/50 transition-colors">
                    <Download size={13} className="text-[#9E9484]" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} className="text-red-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Image size={40} className="mx-auto text-[#E8E2D9] mb-3" />
          <p className="text-sm text-[#9E9484]">No media found</p>
        </div>
      )}
    </div>
  );
}
