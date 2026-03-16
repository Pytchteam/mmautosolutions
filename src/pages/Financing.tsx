import React from 'react';
import { motion } from 'motion/react';
import { FinancingForm } from '../components/forms/FinancingForm';
import { ShieldCheck, Clock, CreditCard, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Financing = () => {
  return (
    <div className="py-24 px-4">
      <SEO 
        title="Asset-Backed Financing | M&M Auto Solutions"
        description="Apply for structured monthly financing for vehicles, parts, and repairs. 24-hour review and direct supplier payment."
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl mb-4 font-bold"
          >
            M² <span className="text-brand-gold">Financing</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Asset-backed solutions designed for your automotive needs. No cash loans, just structured monthly payments for tangible assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Direct Supplier Pay", icon: <ShieldCheck className="text-brand-gold" />, desc: "We pay the supplier directly, ensuring your asset is secured and ready for you." },
            { title: "24h Review", icon: <Clock className="text-brand-gold" />, desc: "Our concierge team reviews applications within 24 hours for fast turnaround." },
            { title: "Structured Plans", icon: <CreditCard className="text-brand-gold" />, desc: "Predictable monthly payments that fit your budget and goals." }
          ].map((v, i) => (
            <div key={i} className="card-premium">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-white/50 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-bold">More Than Just <span className="text-brand-gold">Car Loans.</span></h2>
            <p className="text-white/70 leading-relaxed">
              We are your financial safety net for the road. Whether it's an unforeseen mechanical failure, a necessary upgrade, or just the desire to "pimp your ride," M² Solutions provides the backing you need when you need it most.
            </p>
            <ul className="space-y-4">
              {[
                "Financing for Cars, Parts, and Major Repairs.",
                "Tyre and Battery financing on easy terms.",
                "Insurance for unforeseen accidents and breakdowns.",
                "No hidden fees or predatory interest rates.",
                "Direct supplier payment for total transparency."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <CheckCircle2 className="text-brand-gold shrink-0" size={20} />
                  <span className="text-white/80">{text}</span>
                </li>
              ))}
            </ul>
            <div className="p-8 rounded-2xl bg-brand-gold/5 border border-brand-gold/20">
              <p className="text-sm italic text-brand-gold">
                "Financing subject to approval. Terms vary by asset class and risk tier. Ownership transfer occurs after completion of all obligations."
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-premium"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Start Your Application</h3>
            <FinancingForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
