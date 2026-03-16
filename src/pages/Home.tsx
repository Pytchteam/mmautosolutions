import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Star, 
  Shield, 
  Wrench, 
  Package, 
  Truck, 
  Car, 
  CreditCard, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="M&M Auto Solutions | Jamaica's Premier Asset-Backed Financing"
        description="Drive Now, Pay Later. Access premium vehicles, parts, and emergency repairs with M² Solutions' structured monthly payment plans."
      />
      <section className="relative min-h-[90vh] flex items-center py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck size={14} /> Jamaica's Premier Asset-Backed Financing
              </div>
              <h1 className="text-5xl lg:text-8xl mb-6 leading-tight font-display font-bold">
                Drive Now. <br />
                <span className="text-brand-gold">Pay Later.</span>
              </h1>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                From dream cars to emergency repairs, M² Solutions provides asset-backed financing for everything automotive. We're your insurance for the unforeseen, your partner for upgrades, and your gateway to the road.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/inventory/cars')} className="btn-primary flex items-center justify-center gap-2">
                  Browse Vehicles <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/services')} className="btn-secondary">Explore Services</button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-16 lg:mt-0 relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-gold/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-8">
                  <p className="text-brand-gold font-bold">Premium Inventory Available Now</p>
                </div>
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200" alt="Premium Car" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-charcoal p-6 rounded-2xl border border-white/10 shadow-xl hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-brand-black">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-50">Approval Time</p>
                    <p className="text-xl font-bold">Under 24 Hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-brand-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Our Promise", icon: <Star className="text-brand-gold" />, text: "We promise transparency, fair structured payments, and premium quality in every asset we finance." },
              { title: "Your Growth", icon: <Zap className="text-brand-gold" />, text: "Access the tools you need to move forward without the burden of high-interest cash loans." },
              { title: "Legal Safety", icon: <Shield className="text-brand-gold" />, text: "All financing is asset-backed and supplier-direct, ensuring total compliance and security." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gold/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight">
                Insurance for the <br />
                <span className="text-brand-gold">Unforeseen.</span>
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Life happens. Accidents, breakdowns, and unexpected repairs shouldn't stop your momentum. M² Solutions acts as your financial safety net, providing immediate backing for repairs, tyres, and batteries when you need it most.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Emergency Mechanical Repairs",
                  "Unforeseen Accident Support",
                  "Performance & Aesthetic Upgrades",
                  "Essential Maintenance Financing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="text-brand-gold" size={20} />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/financing')} className="btn-primary">Get Protected Now</button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-16 lg:mt-0"
            >
              <div className="relative p-1 bg-gradient-to-br from-brand-gold/50 to-transparent rounded-3xl">
                <div className="bg-brand-black rounded-[22px] p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-brand-black shadow-xl shadow-brand-gold/20">
                      <Shield size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">M² Shield</h3>
                      <p className="text-brand-gold text-xs font-bold tracking-widest uppercase">Asset Protection</p>
                    </div>
                  </div>
                  <p className="text-white/50 mb-8 leading-relaxed italic">
                    "We don't just finance cars; we finance your peace of mind. Our model ensures that even when the road gets rough, your journey doesn't have to end."
                  </p>
                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">100%</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Asset Backed</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">24h</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Response</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Hidden Fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-6xl mb-4 font-bold"
            >
              Our Core <span className="text-brand-gold">Solutions</span>
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto">Comprehensive automotive support managed by our internal concierge team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Vehicle Financing', icon: <Car />, desc: 'Structured plans for premium cars and SUVs.', slug: 'vehicle-financing' },
              { title: 'Parts & Upgrades', icon: <Package />, desc: 'Finance high-value parts or "pimp your ride".', slug: 'parts-accessories' },
              { title: 'Emergency Repairs', icon: <Wrench />, desc: 'Insurance for unforeseen mechanical failures.', slug: 'emergency-repairs' },
              { title: 'Tyres & Batteries', icon: <Zap />, desc: 'Essential maintenance on easy monthly terms.', slug: 'tyres-batteries' },
              { title: 'Mobile Servicing', icon: <Truck />, desc: 'On-call mechanics dispatched to your location.', slug: 'mobile-repair' },
              { title: 'Registration & More', icon: <ShieldCheck />, desc: 'Documentation and insurance assistance.', slug: 'registration-support' },
            ].map((s, i) => (
              <motion.div 
                key={s.title} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium group"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-black border border-white/10 flex items-center justify-center text-brand-gold mb-6 group-hover:gold-gradient group-hover:text-brand-black transition-all">{s.icon}</div>
                <h3 className="text-xl mb-3 font-bold">{s.title}</h3>
                <p className="text-sm text-white/50 mb-6">{s.desc}</p>
                <button onClick={() => navigate(`/services/${s.slug}`)} className="text-brand-gold text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">Learn More <ChevronRight size={16} /></button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-brand-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-6xl mb-4 font-bold">The M&M <span className="text-brand-gold">Journey</span></h2>
            <p className="text-white/60">Four simple steps to getting the assets you need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select Asset", desc: "Choose a vehicle or parts from our inventory." },
              { step: "02", title: "Apply Online", desc: "Submit your financing application in minutes." },
              { step: "03", title: "Get Approved", desc: "Review within 24 hours with clear terms." },
              { step: "04", title: "Drive Away", desc: "Start your structured monthly payment plan." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-white/5 mb-4">{item.step}</div>
                <h4 className="text-xl font-bold mb-2 text-brand-gold">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-brand-gold/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="financing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-charcoal rounded-3xl border border-white/10 p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px]" />
            <div className="lg:grid lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <h2 className="text-3xl lg:text-5xl mb-8 font-bold">M² Solutions: <br /><span className="text-brand-gold">Asset-Backed</span> Financing</h2>
                <div className="space-y-6 mb-10 text-white/70">
                  <p className="leading-relaxed">We finance tangible assets and services directly to suppliers. No cash loans. Just reliable assets with structured monthly payments.</p>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-center"><CheckCircle2 className="text-brand-gold" size={18} /> Structured monthly plans</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="text-brand-gold" size={18} /> Direct supplier payment</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="text-brand-gold" size={18} /> Conditional ownership</li>
                  </ul>
                </div>
                <button onClick={() => navigate('/financing')} className="btn-primary">Apply for Financing</button>
              </div>
              <div className="mt-12 lg:mt-0 grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-brand-black p-8 rounded-2xl border border-white/5 text-center"
                >
                  <p className="text-4xl font-bold text-brand-gold mb-2">24h</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-50">Review Time</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-brand-black p-8 rounded-2xl border border-white/5 text-center"
                >
                  <p className="text-4xl font-bold text-brand-gold mb-2">0%</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-50">Hidden Fees</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
