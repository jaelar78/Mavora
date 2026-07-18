import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Globe,
  Layers,
  CreditCard,
  Bell,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  X,
  Instagram,
  Facebook,
  Linkedin,
  PinIcon,
  Mail,
  ShoppingBag,
  FileText,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "../../lib/utils";

/* ─── sidebar sections ─── */
const SECTIONS = [
  { id: "account", label: "Account", icon: User },
  { id: "websites", label: "Websites", icon: Globe },
  { id: "platforms", label: "Platforms", icon: Layers },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "ai", label: "AI Engine", icon: Cpu },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

/* ─── platforms data ─── */
const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: Instagram, status: "connected" },
  { id: "facebook", name: "Facebook", icon: Facebook, status: "connected" },
  { id: "tiktok", name: "TikTok", icon: MessageSquare, status: "not-connected" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, status: "not-connected" },
  { id: "pinterest", name: "Pinterest", icon: PinIcon, status: "not-connected" },
  { id: "google", name: "Google Ads", icon: TrendingUp, status: "connected" },
  { id: "mailchimp", name: "Mailchimp", icon: Mail, status: "not-connected" },
  { id: "shopify", name: "Shopify", icon: ShoppingBag, status: "connected" },
  { id: "notion", name: "Notion", icon: FileText, status: "not-connected" },
];

/* ─── websites mock ─── */
const WEBSITES = [
  { id: "gidgee", name: "Gidgee & Co", url: "gidgeeandco.com.au", color: "#8B6914" },
  { id: "waymark", name: "Waymark & Co", url: "waymarkwatches.com", color: "#2C3E50" },
  { id: "mgnm", name: "MGNM", url: "mgnm.store", color: "#1a1a1a" },
  { id: "jewellery", name: "Jewellery", url: "jewelleryexample.com", color: "#C9A96E" },
];

/* ─── toggle switch ─── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative w-10 h-5 rounded-full transition-colors",
        enabled ? "bg-taupe" : "bg-warm-border"
      )}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ─── platform card ─── */
function PlatformCard({ platform, onToggle }) {
  const [connecting, setConnecting] = useState(false);
  const isConnected = platform.status === "connected";

  const handleConnect = () => {
    if (isConnected) {
      onToggle(platform.id);
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      onToggle(platform.id);
    }, 1500);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-warm-border/80 shadow-premium p-5 flex flex-col items-center text-center hover:shadow-premium-hover transition-all"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
        isConnected ? "bg-green-50" : "bg-cream"
      )}>
        <platform.icon className={cn("w-6 h-6", isConnected ? "text-green-600" : "text-warm-muted")} />
      </div>
      <h3 className="text-sm font-semibold text-warm-charcoal mb-1">{platform.name}</h3>
      <div className="flex items-center gap-1.5 mb-3">
        <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-500" : "bg-warm-border")} />
        <span className={cn("text-xs", isConnected ? "text-green-600" : "text-warm-muted")}>
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>
      <button
        onClick={handleConnect}
        disabled={connecting}
        className={cn(
          "w-full px-4 py-2 rounded-xl text-xs font-medium transition-all border",
          isConnected
            ? "border-red-200 text-red-600 hover:bg-red-50"
            : "border-warm-border text-warm-charcoal hover:bg-cream",
          connecting && "opacity-60 cursor-wait"
        )}
      >
        {connecting ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-3.5 h-3.5 border-2 border-warm-charcoal border-t-transparent rounded-full"
            />
            Connecting...
          </span>
        ) : isConnected ? (
          "Disconnect"
        ) : (
          "Connect"
        )}
      </button>
    </motion.div>
  );
}

