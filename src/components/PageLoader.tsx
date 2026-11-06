import React, { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../utils/assets';

import { prefersReducedMotion } from '../hooks/useInView';

interface PageLoaderProps {
  /** Appelé quand les volets commencent à s'ouvrir : le site peut lancer ses animations d'entrée */
  onReveal: () => void;
  /** Appelé quand le loader est entièrement terminé (on peut le retirer du DOM) */
  onFinish: () => void;
}

const STAGES = ['Implantation', 'Fondations', 'Structure', 'Finitions'];
const STAGE_AT = [0, 25, 55, 85];

/** Ressources réellement attendues avant d'ouvrir le site. */
const PRELOAD = [
  assetUrl('/images/logo-header.webp'),
  assetUrl('/images/hero/hero_tp.webp'),
];

const style = (d: number, dur?: number) =>
  ({ ['--d' as string]: `${d}s`, ...(dur ? { ['--dur' as string]: `${dur}s` } : {}) }) as React.CSSProperties;

export const PageLoader: React.FC<PageLoaderProps> = ({ onReveal, onFinish }) => {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const cbRef = useRef({ onReveal, onFinish });
  cbRef.current = { onReveal, onFinish };

  // Bloque le scroll pendant le chargement
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // Progression = réel (polices + images + page) ET durée minimale pour laisser la "construction" se jouer
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const MIN = reduce ? 800 : 3500;
    const MAX = 9000;
    const t0 = performance.now();
    let done = 0;
    const total = PRELOAD.length + 1;
    const mark = () => {
      done += 1;
    };

    PRELOAD.forEach((src) => {
      const img = new Image();
      img.onload = mark;
      img.onerror = mark;
      img.src = src;
    });
    if (document.readyState === 'complete') mark();
    else window.addEventListener('load', mark, { once: true });

    let cur = 0;
    let raf = 0;
    const timers: number[] = [];
    let exitStarted = false;
    const beginExit = () => {
      if (exitStarted) return;
      exitStarted = true;
      setPct(100);
      setExiting(true);
      timers.push(window.setTimeout(() => cbRef.current.onReveal(), reduce ? 100 : 650));
      timers.push(window.setTimeout(() => cbRef.current.onFinish(), reduce ? 400 : 1600));
    };

    const tick = (now: number) => {
      const el = now - t0;
      const t = Math.min(el / MIN, 1);
      const timeP = t < 0.5 ? 0.5 * Math.pow(2 * t, 1.6) : 1 - 0.5 * Math.pow(2 - 2 * t, 1.6);
      const realP = done / total;
      const target = el > MAX ? 1 : Math.min(timeP, realP);
      const safeTarget = Number.isFinite(target) ? Math.min(Math.max(target, 0), 1) : 0;
      cur += (safeTarget - cur) * 0.18;
      if (!Number.isFinite(cur)) cur = 0;
      if (target >= 1 && cur > 0.995) cur = 1;
      const next = Math.round(cur * 100);
      setPct((p) => (p === next ? p : next));

      if (cur >= 1) {
        timers.push(window.setTimeout(beginExit, reduce ? 100 : 500));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    timers.push(window.setTimeout(beginExit, MAX));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
      window.removeEventListener('load', mark);
    };
  }, []);

  const stageIndex = STAGE_AT.reduce((acc, at, i) => (pct >= at ? i : acc), 0);

  return (
    <div className={`ld-root ${exiting ? 'ld-exit' : ''}`} role="status" aria-live="polite" aria-label="Chargement du site Cabinet CABIS">
      <div className="ld-panel ld-panel-top" />
      <div className="ld-panel ld-panel-bot" />
      <div className="ld-seam" />

      <div className="ld-content">
        <span className="ld-scan" />
        <span className="ld-corner tl" />
        <span className="ld-corner tr" />
        <span className="ld-corner bl" />
        <span className="ld-corner br" />
        <span className="ld-meta" style={{ top: 26, left: 62 }}>
          Plan n° 28/2018
        </span>
        <span className="ld-meta" style={{ bottom: 26, right: 62 }}>
          Abidjan · Côte d’Ivoire
        </span>

        <div className="ld-lockup">
          {/* ---------- LOGO CONSTRUIT PIÈCE PAR PIÈCE ---------- */}
          <svg className="ld-svg" viewBox="0 0 300 186" aria-hidden="true">
            <defs>
              <linearGradient id="ldFaceL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3F82FF" />
                <stop offset="1" stopColor="#1A3FA6" />
              </linearGradient>
              <linearGradient id="ldFaceR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2D62EE" />
                <stop offset="1" stopColor="#102C7C" />
              </linearGradient>
              <radialGradient id="ldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#FFB04A" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FFB04A" stopOpacity="0" />
              </radialGradient>
              <clipPath id="ldClipL">
                <polygon points="61,74 102,50 145,68 145,100 102,131 61,114" />
              </clipPath>
              <clipPath id="ldClipR">
                <polygon points="231,74 189,50 145,68 145,100 189,131 231,114" />
              </clipPath>
            </defs>

            {/* halo d'achèvement */}
            <ellipse className="ld-flash" style={style(2.55)} cx="150" cy="96" rx="130" ry="80" fill="url(#ldGlow)" />

            {/* cadre double (trait qui se dessine) */}
            <path
              className="ld-draw"
              style={style(0.05, 1.0)}
              pathLength={1}
              d="M53 14 H247 A28 28 0 0 1 275 42 V144 A28 28 0 0 1 247 172 H53 A28 28 0 0 1 25 144 V42 A28 28 0 0 1 53 14 Z"
              fill="none"
              stroke="#31899B"
              strokeWidth="5"
            />
            <path
              className="ld-draw"
              style={style(0.3, 1.0)}
              pathLength={1}
              d="M53 20 H247 A22 22 0 0 1 269 42 V144 A22 22 0 0 1 247 166 H53 A22 22 0 0 1 31 144 V42 A22 22 0 0 1 53 20 Z"
              fill="none"
              stroke="#BFE3EA"
              strokeWidth="0.9"
              strokeOpacity="0.7"
            />

            {/* poteaux rouges qui s'élèvent */}
            <rect className="ld-grow" style={style(0.6, 0.55)} x="56" y="32" width="6" height="120" fill="#D32A1B" />
            <rect className="ld-grow" style={style(0.72, 0.55)} x="231" y="32" width="6" height="120" fill="#D32A1B" />

            {/* hexagones : étages qui montent */}
            <polygon className="ld-grow" style={style(0.9, 0.6)} points="61,74 102,50 145,68 145,100 102,131 61,114" fill="#FF3B00" />
            <polygon className="ld-grow" style={style(1.02, 0.6)} points="231,74 189,50 145,68 145,100 189,131 231,114" fill="#9A3300" />
            <g clipPath="url(#ldClipL)" stroke="#fff" strokeOpacity="0.38" strokeWidth="0.9">
              <line className="ld-draw" style={style(1.45, 0.5)} pathLength={1} x1="55" y1="84" x2="150" y2="84" />
              <line className="ld-draw" style={style(1.52, 0.5)} pathLength={1} x1="55" y1="98" x2="150" y2="98" />
              <line className="ld-draw" style={style(1.59, 0.5)} pathLength={1} x1="55" y1="112" x2="150" y2="112" />
            </g>
            <g clipPath="url(#ldClipR)" stroke="#fff" strokeOpacity="0.3" strokeWidth="0.9">
              <line className="ld-draw" style={style(1.55, 0.5)} pathLength={1} x1="235" y1="84" x2="140" y2="84" />
              <line className="ld-draw" style={style(1.62, 0.5)} pathLength={1} x1="235" y1="98" x2="140" y2="98" />
              <line className="ld-draw" style={style(1.69, 0.5)} pathLength={1} x1="235" y1="112" x2="140" y2="112" />
            </g>

            {/* cube : faces latérales qui glissent... */}
            <polygon className="ld-slide-l" style={style(1.7, 0.4)} points="102,88 146,105 146,149 102,131" fill="url(#ldFaceL)" stroke="#0B2A82" strokeWidth="1" strokeLinejoin="round" />
            <polygon className="ld-slide-r" style={style(1.82, 0.4)} points="146,105 190,88 190,131 146,149" fill="url(#ldFaceR)" stroke="#0B2A82" strokeWidth="1" strokeLinejoin="round" />

            {/* ... puis la face supérieure est posée à la grue */}
            <g className="ld-drop" style={style(1.95)}>
              <polygon points="146,68 190,88 146,105 102,88" fill="#9CCBFF" stroke="#0B2A82" strokeWidth="1" strokeLinejoin="round" />
              <g className="ld-retract" style={style(2.9)}>
                <line x1="146" y1="-700" x2="146" y2="54" stroke="#FFC03D" strokeWidth="1.4" />
                <line x1="146" y1="58" x2="102" y2="88" stroke="#FFC03D" strokeWidth="1" />
                <line x1="146" y1="58" x2="190" y2="88" stroke="#FFC03D" strokeWidth="1" />
                <circle cx="146" cy="56" r="4.2" fill="none" stroke="#FFC03D" strokeWidth="1.8" />
              </g>
            </g>

            {/* poutres de toit posées en dernier */}
            <line className="ld-draw" style={style(2.35, 0.5)} pathLength={1} x1="36" y1="79" x2="144" y2="33" stroke="#D32A1B" strokeWidth="6" />
            <line className="ld-draw" style={style(2.45, 0.5)} pathLength={1} x1="168" y1="36" x2="264" y2="80" stroke="#D32A1B" strokeWidth="6" />
          </svg>

          {/* ---------- NOM ---------- */}
          <div className="ld-word">
            <div className="ld-cab">CABINET</div>
            <div className="ld-cabis" aria-label="CABIS">
              {'CABIS'.split('').map((l, i) => (
                <span key={i} style={{ ['--i' as string]: i } as React.CSSProperties}>
                  {l}
                </span>
              ))}
            </div>
            <div className="ld-rule" />
            <div className="ld-tag">Bureau d’études d’ingénierie conseil</div>
            <div className="ld-sub">VRD · Route · Bâtiment · Télécom</div>
          </div>
        </div>

        {/* ---------- PROGRESSION ---------- */}
        <div className="ld-progress">
          <div className="flex items-baseline justify-between text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
            <span>{STAGES[stageIndex]}…</span>
            <span className="tabular-nums text-[#FFB04A]">{pct}%</span>
          </div>
          <div className="ld-bar">
            <div className="ld-bar-fill" style={{ transform: `scaleX(${pct / 100})` }} />
            <div className="ld-bar-head" style={{ left: `${pct}%` }} />
            {STAGE_AT.slice(1).map((at) => (
              <span key={at} className="ld-tick" style={{ left: `${at}%` }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1 text-center">
            {STAGES.map((s, i) => (
              <span key={s} className="ld-stage" data-on={i <= stageIndex}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
