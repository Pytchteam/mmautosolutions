import React from 'react';
import { motion } from 'motion/react';
import { InventoryGrid } from '../components/InventoryGrid';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const InventoryCars = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-4">
      <SEO 
        title="Vehicle Marketplace | M&M Auto Solutions"
        description="Browse our premium selection of vehicles available for structured monthly financing. Toyota, Honda, Nissan, BMW and more."
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-8xl mb-4 font-bold tracking-tighter"
          >
            Vehicle <span className="text-brand-gold">Marketplace</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Premium cars, SUVs, and commercial vehicles. Insurance for the road ahead with M² Solutions' structured monthly payment plans.
          </p>
        </div>
        
        <InventoryGrid initialType="car" onAction={() => navigate('/financing')} />
      </div>
    </div>
  );
};
