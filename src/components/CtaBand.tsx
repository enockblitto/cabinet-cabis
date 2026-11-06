import React from 'react';
import { ArrowRight, Mail, PhoneCall } from 'lucide-react';
import { Reveal } from './Reveal';

interface CtaBandProps {
  onNavigate: (page: string) => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onNavigate }) => (
  <section className="relative overflow-hidden bg-[#2B333B] py-16 text-white sm:py-20">
    <div className="blueprint blueprint-drift pointer-events-none absolute inset-0 opacity-60" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D94800] via-[#FF8A4D] to-[#31899B]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="max-w-2xl space-y-3 text-center lg:text-left">
          <Reveal>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#FF8A4D]">Nous contacter</div>
          </Reveal>
          <Reveal delay={90} variant="mask">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight sm:text-4xl">Nous pouvons vous aider dans votre projet</h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-sm font-light text-slate-300">
              Nous sommes impatients de collaborer avec chacun d’entre vous pour réaliser des projets qui auront un impact positif durable sur notre cadre de vie.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-200 lg:justify-start">
              <span className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-[#FF8A4D]" />
                +225 07 07 31 35 30 / +225 27 22 55 29 52
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#FF8A4D]" />
                cabinetcabissarl@gmail.com
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={260} variant="right">
          <button onClick={() => onNavigate('contacts')} className="buildrite-btn-primary justify-center px-8 py-4">
            <span>Échanger avec nos ingénieurs</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </div>
  </section>
);
