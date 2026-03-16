import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { InventoryCars } from './pages/InventoryCars';
import { InventoryParts } from './pages/InventoryParts';
import { Financing } from './pages/Financing';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { FAQ } from './pages/FAQ';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="w-24 h-24 gold-gradient rounded-3xl flex items-center justify-center text-brand-black shadow-2xl shadow-brand-gold/20 animate-pulse">
        <ShieldCheck size={48} />
      </div>
      <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-3xl animate-ping" />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8 text-center"
    >
      <h2 className="text-xl font-display font-black tracking-widest uppercase">M&M AUTO</h2>
      <p className="text-[10px] text-brand-gold font-bold tracking-[0.4em] mt-1">SOLUTIONS</p>
    </motion.div>
  </motion.div>
);

const WhatsAppButton = () => (
  <motion.a
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    href="https://wa.me/18760000000"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/20 group"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 bg-brand-charcoal border border-white/10 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Chat with Concierge
    </span>
  </motion.a>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-gold selection:text-brand-black">
          <SEO />
          <Navbar />
          
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/inventory/cars" element={<InventoryCars />} />
              <Route path="/inventory/parts" element={<InventoryParts />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
