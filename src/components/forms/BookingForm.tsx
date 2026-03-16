import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { serviceRequestSchema } from '../../types/schemas';
import { JAMAICA_PARISHES, SERVICE_CATEGORIES, cn } from '../../lib/utils';

export const BookingForm = ({ initialService }: { initialService?: string }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      request_type: 'service',
      urgency: 'Normal',
      wants_financing: false,
      service_category: initialService || '',
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setRefId(result.referenceId);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 text-brand-black">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl mb-4">Request Received!</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Your reference ID is <span className="text-brand-gold font-bold">{refId}</span>. 
          Our concierge team will contact you shortly to coordinate your service.
        </p>
        <a 
          href={`https://wa.me/18760000000?text=Hi, I just submitted a service request. Ref: ${refId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          Continue on WhatsApp <ArrowRight size={18} />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
              step >= s ? "gold-gradient text-brand-black" : "bg-white/5 text-white/40"
            )}>
              {s}
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-widest", step >= s ? "text-brand-gold" : "text-white/20")}>
              {s === 1 ? 'Vehicle' : s === 2 ? 'Service' : 'Contact'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50">Year</label>
                <input {...register('vehicle_year')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. 2022" />
                {errors.vehicle_year && <p className="text-red-500 text-[10px]">{errors.vehicle_year.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50">Make</label>
                <input {...register('vehicle_make')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. Toyota" />
                {errors.vehicle_make && <p className="text-red-500 text-[10px]">{errors.vehicle_make.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Model</label>
              <input {...register('vehicle_model')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. RAV4" />
              {errors.vehicle_model && <p className="text-red-500 text-[10px]">{errors.vehicle_model.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">License Plate (Optional)</label>
              <input {...register('vehicle_plate')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. 1234 AB" />
            </div>
            <button type="button" onClick={() => setStep(2)} className="w-full btn-primary mt-4">Next Step</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Service Category</label>
              <select {...register('service_category')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none appearance-none">
                <option value="">Select Category</option>
                {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.service_category && <p className="text-red-500 text-[10px]">{errors.service_category.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Issue Details</label>
              <textarea {...register('issue_details')} rows={4} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none resize-none" placeholder="Describe the problem or service needed..." />
              {errors.issue_details && <p className="text-red-500 text-[10px]">{errors.issue_details.message}</p>}
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <input type="checkbox" {...register('wants_financing')} id="financing" className="w-5 h-5 accent-brand-gold" />
              <label htmlFor="financing" className="text-sm font-bold">I am interested in M² Asset-Backed Financing</label>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex-1 btn-secondary">Back</button>
              <button type="button" onClick={() => setStep(3)} className="flex-1 btn-primary">Next Step</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Full Name</label>
              <input {...register('customer_name')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="John Doe" />
              {errors.customer_name && <p className="text-red-500 text-[10px]">{errors.customer_name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50">Phone Number</label>
                <input {...register('customer_phone')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="876-000-0000" />
                {errors.customer_phone && <p className="text-red-500 text-[10px]">{errors.customer_phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider opacity-50">Parish</label>
                <select {...register('parish')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none appearance-none">
                  <option value="">Select Parish</option>
                  {JAMAICA_PARISHES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.parish && <p className="text-red-500 text-[10px]">{errors.parish.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Community / Address</label>
              <input {...register('address')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="Street name, community..." />
              {errors.address && <p className="text-red-500 text-[10px]">{errors.address.message}</p>}
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(2)} className="flex-1 btn-secondary">Back</button>
              <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Request'}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};


