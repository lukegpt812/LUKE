import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from './components/ui/Navigation';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import SelectedWork from './components/sections/SelectedWork';
import Concepts from './components/sections/Concepts';
import Services from './components/sections/Services';
import Labs from './components/sections/Labs';
import Process from './components/sections/Process';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import ProjectDetail from './components/ProjectDetail';

function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SelectedWork />
        <Concepts />
        <Services />

        <Process />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Intro from './components/ui/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <div className="bg-black min-h-screen text-white selection:bg-accent-purple selection:text-white">
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro onComplete={() => setShowIntro(false)} />
          )}
        </AnimatePresence>

        <CustomCursor />

        {/* Cinematic Vignette */}
        <div className="vignette" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
