import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Upload,
  Trash2,
  Search,
  Filter,
  Grid,
  List,
  FileText,
  Video,
  Music,
  File,
  X,
  CheckCircle2,
  Download,
  Eye,
  ChevronDown,
  FolderOpen,
  Plus,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── Mock Media Data ─── */
const MOCK_MEDIA = [
  { id: 1, name: "gidgee-hero.jpg", type: "image", size: "2.4 MB", website: "Gidgee", folder: "Hero Images", date: "Jul 18, 2025", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400" },
  { id: 2, name: "waymark-product.mp4", type: "video", size: "18.2 MB", website: "Waymark", folder: "Product Videos", date: "Jul 17, 2025", url: null },
  { id: 3, name: "mgnm-lookbook.jpg", type: "image", size: "3.1 MB", website: "MGNM", folder: "Lookbook", date: "Jul 16, 2025", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400" },
  { id: 4, name: "brand-voice.pdf", type: "document", size: "1.2 MB", website: "All", folder: "Brand Assets", date: "Jul 15, 2025", url: null },
  { id: 5, name: "jewellery-promo.jpg", type: "image", size: "1.8 MB", website: "Jewellery", folder: "Promotions", date: "Jul 14, 2025", url: "https://images.unsplash.com/photo-1515562140-d4e2a4a3b2e3?w=400" },
  { id: 6, name: "gidgee-process.mp4", type: "video", size: "24.5 MB", website: "Gidgee", folder: "Behind the Scenes", date: "Jul 13, 2025", url: null },
  { id: 7, name: "mgnm-track.mp3", type: "audio", size: "4.2 MB", website: "MGNM", folder: "Audio", date: "Jul 12, 2025", url: null },
  { id: 8, name: "social-templates.psd", type: "design", size: "45.1 MB", website: "All", folder: "Templates", date: "Jul 11, 2025", url: null },
  { id: 9, name: "waymark-detail.jpg", type: "image", size: "2.9 MB", website: "Waymark", folder: "Product Shots", date: "Jul 10, 2025", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 10, name: "campaign-brief.pdf", type: "document", size: "890 KB", website: "All", folder: "Documents", date: "Jul 9, 2025", url: null },
  { id: 11, name: "jewellery-model.jpg", type: "image", size: "3.5 MB", website: "Jewellery", folder: "Models", date: "Jul 8, 2025", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
  { id: 12, name: "gidgee-logo.svg", type: "design", size: "12 KB", website: "Gidgee", folder: "Logos", date: "Jul 7, 2025", url: null },
];

const FOLDERS = [
  { name: "All Files", count: 12 },
  { name: "Hero Images", count: 1 },
  { name: "Product Videos", count: 1 },
  { name: "Lookbook", count: 1 },
  { name: "Brand Assets", count: 2 },
  { name: "Promotions", count: 1 },
  { name: "Behind the Scenes", count: 1 },
  { name: "Audio", count: 1 },
  { name: "Templates", count: 1 },
  { name: "Documents", count: 2 },
];

const TYPE_ICONS = {
  image: Image,
  video: Video,
  audio: Music,
  document: FileText,
  design: File,
};

const TYPE_COLORS = {
  image: "bg-pink-50 text-pink-600",
  video: "bg-violet-50 text-violet-600",
  audio: "bg-amber-50 text-amber-600",
  document: "bg-blue-50 text-blue-600",
  design: "bg-green-50 text-green-600",
};

/* ─── File Card (Grid View) ─── */
function FileCard({ file, onSelect, isSelected }) {
  const TypeIcon = TYPE_ICONS[file.type] || File;
  const isImage = file.type === "image" && file.url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all",
        isSelected ? "border-taupe shadow-premium" : "border-warm-border shadow-premium hover:shadow-premium-hover"
      )}
      onClick={() => onSelect(file.id)}
    >
      {/* Thumbnail */}
      <div className="aspect-square bg-cream relative overflow-hidden">
        {isImage ? (
          <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TypeIcon className={cn("w-12 h-12", (TYPE_COLORS[file.type] || "").split(" ")[1])} />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        {isSelected && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="w-5 h-5 text-taupe" />
          </div>
        )}
        {/* Type badge */}
        <span className={cn("absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium", TYPE_COLORS[file.type])}>
          {file.type}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-medium text-warm-charcoal truncate">{file.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-warm-muted">{file.size}</span>
          <span className="text-[10px] text-warm-muted">{file.website}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── File Row (List View) ─── */
function FileRow({ file, onSelect, isSelected }) {
  const TypeIcon = TYPE_ICONS[file.type] || File;
  const isImage = file.type === "image" && file.url;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "border-b border-warm-border/60 cursor-pointer transition-colors",
        isSelected ? "bg-taupe/5" : "hover:bg-cream/30"
      )}
      onClick={() => onSelect(file.id)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {isSelected ? (
            <CheckCircle2 className="w-4 h-4 text-taupe" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center">
              <TypeIcon className="w-4 h-4 text-warm-muted" />
            </div>
          )}
          <span className="text-sm text-warm-charcoal font-medium">{file.name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", TYPE_COLORS[file.type])}>
          {file.type}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-warm-muted">{file.website}</td>
      <td className="px-4 py-3 text-xs text-warm-muted">{file.folder}</td>
      <td className="px-4 py-3 text-xs text-warm-muted">{file.size}</td>
      <td className="px-4 py-3 text-xs text-warm-muted">{file.date}</td>
    </motion.tr>
  );
}

/* ─── Upload Zone ─── */
function UploadZone({ onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer",
        dragOver ? "border-taupe bg-taupe/5" : "border-warm-border hover:border-taupe/40"
      )}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); onUpload(); }}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center">
        <Upload className="w-7 h-7 text-taupe" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-warm-charcoal">Drop files here or click to upload</p>
        <p className="text-xs text-warm-muted mt-1">Supports images, videos, audio, documents up to 100MB</p>
      </div>
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={onUpload} />
    </div>
  );
}

