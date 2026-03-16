import React from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Package, 
  Truck, 
  Car, 
  ShieldCheck, 
  CreditCard, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { title: 'Vehicle Servicing', icon: <Wrench />, desc: 'Scheduled maintenance and major repairs.', slug: 'vehicle-servicing' },
  { title: 'Parts & Accessories', icon: <Package />, desc: 'Genuine parts with inventory visibility.', slug: 'parts-accessories' },
  { title: 'Mobile Repair', icon: <Truck />, desc: 'On-call mechanics dispatched to you.', slug: 'mobile-repair' },
  { title: 'Wrecker Service', icon: <Car />, desc: 'Professional tow and transport requests.', slug: 'wrecker-service' },
  { title: 'Registration Support', icon: <ShieldCheck />, desc: 'Hassle-free vehicle documentation.', slug: 'registration-support' },
  { title: 'Insurance Assistance', icon: <CreditCard />, desc: 'Financing pathways for your coverage.', slug: 'insurance-assistance' },
];

export const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl mb-4 font-bold"
          >
            Our <span className="text-brand-gold">Solutions</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Comprehensive automotive support managed by our internal concierge team. Expert care, structured payments, total peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={s.title} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium group flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-black border border-white/10 flex items-center justify-center text-brand-gold mb-8 group-hover:gold-gradient group-hover:text-brand-black transition-all">
                {s.icon}
              </div>
              <h3 className="text-2xl mb-4 font-bold">{s.title}</h3>
              <p className="text-white/50 mb-8 flex-1">{s.desc}</p>
              <button 
                onClick={() => navigate(`/services/${s.slug}`)} 
                className="btn-secondary w-full flex items-center justify-center gap-2 group-hover:bg-brand-gold group-hover:text-brand-black transition-all"
              >
                Explore Solution <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
