import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Plus,
  Instagram,
  Facebook,
  Linkedin,
  PinIcon,
  Zap,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Pencil,
  FileText,
  Lightbulb,
  Rocket,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  Users,
  Megaphone,
  Building2,
  Palette,
  Smartphone,
  BarChart3,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── mock data ─── */
const initialWebsites = [
  {
    id: 1,
    name: "Gidgee & Co",
    initials: "GC",
    accent: "#f59e0b",
    description: "Australian hat brand — handcrafted leather and felt hats inspired by the outback.",
    url: "https://gidgeeandco.com.au",
    platform: "Sitebeat",
    status: "Draft",
    tone: "Authentic, rugged, premium",
    audience: "Australians 30-60, outdoor enthusiasts, fashion-conscious",
    budget: 450,
    social: { instagram: "@gidgeeandco", facebook: "Gidgee & Co", tiktok: "", linkedin: "Gidgee & Co", pinterest: "" },
    platforms: ["Instagram", "Facebook", "Linkedin"],
    posts: 42,
    advice: 1,
    campaigns: 1,
  },
  {
    id: 2,
    name: "Waymark & Co",
    initials: "WC",
    accent: "#3b82f6",
    description: "Vintage watch marketplace — curated timepieces from around the world.",
    url: "https://waymarkandco.com",
    platform: "WordPress",
    status: "Draft",
    tone: "Sophisticated, knowledgeable, refined",
    audience: "Collectors 35-65, luxury enthusiasts, horology fans",
    budget: 600,
    social: { instagram: "@waymarkco", facebook: "", tiktok: "", linkedin: "Waymark & Co", pinterest: "" },
    platforms: ["Linkedin"],
    posts: 31,
    advice: 1,
    campaigns: 0,
  },
  {
    id: 3,
    name: "MGNM",
    initials: "MG",
    accent: "#8b5cf6",
    description: "Dark fashion artist collaborations — limited edition streetwear drops.",
    url: "https://mgnm.store",
    platform: "Shopify",
    status: "Draft",
    tone: "Edgy, exclusive, underground",
    audience: "Gen Z & millennials, streetwear fans, art collectors",
    budget: 800,
    social: { instagram: "@mgnm.official", facebook: "", tiktok: "@mgnm", linkedin: "", pinterest: "" },
    platforms: ["Instagram", "TikTok"],
    posts: 28,
    advice: 1,
    campaigns: 1,
  },
  {
    id: 4,
    name: "Jewellery",
    initials: "JW",
    accent: "#ec4899",
    description: "High-end jewellery — bespoke rings, necklaces and fine accessories.",
    url: "https://jewellery.studio",
    platform: "Wix",
    status: "Draft",
    tone: "Elegant, romantic, luxurious",
    audience: "Women 25-55, gift buyers, bridal market",
    budget: 350,
    social: { instagram: "@jewellerystudio", facebook: "Jewellery Studio", tiktok: "", linkedin: "", pinterest: "Jewellery Studio" },
    platforms: ["Pinterest", "Instagram"],
    posts: 26,
    advice: 0,
    campaigns: 0,
  },
];

const platformOptions = ["Sitebeat", "WordPress", "Wix", "Shopify", "Meli", "Notion"];
const socialPlatforms = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "tiktok", label: "TikTok", icon: Zap },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "pinterest", label: "Pinterest", icon: PinIcon },
];

const adPlatforms = ["Instagram", "Facebook", "TikTok", "LinkedIn", "Pinterest"];

const platformIcons = {
  Instagram,
  Facebook,
  Linkedin,
  Pinterest: PinIcon,
  TikTok: Zap,
  LinkedIn: Linkedin,
};

const platformBadgeColors = {
  Instagram: "bg-pink-50 text-pink-600",
  Facebook: "bg-blue-50 text-blue-600",
  TikTok: "bg-gray-900 text-white",
  LinkedIn: "bg-sky-50 text-sky-700",
  Pinterest: "bg-red-50 text-red-600",
  Linkedin: "bg-sky-50 text-sky-700",
};

/* ─── form section (collapsible) ─── */
function FormSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-warm-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-cream/50 hover:bg-cream transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-taupe" />
          <span className="text-sm font-medium text-warm-charcoal">{title}</span>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-warm-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-warm-muted" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

