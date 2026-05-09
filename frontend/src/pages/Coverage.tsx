import { useEffect } from 'react';
import StitchNavbar from '../components/StitchNavbar';
import StitchFooter from '../components/StitchFooter';
import { CheckCircle2, X } from 'lucide-react';

const Coverage = () => {
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

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-on-surface font-body overflow-x-hidden selection:bg-primary/30 selection:text-white min-h-screen">
      <StitchNavbar />
      
      <section className="pt-40 pb-20 px-8 relative">
        <div className="absolute top-0 right-0 w-2/3 h-96 bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>
        <div className="max-w-screen-xl mx-auto space-y-6 relative z-10 text-center reveal-on-scroll">
          <h2 className="font-headline text-5xl md:text-7xl">Coverage Tiers</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-xl italic font-serif">Comprehensive protection engineered for automotive excellence.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card hover:bg-surface-bright/40 transition-all duration-700 rounded-2xl p-10 flex flex-col h-full border border-outline-variant/30 relative overflow-hidden group reveal-on-scroll">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-outline to-transparent opacity-30"></div>
            <div className="mb-8">
              <span className="text-outline uppercase tracking-[0.3em] text-xs font-bold font-label">Tier 01</span>
              <h3 className="font-headline text-4xl mt-2 text-on-surface">Powertrain</h3>
              <p className="text-on-surface-variant mt-4 font-body leading-relaxed">Essential coverage for the beating heart of your vehicle. Engine, transmission, and drive axle components.</p>
            </div>
            <div className="space-y-4 mb-12 flex-grow">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Engine internals</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Transmission assembly</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Drive Axle</span>
              </div>
              <div className="flex items-center gap-4 opacity-30">
                <X className="w-5 h-5" />
                <span className="text-sm">Electrical Systems</span>
              </div>
            </div>
          </div>

          <div className="glass-card hover:bg-surface-bright/40 transition-all duration-700 rounded-2xl p-10 flex flex-col h-full border border-primary/50 relative overflow-hidden group transform hover:-translate-y-4 reveal-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-bold tracking-[0.2em] px-4 py-1 uppercase rounded-bl-xl">Most Popular</div>
            <div className="mb-8">
              <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold font-label">Tier 02</span>
              <h3 className="font-headline text-4xl mt-2 text-on-surface">Gold</h3>
              <p className="text-on-surface-variant mt-4 font-body leading-relaxed">Advanced protection encompassing vital electrical arrays, cooling systems, and comprehensive mechanical components.</p>
            </div>
            <div className="space-y-4 mb-12 flex-grow">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Everything in Powertrain</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Electrical Systems</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Cooling & Climate</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Steering & Suspension</span>
              </div>
            </div>
          </div>

          <div className="glass-card hover:bg-surface-bright/40 transition-all duration-700 rounded-2xl p-10 flex flex-col h-full border border-outline-variant/30 relative overflow-hidden group reveal-on-scroll">
            <div className="mb-8">
              <span className="text-outline uppercase tracking-[0.3em] text-xs font-bold font-label">Tier 03</span>
              <h3 className="font-headline text-4xl mt-2 text-on-surface">Platinum</h3>
              <p className="text-on-surface-variant mt-4 font-body leading-relaxed">The ultimate exclusionary policy. If a component isn't explicitly listed as excluded, it is covered.</p>
            </div>
            <div className="space-y-4 mb-12 flex-grow">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Everything in Gold</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">High-Tech Electronics/Displays</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Turbos & Superchargers</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="text-primary w-5 h-5" />
                <span className="text-on-surface text-sm">Zero Deductible Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StitchFooter />
    </div>
  );
};

export default Coverage;
