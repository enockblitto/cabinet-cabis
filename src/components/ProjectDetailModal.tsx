import React, { useEffect, useRef } from 'react';
import { assetUrl } from '../utils/assets';

import { X, MapPin, ArrowRight } from 'lucide-react';
import { ProjectItem } from '../utils/filterProjects';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigate,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || !dialogRef.current?.contains(activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeElement === last || !dialogRef.current?.contains(activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previousFocusRef.current?.focus();
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        className="relative grid h-[min(620px,calc(100dvh-1rem))] max-h-[calc(100dvh-1rem)] w-full max-w-[880px] grid-rows-[125px_minmax(0,1fr)] overflow-hidden border border-white/10 bg-[#212427] text-white shadow-2xl sm:h-[min(620px,calc(100dvh-2.5rem))] sm:grid-rows-1 sm:grid-cols-[0.85fr_1.15fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-2 top-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center bg-black/70 text-white transition-colors hover:bg-[#D94800] sm:right-3 sm:top-3"
          aria-label="Fermer la vue détaillée"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative min-h-0 overflow-hidden bg-black sm:h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = assetUrl('/images/domaines/cabis_batiments.webp');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#212427] via-black/15 to-transparent sm:bg-gradient-to-t sm:from-black/80 sm:via-black/10" />
          
          <div className="absolute bottom-3 left-4 right-12 space-y-1.5 text-left text-white sm:bottom-6 sm:left-6 sm:right-5">
            <span className="inline-block bg-[#D94800] px-2 py-1 text-[9px] font-black uppercase tracking-widest">
              {project.categoryLabel}
            </span>
            <h3 id="project-dialog-title" className="line-clamp-2 font-display text-lg font-black uppercase leading-tight text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2.5 overflow-hidden p-3 text-left sm:gap-4 sm:p-6">
          {project.location && (
            <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D94800] sm:gap-2 sm:text-xs">
              <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
          )}

          <div className="min-h-0">
            <div className="mb-1 flex items-center gap-2 sm:mb-2">
              <span className="h-[2px] w-6 shrink-0 bg-[#D94800] sm:w-8" />
              <h4 className="font-display text-[10px] font-black uppercase tracking-widest text-slate-300 sm:text-xs">
                DESCRIPTION & CONTEXTE DU PROJET
              </h4>
            </div>
            <p className="line-clamp-3 text-xs font-light leading-relaxed text-slate-200 sm:text-sm">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 border border-white/5 bg-[#181A1C] p-2.5 sm:gap-4 sm:p-4">
            <div className="min-w-0">
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#D94800] sm:text-[11px]">Client & Maître d'Ouvrage</div>
              <div className="mt-0.5 line-clamp-2 text-[11px] font-semibold text-white sm:text-sm">{project.client || '—'}</div>
            </div>

            <div className="min-w-0">
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#D94800] sm:text-[11px]">Mission Cabinet CABIS</div>
              <div className="mt-0.5 line-clamp-2 text-[11px] font-semibold text-white sm:text-sm">{project.role || '—'}</div>
            </div>
          </div>

          {project.scope && project.scope.length > 0 && (
            <div className="min-h-0">
              <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
                <span className="h-[2px] w-6 shrink-0 bg-[#D94800] sm:w-8" />
                <h4 className="font-display text-[10px] font-black uppercase tracking-widest text-slate-300 sm:text-xs">
                  PÉRIMÈTRE & ÉTUDES RÉALISÉES
                </h4>
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 sm:gap-x-4 sm:gap-y-2">
                {project.scope.map((detail: string, index: number) => (
                  <li key={index} className="flex min-w-0 items-start gap-1.5 text-[10px] leading-snug text-slate-300 sm:gap-2 sm:text-xs">
                    <span className="font-bold text-[#D94800]">―</span>
                    <span className="line-clamp-2">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-2 sm:flex-row sm:gap-4 sm:pt-3">
            <div className="text-center text-[9px] text-slate-400 sm:text-left sm:text-[11px]">
              Agrément CHANIE N° 28/2018 • Cabinet CABIS SARL
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigate('contacts');
              }}
              className="buildrite-btn-primary w-full !px-3 !py-2 !text-[10px] sm:w-auto sm:!px-5 sm:!py-2.5 sm:!text-xs"
            >
              <span>Parler d’un projet similaire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
