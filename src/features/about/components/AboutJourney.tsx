import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[var(--brand-cream-soft)] py-8 lg:py-10 overflow-hidden">
      
      {/* 🌟 BACKGROUND DECORATIONS (യാതൊരു മാറ്റവും വരുത്താതെ ബാക്ക്ഗ്രൗണ്ടിൽ മാത്രം കൊടുത്തു) 🌟 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        <img 
          src="/shefcap.png" 
          alt="Chef Cap" 
          className="absolute top-[5%] lg:top-[10%] left-[2%] lg:left-[5%] w-[120px] sm:w-[180px] lg:w-[250px] opacity-20 object-contain"
        />
        
        <img 
          src="/plateimage.png" 
          alt="Plate" 
          className="absolute top-[5%] lg:top-[8%] right-[2%] lg:right-[5%] w-[150px] sm:w-[200px] lg:w-[250px] opacity-20 object-contain"
        />

        <img 
          src="/leaf2.png" 
          alt="Leaf Decoration" 
          className="absolute top-[30%] lg:top-[62%] left-[18%] lg:left-[21%] w-[80px] sm:w-[120px] lg:w-[150px] opacity-70 object-contain"
        />

        <img 
          src="/leaf1.png" 
          alt="Leaf Decoration" 
          className="absolute top-[30%] lg:top-[70%] right-[18%] lg:right-[26%] w-[80px] sm:w-[120px] lg:w-[150px] opacity-70 object-contain"
        />

        <img 
          src="/leaf.png" 
          alt="Small Leaf" 
          className="absolute top-[30%] lg:top-[33%] left-[50%] w-[25px] sm:w-[35px] opacity-50 object-contain"
        />
        
      </div>
      {/* 🌟 END OF DECORATIONS 🌟 */}


      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* 📝 TOP TEXT SECTION */}
        <div className="text-center w-full px-4 mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 sm:w-12 h-px bg-[var(--brand-gold)]/50"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em]">
              The Journey
            </span>
            <div className="w-8 sm:w-12 h-px bg-[var(--brand-gold)]/50"></div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[var(--brand-green-dark)] leading-tight mb-3">
            From Family Roots to a<br />Global Vision
          </h1>
          
          <p className="text-[11px] sm:text-[13px] lg:text-[14px] text-gray-500 leading-relaxed font-medium max-w-xl mx-auto px-4">
            What began as a family tradition has grown into a diverse, people-first enterprise with a global outlook.
          </p>
        </div>

        {/* 📸 3D IMAGE GALLERY SECTION (🌟 പഴയ പക്കാ ലേഔട്ട് തിരികെ കൊണ്ടുവന്നു!) */}
        <div className="relative w-full h-[180px] sm:h-[240px] lg:h-[320px] flex items-center justify-center mb-8">
          
          {/* ⬅️ Left Tilted Image (അറ്റത്തേക്ക് ഒട്ടിവെച്ചു) */}
          <div 
            className="absolute left-[-5%] sm:left-[-2%] top-[10%] bottom-[10%] w-[35%] sm:w-[30%] lg:w-[26%] z-10 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
            style={{ 
              transform: "perspective(1000px) rotateY(30deg)", 
              transformOrigin: "right center" 
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" 
              alt="Restaurant Ambience" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/10"></div> 
          </div>

          {/* 🟢 Center Main Image */}
          <div className="relative z-20 w-[55%] sm:w-[45%] lg:w-[38%] h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--brand-gold)] ring-4 ring-[var(--brand-cream-soft)]">
            <img 
              src="/family.png" 
              alt="Family Dining" 
              className="w-full h-full object-cover "
            />
          </div>

          {/* ➡️ Right Tilted Image (അറ്റത്തേക്ക് ഒട്ടിവെച്ചു) */}
          <div 
            className="absolute right-[-5%] sm:right-[-2%] top-[10%] bottom-[10%] w-[35%] sm:w-[30%] lg:w-[26%] z-10 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
            style={{ 
              transform: "perspective(1000px) rotateY(-30deg)", 
              transformOrigin: "left center" 
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80" 
              alt="Delicious Food" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* 🔘 Navigation Arrows */}
          <button className="absolute left-[20%] sm:left-[24%] lg:left-[28%] z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-[var(--brand-gold)] hover:bg-white transition-colors">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button className="absolute right-[20%] sm:right-[24%] lg:right-[28%] z-30 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-[var(--brand-gold)] hover:bg-white transition-colors">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

        {/* 📝 BOTTOM TEXT & DOTS */}
        <div className="flex flex-col items-center justify-center w-full px-4 mt-2">
          {/* 3 Dots */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]/40"></span>
          </div>
          
          {/* Bottom Line & Text */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[400px]">
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400 whitespace-nowrap">
              Good Food Brings People Together
            </span>
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
          </div>
        </div>

      </div>
    </section>
  );
}