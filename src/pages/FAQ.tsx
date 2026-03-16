import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: "What is M² Asset-Backed Financing?",
    answer: "M² is a structured financing platform where we purchase the asset (vehicle or parts) directly from the supplier and set up a monthly payment plan with you. We do not issue cash loans; we finance tangible assets."
  },
  {
    question: "How long does the approval process take?",
    answer: "Our concierge team typically reviews and responds to applications within 24 hours. Once approved, we coordinate with the supplier immediately."
  },
  {
    question: "Do I own the vehicle immediately?",
    answer: "M&M Solutions retains ownership or places a lien on the asset until the financing plan is completed. Once all obligations are met, full ownership is transferred to you."
  },
  {
    question: "What happens if I miss a payment?",
    answer: "We encourage open communication. If you anticipate a delay, contact our concierge team. As the asset is the security, consistent non-payment may lead to repossession of the asset."
  },
  {
    question: "Can I finance parts for a car I already own?",
    answer: "Yes! We finance high-value parts and major repairs. We pay the mechanic or supplier directly and set up a payment plan for the total cost."
  }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-gold transition-colors"
      >
        <span className="text-lg font-bold">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="pb-6 text-white/60 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

export const FAQ = () => {
  return (
    <div className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl mb-4 font-bold"
          >
            Common <span className="text-brand-gold">Questions</span>
          </motion.h1>
          <p className="text-white/60">
            Everything you need to know about M&M Solutions and our financing model.
          </p>
        </div>

        <div className="card-premium">
          <div className="flex items-center gap-3 mb-8 text-brand-gold">
            <HelpCircle size={24} />
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-brand-gold/5 border border-brand-gold/20 text-center">
          <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
          <p className="text-white/60 mb-8">Our concierge team is available on WhatsApp to help you with any specific queries.</p>
          <a href="https://wa.me/18760000000" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
            Chat with Us
          </a>
        </div>
      </div>
    </div>
  );
};