/* ─── delete account modal ─── */
function DeleteModal({ onClose }) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "DELETE";

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
        className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-warm-charcoal">Delete Account</h2>
            <p className="text-xs text-warm-muted">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-warm-gray mb-4">
          All your data, including projects, media, and settings will be permanently deleted. Type <strong className="text-red-600">DELETE</strong> to confirm.
        </p>
        <input
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE to confirm"
          className="w-full px-4 py-2.5 rounded-xl border border-red-200 text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-red-400 bg-red-50/30 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal hover:bg-cream transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!isConfirmed}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-30"
          >
            Delete Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── main component ─── */
export default function Settings() {
  const [activeSection, setActiveSection] = useState("account");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* Account state */
  const [name, setName] = useState("Jae");
  const [email, setEmail] = useState("jae@anglow.io");
  const [bio, setBio] = useState("Building the future of content automation.");
  const [showPassword, setShowPassword] = useState(false);

  /* Platforms state */
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const togglePlatform = (id) => {
    setPlatforms((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === "connected" ? "not-connected" : "connected" } : p)));
  };

  /* Notifications state */
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newSubmissions: true,
    growthAdvice: true,
    weeklyReport: true,
    artistMessages: false,
    billingAlerts: true,
    securityAlerts: true,
  });
  const toggleNotification = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  /* AI Engine state */
  const [apiKey, setApiKey] = useState("sk-anglow-xxxxxxxxxxxx");
  const [showApiKey, setShowApiKey] = useState(false);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);

  const notificationItems = [
    { key: "emailUpdates", label: "Product Updates", desc: "New features and improvements" },
    { key: "newSubmissions", label: "Artist Submissions", desc: "When a new artist applies" },
    { key: "growthAdvice", label: "Growth Advice", desc: "New AI-powered suggestions" },
    { key: "weeklyReport", label: "Weekly Reports", desc: "Performance summaries every Monday" },
    { key: "artistMessages", label: "Artist Messages", desc: "Direct messages from collaborators" },
    { key: "billingAlerts", label: "Billing Alerts", desc: "Payment and subscription updates" },
    { key: "securityAlerts", label: "Security Alerts", desc: "Login and security notifications" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left sidebar nav */}
      <div className="lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-2 sticky top-6">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-warm-charcoal text-white shadow-premium"
                    : "text-warm-gray hover:bg-cream hover:text-warm-charcoal",
                  section.id === "danger" && !isActive && "text-red-500 hover:bg-red-50 hover:text-red-600"
                )}
              >
                <section.icon className={cn("w-4 h-4", isActive ? "text-white" : section.id === "danger" ? "text-red-400" : "text-warm-muted")} />
                {section.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* ─── Account ─── */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-warm-charcoal">Account Settings</h2>

                <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6 space-y-6">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-warm-charcoal flex items-center justify-center text-white text-2xl font-bold">
                      J
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-charcoal">{name}</h3>
                      <p className="text-sm text-warm-muted">{email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Display Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-cream"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Email</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-cream"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe resize-none bg-cream"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-taupe" />
                    Change Password
                  </h3>
                  <div className="space-y-3 max-w-md">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe bg-cream"
                    />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal placeholder:text-warm-muted/50 focus:outline-none focus:border-taupe bg-cream pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-muted hover:text-warm-charcoal"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-colors shadow-premium">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Websites ─── */}
            {activeSection === "websites" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-warm-charcoal">Connected Websites</h2>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-colors shadow-premium">
                    <Plus className="w-4 h-4" />
                    Add Website
                  </button>
                </div>

                <div className="space-y-3">
                  {WEBSITES.map((site) => (
                    <div
                      key={site.id}
                      className="bg-white rounded-2xl border border-warm-border/80 shadow-premium p-5 flex items-center gap-4 hover:shadow-premium-hover transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: site.color }}
                      >
                        {site.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-warm-charcoal">{site.name}</h3>
                        <p className="text-xs text-warm-muted">{site.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-warm-border text-xs text-warm-gray hover:border-taupe/30 hover:bg-cream transition-all">
                          Edit
                        </button>
                        <button className="p-1.5 rounded-lg text-warm-muted hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Platforms ─── */}
            {activeSection === "platforms" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-warm-charcoal">Platform Integrations</h2>
                <p className="text-sm text-warm-muted">Connect your marketing and sales platforms to enable automation.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} onToggle={togglePlatform} />
                  ))}
                </div>
              </div>
            )}

            {/* ─── Billing ─── */}
            {activeSection === "billing" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-warm-charcoal">Billing</h2>
                <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-warm-muted uppercase tracking-wide font-medium">Current Plan</p>
                      <h3 className="text-3xl font-bold text-warm-charcoal mt-1">Free</h3>
                      <p className="text-sm text-warm-muted mt-1">5,000 AI credits per month</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-cream border border-warm-border">
                      <span className="text-xs text-warm-muted">Renews Jan 1, 2025</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-warm-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-warm-gray">Upgrade to Pro for unlimited credits</p>
                        <p className="text-xs text-warm-muted mt-0.5">$49/month — 14-day free trial</p>
                      </div>
                      <button className="px-5 py-2.5 rounded-xl bg-warm-charcoal text-white text-sm font-medium hover:bg-warm-gray transition-colors shadow-premium">
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6">
                  <h3 className="text-sm font-semibold text-warm-charcoal mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 p-4 bg-cream rounded-xl border border-warm-border/60">
                    <CreditCard className="w-8 h-8 text-warm-muted" />
                    <div>
                      <p className="text-sm text-warm-charcoal font-medium">No payment method on file</p>
                      <p className="text-xs text-warm-muted">Add a card when you upgrade</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Notifications ─── */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-warm-charcoal">Notification Preferences</h2>
                <div className="bg-white rounded-2xl border border-warm-border shadow-premium divide-y divide-warm-border/60">
                  {notificationItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-5 hover:bg-cream/30 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-warm-charcoal">{item.label}</p>
                        <p className="text-xs text-warm-muted mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle enabled={notifications[item.key]} onChange={() => toggleNotification(item.key)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── AI Engine ─── */}
            {activeSection === "ai" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-warm-charcoal">AI Engine Configuration</h2>

                <div className="bg-white rounded-2xl border border-warm-border shadow-premium p-6 space-y-5">
                  {/* API Key */}
                  <div>
                    <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">API Key</label>
                    <div className="relative">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-border text-sm text-warm-charcoal focus:outline-none focus:border-taupe bg-cream pr-10"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-muted hover:text-warm-charcoal"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Model Selector */}
                  <div>
                    <label className="text-sm font-medium text-warm-charcoal mb-1.5 block">AI Model</label>
                    <div className="flex gap-2">
                      {["gpt-4", "gpt-3.5"].map((model) => (
                        <button
                          key={model}
                          onClick={() => setAiModel(model)}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                            aiModel === model
                              ? "bg-warm-charcoal text-white border-warm-charcoal"
                              : "bg-white text-warm-gray border-warm-border hover:border-taupe/30"
                          )}
                        >
                          {model.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Temperature */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-warm-charcoal">Temperature</label>
                      <span className="text-sm text-warm-muted">{temperature.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-warm-charcoal"
                    />
                    <div className="flex justify-between text-xs text-warm-muted mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max Tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-warm-charcoal">Max Tokens</label>
                      <span className="text-sm text-warm-muted">{maxTokens.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={4000}
                      step={100}
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                      className="w-full accent-warm-charcoal"
                    />
                    <div className="flex justify-between text-xs text-warm-muted mt-1">
                      <span>500</span>
                      <span>4,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Danger Zone ─── */}
            {activeSection === "danger" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </h2>
                <div className="bg-white rounded-2xl border-2 border-red-200 shadow-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-warm-charcoal">Delete Account</h3>
                      <p className="text-sm text-warm-muted mt-1">
                        Permanently delete your account and all associated data. This action is irreversible.
                      </p>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="mt-4 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-premium"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Delete modal */}
      <AnimatePresence>
        {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
