import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  TrendingUp,
  MessageSquare,
  Ban,
  Award,
  Target,
  Users,
  Mail,
  Headphones,
  Zap,
  ChevronRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "../../lib/utils";

/* ─── mock data ─── */
const INITIAL_ADVICE = [
  {
    id: 1,
    website: "gidgee",
    websiteColor: "#8B6914",
    websiteName: "Gidgee & Co",
    category: "Content Strategy",
    impact: "high",
    text: "Post TikTok videos of the etching process — behind-the-scenes gets 3x engagement",
    icon: Lightbulb,
  },
  {
    id: 2,
    website: "waymark",
    websiteColor: "#2C3E50",
    websiteName: "Waymark & Co",
    category: "Authority Building",
    impact: "high",
    text: "LinkedIn article series on spotting fake vintage watches — establish expertise",
    icon: Award,
  },
  {
    id: 3,
    website: "mgnm",
    websiteColor: "#1a1a1a",
    websiteName: "MGNM",
    category: "Viral Growth",
    impact: "high",
    text: "Launch #MyDarkStyle TikTok challenge with user-generated content",
    icon: Zap,
  },
  {
    id: 4,
    website: "gidgee",
    websiteColor: "#8B6914",
    websiteName: "Gidgee & Co",
    category: "Influencer",
    impact: "medium",
    text: "Partner with Australian tourism influencers for wildflower season",
    icon: Users,
  },
  {
    id: 5,
    website: "all",
    websiteColor: "#9E9484",
    websiteName: "All Sites",
    category: "Conversion",
    impact: "medium",
    text: "Email capture popups with '10% off when we launch' to build pre-launch list",
    icon: Mail,
  },
  {
    id: 6,
    website: "waymark",
    websiteColor: "#2C3E50",
    websiteName: "Waymark & Co",
    category: "Trust",
    impact: "medium",
    text: "Add 'Ask a Watch Expert' live chat feature to boost buyer confidence",
    icon: Headphones,
  },
];

const IMPACT_DATA = [
  { week: "W1", engagement: 12, reach: 8, conversions: 3 },
  { week: "W2", engagement: 18, reach: 14, conversions: 5 },
  { week: "W3", engagement: 15, reach: 20, conversions: 7 },
  { week: "W4", engagement: 24, reach: 18, conversions: 9 },
  { week: "W5", engagement: 28, reach: 25, conversions: 12 },
  { week: "W6", engagement: 32, reach: 30, conversions: 15 },
  { week: "W7", engagement: 29, reach: 28, conversions: 13 },
  { week: "W8", engagement: 38, reach: 35, conversions: 18 },
];

const IMPLEMENTED_ADVICE = [
  { id: 101, suggestion: "Add Instagram Shop tags to all product posts", website: "Gidgee & Co", date: "2024-01-10", result: "+14% click-through rate" },
  { id: 102, suggestion: "Weekly 'Watch of the Week' email newsletter", website: "Waymark & Co", date: "2024-01-05", result: "+8% open rate, 3.2% CTR" },
  { id: 103, suggestion: "Dark mode aesthetic for all MGNM social assets", website: "MGNM", date: "2023-12-28", result: "+22% engagement on dark posts" },
  { id: 104, suggestion: "Product video demos on jewellery collection pages", website: "Jewellery", date: "2023-12-20", result: "+18% time on page" },
  { id: 105, suggestion: "Retargeting campaign for abandoned carts", website: "All Sites", date: "2023-12-15", result: "+11% recovery rate" },
];

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "implemented", label: "Implemented" },
  { id: "rejected", label: "Rejected" },
];

/* ─── impact badge color ─── */
function ImpactBadge({ level }) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium",
        level === "high" && "bg-red-50 text-red-700",
        level === "medium" && "bg-amber-50 text-amber-700",
        level === "low" && "bg-green-50 text-green-700"
      )}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)} Impact
    </span>
  );
}

