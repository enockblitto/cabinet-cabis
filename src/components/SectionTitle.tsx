import React from 'react';
import { Reveal } from './Reveal';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}

/** En-tête de section homogène : surtitre + trait animé, titre, sous-titre. */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
}) => {
  const center = align === 'center';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <div className={`eyebrow mb-3 ${center ? 'justify-center' : ''}`}>
          <span>{eyebrow}</span>
          <i className="eyebrow-line" />
        </div>
      </Reveal>
      <Reveal delay={90} variant="mask">
        <h2
          className={`font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
            tone === 'dark' ? 'text-white' : 'text-[#1F252B]'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={200}>
          <p className={`mt-4 text-sm font-light leading-relaxed sm:text-base ${tone === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};
