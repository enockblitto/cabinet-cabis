import React, { useState } from 'react';
import { assetUrl } from '../utils/assets';

import { ArrowRight, Check } from 'lucide-react';
import { ACTIVITIES_LIST } from '../data/cabisData';
import { HOME_DOMAINS } from '../data/homeContent';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { CtaBand } from '../components/CtaBand';

interface ActivitiesPageProps {
  onNavigate: (page: string) => void;
}

// Les 3 secteurs et prestations officiels du site cabinetcabis.com
const SECTORS = [
  {
    id: 'tp',
    num: '01',
    title: 'Travaux publics',
    image: assetUrl('/images/hero/hero_tp.webp'),
    description: "Créer et maintenir des infrastructures essentielles qui facilitent la mobilité, l'accès aux services et la qualité de vie des citoyens.",
    services: [
      'Etudes et suivi des travaux des VRD des promotions immobilières',
      'Etudes d’état des lieux topographique',
      'Calculs et dimensionnement des réseaux de drainage des eaux pluviales',
      'Calculs et dimensionnement des réseaux d’assainissement des eaux usées',
      'Calculs et dimensionnement des réseaux d’alimentation électrique',
      'Calculs et dimensionnement des réseaux d’alimentation téléphonique',
      'Tracée routier',
      'Adduction d’eau potable',
      'Elaboration de Dossier d’Appel d’Offres',
      'Elaboration de plans d’exécution',
    ],
  },
  {
    id: 'batiments',
    num: '02',
    title: 'Bâtiments',
    image: assetUrl('/images/hero/hero_batiments.webp'),
    description: "Le secteur des bâtiments englobe une large gamme d'activités liées à la conception, la réalisation, l'entretien, la réhabilitation des ouvrages.",
    services: ['Calcul de structures en béton armé', 'Calcul de charpente métallique', 'DAO', 'Dossier d’exécution', 'Electricité', 'Froid'],
  },
  {
    id: 'gsm',
    num: '03',
    title: 'Télécommunications GSM',
    mobileTitle: 'Télécoms GSM',
    image: assetUrl('/images/hero/hero_telecom.webp'),
    description: 'Les télécommunications GSM jouent un rôle fondamental dans la société moderne, tant sur le plan économique que social.',
    services: [
      'Calcul des structures métalliques de pylônes',
      'Calcul de fondations en béton armé',
      'Survey pour l’implantation des équipements de téléphonie cellulaires',
      'Expertise des ouvrages existants',
    ],
  },
];

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate }) => {
  const [selected, setSelected] = useState(0);
  const [flipped, setFlipped] = useState<string | null>(null);
  const sector = SECTORS[selected];
  const kicker = HOME_DOMAINS[selected].kicker;

  return (
    <div className="w-full bg-white text-[#474747]">
      <PageHero
        onHome={() => onNavigate('home')}
        crumb="Nos activités"
        eyebrow="Activités officielles"
        titleLines={['Nos', 'activités']}
        subtitle="Le Cabinet CABIS intervient dans les trois secteurs majeurs du BTP, des infrastructures et des télécommunications."
        image={assetUrl('/images/hero/hero_telecom.webp')}
        imagePos="70% 30%"
        ghost="03"
        chips={['Travaux publics', 'Bâtiments', 'Télécoms GSM']}
      />

      {/* ───── Sélecteur de secteur + détail ───── */}
      <section className="bg-[#F3F5F7] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative grid grid-cols-3 border border-slate-300 bg-white shadow-sm" role="tablist" aria-label="Secteurs d’activité">
              {SECTORS.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-label={s.title}
                  aria-selected={i === selected}
                  onClick={() => setSelected(i)}
                  className={`group relative z-[1] flex flex-col items-center justify-center gap-1 px-2 py-5 text-center transition-colors duration-300 sm:flex-row sm:gap-4 sm:py-6 ${
                    i === selected ? 'text-white' : 'text-[#1F252B] hover:bg-slate-50'
                  }`}
                >
                  <span className={`relative z-10 font-display text-2xl font-black leading-none sm:text-4xl ${i === selected ? 'text-white/90' : 'text-[#D94800]'}`}>{s.num}</span>
                  <span className="relative z-10 text-[10px] font-black uppercase leading-tight tracking-wider sm:text-sm">
                    {s.mobileTitle ? (
                      <>
                        <span className="lg:hidden">{s.mobileTitle}</span>
                        <span className="hidden lg:inline">{s.title}</span>
                      </>
                    ) : s.title}
                  </span>
                </button>
              ))}
              <span
                aria-hidden="true"
                className="tab-indicator pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[#D94800]"
                style={{ transform: `translateX(${selected * 100}%)`, zIndex: 0 }}
              />
            </div>
          </Reveal>

          <div key={sector.id} className="mt-8 grid grid-cols-1 overflow-hidden bg-[#2B333B] text-white shadow-2xl lg:grid-cols-12">
            <div className="p-8 sm:p-12 lg:col-span-7">
              <div className="panel-in flex items-center gap-3" style={{ ['--i' as string]: 0 } as React.CSSProperties}>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FF8A4D]">Secteur d’activité — {kicker}</span>
                <span className="h-[2px] w-12 bg-[#D94800]" />
              </div>
              <h2 className="panel-in mt-4 font-display text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ ['--i' as string]: 1 } as React.CSSProperties}>
                {sector.title}
              </h2>
              <p className="panel-in mt-4 max-w-xl border-l-[3px] border-[#D94800] pl-4 text-sm font-light leading-relaxed text-slate-200 sm:text-base" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
                {sector.description}
              </p>

              <h3 className="panel-in mb-4 mt-8 font-display text-xs font-black uppercase tracking-[0.2em] text-[#FF8A4D]" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
                Prestations &amp; études prises en charge
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {sector.services.map((item, idx) => (
                  <li key={item} className="panel-in flex items-start gap-3 text-sm font-light text-slate-100" style={{ ['--i' as string]: 4 + idx * 0.7 } as React.CSSProperties}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A4D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="panel-in mt-8" style={{ ['--i' as string]: 10 } as React.CSSProperties}>
                <button onClick={() => onNavigate('contacts')} className="buildrite-btn-primary">
                  <span>Contacter nos ingénieurs</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="img-wipe relative min-h-[300px] overflow-hidden lg:col-span-5">
              <img src={sector.image} alt={sector.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" style={{ objectPosition: HOME_DOMAINS[selected].heroPos }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B333B]/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-5 font-display text-8xl font-black leading-none text-white/20">{sector.num}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Nos prestations en détail ───── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionTitle
              eyebrow="Savoir-faire détaillé"
              title="Nos prestations en détail"
              subtitle="Six spécialités d’ingénierie. Survolez ou touchez une carte pour voir ce qu’elle recouvre."
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITIES_LIST.map((a, i) => {
              const open = flipped === a.id;
              return (
                <Reveal key={a.id} delay={(i % 3) * 120}>
                  <article
                    onMouseEnter={() => setFlipped(a.id)}
                    onMouseLeave={() => setFlipped(null)}
                    onClick={() => setFlipped(open ? null : a.id)}
                    className={`group relative h-full min-h-[260px] cursor-pointer overflow-hidden border p-7 transition-all duration-500 ${
                      open ? 'border-[#D94800] bg-[#2B333B] text-white shadow-2xl' : 'border-slate-200 bg-white hover:shadow-lg'
                    }`}
                  >
                    <span className={`pointer-events-none absolute -right-1 -top-3 font-display text-8xl font-black leading-none transition-colors duration-500 ${open ? 'text-white/10' : 'text-slate-100'}`}>
                      0{i + 1}
                    </span>
                    <div className={`relative mb-5 flex h-14 w-14 items-center justify-center transition-colors duration-500 ${open ? 'bg-[#D94800]' : 'bg-[#2B333B]'}`}>
                      <img src={a.icon} alt="" className="h-8 w-8 object-contain brightness-0 invert" />
                    </div>
                    <h3 className="relative font-display text-lg font-black uppercase leading-tight tracking-wide">{a.title}</h3>

                    <div className="relative mt-3 grid">
                      <p className={`col-start-1 row-start-1 text-sm font-light leading-relaxed transition-all duration-500 ${open ? 'translate-y-2 opacity-0' : 'text-slate-600 opacity-100'}`}>
                        {a.shortDesc}
                      </p>
                      <ul className={`col-start-1 row-start-1 space-y-2 transition-all duration-500 ${open ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}>
                        {a.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs font-light leading-snug text-slate-200">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#FF8A4D]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#D94800] transition-transform duration-500 group-hover:scale-x-100" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand onNavigate={onNavigate} />
    </div>
  );
};
