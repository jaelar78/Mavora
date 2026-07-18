import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Rocket,
  Users,
  TrendingUp,
  X,
  ChevronRight,
  ChevronLeft,
  Globe,
  Calendar,
  BarChart3,
  Megaphone,
  Mail,
  Settings,
  Trash2,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
  Music,
  FileText,
  Linkedin,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── Inline SVG for Google Ads ─── */
function GoogleAdsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}

/* ─── Website Data ─── */
const WEBSITES = [
  { name: "Gidgee", color: "#C9A96E" },
  { name: "Waymark", color: "#3B82F6" },
  { name: "MGNM", color: "#8B5CF6" },
  { name: "Jewellery", color: "#EC4899" },
];

/* ─── Campaign Types ─── */
const CAMPAIGN_TYPES = [
  { id: "prelaunch", label: "Pre-Launch", desc: "Build hype before going live" },
  { id: "product", label: "Product Launch", desc: "Launch a new product or collection" },
  { id: "seasonal", label: "Seasonal", desc: "Holiday or seasonal promotion" },
];

/* ─── Platform Options ─── */
const PLATFORM_OPTIONS = [
  { id: "instagram", label: "Instagram", Icon: Instagram, color: "#E4405F" },
  { id: "facebook", label: "Facebook", Icon: Facebook, color: "#1877F2" },
  { id: "tiktok", label: "TikTok", Icon: Music, color: "#000000" },
  { id: "blog", label: "Blog", Icon: FileText, color: "#8b5cf6" },
  { id: "google", label: "Google Ads", Icon: GoogleAdsIcon, color: "#4285F4" },
  { id: "linkedin", label: "LinkedIn", Icon: Linkedin, color: "#0A66C2" },
];

