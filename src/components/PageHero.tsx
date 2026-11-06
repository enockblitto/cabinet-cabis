import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  crumb: string;
  eyebrow: string;
  /** Une ligne par entrée ; la dernière est mise en accent */
  titleLines: string[];
  subtitle: string;
  image?: string;
  imagePos?: string;
  ghost?: string;
  chips?: string[];
  onHome: () => void;
  children?: React.ReactNode;
}

const d = (s: number) => ({ ['--d' as string]: `${s}s` }) as React.CSSProperties;

/** En-tête commun des pages intérieures : image qui se dévoile, titre masqué, trait de construction. */
export const PageHero: React.FC<PageHeroProps> = ({
  crumb, eyebrow, titleLines, subtitle, image, imagePos = 'center', ghost, chips, onHome, children,
}) => (
  <section className="ph">
    {image && (
      <div className="ph-media" aria-hidden="true">
        <img src={image} alt="" fetchPriority="high" decoding="async" style={{ objectPosition: imagePos }} />
      </div>
    )}
    <div className="ph-shade" />
    <div className="ph-grid blueprint blueprint-drift opacity-70" />
    {ghost && <div className="ph-ghost" aria-hidden="true">{ghost}</div>}

    <div className="relative z-[2] mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <nav aria-label="Fil d’Ariane" className="ph-up mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60" style={d(0)}>
        <button onClick={onHome} className="transition-colors hover:text-[#FF8A4D]">Accueil</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#FF8A4D]">{crumb}</span>
      </nav>

      <div className="ph-up mb-4 flex items-center gap-3" style={d(0.05)}>
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF8A4D]">{eyebrow}</span>
        <span className="h-[2px] w-12 bg-[#D94800]" />
      </div>

      <h1 className="max-w-3xl font-display text-4xl font-black uppercase leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
        {titleLines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span className={`ph-in ${i === titleLines.length - 1 && titleLines.length > 1 ? 'text-[#FF6A21]' : ''}`} style={d(0.1 + i * 0.12)}>
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="ph-up mt-6 max-w-2xl border-l-[3px] border-[#D94800] pl-4 text-sm font-light leading-relaxed text-slate-200 sm:text-lg" style={d(0.45)}>
        {subtitle}
      </p>

      {chips && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <li key={c} className="ph-up border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm" style={d(0.6 + i * 0.08)}>
              {c}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
    <div className="ph-line" />
  </section>
);
