import { useEffect } from 'react';
import StitchNavbar from '../components/StitchNavbar';
import StitchFooter from '../components/StitchFooter';
import { Wrench, ShieldCheck, CreditCard, Headset, Car, Gauge } from 'lucide-react';

const Claims = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left').forEach(el => {
            observer.observe(el);
        });

        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const heroImg = document.querySelector('.parallax-hero') as HTMLElement;
            if (heroImg && !window.CSS.supports('animation-timeline', 'scroll()')) {
                heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
            <style>{`
                .tonal-shift-bottom {
                    background: linear-gradient(to bottom, #1c1b1b, transparent);
                }
                .glass-card {
                    background: rgba(53, 53, 52, 0.4);
                    backdrop-filter: blur(16px);
                }
                .hero-gradient {
                    background: radial-gradient(circle at center, rgba(211, 47, 47, 0.08) 0%, transparent 70%);
                }

                @supports (animation-timeline: view()) {
                    .reveal-up {
                        animation: reveal-up linear forwards;
                        animation-timeline: view();
                        animation-range: entry 10% cover 30%;
                    }
                    .reveal-right {
                        animation: reveal-right linear forwards;
                        animation-timeline: view();
                        animation-range: entry 10% cover 30%;
                    }
                    .reveal-left {
                        animation: reveal-left linear forwards;
                        animation-timeline: view();
                        animation-range: entry 10% cover 30%;
                    }
                    .parallax-hero {
                        animation: parallax-scroll linear forwards;
                        animation-timeline: scroll();
                    }
                }

                @keyframes reveal-up {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes reveal-right {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes reveal-left {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes parallax-scroll {
                    from { transform: translateY(0); }
                    to { transform: translateY(15%); }
                }

                @media (prefers-reduced-motion: no-preference) {
                    .reveal-up:not(.is-visible), .reveal-right:not(.is-visible), .reveal-left:not(.is-visible) {
                        opacity: 0;
                    }
                    .is-visible.reveal-up { animation: reveal-up 0.8s ease-out forwards; }
                    .is-visible.reveal-right { animation: reveal-right 0.8s ease-out forwards; }
                    .is-visible.reveal-left { animation: reveal-left 0.8s ease-out forwards; }
                }
            `}</style>
            
            <StitchNavbar />
            
            <main className="pt-24 min-h-screen">
                {/* Hero Section */}
                <section className="relative px-8 py-20 overflow-hidden hero-gradient">
                    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2 z-10">
                            <span className="text-primary font-label tracking-[0.3em] uppercase text-xs mb-4 block">Engineered for ease</span>
                            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter text-on-surface leading-none mb-8">
                                The Claims <br/><span className="italic text-primary">Process.</span>
                            </h1>
                            <p className="text-on-surface-variant text-xl max-w-md font-light leading-relaxed mb-10">
                                Experience the gold standard of vehicle protection. We handle the technicalities so you can focus on the drive.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(211,47,47,1)]"></div>
                                <span className="text-on-surface text-sm font-semibold tracking-widest uppercase">White-Glove Service Active</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="aspect-square md:aspect-[4/5] lg:aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-outline-variant/10 parallax-hero">
                                <img className="w-full h-full object-cover object-center transition-all duration-700" alt="3D render of luxury vehicle" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Y9xHnPnQhwoZjKuoddyRUZOnY1Bp8veNzXVDn3dqU7lTaPlxpWy2In-bvKulVGWotyIBDii7_fgfDe38MSlIDUxbyyPUsh9mgO5L_2LZ1nwGB40WaG1LKWL5xuf90Vh637fw7rwDxrwEenfm1TuorJheKPbGWUSGjR1crDoNDD2uxc0SGqlQLb8cWZzOyCE6jzqjfqaR0LI6wa2KvIpKjxd_osHvxOR_2MEq471AjnVWwXtiFeMYi0TEL_e7Iu9BvFD3nRDE31s" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-lg border border-outline-variant/20 max-w-xs z-20">
                                <p className="text-primary text-2xl font-serif italic mb-1">Zero Out-of-Pocket</p>
                                <p className="text-on-surface-variant text-xs uppercase tracking-widest">For all covered major components</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Bento Grid */}
                <section className="px-8 py-32 bg-surface-container-low">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="mb-20 text-center">
                            <h2 className="text-4xl font-serif font-light text-on-surface reveal-up">Precision Stewardship</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {/* Step 1 */}
                            <div className="md:col-span-7 bg-surface-container-high rounded-xl p-12 relative overflow-hidden group reveal-right">
                                <div className="absolute top-0 right-0 p-8">
                                    <span className="text-8xl font-serif font-black text-on-surface/5">01</span>
                                </div>
                                <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay group-hover:opacity-20 transition-opacity">
                                    <img className="w-full h-full object-cover" alt="Technical schematic detail" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8WRq3LVSq4WHiEVfrgHOVb0D4PRfG77dFXy0ZXTY23yxFDu-qoVdHc84tlD5eITGw86X_RyQEuZjetLA9Bp-1ecE66z64QhcorkE2PGX-niSxA7M01roTJIOn5diNiYzlJCGVRiKXUPFuhiI36HcRGeX4TrQhO2a-klzWrIll-Yn37FzHLdaxK8KXn_LxV45CtfIbKqO3pI8yFk5Br8qm1OEGuQ-r_0bzP-GmS20xwUp_HI3ouy7-G76JPb9EwEguXSxzI5WNIaA" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 reveal-up">
                                        <Wrench className="text-primary w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-on-surface mb-4 uppercase tracking-tighter">Take to Dealer</h3>
                                    <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                                        Simply bring your vehicle to any licensed ASE-certified facility or authorized dealer across North America. No pre-approvals required for the initial diagnostic.
                                    </p>
                                    <div className="mt-8 flex gap-4">
                                        <div className="bg-surface-container-highest px-4 py-2 rounded-lg border border-outline-variant/10">
                                            <span className="text-xs uppercase tracking-widest font-bold text-primary">Freedom of Choice</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="md:col-span-5 bg-surface-container-highest rounded-xl p-12 relative flex flex-col justify-between overflow-hidden group reveal-left">
                                <div className="absolute -right-20 -bottom-20 w-64 h-64 group-hover:rotate-12 transition-transform duration-1000 reveal-up opacity-40">
                                    <img className="w-full h-full object-contain" alt="Macro 3D render of brake assembly" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWXrCNwmtOKBbPLMgcHXA-Uu43uopF7CUb_kotxpV4Kh-jyr_Qc8Ce-VuDH0ojR68UAngbj93BQa8I63gNq_pRvXhmENT49QORFsSMLNhu8buJ5O8awVCwgPC_RVDektGHvw-4zM0JF5ujJo4VZOW4wqUNaJq_zZR_yn6pqKfGJWcX8TLzQdqNlkI02cENhPwoblR1WzP_pgfU_R9R0HmrPYy35ZEape5OABTZoIw2f6Iq9E25fPkc585gy4cupbj1ayfkksalUOU" />
                                </div>
                                <div className="absolute top-0 right-0 p-8">
                                    <span className="text-8xl font-serif font-black text-on-surface/5">02</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 reveal-up">
                                        <ShieldCheck className="text-primary w-8 h-8" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-on-surface mb-4 uppercase tracking-tighter">Expert Review</h3>
                                    <p className="text-on-surface-variant text-lg leading-relaxed">
                                        Our Master Technicians review the dealership's findings directly. We speak the language of mechanics to ensure your vehicle gets exactly what it needs.
                                    </p>
                                </div>
                                <div className="mt-8 relative z-10">
                                    <div className="h-[2px] w-full bg-outline-variant/20 relative">
                                        <div className="absolute top-0 left-0 h-full w-1/2 bg-primary"></div>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] mt-4 text-on-surface-variant">Real-time status tracking available</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="md:col-span-12 bg-gradient-to-br from-primary-container to-surface-container-highest rounded-xl p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative group reveal-up">
                                <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                                <div className="absolute inset-y-0 right-0 w-1/2 opacity-20 pointer-events-none overflow-hidden hidden md:block">
                                    <img className="h-full w-full object-cover scale-150 origin-right transition-transform duration-[3000ms] group-hover:scale-110" alt="Dynamic 3D perspective of luxury car side profile" loading="lazy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-1R3z0uogrSacfz2f4exPNS4f5cJP2vpmND2wMtfJCZTLoAkSstY2ICFF84zq2KxGtRgma1lGvM8LL8tafFkfBMz90eC0pd8s-7A-MzXLKOnGWHYarUy3Fk0GQIsYSPRDJlzwvTiyIFXm4tjA95GyIuxy-DJbzEH1uJD-IJOaZNTvk7Hhxm0MqNIDuYzkJIl9_jnP9Up7neqQW5GGwcvmX5UU6vQb3jDdFZqy91xSBCKWSZ6Am-GMjOlJe9img6h84X6ei2h3Boo" />
                                </div>
                                <div className="md:w-3/5 z-10">
                                    <span className="text-8xl font-serif font-black text-white/5 absolute -top-4 -left-4">03</span>
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 reveal-up">
                                        <CreditCard className="text-on-primary-container w-10 h-10" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-serif font-black text-on-primary-container mb-6 uppercase tracking-tighter">Direct Payment</h3>
                                    <p className="text-on-primary-container/80 text-xl leading-relaxed max-w-2xl">
                                        We settle the bill directly with the repair facility via corporate credit card. No reimbursement forms, no waiting for checks in the mail. You simply sign and drive.
                                    </p>
                                </div>
                                <div className="md:w-2/5 flex flex-col items-end gap-6 z-10">
                                    <div className="glass-card p-8 rounded-xl w-full border border-white/10 shadow-2xl reveal-left">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs uppercase tracking-widest text-on-primary-container/60">Service Level</span>
                                            <span className="text-sm font-bold text-on-primary-container">PREMIUM PLATINUM</span>
                                        </div>
                                        <div className="text-4xl font-serif font-bold text-on-primary-container">$0.00</div>
                                        <div className="text-xs uppercase tracking-widest text-on-primary-container/60">Total Member Liability</div>
                                    </div>
                                    <button className="bg-on-surface text-background px-10 py-4 rounded-lg font-black tracking-widest text-xs uppercase hover:bg-primary hover:text-white transition-all w-full md:w-auto reveal-up">
                                        VIEW COVERAGE DETAILS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative py-32 px-8 overflow-hidden bg-surface">
                    <div className="max-w-screen-lg mx-auto text-center relative z-10">
                        <h2 className="text-5xl md:text-7xl font-serif italic text-on-surface mb-12 reveal-up">Luxury is in <br/>the lack of friction.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
                            <div className="flex flex-col items-center reveal-up" style={{transitionDelay: '100ms'}}>
                                <Headset className="text-primary w-12 h-12 mb-6" />
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4">Personal Steward</h4>
                                <p className="text-on-surface-variant text-sm font-light">Every claim is assigned a dedicated automotive expert to manage the process.</p>
                            </div>
                            <div className="flex flex-col items-center reveal-up" style={{transitionDelay: '300ms'}}>
                                <Car className="text-primary w-12 h-12 mb-6" />
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4">Elite Mobility</h4>
                                <p className="text-on-surface-variant text-sm font-light">Premium rental vehicle provided immediately upon diagnostic confirmation.</p>
                            </div>
                            <div className="flex flex-col items-center reveal-up" style={{transitionDelay: '500ms'}}>
                                <Gauge className="text-primary w-12 h-12 mb-6" />
                                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4">Rapid Approval</h4>
                                <p className="text-on-surface-variant text-sm font-light">85% of claims are authorized within 2 hours of technical review.</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
                        <span className="text-[40vw] font-serif font-black tracking-tighter text-on-surface-variant/10 absolute">VAULT</span>
                        <div className="absolute w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -bottom-1/2 left-1/2 -translate-x-1/2"></div>
                    </div>
                </section>
            </main>
            <StitchFooter />
        </div>
    );
};

export default Claims;
