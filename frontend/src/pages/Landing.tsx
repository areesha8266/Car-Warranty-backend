import { useEffect } from 'react';
import StitchNavbar from '../components/StitchNavbar';
import StitchFooter from '../components/StitchFooter';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    const handleScroll = () => {
        const heroImg = document.getElementById('hero-parallax');
        if (heroImg) {
            const scrollVal = window.pageYOffset;
            if (scrollVal < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrollVal * 0.15}px)`;
            }
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary/30 selection:text-white min-h-screen">
      <StitchNavbar />
      
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img alt="High-end red sports car" className="w-full h-[120%] object-cover opacity-70 absolute top-[-10%]" id="hero-parallax" src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal-on-scroll reveal-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-card ghost-border rounded-full backdrop-blur-3xl bg-surface-variant/40 border border-outline-variant/20 shadow-2xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Coverage Active</span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl text-on-surface leading-[0.9] tracking-tighter">
              Protect Your <br/>
              <span className="text-primary italic">Investment.</span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-md leading-relaxed">
              Elite mechanical stewardship for the world's most refined automotive engineering. Beyond a warranty—a legacy of performance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => navigate('/login')} className="ignition-gradient bg-gradient-to-br from-primary to-[#8B0000] px-8 py-5 rounded-xl font-bold tracking-widest text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                GET INSTANT QUOTE
              </button>
              <button onClick={() => navigate('/coverage')} className="glass-card ghost-border backdrop-blur-xl bg-surface-container/40 px-8 py-5 rounded-xl font-bold tracking-widest text-on-surface hover:bg-surface-bright transition-all border border-outline-variant/30">
                EXPLORE PLANS
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-container-lowest overflow-hidden border-y border-white/5 reveal-on-scroll">
        <div className="max-w-screen-2xl mx-auto px-8 mb-10">
          <h3 className="font-label text-[10px] tracking-[0.5em] text-outline uppercase">Preferred Manufacturers</h3>
        </div>
        <div className="flex overflow-x-auto gap-20 px-8 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 pb-4 no-scrollbar">
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">PORSCHE</span>
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">FERRARI</span>
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">ASTON MARTIN</span>
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">MCLAREN</span>
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">LAMBORGHINI</span>
          <span className="text-4xl font-serif whitespace-nowrap tracking-widest text-on-surface">ROLLS ROYCE</span>
        </div>
      </section>

      <StitchFooter />
    </div>
  );
};

export default Landing;
