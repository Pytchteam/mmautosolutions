import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Users, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl mb-4 font-bold"
          >
            About <span className="text-brand-gold">M&M Solutions</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            We are redefining asset ownership in Jamaica through innovative financing and premium automotive care.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" alt="About M&M" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-gold p-8 rounded-2xl text-brand-black font-black text-4xl shadow-2xl">
              10+ <br /><span className="text-sm font-bold uppercase tracking-widest opacity-70">Years Exp.</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl mb-6 font-bold">Our <span className="text-brand-gold">Mission</span></h2>
            <p className="text-white/70 mb-6 leading-relaxed text-lg">
              M&M Auto Solutions was founded on a simple principle: high-quality automotive care should be accessible to every driver in Jamaica. We've combined expert mechanical skills with a sophisticated financing engine, M² Solutions, to remove the financial barriers to essential repairs.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              We are not just a repair shop; we are your automotive partner. From sourcing rare parts to providing structured payment plans for major engine overhauls, we manage the entire lifecycle of your vehicle's needs.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-brand-gold font-bold text-2xl mb-1">5000+</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Jobs Managed</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-brand-gold font-bold text-2xl mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Direct Pay</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Transparency", icon: <ShieldCheck className="text-brand-gold" />, desc: "Clear terms, no hidden fees, and total visibility into your asset's status." },
            { title: "Accessibility", icon: <Target className="text-brand-gold" />, desc: "Making premium assets available to everyday people through structured plans." },
            { title: "Excellence", icon: <Award className="text-brand-gold" />, desc: "Uncompromising quality in both our mechanical services and financial products." }
          ].map((v, i) => (
            <div key={i} className="card-premium text-center">
              <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center text-brand-black mx-auto mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-white/50 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-charcoal rounded-3xl p-12 lg:p-20 border border-white/10 text-center">
          <h2 className="text-3xl lg:text-5xl mb-8 font-bold">Meet the <span className="text-brand-gold">Concierge Team</span></h2>
          <p className="text-white/60 max-w-3xl mx-auto mb-12">
            Our team of experts is here to guide you through every step of your automotive journey. From our master mechanics to our financing specialists, we are dedicated to your success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-white/10 grayscale group-hover:grayscale-0 transition-all">
                  <img src={`https://picsum.photos/seed/team${i}/400/400`} alt="Team Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-brand-gold">Team Member {i}</h4>
                <p className="text-xs text-white/40 uppercase tracking-widest">Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
