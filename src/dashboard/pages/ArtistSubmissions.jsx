import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Palette,
  ChevronRight,
  TrendingUp,
  Mail,
  Send,
  UserPlus,
  X,
  Eye,
  MessageSquare,
  BarChart3,
  Instagram,
  DollarSign,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── website colors ─── */
const MGNM_COLOR = "#1a1a1a";

/* ─── mock data ─── */
const TIER1_ARTISTS = [
  {
    id: 1,
    name: "Raven Blackwood",
    initials: "RB",
    email: "raven@darkart.co",
    specialty: "Gothic Illustration",
    status: "pending",
    designs: 4,
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Ink Slinger",
    initials: "IS",
    email: "ink@tattoo.art",
    specialty: "Blackwork Tattoos",
    status: "accepted",
    designs: 7,
    joined: "2024-01-10",
  },
  {
    id: 3,
    name: "Shadow Weaver",
    initials: "SW",
    email: "shadow@loom.net",
    specialty: "Dark Textiles",
    status: "pending",
    designs: 3,
    joined: "2024-01-08",
  },
  {
    id: 4,
    name: "Neon Witch",
    initials: "NW",
    email: "neon@cyber.goth",
    specialty: "Cyberpunk Art",
    status: "review",
    designs: 5,
    joined: "2024-01-05",
  },
];

const TIER2_ARTISTS = [
  {
    id: 5,
    name: "Dark Matter",
    initials: "DM",
    email: "dark@matter.io",
    following: 24500,
    commission: 3200,
    sales: 48,
    progress: 72,
  },
  {
    id: 6,
    name: "Vex Vane",
    initials: "VV",
    email: "vex@vane.art",
    following: 18200,
    commission: 2150,
    sales: 31,
    progress: 55,
  },
  {
    id: 7,
    name: "Luna Nocte",
    initials: "LN",
    email: "luna@nocte.com",
    following: 31000,
    commission: 4800,
    sales: 62,
    progress: 88,
  },
];

