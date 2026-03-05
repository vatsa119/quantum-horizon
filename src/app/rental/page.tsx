import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <main className="min-h-screen pt-32 px-6 bg-white overflow-hidden relative">
      <Navbar />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-black tracking-[0.3em] text-[#EE3124] uppercase bg-red-50 rounded-lg border border-red-100 italic">
          High-Precision Protocol: Active
        </div>
        <h1 className="text-6xl font-black text-[#1E293B] uppercase tracking-tighter mb-8 font-montserrat">
          rental <span className="text-[#FFCC00]">.</span>
        </h1>
        
        <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#FFCC00] rounded-2xl mb-6 flex items-center justify-center shadow-[0_8px_20px_rgba(255,204,0,0.3)] animate-bounce">
            <svg className="w-8 h-8 text-[#1E293B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#1E293B] uppercase mb-4 tracking-tight">Engineering Under Construction</h2>
          <p className="text-slate-500 max-w-md font-medium">This section is currently undergoing thermal optimization and architectural hardening. Sigma technical teams are on-site.</p>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0099CC]/5 blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EE3124]/5 blur-[120px] -z-0" />
    </main>
  );
}
