import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { financingApplicationSchema } from '../../types/schemas';
import { JAMAICA_PARISHES, INCOME_BANDS, EMPLOYMENT_TYPES } from '../../lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';

export const FinancingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(financingApplicationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'applications'), {
        ...data,
        userId: auth.currentUser?.uid || 'anonymous',
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      // Call server API for email notification
      try {
        await fetch('/api/financing-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, referenceId: docRef.id }),
        });
      } catch (emailError) {
        console.error("Failed to trigger email notification:", emailError);
      }

      setRefId(docRef.id.substring(0, 8).toUpperCase());
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
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
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-3xl mb-4">Application Submitted!</h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Your application reference is <span className="text-brand-gold font-bold">{refId}</span>. 
          Our M² Solutions team will review your application and contact you within 24 hours.
        </p>
        <button onClick={() => window.location.reload()} className="btn-primary">Return Home</button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-brand-charcoal p-8 rounded-3xl border border-white/10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">M² Financing Application</h2>
        <p className="text-sm text-white/50">Asset-backed financing for automotive services and parts.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-50">Asset/Service Type</label>
            <select {...register('asset_type')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none appearance-none">
              <option value="">Select Type</option>
              <option value="Major Repair">Major Repair</option>
              <option value="Engine/Transmission">Engine/Transmission</option>
              <option value="Parts Purchase">Parts Purchase</option>
              <option value="Insurance Premium">Insurance Premium</option>
              <option value="Vehicle Purchase">Vehicle Purchase</option>
            </select>
            {errors.asset_type && <p className="text-red-500 text-[10px]">{errors.asset_type.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-50">Estimated Quote Amount (JMD)</label>
            <input 
              type="number" 
              {...register('quote_amount', { valueAsNumber: true })} 
              className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" 
              placeholder="e.g. 150000" 
            />
            {errors.quote_amount && <p className="text-red-500 text-[10px]">{errors.quote_amount.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider opacity-50">Asset Description</label>
          <textarea 
            {...register('asset_description')} 
            rows={3} 
            className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none resize-none" 
            placeholder="Details about the service or part being financed..." 
          />
          {errors.asset_description && <p className="text-red-500 text-[10px]">{errors.asset_description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-50">Down Payment Ability</label>
            <input type="number" {...register('down_payment', { valueAsNumber: true })} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. 30000" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-50">Monthly Budget</label>
            <input type="number" {...register('monthly_budget', { valueAsNumber: true })} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="e.g. 15000" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider opacity-50">Income Band</label>
            <select {...register('income_band')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none appearance-none">
              <option value="">Select Band</option>
              {INCOME_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-widest opacity-50">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Full Name</label>
              <input {...register('customer_name')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider opacity-50">Phone Number</label>
              <input {...register('customer_phone')} className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" placeholder="876-000-0000" />
            </div>
          </div>
        </div>

        <div className="bg-brand-gold/5 p-4 rounded-xl border border-brand-gold/20 text-[10px] leading-relaxed opacity-70">
          By submitting this application, I declare that the information provided is true and correct. I understand that M² Solutions provides asset-backed financing and that ownership transfer occurs only after completion of all obligations. I consent to credit checks as part of the review process.
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};