/* ─── Mock Campaigns ─── */
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    name: "Gidgee & Co Pre-Launch",
    website: "Gidgee",
    status: "Active",
    signups: 156,
    emailsSent: 8,
    progress: 60,
    startDate: "Jul 1, 2025",
    endDate: "Aug 15, 2025",
    gradient: "from-amber-500 to-orange-400",
    gradientBg: "bg-amber-500",
    description: "Pre-launch hype campaign for the new Gidgee & Co collection. Building an email list of interested customers before the official launch.",
    goals: "Collect 300 signups, send 12 nurture emails, achieve 5% conversion rate",
    contentSchedule: [
      { date: "Jul 1", platform: "instagram", content: "Teaser post - new collection coming" },
      { date: "Jul 5", platform: "facebook", content: "Behind the scenes photoshoot" },
      { date: "Jul 10", platform: "tiktok", content: "Hook video - first look reveal" },
      { date: "Jul 15", platform: "blog", content: "The story behind the collection" },
      { date: "Jul 20", platform: "instagram", content: "Countdown to launch day" },
    ],
    signupsList: [
      { name: "Sarah Mitchell", email: "sarah.m@email.com", date: "Jul 18, 2025", source: "Instagram" },
      { name: "James Cooper", email: "j.cooper@email.com", date: "Jul 17, 2025", source: "Facebook" },
      { name: "Emma Watson", email: "emma.w@email.com", date: "Jul 16, 2025", source: "Website" },
      { name: "Liam Parker", email: "liam@email.com", date: "Jul 15, 2025", source: "TikTok" },
    ],
  },
  {
    id: 2,
    name: "MGNM Artist Call",
    website: "MGNM",
    status: "Active",
    signups: 89,
    emailsSent: 5,
    progress: 62,
    startDate: "Jul 5, 2025",
    endDate: "Aug 30, 2025",
    gradient: "from-violet-500 to-purple-400",
    gradientBg: "bg-violet-500",
    description: "Open call for artists to join the MGNM platform. Recruiting talented creators across multiple disciplines.",
    goals: "Recruit 150 artists, onboard 50 within first month",
    contentSchedule: [
      { date: "Jul 5", platform: "instagram", content: "Artist call announcement" },
      { date: "Jul 12", platform: "linkedin", content: "Professional artist opportunity post" },
      { date: "Jul 18", platform: "tiktok", content: "Artist success stories" },
    ],
    signupsList: [
      { name: "Alex Rivera", email: "alex.r@email.com", date: "Jul 18, 2025", source: "Instagram" },
      { name: "Dana Lee", email: "dana@email.com", date: "Jul 17, 2025", source: "LinkedIn" },
    ],
  },
  {
    id: 3,
    name: "Waymark Marketplace Launch",
    website: "Waymark",
    status: "Draft",
    signups: 0,
    emailsSent: 0,
    progress: 20,
    startDate: "Aug 1, 2025",
    endDate: "Sep 15, 2025",
    gradient: "from-blue-500 to-cyan-400",
    gradientBg: "bg-blue-500",
    description: "Launch campaign for the new Waymark marketplace features. Introducing seller tools and buyer enhancements.",
    goals: "Onboard 200 sellers, 1000 buyer signups in first month",
    contentSchedule: [
      { date: "Aug 1", platform: "google", content: "Search ad campaign - marketplace keywords" },
      { date: "Aug 5", platform: "facebook", content: "Sponsored post targeting sellers" },
      { date: "Aug 10", platform: "blog", content: "How to sell on Waymark guide" },
    ],
    signupsList: [],
  },
  {
    id: 4,
    name: "Jewellery Coming Soon",
    website: "Jewellery",
    status: "Draft",
    signups: 0,
    emailsSent: 0,
    progress: 10,
    startDate: "Aug 15, 2025",
    endDate: "Oct 1, 2025",
    gradient: "from-pink-500 to-rose-400",
    gradientBg: "bg-pink-500",
    description: "Coming soon landing page campaign for the new jewellery line. Early access list for VIP customers.",
    goals: "Collect 500 VIP signups, generate buzz on social media",
    contentSchedule: [
      { date: "Aug 15", platform: "instagram", content: "Mystery reveal - what is coming?" },
      { date: "Aug 22", platform: "tiktok", content: "Sneak peek unboxing video" },
      { date: "Sep 1", platform: "blog", content: "The craftsmanship behind our jewellery" },
    ],
    signupsList: [],
  },
];

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Draft: "bg-amber-50 text-amber-700 border-amber-200",
    Paused: "bg-gray-50 text-gray-600 border-gray-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", styles[status] || styles.Draft)}>
      {status}
    </span>
  );
}

