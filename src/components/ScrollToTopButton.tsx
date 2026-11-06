import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  isVideoExpanded: boolean;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ isVideoExpanded }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 420);
        frame = 0;
      });
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
      }}
      aria-label="Retourner en haut de la page"
      title="Retour en haut"
      className={`group fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 border-t-2 border-t-[#D94800] bg-[#1F252B] text-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.6)] transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#D94800] hover:bg-[#2E363E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94800] sm:h-12 sm:w-12 ${
        isVideoExpanded
          ? 'bottom-10 right-[calc(1.25rem+11rem+0.625rem)] sm:bottom-[3.25rem] sm:right-[calc(1.75rem+12rem+0.75rem)]'
          : 'bottom-5 right-[calc(1.25rem+3rem+0.625rem)] sm:bottom-7 sm:right-[calc(1.75rem+3.5rem+0.75rem)]'
      }`}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5 text-[#FF8A4D] transition-colors duration-200 group-hover:text-white" strokeWidth={2} />
    </button>
  );
};
