import React, { useEffect, useState } from 'react';
import { prefersReducedMotion, useInView } from '../hooks/useInView';

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Compteur animé : démarre quand il devient visible. */
export const CountUp: React.FC<CountUpProps> = ({ to, suffix = '', duration = 1800, className = '' }) => {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
};
