import { useState } from 'react';
import { useLoginMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import { Loader2, Car, Shield } from 'lucide-react';
import StitchNavbar from '../components/StitchNavbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 3D Scroll setup
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(smoothY, [0, 1], [0, 15]);
  const scale = useTransform(smoothY, [0, 1], [1, 0.95]);
  const yBg = useTransform(smoothY, [0, 1], [0, -200]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="h-[120vh] relative bg-surface-container-lowest px-4">
      <StitchNavbar />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden w-full">
        {/* Animated 3D Parallax Background */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 rounded-full blur-[150px]" />
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </motion.div>

        <motion.div 
          style={{ rotateX, scale, perspective: 1000 }}
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="glass p-8 shadow-[0_20px_50px_rgba(41,98,255,0.05)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4 animate-glow shadow-[0_0_15px_rgba(41,98,255,0.4)] border border-outline-variant/20">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold heading-gradient font-serif">Prestige Portal</h1>
              <p className="text-on_surface-variant mt-2 font-sans tracking-wide">Enter the Luxury Warranty Hub</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 form-sans">
              <div>
                <label className="block text-sm font-medium text-on_surface-variant mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 text-on_surface rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-container/50 focus:border-transparent transition-all shadow-inner relative z-20"
                  placeholder="admin@luxury.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on_surface-variant mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 text-on_surface rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-container/50 focus:border-transparent transition-all shadow-inner relative z-20"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-white text-sm text-center bg-red-900/40 py-2 rounded-lg border border-red-500/20">
                  Invalid credentials. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-premium text-white font-bold py-3 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(41,98,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors duration-300" />
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin relative z-10" /> : <span className="relative z-10">Access Vault</span>}
              </button>
            </form>

            <p className="text-center mt-6 text-on_surface-variant text-sm">
              New collector? <Link to="/register" className="text-primary hover:text-primary-container transition-colors hover:underline">Apply for Membership</Link>
            </p>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Login;
