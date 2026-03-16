import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Dropdown = ({ name, items, currentPath }: { name: string, items: { name: string, path: string }[], currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = items.some(item => currentPath === item.path);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors flex items-center gap-1 py-2 ${isActive ? 'text-brand-gold' : 'text-white/70'}`}
      >
        {name}
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 w-48 bg-brand-charcoal border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
          >
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors ${currentPath === item.path ? 'text-brand-gold' : 'text-white/60'}`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const inventoryItems = [
    { name: 'Cars Marketplace', path: '/inventory/cars' },
    { name: 'Parts Marketplace', path: '/inventory/parts' },
  ];

  const serviceItems = [
    { name: 'All Services', path: '/services' },
    { name: 'Vehicle Servicing', path: '/services/vehicle-servicing' },
    { name: 'Engine Repair', path: '/services/engine-repair' },
    { name: 'Tyres & Alignment', path: '/services/tyres-alignment' },
    { name: 'Batteries & Electrical', path: '/services/batteries-electrical' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Financing', path: '/financing' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center text-brand-black shadow-lg shadow-brand-gold/20 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-black tracking-tighter leading-none">M&M AUTO</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold leading-none">SOLUTIONS</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link 
              to="/"
              className={`text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors relative group ${location.pathname === '/' ? 'text-brand-gold' : 'text-white/70'}`}
            >
              Home
            </Link>
            
            <Dropdown name="Inventory" items={inventoryItems} currentPath={location.pathname} />
            <Dropdown name="Services" items={serviceItems} currentPath={location.pathname} />
            
            <Link 
              to="/financing"
              className={`text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors relative group ${location.pathname === '/financing' ? 'text-brand-gold' : 'text-white/70'}`}
            >
              Financing
            </Link>
            <Link 
              to="/blog"
              className={`text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors relative group ${location.pathname === '/blog' ? 'text-brand-gold' : 'text-white/70'}`}
            >
              Blog
            </Link>
            <Link 
              to="/about"
              className={`text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors relative group ${location.pathname === '/about' ? 'text-brand-gold' : 'text-white/70'}`}
            >
              About
            </Link>

            <Link to="/financing" className="btn-primary py-2 px-6 text-[10px]">
              Apply Now
            </Link>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-charcoal border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold hover:text-brand-gold">Home</Link>
              
              {/* Mobile Inventory Dropdown */}
              <div>
                <button 
                  onClick={() => toggleMobileDropdown('inventory')}
                  className="flex items-center justify-between w-full text-lg font-bold hover:text-brand-gold"
                >
                  Inventory <ChevronDown size={20} className={mobileDropdowns.inventory ? 'rotate-180' : ''} />
                </button>
                {mobileDropdowns.inventory && (
                  <div className="pl-4 mt-4 space-y-4 border-l border-white/10">
                    {inventoryItems.map(item => (
                      <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/60 hover:text-brand-gold">{item.name}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services Dropdown */}
              <div>
                <button 
                  onClick={() => toggleMobileDropdown('services')}
                  className="flex items-center justify-between w-full text-lg font-bold hover:text-brand-gold"
                >
                  Services <ChevronDown size={20} className={mobileDropdowns.services ? 'rotate-180' : ''} />
                </button>
                {mobileDropdowns.services && (
                  <div className="pl-4 mt-4 space-y-4 border-l border-white/10">
                    {serviceItems.map(item => (
                      <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-white/60 hover:text-brand-gold">{item.name}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/financing" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold hover:text-brand-gold">Financing</Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold hover:text-brand-gold">Blog</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold hover:text-brand-gold">About</Link>
              
              <Link 
                to="/financing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Get Started <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
