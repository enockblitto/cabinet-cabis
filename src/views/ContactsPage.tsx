import React, { useEffect, useState } from 'react';
import {
  Check, Clock, Copy, ExternalLink, Mail, MapPin, MessageSquare, Navigation, Phone, Send, Layers, Map as MapIcon,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/cabisData';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';

interface ContactsPageProps {
  onNavigate: (page: string) => void;
}

/** Position exacte du cabinet (fiche Google Maps « Cabinet CABIS ») */
const LAT = 5.3936471;
const LNG = -3.9897869;
const MAPS_SHORT_LINK = 'https://maps.app.goo.gl/GFFeS8hic8ScaiqB7';
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const embedUrl = (satellite: boolean) =>
  `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&t=${satellite ? 'k' : 'm'}&hl=fr&output=embed`;

const WHATSAPP = '2250707313530';

/** Abidjan est à UTC+0 : on lit l'heure UTC pour savoir si le siège est ouvert. */
function getOpenStatus(now = new Date()) {
  const day = now.getUTCDay();
  const mins = now.getUTCHours() * 60 + now.getUTCMinutes();
  const range = day >= 1 && day <= 5 ? [480, 1080] : day === 6 ? [510, 780] : null;
  if (range && mins >= range[0] && mins < range[1]) {
    return { open: true, label: 'Ouvert maintenant', detail: day === 6 ? 'Jusqu’à 13h00' : 'Jusqu’à 18h00' };
  }
  return { open: false, label: 'Fermé actuellement', detail: 'Réouverture : lundi–vendredi dès 08h00' };
}

const CopyButton: React.FC<{ value: string; label: string; light?: boolean }> = ({ value, label, light }) => {
  const [done, setDone] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copy = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 3000);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copyFailed ? `Copie impossible pour ${label}` : `Copier ${label}`}
      className={`inline-flex h-8 items-center gap-1.5 px-2.5 text-[10px] font-black uppercase tracking-wider transition-colors ${
        copyFailed ? 'bg-red-700 text-white' : done ? 'bg-green-600 text-white' : light ? 'bg-white/10 text-white hover:bg-[#D94800]' : 'bg-slate-100 text-[#1F252B] hover:bg-[#D94800] hover:text-white'
      }`}
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copyFailed ? 'Copie impossible' : done ? 'Copié' : 'Copier'}
    </button>
  );
};

