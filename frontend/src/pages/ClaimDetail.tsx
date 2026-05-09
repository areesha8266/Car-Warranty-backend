import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetClaimByIdQuery, useUpdateClaimMutation, useDeleteClaimMutation } from '../store/api';
import { motion } from 'framer-motion';
import { Loader2, ChevronLeft, Trash2, Edit2, Check, X } from 'lucide-react';

const ClaimDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: claim, isLoading } = useGetClaimByIdQuery(id);
  const [updateClaim] = useUpdateClaimMutation();
  const [deleteClaim] = useDeleteClaimMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ category: '', description: '' });

  const startEdit = () => {
    setEditForm({ category: claim.category, description: claim.description });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    await updateClaim({ id, ...editForm });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Permanently delete this claim?")) {
      await deleteClaim(id);
      navigate('/dashboard');
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-gold-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-gold-500 mb-8 font-bold transition-colors">
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-gold-500 mb-2 block">Premium Claim ID</span>
            <h1 className="text-3xl font-extrabold text-white font-mono break-all">{claim.id}</h1>
          </div>
          <div className="flex gap-4">
            {claim.status === 'submitted' && (
              <button 
                onClick={isEditing ? handleUpdate : startEdit}
                className="p-3 bg-white/5 rounded-xl hover:bg-gold-500 hover:text-navy-900 transition-all text-gray-300"
              >
                {isEditing ? <Check className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              </button>
            )}
            <button 
              onClick={handleDelete}
              className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Unit Identity</h3>
              <div className="p-5 rounded-2xl bg-navy-900/50 border border-white/5">
                <p className="text-xl font-bold text-gray-200">{claim.product?.model}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">VIN: {claim.product?.serialNo}</p>
              </div>
            </section>
            
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Current Status</h3>
              <div className={`inline-block px-6 py-2 rounded-full font-bold border ${
                claim.status === 'approved' ? 'border-green-500 text-green-400' : 'border-gold-500 text-gold-400'
              }`}>
                {claim.status.toUpperCase()}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Incident Details</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <select className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3" value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value})}>
                    <option>Engine</option>
                    <option>Body</option>
                    <option>Electronics</option>
                  </select>
                  <textarea rows={5} className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3 resize-none" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 text-sm">
                    <span className="text-gold-500 font-bold block mb-1">Fault Area:</span>
                    {claim.category}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 text-sm leading-relaxed text-gray-300">
                    <span className="text-gold-500 font-bold block mb-1">Description:</span>
                    {claim.description}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClaimDetail;
