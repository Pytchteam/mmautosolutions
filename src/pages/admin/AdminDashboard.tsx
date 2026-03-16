import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Car, 
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

const AdminLayout = ({ children, activeTab, setActiveTab }: { children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'inventory-cars', name: 'Vehicles', icon: <Car size={20} /> },
    { id: 'inventory-parts', name: 'Parts & Upgrades', icon: <Package size={20} /> },
    { id: 'applications', name: 'Applications', icon: <FileText size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-brand-charcoal/30 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gold-gradient rounded-lg flex items-center justify-center text-brand-black">
              <Car size={18} />
            </div>
            <span className="font-display font-black tracking-tighter">M&M ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/10" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-brand-black/50 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-gold/50"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
              AD
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const Overview = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Total Revenue', value: '$12.4M', change: '+12%', icon: <LayoutDashboard className="text-brand-gold" /> },
        { label: 'Active Applications', value: '48', change: '+5', icon: <FileText className="text-blue-400" /> },
        { label: 'Vehicles in Stock', value: '24', change: '-2', icon: <Car className="text-green-400" /> },
        { label: 'Parts Inventory', value: '156', change: '+14', icon: <Package className="text-purple-400" /> },
      ].map((stat, i) => (
        <div key={i} className="card-premium p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">{stat.icon}</div>
            <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{stat.change}</span>
          </div>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
          <p className="text-3xl font-display font-black">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="card-premium p-6">
        <h3 className="text-lg font-bold mb-6">Recent Applications</h3>
        <div className="space-y-4">
          {[
            { name: 'Ricardo Thompson', asset: '2022 Toyota RAV4', status: 'pending', date: '2h ago' },
            { name: 'Sarah Williams', asset: 'Michelin Tyres (Set)', status: 'approved', date: '5h ago' },
            { name: 'Michael Chen', asset: '2021 Honda CR-V', status: 'reviewing', date: '1d ago' },
          ].map((app, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-xs">
                  {app.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold">{app.name}</p>
                  <p className="text-[10px] text-white/40">{app.asset}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                  app.status === 'approved' ? "bg-green-400/10 text-green-400" : 
                  app.status === 'pending' ? "bg-brand-gold/10 text-brand-gold" : "bg-blue-400/10 text-blue-400"
                )}>
                  {app.status}
                </span>
                <p className="text-[10px] text-white/20 mt-1">{app.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-premium p-6">
        <h3 className="text-lg font-bold mb-6">Inventory Status</h3>
        <div className="space-y-6">
          {[
            { label: 'Vehicles', total: 24, available: 18, color: 'bg-brand-gold' },
            { label: 'Parts', total: 156, available: 142, color: 'bg-blue-400' },
            { label: 'Accessories', total: 84, available: 76, color: 'bg-green-400' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold">{item.label}</span>
                <span className="text-white/40">{item.available} / {item.total} Available</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.available / item.total) * 100}%` }}
                  className={cn("h-full", item.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'inventory-cars' && (
        <div className="card-premium p-8 text-center">
          <Car size={48} className="mx-auto mb-4 text-brand-gold opacity-20" />
          <h2 className="text-2xl font-bold mb-2">Vehicle Management</h2>
          <p className="text-white/40 mb-8">Add, edit, or remove vehicles from the public marketplace.</p>
          <button className="btn-primary inline-flex items-center gap-2">
            <Plus size={18} /> Add New Vehicle
          </button>
        </div>
      )}
      {activeTab === 'inventory-parts' && (
        <div className="card-premium p-8 text-center">
          <Package size={48} className="mx-auto mb-4 text-brand-gold opacity-20" />
          <h2 className="text-2xl font-bold mb-2">Parts & Upgrades</h2>
          <p className="text-white/40 mb-8">Manage your inventory of parts, tyres, and batteries.</p>
          <button className="btn-primary inline-flex items-center gap-2">
            <Plus size={18} /> Add New Part
          </button>
        </div>
      )}
      {activeTab === 'applications' && (
        <div className="card-premium p-8 text-center">
          <FileText size={48} className="mx-auto mb-4 text-brand-gold opacity-20" />
          <h2 className="text-2xl font-bold mb-2">Financing Applications</h2>
          <p className="text-white/40 mb-8">Review and process customer financing requests.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20">
              <p className="text-2xl font-bold text-brand-gold">12</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Pending</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/20">
              <p className="text-2xl font-bold text-blue-400">8</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">In Review</p>
            </div>
            <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/20">
              <p className="text-2xl font-bold text-green-400">28</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Approved</p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="card-premium p-8">
          <h2 className="text-2xl font-bold mb-8">Portal Settings</h2>
          <div className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Admin Email</label>
              <input type="email" defaultValue="admin@mm-auto.solutions" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Notification Preferences</label>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-gold" />
                <span className="text-sm">Email alerts for new applications</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