const FUNNEL_STAGES = [
  { id: "submitted", label: "Submitted", count: 24, percent: 100 },
  { id: "reviewed", label: "Reviewed", count: 18, percent: 75 },
  { id: "accepted", label: "Accepted", count: 14, percent: 58 },
  { id: "active", label: "Active", count: 10, percent: 42 },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  review: { label: "In Review", className: "bg-blue-50 text-blue-700" },
  accepted: { label: "Accepted", className: "bg-green-50 text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
};

/* ─── review modal ─── */
function ReviewModal({ artist, onClose, onAccept, onReject }) {
  const [notes, setNotes] = useState("");
  if (!artist) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between px-6 py-4 border-b border-warm-border">
          <h2 className="text-lg font-semibold text-warm-charcoal">Review Artist</h2>
          <button onClick={onClose} className="text-warm-muted hover:text-warm-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-warm-charcoal flex items-center justify-center text-white text-xl font-bold">
              {artist.initials}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-warm-charcoal">{artist.name}</h3>
              <p className="text-sm text-warm-muted">{artist.email}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-cream text-xs font-medium text-warm-muted">
                {artist.specialty}
              </span>
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="text-sm font-medium text-warm-charcoal mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-taupe" />
              Portfolio ({artist.designs} designs)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: Math.min(artist.designs, 6) }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border border-warm-border/80 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${MGNM_COLOR}15 0%, ${MGNM_COLOR}30 100%)` }}
                >
                  <Palette className="w-6 h-6 text-warm-muted/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Review Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your feedback or notes..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none bg-cream"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => { onReject(artist); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={() => { onAccept(artist); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors shadow-premium"
            >
              <CheckCircle2 className="w-4 h-4" />
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── invite modal ─── */
function InviteModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tier, setTier] = useState("1");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email.trim()) return;
    setSent(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-warm-border">
          <h2 className="text-lg font-semibold text-warm-charcoal flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-taupe" />
            Invite Artist
          </h2>
          <button onClick={onClose} className="text-warm-muted hover:text-warm-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-warm-charcoal">Invitation Sent!</h3>
              <p className="text-sm text-warm-muted mt-1">The artist will receive an email shortly.</p>
            </motion.div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="artist@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe bg-cream"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Tier</label>
                <div className="flex gap-2">
                  {["1", "2"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={cn(
                        "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                        tier === t
                          ? "bg-warm-charcoal text-white border-warm-charcoal"
                          : "bg-white text-warm-gray border-warm-border hover:border-taupe/30"
                      )}
                    >
                      Tier {t}
                      <span className="block text-xs font-normal opacity-70 mt-0.5">
                        {t === "1" ? "Design Submissions" : "Promote & Earn"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Personal Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey! We'd love to collaborate with you on..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none bg-cream"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!email.trim()}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all disabled:opacity-40 shadow-premium"
              >
                <Send className="w-4 h-4" />
                Send Invitation
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function ArtistSubmissions() {
  const [tierTab, setTierTab] = useState("1");
  const [tier1Artists, setTier1Artists] = useState(TIER1_ARTISTS);
  const [reviewArtist, setReviewArtist] = useState(null);
  const [showInvite, setShowInvite] = useState(false);

  const stats = {
    total: 24,
    tier1: 8,
    tier2: 6,
    pending: tier1Artists.filter((a) => a.status === "pending" || a.status === "review").length,
  };

  const handleAccept = (artist) => {
    setTier1Artists((prev) => prev.map((a) => (a.id === artist.id ? { ...a, status: "accepted" } : a)));
  };

  const handleReject = (artist) => {
    setTier1Artists((prev) => prev.map((a) => (a.id === artist.id ? { ...a, status: "rejected" } : a)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-warm-charcoal">Artist Submissions</h1>
          <p className="text-sm text-warm-muted mt-1">Manage MGNM artist collaborations</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-all shadow-premium-hover"
        >
          <UserPlus className="w-4 h-4" />
          Invite Artist
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Submissions", value: stats.total, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Tier 1 Artists", value: stats.tier1, icon: Palette, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Tier 2 Artists", value: stats.tier2, icon: Star, color: "text-gold", bg: "bg-gold/10" },
          { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
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

      {/* Pipeline funnel */}
      <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6">
        <h2 className="text-lg font-semibold text-warm-charcoal mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-taupe" />
          Submission Pipeline
        </h2>
        <div className="flex items-stretch gap-2">
          {FUNNEL_STAGES.map((stage, i) => (
            <div key={stage.id} className="flex-1 flex items-center gap-2">
              <div className="flex-1">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  <div
                    className="h-16 rounded-xl flex flex-col items-center justify-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${MGNM_COLOR}${90 - i * 15} 0%, ${MGNM_COLOR}${70 - i * 10} 100%)`,
                      clipPath: i < FUNNEL_STAGES.length - 1
                        ? "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%)"
                        : "none",
                      paddingRight: i < FUNNEL_STAGES.length - 1 ? "12px" : "0",
                      paddingLeft: i > 0 ? "12px" : "0",
                    }}
                  >
                    <span className="text-lg font-bold">{stage.count}</span>
                    <span className="text-[10px] opacity-80">{stage.label}</span>
                  </div>
                </motion.div>
                <p className="text-center text-xs text-warm-muted mt-2">{stage.percent}%</p>
              </div>
              {i < FUNNEL_STAGES.length - 1 && (
                <ChevronRight className="w-4 h-4 text-warm-muted shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tier tabs */}
      <div className="flex gap-1 bg-cream rounded-xl p-1 w-fit">
        <button
          onClick={() => setTierTab("1")}
          className={cn(
            "px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
            tierTab === "1" ? "bg-white text-warm-charcoal shadow-sm" : "text-warm-muted hover:text-warm-gray"
          )}
        >
          <span className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Tier 1 — Design Submissions
          </span>
        </button>
        <button
          onClick={() => setTierTab("2")}
          className={cn(
            "px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
            tierTab === "2" ? "bg-white text-warm-charcoal shadow-sm" : "text-warm-muted hover:text-warm-gray"
          )}
        >
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Tier 2 — Promote & Earn
          </span>
        </button>
      </div>

      {/* Tier 1 View */}
      <AnimatePresence mode="wait">
        {tierTab === "1" && (
          <motion.div
            key="tier1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {tier1Artists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-warm-border/80 shadow-premium hover:shadow-premium-hover transition-all p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-warm-charcoal flex items-center justify-center text-white text-lg font-bold shrink-0">
                    {artist.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-warm-charcoal">{artist.name}</h3>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", STATUS_CONFIG[artist.status]?.className)}>
                        {STATUS_CONFIG[artist.status]?.label}
                      </span>
                    </div>
                    <p className="text-xs text-warm-muted mb-2">{artist.email}</p>
                    <p className="text-xs text-warm-gray mb-3">{artist.specialty}</p>

                    {/* Design thumbnails */}
                    <div className="flex gap-2 mb-4">
                      {Array.from({ length: Math.min(artist.designs, 4) }).map((_, j) => (
                        <div
                          key={j}
                          className="w-12 h-12 rounded-lg border border-warm-border/60 flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${MGNM_COLOR}12 0%, ${MGNM_COLOR}25 100%)` }}
                        >
                          <Palette className="w-4 h-4 text-warm-muted/30" />
                        </div>
                      ))}
                      {artist.designs > 4 && (
                        <div className="w-12 h-12 rounded-lg border border-warm-border/60 flex items-center justify-center bg-cream">
                          <span className="text-xs text-warm-muted">+{artist.designs - 4}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setReviewArtist(artist)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-warm-border text-sm text-warm-gray hover:border-taupe/30 hover:bg-cream transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Review
                      </button>
                      {artist.status !== "accepted" && (
                        <button
                          onClick={() => handleAccept(artist)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {artist.status !== "rejected" && (
                        <button
                          onClick={() => handleReject(artist)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tier 2 View */}
        {tierTab === "2" && (
          <motion.div
            key="tier2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TIER2_ARTISTS.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-warm-border/80 shadow-premium hover:shadow-premium-hover transition-all p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-charcoal flex items-center justify-center text-white font-bold">
                    {artist.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-charcoal">{artist.name}</h3>
                    <p className="text-xs text-warm-muted">{artist.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2.5 bg-cream rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Instagram className="w-3 h-3 text-warm-muted" />
                    </div>
                    <p className="text-sm font-bold text-warm-charcoal">{(artist.following / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-warm-muted">Following</p>
                  </div>
                  <div className="text-center p-2.5 bg-cream rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <DollarSign className="w-3 h-3 text-green-500" />
                    </div>
                    <p className="text-sm font-bold text-warm-charcoal">${(artist.commission / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-warm-muted">Earned</p>
                  </div>
                  <div className="text-center p-2.5 bg-cream rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                    </div>
                    <p className="text-sm font-bold text-warm-charcoal">{artist.sales}</p>
                    <p className="text-[10px] text-warm-muted">Sales</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-warm-muted">Progress to next tier</span>
                    <span className="text-warm-charcoal font-medium">{artist.progress}%</span>
                  </div>
                  <div className="h-2 bg-cream rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${artist.progress}%` }}
                      transition={{ delay: i * 0.15, duration: 0.8 }}
                      className="h-full rounded-full bg-warm-charcoal"
                    />
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-gray hover:border-taupe/30 hover:bg-cream transition-all">
                  <BarChart3 className="w-4 h-4" />
                  View Performance
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {reviewArtist && (
          <ReviewModal
            artist={reviewArtist}
            onClose={() => setReviewArtist(null)}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
      </AnimatePresence>
    </div>
  );
}
