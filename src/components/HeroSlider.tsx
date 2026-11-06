import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Pause, Play, ShieldCheck } from 'lucide-react';
import { HOME_DOMAINS } from '../data/homeContent';

interface HeroSliderProps {
  /** Devient vrai quand le loader s'ouvre : lance l'entrée en scène */
  ready: boolean;
  onNavigate: (page: string) => void;
}

const DURATION = 7500;
const N = HOME_DOMAINS.length;
const d = (s: number) => ({ ['--d' as string]: `${s}s` }) as React.CSSProperties;

export const HeroSlider: React.FC<HeroSliderProps> = ({ ready, onNavigate }) => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const clearPrev = useRef<number | undefined>(undefined);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const target = ((i % N) + N) % N;
      if (target === active) return;
      setPrev(active);
      setActive(target);
      window.clearTimeout(clearPrev.current);
      clearPrev.current = window.setTimeout(() => setPrev(null), 1500);
    },
    [active],
  );

  useEffect(() => () => window.clearTimeout(clearPrev.current), []);

  useEffect(() => {
    const nextDomain = HOME_DOMAINS[(active + 1) % N];
    const image = new Image();
    image.fetchPriority = 'low';
    image.decoding = 'async';
    image.src = nextDomain.heroImage;
  }, [active]);

  useEffect(() => {
    if (!ready || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setTimeout(() => goTo(active + 1), DURATION);
    return () => window.clearTimeout(timer);
  }, [active, goTo, paused, ready]);

  const next = () => goTo(active + 1);
  const back = () => goTo(active - 1);
  const activeDomain = HOME_DOMAINS[active];

  return (
    <section
      className="hero relative isolate overflow-hidden text-white"
      data-ready={ready}
      data-paused={paused}
      style={{ ['--dur' as string]: `${DURATION}ms` } as React.CSSProperties}
      aria-roledescription="carrousel"
      aria-label="Nos trois domaines d’intervention"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 55) (dx < 0 ? next : back)();
      }}
    >
      <h1 className="sr-only">Cabinet CABIS — Bureau d’études d’ingénierie conseil : travaux publics, bâtiments, télécommunications</h1>

      {/* ───── 1. IMAGES : diaporama plein écran (le "bas du fond" qui change avec le domaine) ───── */}
      <div className="hero-media" aria-hidden="true">
        {HOME_DOMAINS.map((s, i) => (
          <div key={s.id} className="hero-slide" data-state={i === active ? 'active' : i === prev ? 'prev' : 'idle'}>
            {(i === active || i === prev) && (
              <img
                src={s.heroImage}
                alt=""
                className="hero-img"
                style={{ ['--pos' as string]: s.heroPos, ['--w' as string]: s.heroWidth ?? '100%' } as React.CSSProperties}
                draggable={false}
                loading={i === active ? 'eager' : 'lazy'}
                fetchPriority={i === active ? 'high' : 'low'}
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-grid" />
      <div key={`edge-${active}`} className="hero-edge" />

      {/* ───── 2. CONTENU ───── */}
      <div
        className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-1 items-center justify-center py-10 text-center sm:py-12 lg:py-10">
          <div className="grid w-full justify-items-center">
            <div
              key={activeDomain.id}
              className="hero-copy w-full max-w-3xl"
              data-active="true"
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${active + 1} sur ${N}`}
            >
              <div className="hero-anim mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2" style={d(0)}>
                <span className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] backdrop-blur-sm sm:text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FF6A21]" />
                  Agréé CHANIE N° 28/2018
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FF8A4D] sm:text-xs">
                  {activeDomain.num} — {activeDomain.kicker}
                </span>
              </div>

              <h2 className="font-display text-[2.6rem] font-black uppercase leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.8rem] xl:text-[5.2rem]">
                <span className="hero-mask">
                  <span className="hero-mask-in" style={d(0.08)}>
                    {activeDomain.titleTop}
                  </span>
                </span>
                <span className="hero-mask">
                  <span className="hero-mask-in text-[#FF6A21]" style={d(0.2)}>
                    {activeDomain.titleAccent}
                  </span>
                </span>
              </h2>

              <p
                className="hero-anim mx-auto mt-5 max-w-xl border-b-[3px] border-[#D94800] pb-3 text-sm font-light leading-relaxed text-slate-100 sm:text-lg"
                style={d(0.34)}
              >
                {activeDomain.description}
              </p>

              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {activeDomain.points.map((p, k) => (
                  <li
                    key={p}
                    className="hero-anim border border-white/20 bg-[#222931]/55 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs"
                    style={d(0.46 + k * 0.08)}
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <div className="hero-anim mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row" style={d(0.74)}>
                <button onClick={() => onNavigate('contacts')} className="buildrite-btn-primary">
                  <span>Parler à nos ingénieurs</span>
                </button>
                <button onClick={() => onNavigate('activities')} className="buildrite-btn-outline">
                  <span>Découvrir ce domaine</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compteur vertical (grands écrans) */}
        <div className="absolute right-4 top-1/2 hidden -translate-y-[62%] flex-col items-center gap-3 lg:flex xl:right-8">
          <button onClick={back} aria-label="Domaine précédent" className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/5 backdrop-blur-sm transition hover:border-[#FF6A21] hover:bg-[#D94800]">
            <ChevronUp className="h-5 w-5" />
          </button>
          <div key={active} className="hero-num font-display text-5xl font-black leading-none">
            {HOME_DOMAINS[active].num}
          </div>
          <div className="relative h-20 w-[3px] overflow-hidden bg-white/25">
            <div key={`v-${active}`} className="hero-progress hero-progress-v" />
          </div>
          <div className="font-display text-sm font-bold tracking-widest text-white/60">0{N}</div>
          <button onClick={next} aria-label="Domaine suivant" className="flex h-10 w-10 items-center justify-center border border-white/30 bg-white/5 backdrop-blur-sm transition hover:border-[#FF6A21] hover:bg-[#D94800]">
            <ChevronDown className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause'}
            className="mt-1 flex h-8 w-8 items-center justify-center text-white/70 transition hover:text-[#FF6A21]"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>

      </div>
    </section>
  );
};
