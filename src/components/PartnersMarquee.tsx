import React from 'react';
import { assetUrl } from '../utils/assets';

import { PARTNERS_LIST } from '../data/cabisData';
import { SectionTitle } from './SectionTitle';

/** Logos des partenaires en défilement continu (pause au survol). */
export const PartnersMarquee: React.FC<{ className?: string }> = ({ className = 'bg-white' }) => {
  const items = [...PARTNERS_LIST, ...PARTNERS_LIST];
  return (
    <section className={`overflow-hidden py-20 sm:py-24 ${className}`}>
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle align="center" eyebrow="Institutions & clients" title="Nos partenaires" />
      </div>
      <div
        className="marquee relative"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
        }}
      >
        <div className="marquee-track">
          {items.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="group mx-2 flex h-32 w-40 shrink-0 flex-col items-center justify-center border border-slate-200 bg-white p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D94800] hover:shadow-lg sm:mx-3 sm:w-48"
              aria-hidden={i >= PARTNERS_LIST.length}
            >
              <div className="flex h-24 w-full items-center justify-center overflow-hidden">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = assetUrl('/images/logo_cabis.png');
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
