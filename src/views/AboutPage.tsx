import React from 'react';
import { assetUrl } from '../utils/assets';

import { ArrowRight, Check, FlaskConical, Monitor, Crosshair, ShieldCheck, Scale } from 'lucide-react';
import { COMPANY_INFO } from '../data/cabisData';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { TeamMosaic } from '../components/TeamMosaic';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { CtaBand } from '../components/CtaBand';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const COMMITMENTS = [
  { num: '01', title: 'Notre engagement envers l’excellence', text: COMPANY_INFO.aboutText.excellence },
  { num: '02', title: 'Collaboration et innovation', text: COMPANY_INFO.aboutText.collaboration },
  { num: '03', title: 'Un avenir prometteur', text: COMPANY_INFO.aboutText.future },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const m = COMPANY_INFO.moyensTechniques;
  const means = [
    { icon: Monitor, title: 'Logiciels d’ingénierie', items: m.logiciels },
    { icon: Crosshair, title: 'Matériel de terrain', items: m.materielTerrain },
    { icon: FlaskConical, title: 'Essais & contrôles', items: m.essaisControles },
  ];

  return (
    <div className="w-full bg-white text-[#474747]">
      <PageHero
        onHome={() => onNavigate('home')}
        crumb="À propos"
        eyebrow="Présentation officielle"
        titleLines={['Qui sommes', 'nous ?']}
        subtitle="Bureau d’études affilié à la Chambre Nationale des Ingénieurs Conseils et Experts de Génie Civil et Bâtiments de Côte d’Ivoire (CHANIE) sous le numéro 28/2018 depuis le 25/01/2018."
        image={assetUrl('/images/hero/hero_batiments.webp')}
        imagePos="center 25%"
        ghost="28/18"
        chips={['Agréé CHANIE N° 28/2018', 'Cabinet CABIS SARLU']}
      />

      {/* ───── Message de la direction + engagements (portrait qui reste en vue) ───── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="left">
                <div className="relative mx-4 sm:mx-6 lg:mx-0 lg:mr-6">
                  <span className="bracket bracket-tl" />
                  <span className="bracket bracket-br" />
                  <div className="relative overflow-hidden bg-[#2B333B] shadow-2xl">
                    <img
                      src={assetUrl('/images/cabis_dg.webp')}
                      alt="Direction du Cabinet CABIS"
                      className="h-auto w-full object-cover"
                      width="1000"
                      height="667"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="border-t-2 border-[#D94800] bg-[#2B333B] p-4 text-white">
                      <div className="font-display text-base font-black uppercase tracking-wide">Direction générale &amp; gérance</div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF8A4D]">Cabinet CABIS — Agréé CHANIE N° 28/2018</div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex gap-4 border border-slate-200 bg-slate-50 p-5">
                  <ShieldCheck className="h-6 w-6 shrink-0 text-[#D94800]" />
                  <div>
                    <div className="font-display text-sm font-black uppercase tracking-wider text-[#1F252B]">Affiliation institutionnelle</div>
                    <p className="mt-1 text-xs font-light leading-relaxed text-slate-600">
                      Chambre Nationale des Ingénieurs Conseils et Experts de Génie Civil et Bâtiments de Côte d’Ivoire (CHANIE), n° <strong>28/2018</strong>, depuis le 25/01/2018.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionTitle eyebrow="Cabinet CABIS SARLU" title="Bienvenue au sein du Cabinet CABIS" />
            <Reveal delay={150}>
              <blockquote className="relative mt-8 border-l-4 border-[#D94800] bg-slate-50 p-6 text-sm font-normal leading-relaxed text-[#1F252B] sm:text-base">
                <span className="pointer-events-none absolute -top-5 left-4 font-display text-7xl font-black leading-none text-[#D94800]/25">“</span>
                {COMPANY_INFO.aboutText.chanieIntro}
              </blockquote>
            </Reveal>

            <div className="mt-10 space-y-5">
              {COMMITMENTS.map((c, i) => (
                <Reveal key={c.num} delay={i * 120} variant={i % 2 ? 'right' : 'left'}>
                  <article className="group relative overflow-hidden border border-slate-200 bg-white p-6 pl-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#D94800] hover:shadow-xl sm:p-8 sm:pl-10">
                    <span className="absolute inset-y-0 left-0 w-1.5 origin-top scale-y-0 bg-[#D94800] transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl font-black leading-none text-slate-100 transition-colors duration-500 group-hover:text-[#D94800]/10">{c.num}</span>
                    <h3 className="relative font-display text-lg font-black uppercase tracking-wide text-[#1F252B] sm:text-xl">{c.title}</h3>
                    <p className="relative mt-3 text-sm font-light leading-relaxed text-slate-600">{c.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={150}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button onClick={() => onNavigate('contacts')} className="buildrite-btn-primary">
                  <span>Nous contacter</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => onNavigate('projects')} className="buildrite-btn-dark">
                  <span>Voir nos projets</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── Moyens techniques ───── */}
      <section className="relative overflow-hidden bg-[#262D34] py-20 text-white sm:py-28">
        <div className="blueprint blueprint-drift pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tone="dark"
            eyebrow="Nos moyens techniques"
            title="Des outils à la hauteur de vos ouvrages"
            subtitle="Logiciels de calcul, matériel de précision sur le terrain et essais de contrôle : la rigueur commence par l’équipement."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {means.map((blk, i) => (
              <Reveal key={blk.title} delay={i * 150}>
                <div className="group h-full border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D94800]/70 hover:bg-white/[0.07]">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#D94800] text-white transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                      <blk.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-black uppercase tracking-wide">{blk.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {blk.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm font-light leading-snug text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A4D]" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-8 flex items-center gap-2 text-xs font-light text-slate-400">
              <Scale className="h-4 w-4 text-[#FF8A4D]" />
              Calculs conduits selon les référentiels en vigueur (BAEL 91 modifié 99, Eurocodes).
            </p>
          </Reveal>
        </div>
      </section>

      <TeamMosaic />
      <PartnersMarquee className="bg-white" />
      <CtaBand onNavigate={onNavigate} />
    </div>
  );
};
