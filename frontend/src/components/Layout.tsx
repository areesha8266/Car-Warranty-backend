import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-navy-900 text-gray-100">
      {/* Background Particles/Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-burgundy-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-600/10 rounded-full blur-[150px] pointer-events-none" />

      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 glass mt-auto relative z-10">
        &copy; {new Date().getFullYear()} Luxury Warranty Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
