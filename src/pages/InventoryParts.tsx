import React from 'react';
import { motion } from 'motion/react';
import { InventoryGrid } from '../components/InventoryGrid';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const InventoryParts = () => {
  const navigate = useNavigate();

  return (
    <div className="py-24 px-4">
      <SEO 
        title="Parts, Tyres & Batteries | M&M Auto Solutions"
        description="Shop premium auto parts, high-performance tyres, and long-lasting batteries. We offer asset-backed financing for all your vehicle upgrades and maintenance needs."
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-8xl mb-4 font-bold tracking-tighter"
          >
            PARTS & <span className="text-brand-gold">UPGRADES</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            From high-performance tyres and batteries to essential engine components. 
            Get the parts you need today with flexible M² financing options.
          </p>
        </div>
        
        <InventoryGrid initialType="part" onAction={() => navigate('/financing')} />
      </div>
    </div>
  );
};
