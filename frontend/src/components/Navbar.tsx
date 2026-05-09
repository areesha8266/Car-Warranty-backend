import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { LogOut, Shield, ChevronRight, Menu } from 'lucide-react';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (route: string) => location.pathname === route;
  const baseLinkClass = "uppercase tracking-[0.15em] text-xs font-light transition-all pb-1";
  const activeLinkClass = "text-[#dc143c] border-b border-[#dc143c]";
  const inactiveLinkClass = "text-on_surface-variant hover:text-white border-b border-transparent";

  return (
    <nav className="glass border-b-0 !! sticky top-0 z-50 rounded-none bg-surface/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <svg viewBox="0 0 100 100" className="w-10 h-10 text-primary-container animate-glow">
              <path fill="currentColor" d="M50 5 L58 40 L95 40 L65 60 L75 95 L50 75 L25 95 L35 60 L5 40 L42 40 Z" />
            </svg>
            <div className="absolute inset-0 bg-primary blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>
          <span className="text-xl font-bold heading-gradient tracking-tighter uppercase font-serif">Prestige</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`${baseLinkClass} ${isActive('/') ? activeLinkClass : inactiveLinkClass}`}>Home</Link>
          <Link to="/coverage" className={`${baseLinkClass} ${isActive('/coverage') ? activeLinkClass : inactiveLinkClass}`}>Coverage</Link>
          <Link to="/claims" className={`${baseLinkClass} ${isActive('/claims') ? activeLinkClass : inactiveLinkClass}`}>Claims</Link>
          {user && (
            <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className={`${baseLinkClass} ${isActive('/dashboard') || isActive('/admin/dashboard') ? activeLinkClass : inactiveLinkClass}`}>
              Dashboard
            </Link>
          )}
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-on_surface-variant">
            {user?.role === 'admin' ? (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold border border-outline-variant/30 uppercase tracking-widest">Administrator</span>
            ) : (
              <span className="bg-surface-variant text-on_surface px-3 py-1 rounded-full text-[10px] font-bold border border-outline-variant/30 uppercase tracking-widest">VIP Client</span>
            )}
            <span className="text-on_surface">{user?.email}</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-bold group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
