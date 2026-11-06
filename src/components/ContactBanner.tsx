import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/cabisData';

interface ContactBannerProps {
  onContactClick: () => void;
}

export const ContactBanner: React.FC<ContactBannerProps> = ({ onContactClick }) => {
  return (
    <section className="w-full bg-[#15244c] text-white py-16 px-4 sm:px-8 bg-blueprint-dark border-t border-b border-white/10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#f37021] bg-white/10 px-3 py-1 rounded">
          Consultation & Partenariat BTP
        </div>

        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
          Nous pouvons vous accompagner dans la réussite de votre projet.
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Nous sommes impatients de collaborer avec vous pour réaliser des projets qui auront un impact durable sur l'urbanisme et le cadre de vie en Côte d'Ivoire.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onContactClick}
            className="emebci-btn-primary"
          >
            <span>Prendre contact avec nous</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${COMPANY_INFO.phones[0].replace(/\s/g, '')}`}
            className="emebci-btn-outline"
          >
            <PhoneCall className="w-4 h-4 text-[#f37021]" />
            <span>{COMPANY_INFO.phones[0]}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
