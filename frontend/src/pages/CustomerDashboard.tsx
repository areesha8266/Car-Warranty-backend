import { useState } from 'react';
import { useGetProductsQuery, useGetClaimsQuery, useCreateProductMutation, useDeleteProductMutation, useCreateClaimMutation } from '../store/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Shield, Award, Calendar, AlertCircle, X, ChevronRight, Fuel, Zap, Trash2, Loader2 } from 'lucide-react';

const CustomerDashboard = () => {
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({});
  const { data: claims, isLoading: claimsLoading } = useGetClaimsQuery({});
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createClaim] = useCreateClaimMutation();

  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isClaimFormOpen, setClaimFormOpen] = useState(false);

  // Form states
  const [newVehicle, setNewVehicle] = useState({ model: '', serialNo: '', purchaseDate: '' });
  const [newClaim, setNewClaim] = useState({ category: 'Engine', description: '' });

  const CAR_IMAGES: Record<string, string> = {
    'Lamborghini': 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=1200&q=80',
    'Ferrari': 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80',
    'Porsche': 'https://images.unsplash.com/photo-1503376712341-3b7fbdf1d191?w=1200&q=80',
    'Rolls Royce': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80',
    'Bugatti': 'https://images.unsplash.com/photo-1600826955725-b46231bd4b4b?w=1200&q=80',
    'Mercedes': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80',
    'BMW': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80',
    'Audi': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80',
  };

  const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80'
  ];

  const getCarImage = (model: string) => {
    for (const key in CAR_IMAGES) {
      if (model.toLowerCase().includes(key.toLowerCase())) return CAR_IMAGES[key];
    }
    const hash = model.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return DEFAULT_IMAGES[hash % DEFAULT_IMAGES.length];
  };

  const calculateWarranty = (date: string) => {
    const start = new Date(date);
    const expiry = new Date(start.setFullYear(start.getFullYear() + 3));
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return { expiry: expiry.toLocaleDateString(), days, isExpired: days < 0 };
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [year, month, day] = newVehicle.purchaseDate.split('-');
      const warrantyExpiry = `${parseInt(year) + 3}-${month}-${day}`;
      await createProduct({ ...newVehicle, warrantyExpiry }).unwrap();
      setNewVehicle({ model: '', serialNo: '', purchaseDate: '' });
      setVehicleModalOpen(false);
    } catch (error: any) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll vehicle. Check console for details.");
    }
  };

  const handleFileClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClaim({ ...newClaim, productId: selectedProduct.id });
    setNewClaim({ category: 'Engine', description: '' });
    setClaimFormOpen(false);
  };

  const handleDeleteVehicle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this vehicle? This will also delete all associated claims.")) {
      await deleteProduct(id);
      if (selectedProduct?.id === id) setSelectedProduct(null);
    }
  };

  if (productsLoading || claimsLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-end pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight heading-gradient font-serif">The Collection</h1>
          <p className="text-on_surface-variant mt-2 font-light">Manage your elite automotive portfolio</p>
        </div>
        <button 
          onClick={() => setVehicleModalOpen(true)}
          className="bg-primary/10 border border-outline-variant/20 text-primary px-6 py-2.5 rounded-full hover:bg-primary-container hover:text-white transition-all font-bold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Enroll Vehicle
        </button>
      </div>

      {/* Vehicle Grid */}
      <section style={{ perspective: 1200 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {products?.map((p: any) => {
              const { expiry, days, isExpired } = calculateWarranty(p.purchaseDate);
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateX: 45, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="glass group cursor-pointer overflow-hidden transition-all relative"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={getCarImage(p.model)} 
                      alt={p.model} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80" />
                    <button 
                      onClick={(e) => handleDeleteVehicle(p.id, e)}
                      className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold heading-gradient">{p.model}</h3>
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${isExpired ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                        {isExpired ? 'Expired' : 'Active'}
                      </span>
                    </div>
                    <p className="text-on_surface-variant text-xs font-mono uppercase tracking-tighter mb-4">VIN: {p.serialNo}</p>
                    <div className="flex items-center gap-4 text-xs text-on_surface-variant pt-4 border-t border-outline-variant/10">
                      <div className="flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5" /> {expiry}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Claims Management */}
      <section className="pt-8 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-primary w-6 h-6" />
          <h2 className="text-2xl font-bold font-serif text-on_surface">Active Claims</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {claims?.map((c: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, rotateX: 30, y: 20 }} 
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }} 
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              key={c.id} 
              className="glass p-5 rounded-xl flex items-center justify-between border-l-4 border-primary hover:bg-white/5 transition-all shadow-[0_5px_15px_rgba(41,98,255,0.1)]"
            >
              <div>
                <p className="text-primary text-[10px] uppercase font-bold tracking-widest mb-1">{c.appDataDir || 'Engine Unit'}</p>
                <h4 className="font-bold heading-gradient">{c.product?.model}</h4>
                <p className="text-on_surface-variant text-sm mt-1">{c.description.substring(0, 50)}...</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                c.status === 'approved' ? 'border-green-500/50 text-green-400 bg-green-500/5' :
                c.status === 'rejected' ? 'border-red-500/50 text-red-400 bg-red-500/5' :
                'border-primary/50 text-primary bg-primary/5'
              }`}>
                {c.status.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal: Enroll Vehicle (Instant Quote Stitch Version) */}
      <AnimatePresence>
        {isVehicleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVehicleModalOpen(false)} className="absolute inset-0 bg-surface/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 30 }} className="glass relative w-full max-w-6xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[80vh] border border-outline-variant/10">
              
              <div className="md:w-5/12 relative overflow-hidden hidden md:block">
                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80" alt="Side view of premium vehicle" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 p-4 border-l border-primary">
                  <h3 className="font-serif text-3xl font-bold text-on_surface mb-2">Automotive Excellence</h3>
                  <p className="text-on_surface-variant font-mono uppercase tracking-[0.2em] text-xs">Awaiting Identity Validation</p>
                </div>
              </div>

              <div className="md:w-7/12 bg-surface-container relative p-12 overflow-y-auto">
                <button onClick={() => setVehicleModalOpen(false)} className="absolute top-8 right-8 p-3 glass-card rounded-full ghost-border text-on_surface-variant hover:text-white transition-colors duration-300">
                  <X />
                </button>
                
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-[1px] bg-primary"></span>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs font-label">Asset Verification</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold font-serif text-on_surface tracking-tight mb-2">Secure Your Investment</h2>
                <p className="text-on_surface-variant text-lg font-body mb-10 leading-relaxed font-light">Input your vehicle details to calculate instantaneous risk coverage algorithms and warranty tiers.</p>
                
                <form onSubmit={handleAddVehicle} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-on_surface-variant font-label">Manufacturer Name</label>
                      <input required className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on_surface font-body text-lg outline-none focus:border-primary transition-colors focus:shadow-[0_8px_0_-7px_rgba(220,20,60,0.5)] placeholder:text-outline/30" placeholder="e.g. Porsche" value={newVehicle.model} onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-on_surface-variant font-label">Validation ID (VIN)</label>
                      <input required className="w-full bg-transparent border-b border-outline-variant/40 py-3 text-on_surface font-body text-lg outline-none focus:border-primary transition-colors focus:shadow-[0_8px_0_-7px_rgba(220,20,60,0.5)] placeholder:text-outline/30" placeholder="WPOZZZ..." value={newVehicle.serialNo} onChange={(e) => setNewVehicle({...newVehicle, serialNo: e.target.value})} />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-on_surface-variant font-label">Commission Date</label>
                    <input type="date" required className="w-full bg-surface-container-high border border-outline-variant/10 rounded-xl px-5 py-4 text-on_surface font-body outline-none focus:border-primary/50 transition-colors" value={newVehicle.purchaseDate} onChange={(e) => setNewVehicle({...newVehicle, purchaseDate: e.target.value})} />
                  </div>
                  
                  <div className="pt-8 grid grid-cols-1">
                    <button className="ignition-gradient bg-gradient-to-br from-primary to-[#8B0000] w-full py-5 rounded-xl font-bold font-label text-on-primary tracking-[0.2em] text-sm hover:opacity-90 transition-opacity active:scale-[0.98] shadow-[0_10px_30px_rgba(220,20,60,0.2)]">
                      VALIDATE ASSET IDENTITY
                    </button>
                  </div>
                </form>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Vehicle Details & File Claim */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-surface/95 backdrop-blur-xl" />
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="glass relative w-full max-w-4xl rounded-[40px] overflow-hidden border border-outline-variant/10 shadow-[0_0_100px_rgba(41,98,255,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-5 h-full min-h-[500px]">
                <div className="md:col-span-2 relative">
                  <img src={getCarImage(selectedProduct.model)} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface" />
                </div>
                <div className="md:col-span-3 p-10 flex flex-col">
                  <div className="flex justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-extrabold heading-gradient font-serif mb-1">{selectedProduct.model}</h2>
                      <p className="text-primary font-mono tracking-widest uppercase text-sm">Certificate ID: {selectedProduct.serialNo}</p>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="p-2 text-on_surface-variant hover:text-white h-fit"><X className="w-8 h-8" /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="p-4 rounded-2xl bg-surface-variant/30 border border-outline-variant/20">
                      <p className="text-[10px] uppercase font-bold text-on_surface-variant mb-1">Status</p>
                      <div className="flex items-center gap-2 text-primary font-bold"><Zap className="w-4 h-4" /> Comprehensive</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-variant/30 border border-outline-variant/20">
                      <p className="text-[10px] uppercase font-bold text-on_surface-variant mb-1">Coverage</p>
                      <div className="text-on_surface font-bold">Standard 3-Year</div>
                    </div>
                  </div>

                  {!isClaimFormOpen ? (
                    <div className="mt-auto space-y-4">
                      <button onClick={() => setClaimFormOpen(true)} className="w-full py-5 rounded-2xl bg-gradient-premium shadow-[0_10px_20px_rgba(41,98,255,0.2)] text-white font-black tracking-widest uppercase text-xs hover:scale-[1.02] transition-transform">File Protection Claim</button>
                      <p className="text-center text-on_surface-variant text-xs italic">Registration validated on {new Date(selectedProduct.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  ) : (
                    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleFileClaim} className="space-y-6">
                      <h4 className="text-primary italic font-medium">Reporting Defect...</h4>
                      <div>
                        <label className="text-xs font-bold text-on_surface-variant mb-2 block">Category</label>
                        <select className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-4 py-3 outline-none" value={newClaim.category} onChange={(e) => setNewClaim({...newClaim, category: e.target.value})}>
                          <option className="bg-surface">Engine</option>
                          <option className="bg-surface">Body</option>
                          <option className="bg-surface">Electronics</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-on_surface-variant mb-2 block">Issue Description</label>
                        <textarea required rows={4} className="w-full bg-surface-container-high border border-outline-variant/20 rounded-xl px-4 py-3 outline-none resize-none focus:border-primary-container" placeholder="Describe the fault in detail..." value={newClaim.description} onChange={(e) => setNewClaim({...newClaim, description: e.target.value})} />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={() => setClaimFormOpen(false)} className="flex-1 py-4 border border-outline-variant/20 rounded-xl font-bold hover:bg-surface-variant">Cancel</button>
                        <button className="flex-[2] py-4 bg-gradient-premium rounded-xl font-bold hover:opacity-90">Submit to Workshop</button>
                      </div>
                    </motion.form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerDashboard;
