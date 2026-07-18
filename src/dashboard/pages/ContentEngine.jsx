import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Instagram,
  Facebook,
  Music,
  FileText,
  Linkedin,
  Upload,
  CheckCircle2,
  Pencil,
  Trash2,
  Calendar,
  ChevronDown,
  Globe,
  Hash,
  DollarSign,
  Megaphone,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── Inline SVG for Google Ads (not in lucide) ─── */
function GoogleAdsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

/* ─── Website Data ─── */
const WEBSITES = [
  { name: "All", color: "#9E9484" },
  { name: "Gidgee", color: "#C9A96E" },
  { name: "Waymark", color: "#3B82F6" },
  { name: "MGNM", color: "#8B5CF6" },
  { name: "Jewellery", color: "#EC4899" },
];

/* ─── Platform Config ─── */
const PLATFORMS = [
  { id: "instagram", label: "Instagram", Icon: Instagram, color: "#E4405F", borderColor: "border-[#E4405F]" },
  { id: "facebook", label: "Facebook", Icon: Facebook, color: "#1877F2", borderColor: "border-[#1877F2]" },
  { id: "tiktok", label: "TikTok", Icon: Music, color: "#000000", borderColor: "border-black" },
  { id: "blog", label: "Blog", Icon: FileText, color: "#8b5cf6", borderColor: "border-[#8b5cf6]" },
  { id: "google", label: "Google Ads", Icon: GoogleAdsIcon, color: "#4285F4", borderColor: "border-[#4285F4]" },
  { id: "linkedin", label: "LinkedIn", Icon: Linkedin, color: "#0A66C2", borderColor: "border-[#0A66C2]" },
];

/* ─── Mock Content Library ─── */
const MOCK_LIBRARY = [
  { id: 1, platform: "instagram", website: "Gidgee", preview: "Introducing our new hand-crafted collection...", status: "Approved", date: "Jul 18, 2025" },
  { id: 2, platform: "facebook", website: "Waymark", preview: "Shop the latest arrivals with free shipping...", status: "Draft", date: "Jul 17, 2025" },
  { id: 3, platform: "tiktok", website: "MGNM", preview: "POV: You just found your new favourite artist...", status: "Posted", date: "Jul 16, 2025" },
  { id: 4, platform: "blog", website: "Jewellery", preview: "The Ultimate Guide to Sustainable Jewellery...", status: "Draft", date: "Jul 15, 2025" },
  { id: 5, platform: "google", website: "Gidgee", preview: "Premium Leather Goods | Shop Online...", status: "Approved", date: "Jul 14, 2025" },
  { id: 6, platform: "linkedin", website: "Waymark", preview: "How Waymark is transforming the marketplace...", status: "Posted", date: "Jul 13, 2025" },
  { id: 7, platform: "instagram", website: "MGNM", preview: "Behind the scenes with our latest featured...", status: "Draft", date: "Jul 12, 2025" },
  { id: 8, platform: "facebook", website: "Jewellery", preview: "New collection drop is here. Limited pieces...", status: "Approved", date: "Jul 11, 2025" },
];

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-blue-50 text-blue-700 border-blue-200",
    Posted: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", styles[status] || styles.Draft)}>
      {status}
    </span>
  );
}

/* ─── Platform Badge ─── */
function PlatformBadge({ platformId }) {
  const p = PLATFORMS.find((x) => x.id === platformId) || PLATFORMS[0];
  const Icon = p.Icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: p.color }}>
      <Icon className="w-3.5 h-3.5" />
      {p.label}
    </span>
  );
}

