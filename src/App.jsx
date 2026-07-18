import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/* ── Layouts ── */
import DashboardLayout from './dashboard/components/Layout';
import PodLayout from './pods/PodLayout';

/* ── Direct imports (small pages) ── */
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import PricingPage from './pages/Pricing';

/* ── Lazy-loaded pages ── */
const WaitlistPage = lazy(() => import('./pages/Waitlist'));
const PodsPage = lazy(() => import('./pages/Pods'));
const NewPodPage = lazy(() => import('./pages/NewPod'));
const AccountPage = lazy(() => import('./pages/Account'));

/* ── Dashboard pages ── */
const DDashboard = lazy(() => import('./dashboard/pages/Dashboard'));
const DCampaigns = lazy(() => import('./dashboard/pages/Campaigns'));
const DContentEngine = lazy(() => import('./dashboard/pages/ContentEngine'));
const DGrowthAdvice = lazy(() => import('./dashboard/pages/GrowthAdvice'));
const DMediaLibrary = lazy(() => import('./dashboard/pages/MediaLibrary'));
const DArtistSubmissions = lazy(() => import('./dashboard/pages/ArtistSubmissions'));
const DWebsites = lazy(() => import('./dashboard/pages/Websites'));
const DSettings = lazy(() => import('./dashboard/pages/Settings'));

/* ── Pod workspace pages ── */
const PodOverview = lazy(() => import('./pods/pages/PodOverview'));
const ContentGenerator = lazy(() => import('./pods/pages/ContentGenerator'));
const ContentCalendar = lazy(() => import('./pods/pages/ContentCalendar'));
const AIAssistant = lazy(() => import('./pods/pages/AIAssistant'));
const CalendarGenerator = lazy(() => import('./pods/pages/CalendarGenerator'));
const AIOptimizer = lazy(() => import('./pods/pages/AIOptimizer'));
const Analytics = lazy(() => import('./pods/pages/Analytics'));
const Tools = lazy(() => import('./pods/pages/Tools'));
const Playbooks = lazy(() => import('./pods/pages/Playbooks'));
const Integrations = lazy(() => import('./pods/pages/Integrations'));
const GlobalSettings = lazy(() => import('./pods/pages/GlobalSettings'));
const Collaborations = lazy(() => import('./pods/pages/Collaborations'));
const AdCampaignManager = lazy(() => import('./pods/pages/AdCampaignManager'));
const BudgetTracker = lazy(() => import('./pods/pages/BudgetTracker'));
const WebsiteAnalyzer = lazy(() => import('./pods/pages/WebsiteAnalyzer'));
const ComingSoonBuilder = lazy(() => import('./pods/pages/ComingSoonBuilder'));
const Assets = lazy(() => import('./pods/pages/Assets'));
const SocialAccounts = lazy(() => import('./pods/pages/SocialAccounts'));
const PodSettings = lazy(() => import('./pods/pages/PodSettings'));

function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#FAF8F4]">
      <Loader2 className="w-10 h-10 text-[#C4A265] animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/pods" element={<PodsPage />} />
          <Route path="/pods/new" element={<NewPodPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/app" element={<DDashboard />} />
            <Route path="/app/websites" element={<DWebsites />} />
            <Route path="/app/content" element={<DContentEngine />} />
            <Route path="/app/media" element={<DMediaLibrary />} />
            <Route path="/app/growth" element={<DGrowthAdvice />} />
            <Route path="/app/campaigns" element={<DCampaigns />} />
            <Route path="/app/artists" element={<DArtistSubmissions />} />
            <Route path="/app/settings" element={<DSettings />} />
          </Route>

          <Route path="/pod/:podId/*" element={<PodLayout />}>
            <Route index element={<PodOverview />} />
            <Route path="overview" element={<PodOverview />} />
            <Route path="content" element={<ContentGenerator />} />
            <Route path="calendar" element={<ContentCalendar />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="calendar-generator" element={<CalendarGenerator />} />
            <Route path="optimizer" element={<AIOptimizer />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="tools" element={<Tools />} />
            <Route path="playbooks" element={<Playbooks />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="campaigns" element={<AdCampaignManager />} />
            <Route path="budget" element={<BudgetTracker />} />
            <Route path="website-analyzer" element={<WebsiteAnalyzer />} />
            <Route path="coming-soon" element={<ComingSoonBuilder />} />
            <Route path="assets" element={<Assets />} />
            <Route path="social-accounts" element={<SocialAccounts />} />
            <Route path="pod-settings" element={<PodSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
