import Nav from '@/sections/Nav';
import Hero from '@/sections/Hero';
import BrandPod from '@/sections/BrandPod';
import Social from '@/sections/Social';
import Features from '@/sections/Features';
import Industries from '@/sections/Industries';
import Pricing from '@/sections/Pricing';
import ExitPopup from '@/components/dovroyn/ExitPopup';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      <Nav />
      <main>
        <Hero />
        <BrandPod />
        <Social />
        <Features />
        <Industries />
        <Pricing />
      </main>
      <ExitPopup />
    </div>
  );
}