/* ─── Form Section ─── */
function FormGroup({ label, children, required }) {
  return (
    <div>
      <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ─── Instagram Form ─── */
function InstagramForm({ website, onGenerate }) {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState(["#handcrafted", "#artisan", "#luxury", "#newcollection"]);
  const [hashtagInput, setHashtagInput] = useState("");

  const addHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };
  const removeHashtag = (h) => setHashtags(hashtags.filter((x) => x !== h));

  return (
    <div className="space-y-4">
      <FormGroup label="Caption" required>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={`Write something magical for ${website}...`}
          rows={5}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <FormGroup label="Hashtags">
        <div className="flex flex-wrap gap-2 mb-2">
          {hashtags.map((h) => (
            <span key={h} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cream border border-warm-border text-xs text-taupe">
              <Hash className="w-3 h-3" />
              {h}
              <button onClick={() => removeHashtag(h)} className="ml-1 text-warm-muted hover:text-red-500">
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHashtag())}
            placeholder="Add hashtag..."
            className="flex-1 px-3 py-2 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
          />
          <button onClick={addHashtag} className="px-3 py-2 rounded-xl border border-warm-border text-sm text-warm-charcoal hover:bg-cream transition-colors">
            Add
          </button>
        </div>
      </FormGroup>
      <div className="border-2 border-dashed border-warm-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-taupe/40 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-warm-muted" />
        <p className="text-sm text-warm-muted">Drop an image here or click to upload</p>
      </div>
      <button
        onClick={() => onGenerate({ caption, hashtags, website, platform: "instagram" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E4405F] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Caption
      </button>
    </div>
  );
}

/* ─── Facebook Form ─── */
function FacebookForm({ website, onGenerate }) {
  const [post, setPost] = useState("");
  const [cta, setCta] = useState("Shop Now");
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");

  return (
    <div className="space-y-4">
      <FormGroup label="Post Content" required>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder={`What's new with ${website}? Write an engaging post...`}
          rows={5}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Call to Action">
          <select
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-white"
          >
            {["Shop Now", "Learn More", "Sign Up", "Book Now", "Contact Us"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Ad Budget ($)">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="500"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
            />
          </div>
        </FormGroup>
      </div>
      <FormGroup label="Target Audience">
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="e.g. Women 25-45, interested in fashion"
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
        />
      </FormGroup>
      <button
        onClick={() => onGenerate({ post, cta, budget, audience, website, platform: "facebook" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Ad
      </button>
    </div>
  );
}

/* ─── TikTok Form ─── */
function TikTokForm({ website, onGenerate }) {
  const [hook, setHook] = useState("");
  const [script, setScript] = useState("");
  const [hashtags, setHashtags] = useState(["#viral", "#fyp", "#trending"]);
  const [hashtagInput, setHashtagInput] = useState("");

  const addHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };
  const removeHashtag = (h) => setHashtags(hashtags.filter((x) => x !== h));

  return (
    <div className="space-y-4">
      <FormGroup label="Hook (First 3 Seconds)" required>
        <input
          value={hook}
          onChange={(e) => setHook(e.target.value)}
          placeholder="e.g. Wait for the reveal..."
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
        />
      </FormGroup>
      <FormGroup label="Script" required>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder={`Write your ${website} TikTok script here...`}
          rows={6}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <FormGroup label="Hashtags">
        <div className="flex flex-wrap gap-2 mb-2">
          {hashtags.map((h) => (
            <span key={h} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cream border border-warm-border text-xs text-taupe">
              <Hash className="w-3 h-3" />
              {h}
              <button onClick={() => removeHashtag(h)} className="ml-1 text-warm-muted hover:text-red-500">
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHashtag())}
            placeholder="Add hashtag..."
            className="flex-1 px-3 py-2 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
          />
          <button onClick={addHashtag} className="px-3 py-2 rounded-xl border border-warm-border text-sm text-warm-charcoal hover:bg-cream transition-colors">
            Add
          </button>
        </div>
      </FormGroup>
      <button
        onClick={() => onGenerate({ hook, script, hashtags, website, platform: "tiktok" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Script
      </button>
    </div>
  );
}

/* ─── Blog Form ─── */
function BlogForm({ website, onGenerate }) {
  const [title, setTitle] = useState("");
  const [outline, setOutline] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keywords, setKeywords] = useState("");

  return (
    <div className="space-y-4">
      <FormGroup label="Blog Title" required>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={`e.g. The Complete Guide to ${website} Products`}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
        />
      </FormGroup>
      <FormGroup label="Outline" required>
        <textarea
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          placeholder="Brief outline of what the blog should cover..."
          rows={5}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Tone">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-white"
          >
            {["Professional", "Casual", "Authoritative", "Friendly", "Inspirational"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Keywords">
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="SEO keywords, comma separated"
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
          />
        </FormGroup>
      </div>
      <button
        onClick={() => onGenerate({ title, outline, tone, keywords, website, platform: "blog" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8b5cf6] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Blog
      </button>
    </div>
  );
}

/* ─── Google Ads Form ─── */
function GoogleAdsForm({ website, onGenerate }) {
  const [headlines, setHeadlines] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [budget, setBudget] = useState("");

  const updateHeadline = (i, val) => {
    const next = [...headlines];
    next[i] = val;
    setHeadlines(next);
  };

  return (
    <div className="space-y-4">
      <FormGroup label="Headlines" required>
        <div className="space-y-2">
          {headlines.map((h, i) => (
            <input
              key={i}
              value={h}
              onChange={(e) => updateHeadline(i, e.target.value)}
              placeholder={`Headline ${i + 1} (max 30 chars)`}
              maxLength={30}
              className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
            />
          ))}
        </div>
      </FormGroup>
      <FormGroup label="Description" required>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ad description (max 90 characters)"
          maxLength={90}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Keywords">
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. leather bags, handmade"
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
          />
        </FormGroup>
        <FormGroup label="Daily Budget ($)">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="50"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe"
            />
          </div>
        </FormGroup>
      </div>
      <button
        onClick={() => onGenerate({ headlines, description, keywords, budget, website, platform: "google" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Ad
      </button>
    </div>
  );
}

/* ─── LinkedIn Form ─── */
function LinkedInForm({ website, onGenerate }) {
  const [post, setPost] = useState("");
  const [tone, setTone] = useState("Formal");
  const [cta, setCta] = useState("Learn More");

  return (
    <div className="space-y-4">
      <FormGroup label="Post Content" required>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder={`Share an insight or update about ${website}...`}
          rows={6}
          className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
        />
      </FormGroup>
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Tone">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-white"
          >
            {["Formal", "Conversational", "Thought Leadership", "Inspirational"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Call to Action">
          <select
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-white"
          >
            {["Learn More", "Visit Website", "Contact Us", "Download"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </FormGroup>
      </div>
      <button
        onClick={() => onGenerate({ post, tone, cta, website, platform: "linkedin" })}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A66C2] text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-premium"
      >
        <Sparkles className="w-4 h-4" />
        Generate Post
      </button>
    </div>
  );
}

/* ─── Content Preview ─── */
function ContentPreview({ content, onApprove, onEdit, onDelete, onSchedule }) {
  if (!content) return null;
  const p = PLATFORMS.find((x) => x.id === content.platform) || PLATFORMS[0];
  const w = WEBSITES.find((x) => x.name === content.website) || WEBSITES[0];
  const Icon = p.Icon;

  const previewText = content.caption || content.post || content.script || content.title || content.headlines?.[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-warm-border rounded-2xl shadow-premium p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: p.color }}>
            <Icon className="w-3.5 h-3.5" />
            {p.label}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-warm-gray">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
            {content.website}
          </span>
          {content.budget && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              ${content.budget} budget
            </span>
          )}
        </div>
        <StatusBadge status="Draft" />
      </div>

      <div className="bg-cream/50 rounded-xl p-4 mb-4">
        <p className="text-sm text-warm-charcoal leading-relaxed whitespace-pre-line">{previewText}</p>
        {content.hashtags && content.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {content.hashtags.map((h) => (
              <span key={h} className="text-xs text-taupe">{h}</span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onApprove} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
          <CheckCircle2 className="w-4 h-4" />
          Approve
        </button>
        <button onClick={onEdit} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-300 text-blue-700 text-sm font-medium hover:bg-blue-50 transition-colors">
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button onClick={onSchedule} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-warm-border text-warm-charcoal text-sm font-medium hover:bg-cream transition-colors">
          <Calendar className="w-4 h-4" />
          Schedule
        </button>
        <button onClick={onDelete} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors ml-auto">
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function ContentEngine() {
  const [activeTab, setActiveTab] = useState("instagram");
  const [selectedWebsite, setSelectedWebsite] = useState("All");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGenerate = (data) => {
    setGeneratedContent(data);
  };

  const renderForm = () => {
    const props = { website: selectedWebsite, onGenerate: handleGenerate };
    switch (activeTab) {
      case "instagram": return <InstagramForm {...props} />;
      case "facebook": return <FacebookForm {...props} />;
      case "tiktok": return <TikTokForm {...props} />;
      case "blog": return <BlogForm {...props} />;
      case "google": return <GoogleAdsForm {...props} />;
      case "linkedin": return <LinkedInForm {...props} />;
      default: return <InstagramForm {...props} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Content Engine</h1>
          <p className="text-sm text-warm-muted mt-1">Generate platform-perfect content for all your brands</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all shadow-premium-hover">
          <Sparkles className="w-4 h-4" />
          Generate
        </button>
      </div>

      {/* Website Selector + Platform Tabs */}
      <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Website Dropdown */}
          <div className="relative">
            <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">Website</label>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal hover:border-taupe transition-colors bg-white min-w-44"
            >
              <Globe className="w-4 h-4 text-warm-muted" />
              {selectedWebsite}
              <ChevronDown className={cn("w-4 h-4 text-warm-muted ml-auto transition-transform", showDropdown && "rotate-180")} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full left-0 mt-1 bg-white border border-warm-border rounded-xl shadow-elevated z-20 min-w-44 overflow-hidden"
                  >
                    {WEBSITES.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => { setSelectedWebsite(w.name); setShowDropdown(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-warm-charcoal hover:bg-cream transition-colors"
                      >
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                        {w.name}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Platform Tabs */}
          <div className="flex items-center gap-1 bg-cream/50 rounded-xl p-1 overflow-x-auto">
            {PLATFORMS.map((p) => {
              const Icon = p.Icon;
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap relative",
                    isActive ? "text-warm-charcoal" : "text-warm-muted hover:text-warm-charcoal"
                  )}
                >
                  <Icon className="w-4 h-4" style={{ color: isActive ? p.color : undefined }} />
                  {p.label}
                  {isActive && (
                    <motion.div
                      layoutId="platformTab"
                      className={cn("absolute bottom-0 left-2 right-2 h-0.5 rounded-full", p.borderColor)}
                      style={{ backgroundColor: p.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Preview */}
      <AnimatePresence>
        {generatedContent && (
          <ContentPreview
            content={generatedContent}
            onApprove={() => {}}
            onEdit={() => {}}
            onDelete={() => setGeneratedContent(null)}
            onSchedule={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Content Library */}
      <div className="bg-white border border-warm-border rounded-2xl shadow-premium overflow-hidden">
        <div className="px-6 py-4 border-b border-warm-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-warm-charcoal">Content Library</h2>
          <span className="text-xs text-warm-muted">{MOCK_LIBRARY.length} items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-border bg-cream/30">
                <th className="text-left px-6 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Platform</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Website</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Preview</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-warm-muted uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LIBRARY.map((item) => {
                const p = PLATFORMS.find((x) => x.id === item.platform) || PLATFORMS[0];
                const w = WEBSITES.find((x) => x.name === item.website) || WEBSITES[0];
                const Icon = p.Icon;
                return (
                  <tr key={item.id} className="border-b border-warm-border/60 hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon className="w-4 h-4" style={{ color: p.color }} />
                        <span className="text-sm text-warm-charcoal">{p.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-warm-charcoal">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: w.color }} />
                        {item.website}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-warm-gray truncate max-w-xs">{item.preview}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-warm-muted">{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
