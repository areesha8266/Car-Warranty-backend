import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Mail, Lock, UserPlus, ShieldCheck } from 'lucide-react';
import StitchNavbar from '../components/StitchNavbar';
import { useRegisterMutation } from '../store/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, role }).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Failed to register', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <StitchNavbar />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass w-full max-w-lg p-10 rounded-[32px] relative z-10 border border-white/5">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-gold-400/10 mb-6">
            <Award className="w-10 h-10 text-gold-400" />
          </div>
          <h2 className="text-4xl font-black heading-gradient tracking-tight">Luxury Membership</h2>
          <p className="text-gray-400 mt-2 font-light">Join the most exclusive warranty program in the world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => setRole('customer')}
              className={`py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                role === 'customer' ? 'bg-gold-500 text-navy-900 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-white/10 text-gray-500 bg-white/5'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Client
            </button>
            <button 
              type="button" 
              onClick={() => setRole('admin')}
              className={`py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                role === 'admin' ? 'bg-gold-500 text-navy-900 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-white/10 text-gray-500 bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Agent
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input type="email" required className="w-full bg-navy-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-gold-500/50 transition-colors" placeholder="Preferred Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input type="password" required className="w-full bg-navy-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-gold-500/50 transition-colors" placeholder="Secure Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              Registration failed. Check your details or try another email.
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-gradient-to-r from-gold-600 to-gold-400 text-navy-900 font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] uppercase tracking-widest disabled:opacity-60"
          >
            {isLoading ? 'Submitting…' : 'Confirm Eligibility'}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 text-sm">
          Already a member? <Link to="/login" className="text-gold-500 font-bold hover:underline">Return to Hub</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