/* ─── Main Component ─── */
export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFolder, setSelectedFolder] = useState("All Files");
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUpload, setShowUpload] = useState(false);

  const toggleSelect = (id) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredMedia = MOCK_MEDIA.filter((file) => {
    const matchesFolder = selectedFolder === "All Files" || file.folder === selectedFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    return matchesFolder && matchesSearch && matchesType;
  });

  const selectedCount = selectedFiles.size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Media Library</h1>
          <p className="text-sm text-warm-muted mt-1">{MOCK_MEDIA.length} files across {FOLDERS.length - 1} folders</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all shadow-premium-hover"
        >
          {showUpload ? <X className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
          {showUpload ? "Close" : "Upload"}
        </button>
      </div>

      {/* Upload Zone */}
      <AnimatePresence>
        {showUpload && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <UploadZone onUpload={() => setShowUpload(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-warm-charcoal placeholder:text-warm-muted focus:outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-warm-charcoal focus:outline-none focus:border-taupe pr-10"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="document">Documents</option>
              <option value="design">Design Files</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-warm-border rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2.5 transition-colors", viewMode === "grid" ? "bg-warm-charcoal text-white" : "bg-white text-warm-muted hover:text-warm-charcoal")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2.5 transition-colors", viewMode === "list" ? "bg-warm-charcoal text-white" : "bg-white text-warm-muted hover:text-warm-charcoal")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selection bar */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between px-4 py-3 bg-taupe/10 border border-taupe/20 rounded-xl"
          >
            <span className="text-sm text-warm-charcoal">
              <span className="font-semibold">{selectedCount}</span> file{selectedCount !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-warm-border bg-white text-xs font-medium text-warm-charcoal hover:bg-cream transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 bg-white text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
              <button
                onClick={() => setSelectedFiles(new Set())}
                className="p-2 rounded-lg hover:bg-cream transition-colors"
              >
                <X className="w-4 h-4 text-warm-muted" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex gap-6">
        {/* Sidebar: Folders */}
        <div className="hidden lg:block w-56 shrink-0">
          <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-4">
            <h3 className="text-xs font-semibold text-warm-muted uppercase tracking-wider mb-3">Folders</h3>
            <div className="space-y-1">
              {FOLDERS.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setSelectedFolder(folder.name)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all",
                    selectedFolder === folder.name
                      ? "bg-taupe/10 text-warm-charcoal font-medium"
                      : "text-warm-muted hover:text-warm-charcoal hover:bg-cream/50"
                  )}
                >
                  <FolderOpen className="w-4 h-4 shrink-0" />
                  <span className="truncate">{folder.name}</span>
                  <span className="ml-auto text-[10px] text-warm-muted">{folder.count}</span>
                </button>
              ))}
            </div>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-warm-muted hover:text-warm-charcoal hover:bg-cream/50 transition-all mt-2">
              <Plus className="w-4 h-4" />
              New Folder
            </button>
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 min-w-0">
          {filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-warm-border rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-4">
                <Image className="w-8 h-8 text-warm-muted" />
              </div>
              <p className="text-sm font-medium text-warm-charcoal mb-1">No files found</p>
              <p className="text-xs text-warm-muted">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((file) => (
                <FileCard key={file.id} file={file} onSelect={toggleSelect} isSelected={selectedFiles.has(file.id)} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-warm-border rounded-2xl shadow-premium overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-border bg-cream/30">
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Website</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Folder</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Size</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((file) => (
                    <FileRow key={file.id} file={file} onSelect={toggleSelect} isSelected={selectedFiles.has(file.id)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
