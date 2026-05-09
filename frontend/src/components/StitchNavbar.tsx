import { Link, useNavigate, useLocation } from 'react-router-dom';

const StitchNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Desktop link styles
  const baseDesktopClass = "uppercase tracking-tighter text-sm transition-all duration-500";
  const activeDesktopClass = `${baseDesktopClass} text-[#D32F2F] font-serif border-b-2 border-[#D32F2F] pb-1`;
  const inactiveDesktopClass = `${baseDesktopClass} text-[#c3c5d8] font-sans hover:text-[#FFF2F0]`;

  // Drawer link styles
  const baseDrawerClass = "px-6 py-4 font-serif text-2xl uppercase tracking-widest flex items-center gap-4 transition-colors";
  const activeDrawerClass = `${baseDrawerClass} bg-gradient-to-r from-[#D32F2F]/10 to-transparent text-[#FFF2F0] border-l-4 border-[#D32F2F]`;
  const inactiveDrawerClass = `${baseDrawerClass} text-[#C3C5D8] hover:bg-[#1C1B1B] hover:text-[#D32F2F]`;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(211,47,47,0.05)] bg-gradient-to-b from-[#1C1B1B] to-transparent transition-all duration-500">
        <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#D32F2F] cursor-pointer" data-icon="menu" onClick={() => document.getElementById('drawer')?.classList.remove('translate-x-full')}>menu</span>
            <span className="text-2xl font-serif font-bold text-[#E5E2E1] tracking-widest uppercase">VAULT</span>
          </div>
          <div className="hidden md:flex gap-12 items-center">
            <Link to="/" className={isActive('/') ? activeDesktopClass : inactiveDesktopClass}>Home</Link>
            <Link to="/coverage" className={isActive('/coverage') ? activeDesktopClass : inactiveDesktopClass}>Coverage</Link>
            <Link to="/claims" className={isActive('/claims') ? activeDesktopClass : inactiveDesktopClass}>Claims</Link>
            <Link to="/dashboard" className={isActive('/dashboard') ? activeDesktopClass : inactiveDesktopClass}>Dashboard</Link>
          </div>
          <button onClick={() => navigate('/login')} className="bg-[#D32F2F] text-[#ffffff] px-6 py-2 rounded-lg font-serif tracking-tighter uppercase scale-95 active:opacity-80 transition-transform text-xs">
            GET QUOTE
          </button>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D32F2F]/20 to-transparent"></div>
      </nav>

      {/* Navigation Drawer */}
      <div id="drawer" className="fixed right-0 h-full w-80 z-[60] bg-[#131313]/98 backdrop-blur-3xl shadow-[-40px_0_80px_rgba(0,0,0,0.9)] flex flex-col pt-16 border-l border-white/5 transform translate-x-full transition-transform duration-500 ease-in-out">
        <div className="px-8 flex justify-between items-center mb-12">
          <span className="text-3xl font-serif font-black text-[#D32F2F] uppercase">THE VAULT</span>
          <span className="material-symbols-outlined text-on-surface cursor-pointer" data-icon="close" onClick={() => document.getElementById('drawer')?.classList.add('translate-x-full')}>close</span>
        </div>
        <nav className="flex flex-col h-full">
          <Link to="/" className={isActive('/') ? activeDrawerClass : inactiveDrawerClass}>
            <span className="material-symbols-outlined" data-icon="home">home</span> Home
          </Link>
          <Link to="/coverage" className={isActive('/coverage') ? activeDrawerClass : inactiveDrawerClass}>
            <span className="material-symbols-outlined" data-icon="shield">shield</span> Coverage
          </Link>
          <Link to="/claims" className={isActive('/claims') ? activeDrawerClass : inactiveDrawerClass}>
            <span className="material-symbols-outlined" data-icon="gavel">gavel</span> Claims
          </Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? activeDrawerClass : inactiveDrawerClass}>
            <span className="material-symbols-outlined" data-icon="verified_user">verified_user</span> Dashboard
          </Link>
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? activeDrawerClass : inactiveDrawerClass}>
            <span className="material-symbols-outlined" data-icon="security">security</span> Admin
          </Link>
        </nav>
      </div>
    </>
  );
};

export default StitchNavbar;
