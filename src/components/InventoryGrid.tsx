import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Package, ChevronRight, Info, ShieldCheck, Tag, Search, Filter, X } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { collection, query, getDocs, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface InventoryItem {
  id: string;
  type: 'car' | 'part';
  title: string;
  price: number;
  image: string;
  specs: string[];
  available: boolean;
  category?: string;
  brand?: string;
}

const MOCK_CARS: InventoryItem[] = [
  {
    id: 'c1',
    type: 'car',
    title: '2022 Toyota RAV4 Hybrid',
    price: 5850000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    specs: ['Low Mileage', 'Hybrid Efficiency', 'AWD'],
    available: true,
    category: 'SUV',
    brand: 'Toyota'
  },
  {
    id: 'c2',
    type: 'car',
    title: '2021 Honda CR-V EX-L',
    price: 4950000,
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
    specs: ['Leather Interior', 'Sunroof', 'Turbocharged'],
    available: true,
    category: 'SUV',
    brand: 'Honda'
  },
  {
    id: 'c3',
    type: 'car',
    title: '2023 Nissan X-Trail',
    price: 6200000,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    specs: ['Brand New', '7-Seater', 'Tech Pack'],
    available: true,
    category: 'SUV',
    brand: 'Nissan'
  },
  {
    id: 'c4',
    type: 'car',
    title: '2020 BMW 330i M-Sport',
    price: 7500000,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    specs: ['M-Sport Package', 'Sunroof', 'Pristine Condition'],
    available: true,
    category: 'Sedan',
    brand: 'BMW'
  }
];

const MOCK_PARTS: InventoryItem[] = [
  {
    id: 'p1',
    type: 'part',
    title: 'Genuine Toyota Brake Pads',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    specs: ['OEM Quality', 'Front Set', 'High Durability'],
    available: true,
    category: 'Brakes',
  },
  {
    id: 'p2',
    type: 'part',
    title: 'Bosch Platinum Spark Plugs',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&q=80&w=800',
    specs: ['Set of 4', 'Improved Ignition', 'Universal Fit'],
    available: true,
    category: 'Engine',
  },
  {
    id: 'p3',
    type: 'part',
    title: 'Castrol Edge 5W-30 (5L)',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1631243289601-389369320649?auto=format&fit=crop&q=80&w=800',
    specs: ['Full Synthetic', 'Engine Protection', 'Imported'],
    available: true,
    category: 'Fluids',
  },
  {
    id: 'p4',
    type: 'part',
    title: 'Michelin Pilot Sport 4S (245/40R18)',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=800',
    specs: ['High Performance', 'Summer Tyre', 'Superior Grip'],
    available: true,
    category: 'Tyres',
  }
];

export const InventoryGrid = ({ onAction, initialType = 'car' }: { onAction: (item: InventoryItem) => void, initialType?: 'car' | 'part' }) => {
  const [activeType, setActiveType] = useState<'car' | 'part'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const collectionName = activeType === 'car' ? 'vehicles' : 'parts';
        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const fetchedItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as InventoryItem[];
          setItems(fetchedItems);
        } else {
          // Fallback to mock data if DB is empty
          setItems(activeType === 'car' ? MOCK_CARS : MOCK_PARTS);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setItems(activeType === 'car' ? MOCK_CARS : MOCK_PARTS);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeType]);

  const categories = useMemo(() => {
    const allItems = activeType === 'car' ? MOCK_CARS : MOCK_PARTS;
    const cats = new Set(allItems.map(item => item.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [activeType]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="inline-flex p-1 bg-brand-charcoal rounded-2xl border border-white/10 w-full lg:w-auto">
          <button
            onClick={() => { setActiveType('car'); setSelectedCategory(null); }}
            className={cn(
              "flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all",
              activeType === 'car' ? "gold-gradient text-brand-black shadow-lg" : "text-white/60 hover:text-white"
            )}
          >
            <Car size={18} /> Vehicles
          </button>
          <button
            onClick={() => { setActiveType('part'); setSelectedCategory(null); }}
            className={cn(
              "flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all",
              activeType === 'part' ? "gold-gradient text-brand-black shadow-lg" : "text-white/60 hover:text-white"
            )}
          >
            <Package size={18} /> Parts & Upgrades
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text"
              placeholder={`Search ${activeType === 'car' ? 'vehicles' : 'parts'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative sm:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <select 
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full bg-brand-charcoal border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-gold/50 appearance-none transition-colors cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card-premium h-[450px] flex flex-col"
              >
                <div className="skeleton h-48 w-full mb-6" />
                <div className="skeleton h-8 w-3/4 mb-4" />
                <div className="skeleton h-4 w-1/2 mb-8" />
                <div className="mt-auto space-y-2">
                  <div className="skeleton h-12 w-full" />
                </div>
              </motion.div>
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card-premium group flex flex-col"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">M² Verified</span>
                  </div>
                  {item.category && (
                    <div className="absolute top-4 left-4 bg-brand-gold px-3 py-1 rounded-full text-brand-black flex items-center gap-1.5">
                      <Tag size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl mb-2 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-3xl font-display font-black text-white mb-6">
                    {formatCurrency(item.price)}
                    <span className="text-xs font-normal text-white/40 ml-2">Total Asset Value</span>
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => onAction(item)}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Get on Financing <ChevronRight size={18} />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                    <Info size={12} /> Structured Monthly Payments Available
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                <Search size={32} className="text-white/20" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-white/40">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                className="mt-8 text-brand-gold font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
