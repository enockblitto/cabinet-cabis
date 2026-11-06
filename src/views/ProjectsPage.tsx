import React, { useMemo, useState } from 'react';
import { assetUrl } from '../utils/assets';

import { ArrowUpRight, MapPin, Search, X } from 'lucide-react';
import { CABIS_PROJECTS } from '../data/cabisData';
import { filterProjects, ProjectItem } from '../utils/filterProjects';
import { PageHero } from '../components/PageHero';
import { CountUp } from '../components/CountUp';
import { Reveal } from '../components/Reveal';

interface ProjectsPageProps {
  onOpenProject: (project: ProjectItem) => void;
  onNavigate: (page: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Toutes' },
  { id: 'batiment', label: 'Bâtiments R+1 à R+14' },
  { id: 'vrd_routes', label: 'VRD & voiries' },
  { id: 'energie_hydro', label: 'Énergie' },
  { id: 'eau_assainissement', label: 'Eau & assainissement' },
  { id: 'telecom', label: 'Télécoms GSM' },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenProject, onNavigate }) => {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: CABIS_PROJECTS.length };
    CABIS_PROJECTS.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => filterProjects(CABIS_PROJECTS, category, query), [category, query]);
  const gridKey = `${category}|${query}`;

  return (
    <div className="w-full bg-white text-[#474747]">
      <PageHero
        onHome={() => onNavigate('home')}
        crumb="Réalisations"
        eyebrow="Portfolio & expérience"
        titleLines={['Nos réalisations', '& chantiers']}
        subtitle="Découvrez l'ensemble de nos références majeures : dimensionnement structural d'immeubles (R+1 à R+14), voiries urbaines, ponts, aménagements hydrauliques et sites relais GSM à Abidjan et à travers la Côte d'Ivoire."
        image={assetUrl('/images/hero/hero_tp.webp')}
        imagePos="60% 20%"
        ghost="26"
      >
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-px border border-white/15 bg-white/15">
          {[
            { n: CABIS_PROJECTS.length, s: '', l: 'Références' },
            { n: Object.keys(counts).length - 1, s: '', l: 'Spécialités' },
            { n: 2018, s: '', l: 'Agrément CHANIE', plain: true },
          ].map((k, i) => (
            <div key={k.l} className="ph-up bg-[#2B333B]/80 p-4 backdrop-blur-sm" style={{ ['--d' as string]: `${0.7 + i * 0.1}s` } as React.CSSProperties}>
              <div className="font-display text-2xl font-black sm:text-3xl">{k.plain ? k.n : <CountUp to={k.n} suffix={k.s} />}</div>
              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-[#FF8A4D]">{k.l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ───── Barre de filtres collante ───── */}
      <div className="sticky top-20 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none]" role="tablist" aria-label="Catégories">
              {CATEGORIES.map((c) => {
                const on = category === c.id;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setCategory(c.id)}
                    className={`group relative shrink-0 overflow-hidden px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors duration-300 ${
                      on ? 'text-white' : 'bg-slate-100 text-[#1F252B] hover:bg-slate-200'
                    }`}
                  >
                    <span className={`absolute inset-0 origin-left bg-[#D94800] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                    <span className="relative flex items-center gap-2">
                      {c.label}
                      <span className={`px-1.5 py-0.5 text-[9px] ${on ? 'bg-white/25' : 'bg-white text-slate-500'}`}>{counts[c.id] ?? 0}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Titre, ville ou client…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Rechercher un projet"
                className="buildrite-input"
                style={{ padding: '10px 36px 10px 40px' }}
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Effacer la recherche" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-[#D94800]">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ───── Grille ───── */}
      <section className="bg-[#F3F5F7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-baseline justify-between">
            <div className="font-display text-xs font-black uppercase tracking-wider text-[#1F252B]">
              <span className="mr-1.5 text-3xl text-[#D94800]">{filtered.length}</span> projet{filtered.length > 1 ? 's' : ''} répertorié{filtered.length > 1 ? 's' : ''}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card-in border border-slate-200 bg-white p-12 text-center">
              <h3 className="font-display text-lg font-bold uppercase text-slate-700">Aucun projet ne correspond à votre recherche</h3>
              <p className="mt-2 text-sm font-light text-slate-500">Essayez d'autres termes ou choisissez une autre catégorie.</p>
              <button onClick={() => { setCategory('all'); setQuery(''); }} className="buildrite-btn-primary mt-6">
                <span>Réinitialiser les filtres</span>
              </button>
            </div>
          ) : (
            <div key={gridKey} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => onOpenProject(project)}
                  className="card-in group flex flex-col bg-white text-left shadow-sm transition-shadow duration-500 hover:shadow-2xl"
                  style={{ ['--i' as string]: Math.min(i, 12) } as React.CSSProperties}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#2B333B]">
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F252B]/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 bg-[#D94800] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">{project.categoryLabel}</div>
                    <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center bg-white text-[#D94800] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF8A4D]">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>
                      <h3 className="line-clamp-3 font-display text-sm font-extrabold uppercase leading-tight">{project.title}</h3>
                    </div>
                  </div>
                  <div className="relative flex-1 space-y-2 p-4">
                    <p className="line-clamp-2 text-xs font-light leading-relaxed text-slate-600">{project.description}</p>
                    <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                      <strong className="text-slate-800">Mission :</strong> {project.role}
                    </div>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#D94800] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </button>
              ))}
            </div>
          )}

          <Reveal delay={100}>
            <div className="relative mt-16 overflow-hidden bg-[#2B333B] p-8 text-white sm:p-12">
              <div className="blueprint blueprint-drift pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <div className="font-display text-xs font-black uppercase tracking-widest text-[#FF8A4D]">Études techniques sur mesure</div>
                  <h3 className="mt-1 font-display text-2xl font-black uppercase sm:text-3xl">Vous avez un projet similaire à dimensionner ?</h3>
                  <p className="mt-2 max-w-xl text-sm font-light text-slate-300">
                    Nos ingénieurs en structures et voiries réalisent vos notes de calculs certifiées et plans de ferraillage avec réactivité sous 24h à 48h.
                  </p>
                </div>
                <button onClick={() => onNavigate('contacts')} className="buildrite-btn-primary shrink-0">
                  <span>Discuter d’un projet</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};
