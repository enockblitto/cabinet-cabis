import React, { useEffect, useState } from 'react';
import { assetUrl } from '../utils/assets';

import { 
  Menu, X, Phone, ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/cabisData';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Ombre + barre de progression de lecture
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const navItems = [
    { id: 'home', label: 'ACCUEIL' },
    { id: 'about', label: 'À PROPOS' },
    { id: 'activities', label: 'NOS SERVICES' },
    { id: 'projects', label: 'RÉFÉRENCES' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl transition-all duration-500 ${scrolled ? 'bg-[#232A31]/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)]' : 'bg-[#2B333B]/85'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo fourni par Cabinet CABIS */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex shrink-0 items-center text-left focus:outline-none cursor-pointer"
            aria-label="Cabinet CABIS Accueil"
          >
            <span className="relative flex h-[30px] w-[112px] items-center justify-center overflow-hidden border border-[#31899B]/60 bg-[#F8FAFC] px-1 shadow-[0_4px_14px_-8px_rgba(0,0,0,0.7)] lg:h-[42px] lg:w-[154px] lg:px-2">
              <img
                src={assetUrl('/images/logo-header.webp')}
                alt="Cabinet CABIS — Ingénieur conseil"
                className="h-6 w-full object-contain lg:h-9"
                width="500"
                height="190"
                decoding="async"
              />
            </span>
          </button>

          {/* Navigation Links in 100% French */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative cursor-pointer py-3 text-xs font-black uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A4D]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#232A31] ${
                    isActive ? 'text-[#FF8A4D]' : 'text-white/90 hover:text-[#FF8A4D]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-1 h-px origin-center bg-gradient-to-r from-transparent via-[#FF8A4D] to-transparent transition-[opacity,transform] duration-300 ease-out ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-1 h-px origin-center bg-gradient-to-r from-transparent via-[#FF8A4D] to-transparent transition-[opacity,transform] duration-300 ease-out ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => handleNavClick('contacts')}
              className="buildrite-btn-primary h-[42px] w-[154px] gap-2 p-0"
            >
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-white" strokeWidth={2.5} />
              <span>CONTACTS</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => handleNavClick('contacts')}
              className="flex h-[30px] w-[112px] items-center justify-center gap-1.5 bg-[#D94800] text-[11px] font-extrabold uppercase tracking-wider text-white"
            >
              <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2.5} />
              Contacts
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D94800] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Progression de lecture */}
      <div className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-transparent">
        <div className="h-full origin-left bg-gradient-to-r from-[#D94800] to-[#FF8A4D]" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2B333B] border-t border-white/10 px-4 py-6 shadow-2xl">
          <nav className="flex flex-col space-y-2 mb-6">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between text-left py-3 px-3 text-xs font-black uppercase tracking-widest transition-colors ${
                    isActive ? 'bg-[#D94800] text-white' : 'text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <button
              onClick={() => handleNavClick('contacts')}
              className="buildrite-btn-primary w-full py-3.5"
            >
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-white" strokeWidth={2.5} />
              <span>CONTACTS</span>
            </button>

            <div className="text-center text-xs text-white/70 space-y-1">
              <div className="font-bold text-[#D94800]">{COMPANY_INFO.phones[0]}</div>
              <div>{COMPANY_INFO.email}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">
                Agréé CHANIE N° {COMPANY_INFO.chanieNumber}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