/* ─── main component ─── */
export default function Websites() {
  const [websites, setWebsites] = useState(initialWebsites);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    platform: "Sitebeat",
    tone: "",
    audience: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
    pinterest: "",
    budget: 500,
    adPlatforms: ["Instagram"],
  });

  const total = websites.length;
  const activeCount = websites.filter((w) => w.status === "Active").length;
  const draftCount = websites.filter((w) => w.status === "Draft").length;
  const platformCount = new Set(websites.map((w) => w.platform)).size;

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleAdPlatform = (p) => {
    setForm((prev) => ({
      ...prev,
      adPlatforms: prev.adPlatforms.includes(p)
        ? prev.adPlatforms.filter((x) => x !== p)
        : [...prev.adPlatforms, p],
    }));
  };

  const handleCreate = () => {
    if (!form.name.trim() || !form.url.trim()) return;
    const newSite = {
      id: Date.now(),
      name: form.name,
      initials: form.name.slice(0, 2).toUpperCase(),
      accent: "#9E9484",
      description: "New website — add a description in settings.",
      url: form.url,
      platform: form.platform,
      status: "Draft",
      tone: form.tone || "Professional",
      audience: form.audience || "General",
      budget: form.budget,
      social: {
        instagram: form.instagram,
        facebook: form.facebook,
        tiktok: form.tiktok,
        linkedin: form.linkedin,
        pinterest: form.pinterest,
      },
      platforms: form.adPlatforms,
      posts: 0,
      advice: 0,
      campaigns: 0,
    };
    setWebsites((w) => [...w, newSite]);
    setShowAdd(false);
    setForm({
      name: "", url: "", platform: "Sitebeat", tone: "", audience: "",
      instagram: "", facebook: "", tiktok: "", linkedin: "", pinterest: "",
      budget: 500, adPlatforms: ["Instagram"],
    });
  };

  const toggleStatus = (id) => {
    setWebsites((w) =>
      w.map((site) => ({
        ...site,
        status: site.id === id ? (site.status === "Active" ? "Draft" : "Active") : site.status,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Your Websites</h1>
          <p className="text-sm text-warm-muted mt-1">
            {total} website{total !== 1 ? "s" : ""} connected
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all shadow-premium-hover"
        >
          <Plus className="w-4 h-4" />
          Add Website
        </button>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: "Total", value: total, icon: Globe },
          { label: "Active", value: activeCount, icon: Check },
          { label: "Draft", value: draftCount, icon: FileText },
          { label: "Platforms", value: platformCount, icon: Building2 },
        ].map((s, i) => (
          <div
            key={s.label}
            className="bg-white border border-warm-border rounded-xl shadow-premium p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-cream flex items-center justify-center">
              <s.icon className="w-4 h-4 text-taupe" />
            </div>
            <div>
              <p className="text-lg font-bold text-warm-charcoal">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wide text-warm-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Website grid ── */}
      {websites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-white border border-warm-border rounded-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-warm-muted" />
          </div>
          <p className="text-sm font-medium text-warm-charcoal mb-1">No websites yet</p>
          <p className="text-xs text-warm-muted mb-4">Add your first website to get started</p>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-charcoal text-white text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add Website
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {websites.map((site, i) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white border border-warm-border rounded-2xl shadow-premium hover:shadow-premium-hover card-lift overflow-hidden"
            >
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ backgroundColor: site.accent }} />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ backgroundColor: site.accent }}
                    >
                      {site.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-warm-charcoal">{site.name}</h3>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-taupe hover:text-warm-charcoal transition-colors"
                      >
                        {site.url.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(site.id)}
                      className="text-warm-muted hover:text-warm-charcoal transition-colors"
                      title={site.status === "Active" ? "Deactivate" : "Activate"}
                    >
                      {site.status === "Active" ? (
                        <ToggleRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-warm-muted" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-warm-muted leading-relaxed mb-4">{site.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-cream rounded-xl p-3">
                    <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-1">Platform</p>
                    <p className="text-xs font-medium text-warm-charcoal">{site.platform}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-3">
                    <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-1">Status</p>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        site.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      )}
                    >
                      {site.status}
                    </span>
                  </div>
                  <div className="bg-cream rounded-xl p-3">
                    <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-1">Tone</p>
                    <p className="text-xs font-medium text-warm-charcoal">{site.tone}</p>
                  </div>
                  <div className="bg-cream rounded-xl p-3">
                    <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-1">Budget</p>
                    <p className="text-xs font-medium text-warm-charcoal">${site.budget}/mo</p>
                  </div>
                </div>

                {/* Social accounts */}
                <div className="mb-4">
                  <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-2">Social Accounts</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(site.social)
                      .filter(([, v]) => v)
                      .map(([key, value]) => {
                        const sp = socialPlatforms.find((s) => s.key === key);
                        if (!sp) return null;
                        const Icon = sp.icon;
                        return (
                          <div
                            key={key}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cream text-xs text-warm-charcoal"
                          >
                            <Icon className="w-3.5 h-3.5 text-warm-muted" />
                            <span className="font-medium">{value}</span>
                          </div>
                        );
                      })}
                    {Object.values(site.social).filter(Boolean).length === 0 && (
                      <span className="text-xs text-warm-muted">No social accounts connected</span>
                    )}
                  </div>
                </div>

                {/* Ad platforms */}
                <div className="mb-4">
                  <p className="text-[10px] text-warm-muted uppercase tracking-wide mb-2">Ad Platforms</p>
                  <div className="flex flex-wrap gap-1.5">
                    {site.platforms.map((p) => (
                      <span
                        key={p}
                        className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-medium",
                          platformBadgeColors[p] || "bg-cream text-warm-muted"
                        )}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mini stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-warm-border">
                  <span className="flex items-center gap-1 text-[11px] text-warm-muted">
                    <FileText className="w-3.5 h-3.5" /> {site.posts} posts
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-warm-muted">
                    <Lightbulb className="w-3.5 h-3.5" /> {site.advice} advice
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-warm-muted">
                    <Rocket className="w-3.5 h-3.5" /> {site.campaigns} campaigns
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Add Website Modal ── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-elevated border border-warm-border w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-warm-border">
                <div>
                  <h2 className="text-lg font-semibold text-warm-charcoal">Add Website</h2>
                  <p className="text-xs text-warm-muted mt-0.5">Connect a new website to your dashboard</p>
                </div>
                <button
                  onClick={() => setShowAdd(false)}
                  className="p-2 rounded-lg hover:bg-cream transition-colors"
                >
                  <X className="w-4 h-4 text-warm-muted" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Basic Info */}
                <FormSection title="Basic Information" icon={Globe} defaultOpen={true}>
                  <div>
                    <Label required>Website Name</Label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. Gidgee & Co"
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal placeholder:text-warm-muted focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
                    />
                  </div>
                  <div>
                    <Label required>Website URL</Label>
                    <input
                      type="url"
                      value={form.url}
                      onChange={(e) => update("url", e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal placeholder:text-warm-muted focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
                    />
                  </div>
                  <div>
                    <Label>Platform</Label>
                    <select
                      value={form.platform}
                      onChange={(e) => update("platform", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
                    >
                      {platformOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormSection>

                {/* Brand Voice */}
                <FormSection title="Brand Voice" icon={Palette}>
                  <div>
                    <Label>Tone & Voice</Label>
                    <textarea
                      value={form.tone}
                      onChange={(e) => update("tone", e.target.value)}
                      placeholder="e.g. Authentic, rugged, premium"
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal placeholder:text-warm-muted focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <Label>Target Audience</Label>
                    <textarea
                      value={form.audience}
                      onChange={(e) => update("audience", e.target.value)}
                      placeholder="e.g. Australians 30-60, outdoor enthusiasts"
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal placeholder:text-warm-muted focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all resize-none"
                    />
                  </div>
                </FormSection>

                {/* Social Accounts */}
                <FormSection title="Social Accounts" icon={Users}>
                  {socialPlatforms.map((sp) => (
                    <div key={sp.key}>
                      <Label>{sp.label}</Label>
                      <div className="relative">
                        <sp.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
                        <input
                          type="text"
                          value={form[sp.key]}
                          onChange={(e) => update(sp.key, e.target.value)}
                          placeholder={`@${sp.label.toLowerCase()}`}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal placeholder:text-warm-muted focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </FormSection>

                {/* Ad Platforms */}
                <FormSection title="Ad Platforms" icon={Megaphone}>
                  <div className="flex flex-wrap gap-2">
                    {adPlatforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => toggleAdPlatform(p)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-medium transition-all border",
                          form.adPlatforms.includes(p)
                            ? "bg-warm-charcoal text-white border-warm-charcoal"
                            : "bg-white text-warm-muted border-warm-border hover:border-taupe/30"
                        )}
                      >
                        {form.adPlatforms.includes(p) && <Check className="w-3 h-3 inline mr-1" />}
                        {p}
                      </button>
                    ))}
                  </div>
                </FormSection>

                {/* Budget */}
                <FormSection title="Budget" icon={DollarSign}>
                  <div>
                    <Label>Monthly Budget (USD)</Label>
                    <input
                      type="number"
                      value={form.budget}
                      onChange={(e) => update("budget", Number(e.target.value))}
                      min={0}
                      step={50}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border bg-cream text-sm text-warm-charcoal focus:border-taupe focus:ring-2 focus:ring-taupe/20 transition-all"
                    />
                  </div>
                </FormSection>
              </div>

              {/* Modal footer */}
              <div className="flex items-center gap-3 p-5 border-t border-warm-border">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 rounded-xl border border-warm-border text-sm font-medium text-warm-muted hover:bg-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!form.name.trim() || !form.url.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
