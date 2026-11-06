import React, { useState } from 'react';
import { assetUrl } from '../utils/assets';

import {
  ArrowRight, ArrowUpRight, Award, Building, ClipboardCheck, Compass, HardHat,
  Handshake, Layers, Lightbulb, Ruler, ShieldCheck, MapPin,
} from 'lucide-react';
import { CABIS_PROJECTS } from '../data/cabisData';
import { HOME_DOMAINS, MISSIONS } from '../data/homeContent';
import { ProjectItem } from '../utils/filterProjects';
import { HeroSlider } from '../components/HeroSlider';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { CountUp } from '../components/CountUp';
import { TeamMosaic } from '../components/TeamMosaic';
import { PartnersMarquee } from '../components/PartnersMarquee';
import { CtaBand } from '../components/CtaBand';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenProject: (project: ProjectItem) => void;
  /** Vrai quand le loader s'est ouvert (lance l'entrée en scène du hero) */
  siteReady?: boolean;
}

const MISSION_ICONS = [Ruler, ClipboardCheck, HardHat, Compass];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProject, siteReady = true }) => {
  const [openDomain, setOpenDomain] = useState(0);
  const recentProjects = CABIS_PROJECTS.slice(0, 4);

  const stats = [
    { icon: ShieldCheck, node: <span>CHANIE</span>, label: 'Agr. N° 28/2018', accent: true },
    { icon: Building, node: <CountUp to={26} suffix="+" />, label: 'Projets réalisés', accent: false },
    { icon: Award, node: <CountUp to={15} suffix="+ ans" />, label: 'd’expérience', accent: true },
    { icon: Layers, node: <CountUp to={3} />, label: 'Secteurs d’activité', accent: false },
  ];

  return (
    <div className="w-full overflow-x-clip bg-white text-[#474747]">
      {/* ================================================================
          1. HERO — diaporama synchronisé avec les 3 domaines
          ================================================================ */}
      <HeroSlider ready={siteReady} onNavigate={onNavigate} />

      {/* ================================================================
          2. CHIFFRES CLÉS
          ================================================================ */}
      <section className="relative z-20 border-b-4 border-[#D94800] bg-[#2B333B] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 90}
              className={`border-white/10 ${i % 2 === 0 ? 'border-r' : 'lg:border-r'} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 3 ? 'lg:border-r-0' : ''}`}
            >
              <div className="group flex items-center gap-3 px-4 py-6 sm:gap-4 sm:px-8 sm:py-8">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12 ${
                    item.accent ? 'bg-[#D94800] text-white' : 'border border-white/15 bg-white/10 text-[#FF8A4D]'
                  }`}
                >
                  <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <div className="font-display text-xl font-black leading-none sm:text-4xl">{item.node}</div>
                  <div className="mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FF8A4D] sm:text-xs">{item.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================
          3. QUI SOMMES-NOUS
          ================================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Photo + cadre "plan de chantier" */}
            <div className="lg:col-span-5">
              <Reveal variant="left">
                <div className="relative mx-4 sm:mx-6 lg:mx-0 lg:mr-6">
                  <span className="bracket bracket-tl" />
                  <span className="bracket bracket-br" />
                  <div className="absolute -bottom-5 -left-5 hidden h-full w-full border-2 border-[#D94800]/30 sm:block" />
                  <div className="relative overflow-hidden bg-[#2B333B] shadow-2xl">
                    <img
                      src={assetUrl('/images/cabis_dg.webp')}
                      alt="Direction du Cabinet CABIS"
                      className="h-[400px] w-full object-cover object-top transition-transform duration-[1400ms] ease-out hover:scale-105 sm:h-[480px]"
                      width="1000"
                      height="667"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="border-t-2 border-[#D94800] bg-[#2B333B] p-4 text-white">
                      <div className="font-display text-base font-black uppercase tracking-wider">Direction &amp; Gérance</div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF8A4D]">Cabinet CABIS — Agréé CHANIE N° 28/2018</div>
                    </div>
                  </div>
                  <div className="absolute -right-3 top-8 hidden bg-[#D94800] px-4 py-3 text-white shadow-xl sm:block">
                    <div className="font-display text-2xl font-black leading-none">2018</div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest">Membre CHANIE</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Texte + engagements */}
            <div className="lg:col-span-7">
              <SectionTitle eyebrow="Présentation du cabinet" title="Qui sommes-nous ?" />

              <Reveal delay={120}>
                <div className="mt-6 space-y-4 text-sm font-light leading-relaxed text-slate-600 sm:text-base">
                  <p>
                    Le <strong className="font-bold text-[#1F252B]">Cabinet CABIS sarlu</strong> est un Bureau d’étude affilié à la Chambre Nationale des Ingénieurs Conseils et Experts de Génie Civil et Bâtiments de Côte d’Ivoire (<strong className="font-bold text-[#1F252B]">CHANIE sous le numéro 28/2018 depuis le 25/01/2018</strong>).
                  </p>
                  <p>
                    Notre mission est de réaliser les études, le suivi, le contrôle, la maîtrise d’œuvre et d’ouvrage dans le domaine du Génie civil et rural, des infrastructures, du bâtiment, de l’assainissement et des VRD qui, non seulement, répondent aux besoins actuels, mais aussi anticipent les défis futurs.
                  </p>
                </div>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, title: 'Sécurité & qualité', text: 'Les normes les plus élevées, une planification rigoureuse.' },
                  { icon: Handshake, title: 'Collaboration', text: 'Architectes, ingénieurs et entrepreneurs, main dans la main.' },
                  { icon: Lightbulb, title: 'Innovation', text: 'Des technologies innovantes, une empreinte écologique réduite.' },
                ].map((v, i) => (
                  <Reveal key={v.title} delay={200 + i * 110}>
                    <div className="group h-full border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D94800] hover:shadow-xl">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#D94800]/10 text-[#D94800] transition-colors duration-500 group-hover:bg-[#D94800] group-hover:text-white">
                        <v.icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-extrabold uppercase tracking-wide text-[#1F252B]">{v.title}</div>
                      <p className="mt-1.5 text-xs font-light leading-relaxed text-slate-500">{v.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={500}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button onClick={() => onNavigate('about')} className="buildrite-btn-primary">
                    <span>Découvrir le cabinet</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => onNavigate('contacts')} className="buildrite-btn-dark">
                    <span>Contactez-nous</span>
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. NOS DOMAINES — panneaux extensibles
          ================================================================ */}
      <section className="bg-[#F3F5F7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="Nos domaines d’intervention"
              title="Trois secteurs, une même exigence"
              subtitle="Le Cabinet CABIS intervient dans les trois secteurs majeurs de l’ingénierie et de la construction."
            />
            <Reveal delay={250}>
              <button onClick={() => onNavigate('activities')} className="buildrite-btn-dark shrink-0">
                <span>Toutes nos activités</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <Reveal variant="scale">
            <div className="flex flex-col gap-3 lg:h-[580px] lg:flex-row lg:gap-2">
              {HOME_DOMAINS.map((dom, i) => (
                <div
                  key={dom.id}
                  data-open={openDomain === i}
                  tabIndex={0}
                  role="button"
                  aria-label={dom.short}
                  onMouseEnter={() => setOpenDomain(i)}
                  onFocus={() => setOpenDomain(i)}
                  onClick={() => setOpenDomain(i)}
                  className={`dp group relative min-h-[420px] cursor-pointer overflow-hidden bg-[#2B333B] outline-none focus-visible:ring-4 focus-visible:ring-[#D94800]/60 lg:min-h-0 ${
                    openDomain === i ? 'lg:flex-[3.6]' : 'lg:flex-[1]'
                  }`}
                >
                  <img src={dom.heroImage} alt={dom.short} className="dp-img absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F252B]/92 via-[#1F252B]/35 to-[#1F252B]/5" />
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#D94800] transition-transform duration-700 group-data-[open=true]:scale-x-100" />

                  <span className="absolute left-5 top-4 font-display text-5xl font-black leading-none text-white/90 sm:text-6xl">{dom.num}</span>

                  {/* Rail vertical (panneau fermé, bureau) */}
                  <div className="dp-rail absolute inset-x-0 bottom-7 hidden justify-center lg:flex">
                    <span className="rotate-180 font-display text-xl font-bold uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl]">{dom.short}</span>
                  </div>

                  {/* Contenu (panneau ouvert) */}
                  <div className="dp-body absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FF8A4D]">{dom.kicker}</div>
                    <h3 className="font-display text-2xl font-black uppercase leading-tight text-white sm:text-4xl">{dom.short}</h3>
                    <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-slate-200">{dom.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {dom.points.map((p) => (
                        <li key={p} className="border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                          {p}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('activities');
                      }}
                      className="mt-6 inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:text-[#FF8A4D]"
                    >
                      <span>Voir le détail</span>
                      <span className="flex h-8 w-8 items-center justify-center bg-[#D94800] transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          5. NOS MISSIONS — frise animée
          ================================================================ */}
      <section className="relative overflow-hidden bg-[#262D34] py-20 text-white sm:py-28">
        <div className="blueprint blueprint-drift pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D94800]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            tone="dark"
            eyebrow="Notre savoir-faire"
            title="Du plan au chantier, un seul interlocuteur"
            subtitle="Les quatre piliers de la mission du Cabinet CABIS, de la conception à la réception des ouvrages."
          />

          <Reveal>
            <div className="relative mt-16">
              <div className="mission-line absolute left-0 right-0 top-8 hidden h-[2px] bg-gradient-to-r from-[#D94800] via-[#FF8A4D] to-[#31899B] lg:block" />
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {MISSIONS.map((m, i) => {
                  const Icon = MISSION_ICONS[i];
                  return (
                    <Reveal key={m.num} delay={250 + i * 150}>
                      <div className="group relative">
                        <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center border-2 border-[#D94800] bg-[#262D34] text-[#FF8A4D] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:bg-[#D94800] group-hover:text-white group-hover:shadow-[0_14px_30px_-8px_rgba(217,72,0,0.7)]">
                          <Icon className="h-7 w-7" />
                          <span className="absolute -right-3 -top-3 bg-white px-1.5 py-0.5 font-display text-xs font-black text-[#1F252B]">{m.num}</span>
                        </div>
                        <h3 className="font-display text-xl font-black uppercase leading-tight tracking-wide">{m.title}</h3>
                        <p className="mt-3 text-sm font-light leading-relaxed text-slate-300">{m.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          6. RÉALISATIONS
          ================================================================ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionTitle
              eyebrow="Nos réalisations"
              title="Nos travaux récents"
              subtitle="Des projets qui illustrent un engagement vers un avenir plus durable, technologique et inclusif."
            />
            <Reveal delay={250}>
              <button onClick={() => onNavigate('projects')} className="buildrite-btn-primary shrink-0">
                <span>Voir plus de projets</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {recentProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 120}>
                <button onClick={() => onOpenProject(project)} className="group block w-full text-left">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#2B333B]">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F252B]/90 via-[#1F252B]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 bg-[#D94800] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest text-white sm:text-[10px]">
                      {project.categoryLabel}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 text-white transition-transform duration-500 group-hover:translate-y-0 sm:p-4">
                      {project.location && (
                        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF8A4D]">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </div>
                      )}
                      <div className="line-clamp-2 font-display text-xs font-bold uppercase leading-snug sm:text-sm">{project.title}</div>
                      <div className="mt-2 flex h-0 items-center gap-1 overflow-hidden text-[10px] font-black uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:h-4 group-hover:opacity-100">
                        Voir le projet <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamMosaic />
      <PartnersMarquee />
      <CtaBand onNavigate={onNavigate} />
    </div>
  );
};