/* ─── toast notification ─── */
function Toast({ message, visible, type }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-elevated text-sm font-medium flex items-center gap-2",
            type === "success" ? "bg-green-600 text-white" : "bg-warm-charcoal text-white"
          )}
        >
          {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── main component ─── */
export default function GrowthAdvice() {
  const [advice, setAdvice] = useState(INITIAL_ADVICE);
  const [filter, setFilter] = useState("all");
  const [implemented, setImplemented] = useState(IMPLEMENTED_ADVICE);
  const [rejected, setRejected] = useState([]);
  const [toast, setToast] = useState({ message: "", visible: false, type: "success" });

  const stats = {
    received: INITIAL_ADVICE.length + implemented.length + rejected.length,
    implemented: implemented.length,
    rejected: rejected.length,
    impact: 23,
  };

  const showToast = (message, type = "success") => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast({ message: "", visible: false, type }), 2500);
  };

  const handleAccept = (item) => {
    setAdvice((prev) => prev.filter((a) => a.id !== item.id));
    setImplemented((prev) => [
      {
        id: item.id + 100,
        suggestion: item.text,
        website: item.websiteName,
        date: new Date().toISOString().split("T")[0],
        result: "Tracking...",
      },
      ...prev,
    ]);
    showToast("Added to action plan", "success");
  };

  const handleReject = (item) => {
    setAdvice((prev) => prev.filter((a) => a.id !== item.id));
    setRejected((prev) => [...prev, item]);
    showToast("Advice dismissed", "neutral");
  };

  const filteredAdvice = advice.filter((a) => {
    if (filter === "all") return true;
    if (filter === "pending") return true;
    return false;
  });

  const displayAdvice = filter === "all" || filter === "pending" ? filteredAdvice : [];
  const displayImplemented = filter === "all" || filter === "implemented" ? implemented : [];
  const displayRejected = filter === "rejected" ? rejected : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-warm-charcoal">Growth Advice</h1>
        <p className="text-sm text-warm-muted mt-1">AI-powered suggestions to grow your brands</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Suggestions Received", value: stats.received, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Implemented", value: stats.implemented, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
          { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
          { label: "Impact Score", value: `+${stats.impact}%`, icon: TrendingUp, color: "text-gold", bg: "bg-gold/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-warm-border shadow-premium p-5"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold text-warm-charcoal">{stat.value}</p>
                <p className="text-xs text-warm-muted">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-cream rounded-xl p-1 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              filter === tab.id ? "bg-white text-warm-charcoal shadow-sm" : "text-warm-muted hover:text-warm-gray"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pending / All advice cards */}
      <AnimatePresence mode="popLayout">
        {(filter === "all" || filter === "pending") && displayAdvice.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-warm-charcoal flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-gold" />
              Pending Suggestions
            </h2>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {displayAdvice.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                    className="group bg-white rounded-2xl border border-warm-border/80 shadow-premium hover:shadow-premium-hover transition-all p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${item.websiteColor}15` }}
                        >
                          <item.icon className="w-6 h-6" style={{ color: item.websiteColor }} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.websiteColor }} />
                            <span className="text-xs font-medium text-warm-charcoal">{item.websiteName}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-cream text-xs font-medium text-warm-muted">
                            {item.category}
                          </span>
                          <ImpactBadge level={item.impact} />
                        </div>
                        <p className="text-sm text-warm-gray leading-relaxed">{item.text}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(item)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAccept(item)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors shadow-premium"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accept
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Implemented section */}
      <AnimatePresence mode="popLayout">
        {(filter === "all" || filter === "implemented") && displayImplemented.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-warm-charcoal flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              Implemented
              <span className="text-xs text-warm-muted font-normal">({displayImplemented.length})</span>
            </h2>
            <div className="bg-white rounded-2xl border border-warm-border shadow-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-warm-border bg-cream/50">
                      <th className="text-left px-5 py-3 text-xs font-medium text-warm-muted uppercase tracking-wide">Suggestion</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-warm-muted uppercase tracking-wide">Website</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-warm-muted uppercase tracking-wide">Date</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-warm-muted uppercase tracking-wide">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayImplemented.map((item) => (
                      <tr key={item.id} className="border-b border-warm-border/60 hover:bg-cream/30 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="text-warm-charcoal font-medium">{item.suggestion}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-warm-gray">{item.website}</td>
                        <td className="px-5 py-3.5 text-warm-muted">{item.date}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-green-600 font-medium text-xs">{item.result}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rejected section */}
      <AnimatePresence mode="popLayout">
        {filter === "rejected" && displayRejected.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold text-warm-charcoal flex items-center gap-2">
              <Ban className="w-4 h-4 text-red-500" />
              Rejected
              <span className="text-xs text-warm-muted font-normal">({displayRejected.length})</span>
            </h2>
            <div className="space-y-3">
              {displayRejected.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border border-warm-border/60 shadow-premium p-5 opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                      <item.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.websiteColor }} />
                        <span className="text-xs font-medium text-warm-muted">{item.websiteName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-500">{item.category}</span>
                      </div>
                      <p className="text-sm text-warm-muted line-through">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact tracker */}
      <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-warm-charcoal flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              Impact Tracker
            </h2>
            <p className="text-sm text-warm-muted mt-1">Weekly metrics from implemented advice</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-warm-charcoal" />
              <span className="text-warm-muted">Engagement</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-taupe" />
              <span className="text-warm-muted">Reach</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-gold" />
              <span className="text-warm-muted">Conversions</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={IMPACT_DATA} barGap={2}>
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#8A7E76" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#8A7E76" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8E2D9",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(61,54,50,0.05), 0 20px 40px -4px rgba(61,54,50,0.08)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="engagement" fill="#3D3632" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reach" fill="#9E9484" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="#C9A96E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </div>
  );
}
