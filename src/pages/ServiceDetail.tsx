import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Package, 
  Truck, 
  Car, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import { BookingForm } from '../components/forms/BookingForm';

const SERVICE_DATA: Record<string, any> = {
  'vehicle-servicing': {
    title: 'Vehicle Servicing',
    icon: <Wrench size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200',
    description: 'Professional maintenance and major repairs for all vehicle makes and models.',
    benefits: [
      'Expert certified mechanics',
      'Genuine OEM parts used',
      'Detailed diagnostic reports',
      'Structured payment plans for major repairs'
    ],
    process: [
      { title: 'Diagnostic', desc: 'We perform a full scan and physical inspection.' },
      { title: 'Quote', desc: 'Receive a transparent breakdown of costs and parts.' },
      { title: 'Service', desc: 'Expert repairs performed in our premium facility.' },
      { title: 'Quality Check', desc: 'Final testing to ensure everything is perfect.' }
    ]
  },
  'parts-accessories': {
    title: 'Parts & Accessories',
    icon: <Package size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1200',
    description: 'Source genuine parts with full inventory visibility and expert sourcing.',
    benefits: [
      'Hard-to-find parts sourcing',
      'Genuine manufacturer warranty',
      'Direct supplier relationships',
      'Financing available for high-value components'
    ],
    process: [
      { title: 'Request', desc: 'Tell us what you need or provide a part number.' },
      { title: 'Source', desc: 'We find the best price and availability globally.' },
      { title: 'Verify', desc: 'Quality inspection before the part reaches you.' },
      { title: 'Deliver', desc: 'Direct delivery or installation at our facility.' }
    ]
  },
  'mobile-repair': {
    title: 'Mobile Repair',
    icon: <Truck size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=1200',
    description: 'On-call mechanics dispatched to your location for emergency repairs and maintenance.',
    benefits: [
      'Convenience at your doorstep',
      'Rapid response times',
      'Fully equipped mobile units',
      'Transparent on-site quotes'
    ],
    process: [
      { title: 'Call', desc: 'Request a mobile unit through our platform.' },
      { title: 'Dispatch', desc: 'Nearest qualified mechanic is sent to you.' },
      { title: 'Repair', desc: 'On-site diagnostics and immediate repairs.' },
      { title: 'Done', desc: 'Get back on the road without the tow truck.' }
    ]
  },
  'wrecker-service': {
    title: 'Wrecker Service',
    icon: <Car size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    description: 'Professional towing and vehicle transport services across all 14 parishes.',
    benefits: [
      '24/7 Emergency availability',
      'Damage-free transport',
      'Island-wide coverage',
      'Direct billing to insurance if applicable'
    ],
    process: [
      { title: 'Location', desc: 'Share your GPS coordinates with our team.' },
      { title: 'Confirm', desc: 'Receive an ETA and driver details.' },
      { title: 'Transport', desc: 'Safe loading and transport to your destination.' },
      { title: 'Drop-off', desc: 'Secure delivery at your home or our facility.' }
    ]
  },
  'registration-support': {
    title: 'Registration Support',
    icon: <ShieldCheck size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    description: 'Hassle-free vehicle documentation and registration management.',
    benefits: [
      'No more waiting in lines',
      'Expert document verification',
      'Fast turnaround times',
      'Total compliance assurance'
    ],
    process: [
      { title: 'Documents', desc: 'Upload your current vehicle papers.' },
      { title: 'Processing', desc: 'Our team handles the bureaucracy.' },
      { title: 'Updates', desc: 'Real-time tracking of your application.' },
      { title: 'Delivery', desc: 'New documents delivered to your door.' }
    ]
  },
  'insurance-assistance': {
    title: 'Insurance Assistance',
    icon: <CreditCard size={40} />,
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
    description: 'Financing pathways and expert guidance for your vehicle insurance coverage.',
    benefits: [
      'Premium financing options',
      'Multiple provider quotes',
      'Claims support concierge',
      'Bundled service discounts'
    ],
    process: [
      { title: 'Profile', desc: 'Provide your vehicle and driver details.' },
      { title: 'Compare', desc: 'Review the best quotes from top providers.' },
      { title: 'Finance', desc: 'Select a structured plan for your premium.' },
      { title: 'Covered', desc: 'Immediate coverage and digital policy.' }
    ]
  }
};

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = slug ? SERVICE_DATA[slug] : null;

  if (!service) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <button onClick={() => navigate('/services')} className="btn-primary">Back to Services</button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-brand-gold mb-8 hover:gap-3 transition-all font-bold"
          >
            <ArrowLeft size={20} /> Back to Solutions
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center text-brand-black mb-8 shadow-2xl">
              {service.icon}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="lg:grid lg:grid-cols-3 gap-16">
          {/* Left Column: Trust & Process */}
          <div className="lg:col-span-2 space-y-24">
            <section>
              <h2 className="text-3xl font-bold mb-12">Why Trust <span className="text-brand-gold">M&M?</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="mt-1"><CheckCircle2 className="text-brand-gold" size={20} /></div>
                    <p className="font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-12">The <span className="text-brand-gold">Process</span></h2>
              <div className="space-y-8">
                {service.process.map((step: any, i: number) => (
                  <div key={i} className="flex gap-8 items-center">
                    <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{step.title}</h4>
                      <p className="text-white/50">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-12 rounded-3xl bg-brand-gold/5 border border-brand-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-6">M² Financing Available</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Don't let repair costs stop you. This service is fully eligible for our asset-backed financing. Pay in structured monthly installments while we take care of your vehicle.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-gold">
                  <Clock size={16} /> 24h Approval
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-gold">
                  <Zap size={16} /> Instant Dispatch
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Funnel Form */}
          <div className="mt-16 lg:mt-0">
            <div className="sticky top-32">
              <div className="card-premium">
                <h3 className="text-2xl font-bold mb-8 text-center">Request This Service</h3>
                <BookingForm initialService={service.title} />
                <p className="mt-6 text-[10px] text-center text-white/40 uppercase tracking-widest">
                  Secure Request • No Obligation • Concierge Managed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