/* ─── Campaign Card ─── */
function CampaignCard({ campaign, onClick }) {
  const w = WEBSITES.find((x) => x.name === campaign.website) || WEBSITES[0];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-warm-border/80 shadow-premium hover:shadow-premium-hover transition-all cursor-pointer overflow-hidden card-lift"
    >
      {/* Gradient Banner */}
      <div className={cn("h-24 bg-gradient-to-r relative", campaign.gradient)}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
          </div>
          <StatusBadge status={campaign.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-warm-charcoal mb-2">{campaign.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1.5 text-xs text-warm-muted">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
            {campaign.website}
          </span>
          <span className="text-warm-border">|</span>
          <span className="text-xs text-warm-muted">{campaign.startDate} - {campaign.endDate}</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-warm-muted">Progress</span>
            <span className="text-xs font-medium text-warm-charcoal">{campaign.progress}%</span>
          </div>
          <div className="h-2 bg-cream rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${campaign.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn("h-full rounded-full", campaign.gradientBg)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-warm-muted" />
            <span className="text-xs text-warm-charcoal font-medium">{campaign.signups}</span>
            <span className="text-xs text-warm-muted">signups</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-warm-muted" />
            <span className="text-xs text-warm-charcoal font-medium">{campaign.emailsSent}</span>
            <span className="text-xs text-warm-muted">emails</span>
          </div>
        </div>

        {/* View Details button */}
        <div className="mt-4 pt-4 border-t border-warm-border/60">
          <button className="flex items-center gap-1.5 text-xs font-medium text-taupe hover:text-warm-charcoal transition-colors group/btn">
            View Details
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Campaign Detail Drawer ─── */
function CampaignDrawer({ campaign, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  if (!campaign) return null;

  const w = WEBSITES.find((x) => x.name === campaign.website) || WEBSITES[0];
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "schedule", label: "Content Schedule", icon: Calendar },
    { id: "signups", label: "Signups", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 bottom-0 w-full max-w-xl bg-cream shadow-elevated overflow-y-auto"
      >
        {/* Drawer Header */}
        <div className={cn("p-6 bg-gradient-to-r relative", campaign.gradient)}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="w-2 h-2 rounded-full bg-white" style={{ backgroundColor: w.color }} />
                  {campaign.website}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white">{campaign.name}</h2>
              <p className="text-sm text-white/70 mt-1">{campaign.startDate} - {campaign.endDate}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 py-3 bg-white border-b border-warm-border overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  isActive ? "bg-taupe/10 text-taupe" : "text-warm-muted hover:text-warm-charcoal hover:bg-cream"
                )}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">
                <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-5">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-2">Description</h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{campaign.description}</p>
                </div>
                <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-5">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-2">Goals</h3>
                  <p className="text-sm text-warm-gray leading-relaxed">{campaign.goals}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white border border-warm-border rounded-xl shadow-premium p-4 text-center">
                    <Users className="w-5 h-5 text-taupe mx-auto mb-2" />
                    <p className="text-lg font-semibold text-warm-charcoal">{campaign.signups}</p>
                    <p className="text-xs text-warm-muted">Signups</p>
                  </div>
                  <div className="bg-white border border-warm-border rounded-xl shadow-premium p-4 text-center">
                    <Mail className="w-5 h-5 text-taupe mx-auto mb-2" />
                    <p className="text-lg font-semibold text-warm-charcoal">{campaign.emailsSent}</p>
                    <p className="text-xs text-warm-muted">Emails Sent</p>
                  </div>
                  <div className="bg-white border border-warm-border rounded-xl shadow-premium p-4 text-center">
                    <TrendingUp className="w-5 h-5 text-taupe mx-auto mb-2" />
                    <p className="text-lg font-semibold text-warm-charcoal">{campaign.progress}%</p>
                    <p className="text-xs text-warm-muted">Progress</p>
                  </div>
                </div>
                <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-5">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-3">Timeline</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-warm-muted mb-1">Start</p>
                      <p className="text-sm font-medium text-warm-charcoal">{campaign.startDate}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-cream rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", campaign.gradientBg)} style={{ width: `${campaign.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-xs text-warm-muted mb-1">End</p>
                      <p className="text-sm font-medium text-warm-charcoal">{campaign.endDate}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "schedule" && (
              <motion.div key="schedule" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
                {campaign.contentSchedule.map((item, i) => {
                  const p = PLATFORM_OPTIONS.find((x) => x.id === item.platform) || PLATFORM_OPTIONS[0];
                  const Icon = p.Icon;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-white border border-warm-border rounded-xl p-4 shadow-premium">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}15` }}>
                        <Icon className="w-5 h-5" style={{ color: p.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warm-charcoal">{item.content}</p>
                        <p className="text-xs text-warm-muted">{item.platform}</p>
                      </div>
                      <span className="text-xs text-warm-muted whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                  );
                })}
                {campaign.contentSchedule.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="w-10 h-10 text-warm-muted mx-auto mb-3" />
                    <p className="text-sm text-warm-muted">No content scheduled yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "signups" && (
              <motion.div key="signups" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                {campaign.signupsList.length > 0 ? (
                  <div className="bg-white border border-warm-border rounded-2xl shadow-premium overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-warm-border bg-cream/30">
                          <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase">Name</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase">Email</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase">Date</th>
                          <th className="text-left px-4 py-3 text-xs font-medium text-warm-muted uppercase">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.signupsList.map((s, i) => (
                          <tr key={i} className="border-b border-warm-border/60 hover:bg-cream/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-warm-charcoal">{s.name}</td>
                            <td className="px-4 py-3 text-sm text-warm-gray">{s.email}</td>
                            <td className="px-4 py-3 text-xs text-warm-muted">{s.date}</td>
                            <td className="px-4 py-3">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-cream border border-warm-border text-warm-muted">{s.source}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-10 h-10 text-warm-muted mx-auto mb-3" />
                    <p className="text-sm text-warm-muted">No signups yet</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                <div className="bg-white border border-warm-border rounded-2xl shadow-premium p-5">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-4">Campaign Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">Campaign Name</label>
                      <input
                        defaultValue={campaign.name}
                        className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe"
                      />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-warm-charcoal">Status</p>
                        <p className="text-xs text-warm-muted">{campaign.status === "Active" ? "Campaign is live" : "Campaign is in draft mode"}</p>
                      </div>
                      <button
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors",
                          campaign.status === "Active" ? "bg-taupe" : "bg-warm-border"
                        )}
                      >
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          animate={{ x: campaign.status === "Active" ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-red-200 rounded-2xl shadow-premium p-5">
                  <h3 className="text-sm font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-xs text-warm-muted mb-4">Deleting a campaign is permanent and cannot be undone.</p>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Delete Campaign
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Create Campaign Wizard ─── */
function CreateCampaignModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instagram", "facebook"]);

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const canNext = () => {
    if (step === 1) return selectedWebsite && campaignType;
    if (step === 2) return startDate && endDate;
    if (step === 3) return selectedPlatforms.length > 0;
    return true;
  };

  const steps = [
    { num: 1, label: "Select" },
    { num: 2, label: "Timeline" },
    { num: 3, label: "Content" },
    { num: 4, label: "Review" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-warm-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-taupe/10 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-taupe" />
            </div>
            <h2 className="text-lg font-semibold text-warm-charcoal">New Campaign</h2>
          </div>
          <button onClick={onClose} className="text-warm-muted hover:text-warm-charcoal transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 px-6 py-4 border-b border-warm-border bg-cream/30">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                step >= s.num ? "bg-warm-charcoal text-white" : "bg-warm-border text-warm-muted"
              )}>
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className={cn("text-xs font-medium", step >= s.num ? "text-warm-charcoal" : "text-warm-muted")}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={cn("w-8 h-0.5 mx-1", step > s.num ? "bg-warm-charcoal" : "bg-warm-border")} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-warm-charcoal mb-3 block">Select Website</label>
                  <div className="grid grid-cols-2 gap-3">
                    {WEBSITES.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => setSelectedWebsite(w.name)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border transition-all",
                          selectedWebsite === w.name
                            ? "border-taupe bg-taupe/5 shadow-premium"
                            : "border-warm-border hover:border-taupe/30"
                        )}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: w.color }} />
                        <span className="text-sm font-medium text-warm-charcoal">{w.name}</span>
                        {selectedWebsite === w.name && <CheckCircle2 className="w-4 h-4 text-taupe ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-warm-charcoal mb-3 block">Campaign Type</label>
                  <div className="space-y-2">
                    {CAMPAIGN_TYPES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setCampaignType(t.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                          campaignType === t.id
                            ? "border-taupe bg-taupe/5 shadow-premium"
                            : "border-warm-border hover:border-taupe/30"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          campaignType === t.id ? "bg-taupe/10" : "bg-cream"
                        )}>
                          <Megaphone className={cn("w-5 h-5", campaignType === t.id ? "text-taupe" : "text-warm-muted")} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-warm-charcoal">{t.label}</p>
                          <p className="text-xs text-warm-muted">{t.desc}</p>
                        </div>
                        {campaignType === t.id && <CheckCircle2 className="w-4 h-4 text-taupe ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-warm-charcoal mb-1.5 block">Campaign Goals</label>
                  <textarea
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g. Collect 500 signups, generate $10k in pre-sales..."
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="flex items-center justify-between py-3 px-4 bg-cream rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-warm-charcoal">Auto-generate content</p>
                    <p className="text-xs text-warm-muted">AI will create posts for each platform</p>
                  </div>
                  <button
                    onClick={() => setAutoGenerate(!autoGenerate)}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      autoGenerate ? "bg-taupe" : "bg-warm-border"
                    )}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: autoGenerate ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-medium text-warm-charcoal mb-3 block">Select Platforms</label>
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORM_OPTIONS.map((p) => {
                      const Icon = p.Icon;
                      const isSelected = selectedPlatforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePlatform(p.id)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all",
                            isSelected
                              ? "border-taupe bg-taupe/5 shadow-premium"
                              : "border-warm-border hover:border-taupe/30"
                          )}
                        >
                          <Icon className="w-5 h-5" style={{ color: p.color }} />
                          <span className="text-sm text-warm-charcoal">{p.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-taupe ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="bg-cream rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-taupe/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-taupe" />
                    </div>
                    <div>
                      <p className="text-xs text-warm-muted">Website</p>
                      <p className="text-sm font-medium text-warm-charcoal">{selectedWebsite}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-taupe/10 flex items-center justify-center">
                      <Megaphone className="w-5 h-5 text-taupe" />
                    </div>
                    <div>
                      <p className="text-xs text-warm-muted">Campaign Type</p>
                      <p className="text-sm font-medium text-warm-charcoal">
                        {CAMPAIGN_TYPES.find((t) => t.id === campaignType)?.label || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-taupe/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-taupe" />
                    </div>
                    <div>
                      <p className="text-xs text-warm-muted">Timeline</p>
                      <p className="text-sm font-medium text-warm-charcoal">{startDate} - {endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-taupe/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-taupe" />
                    </div>
                    <div>
                      <p className="text-xs text-warm-muted">Platforms</p>
                      <p className="text-sm font-medium text-warm-charcoal">{selectedPlatforms.length} selected</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-warm-border bg-cream/30 flex items-center justify-between">
          <button
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal hover:border-taupe transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={() => step < 4 ? setStep(step + 1) : onClose()}
            disabled={!canNext()}
            className={cn(
              "flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-premium",
              canNext()
                ? "bg-warm-charcoal text-white hover:bg-warm-gray"
                : "bg-warm-border text-warm-muted cursor-not-allowed"
            )}
          >
            {step === 4 ? (
              <>
                <Rocket className="w-4 h-4" />
                Launch Campaign
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const activeCampaigns = MOCK_CAMPAIGNS.filter((c) => c.status === "Active").length;
  const totalSignups = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.signups, 0);
  const avgConversion = "3.8%";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Campaigns</h1>
          <p className="text-sm text-warm-muted mt-1">Manage pre-launch hype campaigns</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all shadow-premium-hover"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white border border-warm-border rounded-2xl shadow-premium p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-warm-charcoal">{activeCampaigns}</p>
            <p className="text-xs text-warm-muted">Active Campaigns</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-warm-border rounded-2xl shadow-premium p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-warm-charcoal">{totalSignups}</p>
            <p className="text-xs text-warm-muted">Total Signups</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-warm-border rounded-2xl shadow-premium p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-warm-charcoal">{avgConversion}</p>
            <p className="text-xs text-warm-muted">Avg Conversion</p>
          </div>
        </motion.div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {MOCK_CAMPAIGNS.map((campaign, i) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => setSelectedCampaign(campaign)}
          />
        ))}
      </div>

      {/* Campaign Detail Drawer */}
      <AnimatePresence>
        {selectedCampaign && (
          <CampaignDrawer
            campaign={selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
          />
        )}
      </AnimatePresence>

      {/* Create Campaign Modal */}
      <AnimatePresence>
        {showCreate && (
          <CreateCampaignModal onClose={() => setShowCreate(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
