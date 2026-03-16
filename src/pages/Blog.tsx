import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'How Asset-Backed Financing is Changing the Game in Jamaica',
    excerpt: 'Traditional loans are becoming harder to get. Discover why asset-backed financing is the smarter choice for your next vehicle.',
    date: 'March 15, 2026',
    author: 'M&M Editorial',
    category: 'Financing',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: '5 Essential Maintenance Tips for the Jamaican Climate',
    excerpt: 'Heat and humidity can take a toll on your engine. Learn how to keep your car running cool and efficient.',
    date: 'March 10, 2026',
    author: 'Master Mechanic',
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'The Future of Electric Vehicles in the Caribbean',
    excerpt: 'Is Jamaica ready for the EV revolution? We explore the infrastructure and the benefits of going electric.',
    date: 'March 5, 2026',
    author: 'Tech Desk',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800'
  }
];

export const Blog = () => {
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
            M&M <span className="text-brand-gold">Insights</span>
          </motion.h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Stay updated with the latest in automotive trends, financing strategies, and maintenance tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium group cursor-pointer overflow-hidden flex flex-col"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-brand-gold px-3 py-1 rounded-full text-brand-black flex items-center gap-1.5">
                  <Tag size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors">{post.title}</h3>
                <p className="text-white/50 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <span className="text-brand-gold text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Full Article <ArrowRight size={16} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
