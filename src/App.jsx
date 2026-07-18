import { Routes, Route } from 'react-router-dom';
import Sidebar from './dashboard/components/Sidebar';
import Header from './dashboard/components/Header';
import Dashboard from './dashboard/pages/Dashboard';
import Websites from './dashboard/pages/Websites';
import ContentEngine from './dashboard/pages/ContentEngine';
import MediaLibrary from './dashboard/pages/MediaLibrary';
import GrowthAdvice from './dashboard/pages/GrowthAdvice';
import Campaigns from './dashboard/pages/Campaigns';
import ArtistSubmissions from './dashboard/pages/ArtistSubmissions';
import Settings from './dashboard/pages/Settings';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#3D3632]">
      <Sidebar />
      <div className="lg:ml-72 min-h-screen">
        <Header />
        <main className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/content" element={<ContentEngine />} />
            <Route path="/media" element={<MediaLibrary />} />
            <Route path="/advice" element={<GrowthAdvice />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/artists" element={<ArtistSubmissions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
