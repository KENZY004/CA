import React, { useState, useEffect } from 'react';
import { 
  Save, RefreshCcw, Plus, Trash2, ArrowLeft, BarChart3, Settings, Eye, 
  LayoutDashboard, Image as ImageIcon, Users, TrendingUp, Search, 
  ExternalLink, CheckCircle2, Clock, Filter, Trash, LogOut
} from 'lucide-react';
import { usePerformance } from './PerformanceContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ASSETS } from './assets/images';

type MediaItem = {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  description?: string;
  date: string;
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'media' | 'analytics' | 'settings'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [newMedia, setNewMedia] = useState({ title: '', url: '', type: 'image', description: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('challengers_auth');
    if (!auth) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const fetchData = async () => {
    // Load gallery from localStorage (works without a backend)
    const savedGallery = localStorage.getItem('challengers_gallery');
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    }

    try {
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': 'Bearer admin123' }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setLeads(data.leads);
        // Only override gallery if API returns items and localStorage is empty
        if (data.gallery?.length && !savedGallery) {
          setGalleryItems(data.gallery);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    // Build new item
    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      url: newMedia.url,
      type: newMedia.type as 'image' | 'video',
      title: newMedia.title,
      description: newMedia.description,
      date: new Date().toISOString(),
    };

    // Save to localStorage so Gallery page reads it immediately
    const updated = [newItem, ...galleryItems];
    localStorage.setItem('challengers_gallery', JSON.stringify(updated));
    setGalleryItems(updated);
    setIsAddingMedia(false);
    setNewMedia({ title: '', url: '', type: 'image', description: '' });

    // Also try the API (if backend is available)
    try {
      await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer admin123' },
        body: JSON.stringify(newMedia)
      });
    } catch {
      // API not available — localStorage save is sufficient
    }
  };

  const handleDeleteMedia = async (id: string) => {
    // Remove from localStorage so Gallery page updates immediately
    const updated = galleryItems.filter(i => i.id !== id);
    localStorage.setItem('challengers_gallery', JSON.stringify(updated));
    setGalleryItems(updated);

    // Also try the API (if backend is available)
    try {
      await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer admin123' }
      });
    } catch {
      // API not available — localStorage delete is sufficient
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to remove this lead?')) return;
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin123'
        }
      });
      const data = await response.json();
      if (data.success) {
        setLeads(leads.filter(l => l.id !== id));
        if (stats) {
          setStats({ ...stats, totalLeads: stats.totalLeads - 1 });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('challengers_auth');
    navigate('/login');
  };

  if (!isAuthenticated || isLoading) return (
    <div className="min-h-screen bg-sand/30 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-sand/30 font-sans">
      {/* Admin Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 md:w-64 bg-espresso text-white z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center font-black">C</div>
          <span className="hidden md:block font-condensed font-black tracking-tighter text-2xl uppercase">Admin</span>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'leads', icon: Users, label: 'Leads' },
            { id: 'media', icon: ImageIcon, label: 'Media Library' },
            { id: 'analytics', icon: TrendingUp, label: 'Performance' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                activeTab === item.id ? 'bg-orange text-white shadow-lg shadow-orange/20' : 'text-white/40 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-white/40 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Logout</span>
          </button>
          <NavLink to="/" className="flex items-center gap-4 px-4 py-4 text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Back to Site</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 pt-8 pr-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-condensed font-black text-espresso uppercase tracking-tighter">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'leads' && 'Athlete Leads'}
                {activeTab === 'media' && 'Media Assets'}
                {activeTab === 'analytics' && 'Training Analytics'}
                {activeTab === 'settings' && 'App Settings'}
              </h2>
              <p className="text-espresso/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Academy Management System v1.0.4</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white p-2 rounded-2xl border border-espresso/5 flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center text-espresso/40 hover:text-orange transition-colors">
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-espresso/5 self-center" />
                <button className="px-6 h-10 bg-espresso text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange transition-all">
                  Sync Data
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'leads' && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[3rem] border border-espresso/5 shadow-xl overflow-hidden"
              >
                <div className="p-10 border-b border-espresso/5 flex justify-between items-center bg-sand/10">
                  <div>
                    <h3 className="text-xl font-condensed font-black uppercase text-espresso">Registration Leads</h3>
                    <p className="text-espresso/40 text-[10px] font-black uppercase tracking-widest mt-1">Manage new inquiries and confirmed athletes</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-sand/5 text-[10px] font-black uppercase tracking-widest text-espresso/40 border-b border-espresso/5">
                        <th className="px-10 py-6">Athlete</th>
                        <th className="px-6 py-6">Program</th>
                        <th className="px-6 py-6">Status</th>
                        <th className="px-6 py-6">Date</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-espresso/5">
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-10 py-20 text-center text-espresso/40 italic">No leads found yet.</td>
                        </tr>
                      ) : leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-sand/5 transition-colors group">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange font-bold">
                                {lead.studentName?.charAt(0) || lead.fullName?.charAt(0) || '?'}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-espresso">{lead.studentName || lead.fullName}</div>
                                <div className="text-[10px] text-espresso/40 uppercase font-black">{lead.primaryEmail || lead.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-sm font-medium text-espresso/60">
                            {lead.programId}
                          </td>
                          <td className="px-6 py-6">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                              lead.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 text-xs text-espresso/40">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-10 py-6 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-espresso/20 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Leads', value: stats?.totalLeads || 0, change: '+12%', icon: Users, color: 'orange' },
                    { label: 'Confirmed Athletes', value: stats?.totalConfirmed || 0, change: 'Stable', icon: CheckCircle2, color: 'yellow' },
                    { label: 'Revenue (Mock)', value: `$${(stats?.totalConfirmed || 0) * 350}`, change: '+8.4%', icon: BarChart3, color: 'espresso' },
                    { label: 'Recent Growth', value: stats?.trends?.[6]?.count || 0, change: 'Last 24h', icon: Clock, color: 'orange' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-espresso/5 shadow-xl shadow-espresso/5">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-${stat.color === 'orange' ? 'orange' : stat.color === 'yellow' ? 'yellow' : 'espresso'} text-white`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                      </div>
                      <div className="text-3xl font-condensed font-black text-espresso mb-1">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-espresso/40">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Main Activity Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-espresso/5 shadow-xl">
                    <div className="flex justify-between items-center mb-10">
                      <h3 className="text-xl font-condensed font-black uppercase text-espresso">Registration Trends</h3>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-[10px] font-black uppercase bg-sand rounded-xl">7 Days</button>
                        <button className="px-4 py-2 text-[10px] font-black uppercase bg-espresso text-white rounded-xl">30 Days</button>
                      </div>
                    </div>
                    <div className="h-64 w-full bg-sand/20 rounded-[2rem] flex items-end justify-between p-8 gap-4">
                      {(stats?.trends || Array.from({ length: 7 }).map((_, i) => ({ count: Math.random() * 10 }))).map((t: any, i: number) => (
                        <div 
                          key={i} 
                          title={`${t.date || 'Day'}: ${t.count} registrations`}
                          className="w-full bg-orange/40 rounded-t-lg hover:bg-orange transition-all cursor-help"
                          style={{ height: `${Math.min(100, (t.count / 10) * 100 + 5)}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[3rem] border border-espresso/5 shadow-xl">
                    <h3 className="text-xl font-condensed font-black uppercase text-espresso mb-10">Recent Logins</h3>
                    <div className="space-y-6">
                      {[1,2,3,4,5].map((u) => (
                        <div key={u} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-sand overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u}`} alt="User" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-espresso">Athlete #{u*123}</div>
                            <div className="text-[9px] text-espresso/40 uppercase font-black">Logged in 2m ago</div>
                          </div>
                          <button className="p-2 hover:text-orange"><Eye className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'media' && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-condensed font-black text-espresso uppercase">Media Library</h3>
                  <button 
                    onClick={() => setIsAddingMedia(true)}
                    className="bg-espresso text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-orange transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Asset
                  </button>
                </div>

                {isAddingMedia && (
                  <div className="bg-white p-8 rounded-[2.5rem] border-2 border-orange/20 shadow-xl mb-8">
                    <form onSubmit={handleAddMedia} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Title</label>
                        <input 
                          required
                          value={newMedia.title}
                          onChange={e => setNewMedia({...newMedia, title: e.target.value})}
                          className="w-full bg-ivory border-0 rounded-xl px-4 py-3 text-sm font-medium" 
                          placeholder="e.g. Summer Camp 2026"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Type</label>
                        <select 
                          value={newMedia.type}
                          onChange={e => setNewMedia({...newMedia, type: e.target.value})}
                          className="w-full bg-ivory border-0 rounded-xl px-4 py-3 text-sm font-medium"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Resource URL</label>
                        <input 
                          required
                          value={newMedia.url}
                          onChange={e => setNewMedia({...newMedia, url: e.target.value})}
                          className="w-full bg-ivory border-0 rounded-xl px-4 py-3 text-sm font-medium"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-espresso/40">Description</label>
                        <textarea 
                          value={newMedia.description}
                          onChange={e => setNewMedia({...newMedia, description: e.target.value})}
                          className="w-full bg-ivory border-0 rounded-xl px-4 py-3 text-sm font-medium h-24"
                        />
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-4">
                        <button type="button" onClick={() => setIsAddingMedia(false)} className="text-[10px] font-black uppercase text-espresso/40">Cancel</button>
                        <button type="submit" className="bg-orange text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Upload Asset</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="group relative bg-white rounded-[2rem] overflow-hidden border border-espresso/5 shadow-lg">
                      <div className="aspect-square bg-sand relative">
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-espresso">
                            <ImageIcon className="w-8 h-8 text-white/20" />
                          </div>
                        ) : (
                          <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        )}
                        <button 
                          onClick={() => handleDeleteMedia(item.id)}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-espresso hover:text-orange transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-espresso mb-1 text-sm">{item.title}</h4>
                        <p className="text-[10px] text-espresso/40 font-medium uppercase tracking-widest">{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
