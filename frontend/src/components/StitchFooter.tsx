const StitchFooter = () => {
  return (
    <footer className="bg-[#0E0E0E] relative w-full py-16 px-8 border-t border-[#D32F2F]/20">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="font-serif italic text-lg text-[#e5e2e1] tracking-widest">VAULT</span>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-light text-[#c3c5d8] max-w-md">
            © 2024 VAULT AUTOMOTIVE STEWARDSHIP. ENGINEERED FOR EXCELLENCE.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-start md:justify-end">
          <a className="font-mono text-[10px] tracking-[0.3em] uppercase font-light text-[#c3c5d8] hover:text-[#FFF2F0] hover:translate-x-2 transition-transform duration-500" href="#">Coverage Plans</a>
          <a className="font-mono text-[10px] tracking-[0.3em] uppercase font-light text-[#c3c5d8] hover:text-[#FFF2F0] hover:translate-x-2 transition-transform duration-500" href="#">Claims Portal</a>
          <a className="font-mono text-[10px] tracking-[0.3em] uppercase font-light text-[#c3c5d8] hover:text-[#FFF2F0] hover:translate-x-2 transition-transform duration-500" href="#">Privacy Vault</a>
          <a className="font-mono text-[10px] tracking-[0.3em] uppercase font-light text-[#c3c5d8] hover:text-[#FFF2F0] hover:translate-x-2 transition-transform duration-500" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default StitchFooter;
