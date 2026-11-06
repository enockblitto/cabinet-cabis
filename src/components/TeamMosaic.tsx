import React from 'react';
import { assetUrl } from '../utils/assets';

import { TEAM_MEMBERS } from '../data/cabisData';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

/** Mosaïque de l'équipe : la première photo en grand, les autres autour. */
export const TeamMosaic: React.FC<{ className?: string }> = ({ className = 'bg-[#F3F5F7]' }) => (
  <section className={`py-20 sm:py-28 ${className}`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <SectionTitle
          align="center"
          eyebrow="Équipe du cabinet"
          title="Notre équipe"
          subtitle="Les femmes et les hommes du Cabinet CABIS mobilisés pour vos études et le suivi de vos chantiers."
        />
      </div>
      <div className="grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member, i) => (
          <Reveal key={member.id} delay={i * 110} variant="scale" className={i === 0 ? 'col-span-2 row-span-2' : ''}>
            <div className="group relative h-full overflow-hidden bg-[#2B333B]">
              <img
                src={member.photo}
                alt={member.name}
                className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = assetUrl('/images/cabis_dg.webp');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F252B]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#D94800] transition-transform duration-500 group-hover:scale-x-100" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white sm:p-5">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#FF8A4D] sm:text-[10px]">{member.role}</div>
                <div className={`font-display font-black uppercase leading-tight ${i === 0 ? 'text-lg sm:text-2xl' : 'text-xs sm:text-base'}`}>{member.name}</div>
                {i === 0 && <p className="mt-1 hidden text-xs font-light text-slate-200 sm:block">{member.description}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
