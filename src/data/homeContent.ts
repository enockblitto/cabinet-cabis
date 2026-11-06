import { DOMAINES_DATA } from './cabisData';

import { assetUrl } from '../utils/assets';

export interface HomeDomain {
  id: 'tp' | 'batiments' | 'gsm';
  num: string;
  short: string;
  titleTop: string;
  titleAccent: string;
  kicker: string;
  description: string;
  points: string[];
  heroImage: string;
  /** Cadrage de l'image plein écran (pour que le sujet reste à droite du texte) */
  heroPos: string;
  heroWidth?: string;
}

const byId = (id: string) => DOMAINES_DATA.find((d) => d.id === id)!;

/** Les 3 domaines : alimentent à la fois le diaporama d'accueil et les panneaux "domaines". */
export const HOME_DOMAINS: HomeDomain[] = [
  {
    id: 'tp',
    num: '01',
    short: 'Travaux publics & VRD',
    titleTop: 'Travaux publics',
    titleAccent: '& VRD',
    kicker: byId('tp').subtitle,
    description: byId('tp').description,
    points: ['Voirie & réseaux divers', 'Assainissement & drainage', 'Adduction d’eau potable'],
    heroImage: assetUrl('/images/hero/hero_tp.webp'),
    heroPos: '55% 12%',
    heroWidth: '118%',
  },
  {
    id: 'batiments',
    num: '02',
    short: 'Bâtiments & Génie civil',
    titleTop: 'Bâtiments',
    titleAccent: '& génie civil',
    kicker: byId('batiments').subtitle,
    description: byId('batiments').description,
    points: ['Béton armé jusqu’à R+14', 'Charpente métallique', 'Plans d’exécution & ferraillage'],
    heroImage: assetUrl('/images/hero/hero_batiments.webp'),
    heroPos: 'center 20%',
  },
  {
    id: 'gsm',
    num: '03',
    short: 'Télécoms GSM & Énergie',
    titleTop: 'Télécoms GSM',
    titleAccent: '& énergie',
    kicker: byId('gsm').subtitle,
    description: byId('gsm').description,
    points: ['Pylônes autoportants & haubanés', 'Fondations spéciales', 'Postes électriques HT'],
    heroImage: assetUrl('/images/hero/hero_telecom.webp'),
    heroPos: '70% 30%',
  },
];

/** Les 4 piliers de la mission officielle du cabinet. */
export const MISSIONS = [
  {
    num: '01',
    title: 'Études',
    text: 'Calculs de structures béton armé et charpentes métalliques, dimensionnement des réseaux VRD, relevés topographiques et ouvrages hydrauliques.',
  },
  {
    num: '02',
    title: 'Suivi',
    text: 'Dossiers d’appel d’offres, CCTP, quantitatifs estimatifs, plans d’exécution et de ferraillage, suivi rigoureux de l’avancement des chantiers.',
  },
  {
    num: '03',
    title: 'Contrôle',
    text: 'Contrôle de conformité, essais au scléromètre et au ferroscan, cône d’Abrams, audits de stabilité et expertises de pathologie des ouvrages.',
  },
  {
    num: '04',
    title: 'Maîtrise d’œuvre & d’ouvrage',
    text: 'Pilotage des projets de la conception à la réception, avec architectes, ingénieurs et entrepreneurs, pour un impact positif et durable.',
  },
];