export const ContactsPage: React.FC<ContactsPageProps> = ({ onNavigate }) => {
  const [status, setStatus] = useState(getOpenStatus());
  const [satellite, setSatellite] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const messageText = () =>
    `Bonjour Cabinet CABIS,\n\n${form.message}\n\n— ${form.name}\nTél : ${form.phone}\nEmail : ${form.email}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Demande de projet${form.subject ? ` — ${form.subject}` : ''}`;
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText())}`;
    setDraftReady(true);
  };

  const field = (key: keyof typeof form, label: string, type = 'text', required = false) => (
    <div className="field">
      <input
        id={`f-${key}`}
        type={type}
        required={required}
        placeholder=" "
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
      <label htmlFor={`f-${key}`}>{label}{required ? ' *' : ''}</label>
      <span className="field-bar" />
    </div>
  );

  return (
    <div className="w-full bg-white text-[#474747]">
      <PageHero
        onHome={() => onNavigate('home')}
        crumb="Contacts"
        eyebrow="Contacts & localisation"
        titleLines={['Contactez notre', 'bureau d’études']}
        subtitle="Nos ingénieurs et notre direction technique sont à votre écoute pour évaluer vos projets, analyser vos plans de structures et vous transmettre un devis détaillé sous 24 heures."
        ghost="225"
        chips={['Devis sous 24 h', 'Angré 7e Tranche, Cocody', 'Lun–Ven 08h–18h']}
      />

      {/* ───── Coordonnées + carte ───── */}
      <section className="bg-[#F3F5F7] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-4 lg:col-span-5">
            {/* Ouvert / fermé en direct */}
            <Reveal>
              <div className="flex items-center gap-4 bg-[#2B333B] p-6 text-white">
                <span className={`live-dot h-3.5 w-3.5 shrink-0 rounded-full ${status.open ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="flex-1">
                  <div className="font-display text-lg font-black uppercase tracking-wide">{status.label}</div>
                  <div className="text-xs font-light text-slate-300">{status.detail}</div>
                </div>
                <Clock className="h-6 w-6 text-[#FF8A4D]" />
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="group border border-slate-200 bg-white p-6 transition-all duration-500 hover:border-[#D94800] hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#D94800] text-white transition-transform duration-500 group-hover:-rotate-6">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[11px] font-black uppercase tracking-widest text-[#D94800]">Siège social</div>
                    <h3 className="font-display text-lg font-black uppercase text-[#1F252B]">Abidjan, Cocody</h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-slate-600">
                      {COMPANY_INFO.address}
                      <br />
                      {COMPANY_INFO.cadastre} • {COMPANY_INFO.bp}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 bg-[#2B333B] px-3 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-[#D94800]">
                        <Navigation className="h-3.5 w-3.5" /> Itinéraire
                      </a>
                      <CopyButton value={`${COMPANY_INFO.address}, ${COMPANY_INFO.city}`} label="l’adresse" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="group border border-slate-200 bg-white p-6 transition-all duration-500 hover:border-[#D94800] hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#D94800] text-white transition-transform duration-500 group-hover:-rotate-6">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[11px] font-black uppercase tracking-widest text-[#D94800]">Lignes directes</div>
                    <h3 className="font-display text-lg font-black uppercase text-[#1F252B]">Téléphone</h3>
                    <ul className="mt-2 space-y-2">
                      {COMPANY_INFO.phones.map((ph, i) => (
                        <li key={ph} className="flex items-center justify-between gap-3 text-sm">
                          <a href={`tel:${ph.replace(/\s/g, '')}`} className="font-semibold text-[#1F252B] transition-colors hover:text-[#D94800]">
                            <span className="mr-2 text-[10px] font-black uppercase tracking-wider text-slate-400">{i === 0 ? 'Mobile' : 'Fixe'}</span>
                            {ph}
                          </a>
                          <CopyButton value={ph} label={ph} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={270}>
              <div className="group border border-slate-200 bg-white p-6 transition-all duration-500 hover:border-[#D94800] hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#D94800] text-white transition-transform duration-500 group-hover:-rotate-6">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[11px] font-black uppercase tracking-widest text-[#D94800]">Courriel officiel</div>
                    <h3 className="font-display text-lg font-black uppercase text-[#1F252B]">Écrivez-nous</h3>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="mt-1 block break-all text-sm font-semibold text-[#1F252B] transition-colors hover:text-[#D94800]">
                      {COMPANY_INFO.email}
                    </a>
                    <p className="mt-1 text-xs font-light text-slate-500">Agrément CHANIE N° {COMPANY_INFO.chanieNumber}</p>
                    <div className="mt-3">
                      <CopyButton value={COMPANY_INFO.email} label="l’adresse email" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Carte Google Maps */}
          <div className="lg:col-span-7">
            <Reveal variant="right">
              <div className="relative h-[460px] overflow-hidden border border-slate-300 bg-slate-200 shadow-2xl sm:h-[560px] lg:h-full lg:min-h-[600px]">
                {!mapLoaded && <div className="shimmer absolute inset-0" />}
                <iframe
                  key={satellite ? 'sat' : 'plan'}
                  title="Localisation du Cabinet CABIS à Angré, Cocody, Abidjan"
                  src={embedUrl(satellite)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="absolute inset-0 h-full w-full border-0 transition-[filter] duration-700 [filter:saturate(0.85)_contrast(1.03)] hover:[filter:none]"
                />

                {/* Carte d'identité flottante */}
                <div className="pointer-events-none absolute left-3 top-3 max-w-[78%] bg-[#2B333B]/95 p-4 text-white shadow-xl backdrop-blur-sm sm:left-5 sm:top-5 sm:max-w-xs">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="pin-pulse absolute inset-0 rounded-full bg-[#FF6A21]" />
                      <span className="relative h-3 w-3 rounded-full bg-[#FF6A21]" />
                    </span>
                    <span className="font-display text-sm font-black uppercase tracking-wider">Cabinet CABIS</span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-light leading-snug text-slate-300">{COMPANY_INFO.address}, {COMPANY_INFO.city}</p>
                </div>

                {/* Commandes */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="flex bg-white shadow-lg" role="group" aria-label="Type de carte">
                    {[
                      { sat: false, label: 'Plan', icon: MapIcon },
                      { sat: true, label: 'Satellite', icon: Layers },
                    ].map((o) => (
                      <button
                        key={o.label}
                        onClick={() => { setMapLoaded(false); setSatellite(o.sat); }}
                        aria-pressed={satellite === o.sat}
                        className={`flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-colors ${
                          satellite === o.sat ? 'bg-[#D94800] text-white' : 'text-[#1F252B] hover:bg-slate-100'
                        }`}
                      >
                        <o.icon className="h-3.5 w-3.5" />
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="buildrite-btn-primary !px-4 !py-2.5 !text-[11px] shadow-lg">
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Itinéraire</span>
                    </a>
                    <a href={MAPS_SHORT_LINK} target="_blank" rel="noreferrer" aria-label="Ouvrir dans Google Maps" className="flex items-center justify-center bg-white px-3 text-[#1F252B] shadow-lg transition-colors hover:bg-[#2B333B] hover:text-white">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───── Formulaire + WhatsApp ───── */}
      <section className="relative overflow-hidden bg-[#262D34] py-16 text-white sm:py-24">
        <div className="blueprint blueprint-drift pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <SectionTitle tone="dark" eyebrow="Formulaire de contact" title="Envoyez-nous un message" />
            <Reveal delay={150}>
              {draftReady ? (
                <div className="card-in mt-8 border border-white/15 bg-white/5 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#D94800]">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-black uppercase">Votre message est prêt</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm font-light text-slate-300">
                    Vérifiez le brouillon puis cliquez sur « Envoyer » dans votre messagerie. Le site ne peut pas confirmer sa réception. Si aucune messagerie ne s’ouvre, envoyez votre message par WhatsApp.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(messageText())}`} target="_blank" rel="noreferrer" className="buildrite-btn-primary">
                      <MessageSquare className="h-4 w-4" />
                      <span>Envoyer par WhatsApp</span>
                    </a>
                    <button onClick={() => setDraftReady(false)} className="buildrite-btn-outline">
                      <span>Modifier le message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  {field('name', 'Nom complet', 'text', true)}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {field('email', 'Adresse email', 'email', true)}
                    {field('phone', 'Téléphone', 'tel', true)}
                  </div>
                  {field('subject', 'Objet / nature du projet (ex : structure R+5 à Cocody)')}
                  <div className="field">
                    <textarea
                      id="f-message"
                      rows={5}
                      required
                      placeholder=" "
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    <label htmlFor="f-message">Décrivez votre projet, vos exigences ou vos délais *</label>
                    <span className="field-bar" />
                  </div>
                  <button type="submit" className="buildrite-btn-primary w-full justify-center py-4">
                    <Send className="h-4 w-4" />
                    <span>Préparer l’envoi du message</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>

          <div className="space-y-6 lg:col-span-5 lg:pt-4">
            <Reveal delay={200} variant="right">
              <div className="border border-white/15 bg-white/[0.05] p-8 backdrop-blur-sm">
                <h3 className="font-display text-base font-black uppercase tracking-wider">Horaires d’ouverture du siège</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-slate-300">{COMPANY_INFO.officeHours}</p>
                <div className="mt-4 border-l-4 border-[#D94800] bg-white/10 p-4 text-xs font-light leading-relaxed text-slate-100">
                  <strong className="font-bold">Permanence urgences chantiers :</strong> nos ingénieurs sont joignables 7j/7 pour les coulages de béton et les réceptions de ferraillage.
                </div>
              </div>
            </Reveal>
            <Reveal delay={320} variant="right">
              <div className="relative overflow-hidden bg-[#D94800] p-8">
                <MessageSquare className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 text-white/10" />
                <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">Échange rapide</div>
                <h3 className="mt-1 font-display text-xl font-black uppercase">Contact direct par WhatsApp</h3>
                <p className="mt-2 text-sm font-light text-white/90">
                  Transmettez vos plans architecturaux en PDF pour une estimation préliminaire rapide du coût et du délai d’étude.
                </p>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#D94800] transition-transform hover:-translate-y-0.5">
                  <MessageSquare className="h-4 w-4" />
                  Ouvrir WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};
