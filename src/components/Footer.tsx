import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center text-brand-black">
                <ShieldCheck size={20} />
              </div>
              <span className="text-lg font-display font-black tracking-tighter">M&M AUTO</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Jamaica's premier asset-backed financing platform for vehicles and automotive parts. Driving dreams through structured solutions.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/services/vehicle-servicing" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Vehicle Servicing</Link></li>
              <li><Link to="/inventory/parts" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Parts Inventory</Link></li>
              <li><Link to="/services/mobile-repair" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Mobile Repair</Link></li>
              <li><Link to="/financing" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Asset Financing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-white/50 hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Insights Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-white/50 hover:text-brand-gold transition-colors">How it Works</Link></li>
              <li><Link to="/admin" className="text-sm text-white/50 hover:text-brand-gold transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/50"><MapPin size={18} className="text-brand-gold shrink-0" /> Kingston, Jamaica</li>
              <li className="flex gap-3 text-sm text-white/50"><Phone size={18} className="text-brand-gold shrink-0" /> (876) 555-0123</li>
              <li className="flex gap-3 text-sm text-white/50"><Mail size={18} className="text-brand-gold shrink-0" /> concierge@mmauto.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © 2026 M&M Auto Solutions. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
