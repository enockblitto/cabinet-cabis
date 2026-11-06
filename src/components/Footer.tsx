import React from 'react';
import { assetUrl } from '../utils/assets';

import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/cabisData';
import { Reveal } from './Reveal';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const QUICK_LINKS = [
  { label: 'Accueil', page: 'home' },
  { label: 'Le groupe & direction', page: 'about' },
  { label: 'Nos pôles d’ingénierie', page: 'activities' },
  { label: 'Nos réalisations', page: 'projects' },
  { label: 'Nous contacter', page: 'contacts' },
];

const EXPERTISES = [
  'Bâtiments & structures',
  'Travaux publics & VRD',
  'Hydraulique & assainissement',
  'Pylônes GSM & énergie',
  'Contrôle & visa de plans',
];

const ColumnHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-5 flex items-center gap-3 font-display text-[11px] font-black uppercase tracking-[0.18em] text-white">
    <span className="h-px w-5 bg-[#D94800]" />
    {children}
  </h3>
);

const FooterNavLink: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 text-left text-xs font-medium text-slate-400 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A4D]"
  >
    <span className="h-px w-0 bg-[#FF8A4D] transition-[width] duration-300 group-hover:w-3" />
    <span>{children}</span>
  </button>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
  <footer className="relative overflow-hidden border-t border-white/10 bg-[#262D34] text-white">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#31899B] to-transparent opacity-80" />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
        <Reveal delay={0} className="sm:col-span-2 lg:col-span-4">
          <div className="space-y-4">
            <img
              src={assetUrl('/images/logo-footer.webp')}
              alt="Cabinet CABIS — Ingénierie conseil"
              className="h-auto w-full max-w-[300px] object-contain object-left"
              width="640"
              height="243"
              loading="lazy"
              decoding="async"
            />
            <p className="max-w-sm text-xs font-light leading-relaxed text-slate-400">
              Cabinet d’Ingénierie Sangan (CABIS SARLU), bureau d’études agréé auprès de la Chambre Nationale des Ingénieurs Conseils et Experts de Côte d’Ivoire.
            </p>
            <div className="inline-flex border-l-2 border-[#D94800] bg-white/[0.04] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-300">
              Agrément CHANIE N° {COMPANY_INFO.chanieNumber}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-2">
          <ColumnHeading>Liens rapides</ColumnHeading>
          <nav aria-label="Liens rapides du pied de page" className="flex flex-col items-start gap-3">
            {QUICK_LINKS.map((link) => (
              <FooterNavLink key={link.page} onClick={() => onNavigate(link.page)}>
                {link.label}
              </FooterNavLink>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={180} className="lg:col-span-3">
          <ColumnHeading>Nos expertises</ColumnHeading>
          <ul className="flex flex-col items-start gap-3">
            {EXPERTISES.map((expertise) => (
              <li key={expertise}>
                <FooterNavLink onClick={() => onNavigate('activities')}>{expertise}</FooterNavLink>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={260} className="lg:col-span-3">
          <ColumnHeading>Coordonnées</ColumnHeading>
          <div className="space-y-4 text-xs text-slate-300">
            {COMPANY_INFO.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#FF8A4D] transition-transform duration-300 group-hover:rotate-[-8deg]" />
                <span>{phone}</span>
                <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            ))}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="group flex items-start gap-3 break-all transition-colors duration-300 hover:text-white"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A4D]" />
              <span>{COMPANY_INFO.email}</span>
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
            <div className="flex items-start gap-3 leading-relaxed text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A4D]" />
              <span>{COMPANY_INFO.address}, {COMPANY_INFO.city}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 py-5 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Cabinet CABIS SARLU. Tous droits réservés.</p>
        <p className="font-semibold uppercase tracking-[0.12em]">Agréé CHANIE N° {COMPANY_INFO.chanieNumber}</p>
      </div>
    </div>
  </footer>
);
