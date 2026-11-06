import { ProjectItem } from '../utils/filterProjects';

import { assetUrl } from '../utils/assets';

export interface CompanyInfo {
  name: string;
  fullName: string;
  tagline: string;
  chanieNumber: string;
  chanieDate: string;
  phones: string[];
  email: string;
  secondaryEmail: string;
  address: string;
  cadastre: string;
  bp: string;
  city: string;
  country: string;
  officeHours: string;
  mission: string;
  aboutText: {
    welcome: string;
    chanieIntro: string;
    excellence: string;
    collaboration: string;
    future: string;
  };
  moyensTechniques: {
    logiciels: string[];
    materielTerrain: string[];
    essaisControles: string[];
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: "Cabinet CABIS",
  fullName: "Cabinet CABIS SARLU - Cabinet d'Ingénierie Sangan",
  tagline: "Bureau d'études d'ingénierie conseil & Maîtrise d'œuvre",
  chanieNumber: "28/2018",
  chanieDate: "25/01/2018",
  phones: ["+225 07 07 31 35 30", "+225 27 22 55 29 52", "+225 27 22 50 35 48"],
  email: "cabinetcabissarl@gmail.com",
  secondaryEmail: "contact@cabinetcabis.ci",
  address: "Angré 7ième Tranche, Carrefour les Oscars",
  cadastre: "Lot 3674, Îlot 299",
  bp: "20 BP 150 Abidjan 20",
  city: "Cocody, Abidjan",
  country: "Côte d'Ivoire",
  officeHours: "Lundi - Vendredi: 08h00 - 18h00 | Samedi: 08h30 - 13h00",
  mission: "Notre mission est de réaliser les études, le suivi, le contrôle, la maîtrise d’œuvre et d’ouvrage dans le domaine du Génie civil et rural, des infrastructures, du bâtiment, de l’assainissement et des VRD qui répondent aux besoins actuels et anticipent les défis futurs.",
  aboutText: {
    welcome: "Bienvenue à toutes et à tous au sein du Cabinet CABIS sarlu.",
    chanieIntro: "En notre qualité de Gérant de cette Entreprise qui est un Bureau d’étude affilié à la Chambre Nationale des Ingénieurs Conseils et Experts de Génie Civil et Bâtiments de Côte d’Ivoire (CHANIE) sous le numéro 28/2018 depuis le 25/01/2018, nous sommes ravis de vous accueillir au sein d’une vaillante et dynamique équipe. Notre mission est de réaliser les études, le suivi, le contrôle, la maîtrise d’œuvre et d’ouvrage dans le domaine du Génie civil et rural, des infrastructures, du bâtiment, de l’assainissement et des VRD qui, non seulement, répondent aux besoins actuels, mais aussi anticipent les défis futurs.",
    excellence: "Nous nous engageons à respecter les normes les plus élevées en matière de sécurité et de qualité. Chaque projet que nous entreprenons est le fruit d'une planification rigoureuse et d'une exécution précise, garantissant ainsi la satisfaction de nos clients et le bien-être des populations.",
    collaboration: "Nous croyons fermement que la collaboration est la clé du succès. C'est pourquoi nous travaillons main dans la main avec divers partenaires, qu'il s'agisse d'Architectes, d'Ingénieurs ou d'Entrepreneurs, pour garantir que chaque aspect de nos projets soit optimisé. De plus, nous intégrons des technologies innovantes pour améliorer l'efficacité et réduire notre empreinte écologique.",
    future: "Ensemble, nous façonnons l'avenir de notre environnement bâti. Nous vous invitons à explorer avec nous les possibilités infinies que le génie civil offre pour transformer notre paysage et répondre aux besoins croissants de notre société. Merci de votre attention et votre confiance. Nous sommes impatients de collaborer avec chacun d'entre vous pour réaliser des projets qui auront un impact positif durable sur notre cadre de vie."
  },
  moyensTechniques: {
    logiciels: [
      "Robot Structural Analysis Professional (Calcul BA & Métal)",
      "AutoCAD & Advance Concrete (Plans d'exécution & Ferraillage)",
      "Covadis & Piste (Conception routière, topographie & VRD)",
      "Arche Graitec (Modélisation de structures et descente de charges)",
      "Epanet & Mensura (Hydraulique urbaine et assainissement)",
      "Plaxis & Talren (Géotechnique, stabilité des pentes et radiers)"
    ],
    materielTerrain: [
      "Stations Totales Électroniques Leica & Nikon de haute précision",
      "Systèmes GNSS bi-fréquences différentiels RTK",
      "Niveaux optiques automatiques et numériques de précision",
      "Pénétromètres dynamiques pour diagnostic de sol de fondation",
      "Véhicules tout-terrain pour missions de supervision et de contrôle"
    ],
    essaisControles: [
      "Scléromètres Schmidt étalonnés (résistance à la compression du béton)",
      "Pachomètres / Ferroscan Hilti (détection et enrobage des armatures)",
      "Cônes d'Abrams (affaissement et maniabilité du béton frais)",
      "Éprouvettes normalisées pour essais d'écrasement en laboratoire agréé"
    ]
  }
};

export interface ActivityCard {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  domaineRef: 'tp' | 'batiments' | 'gsm';
  points: string[];
}

export const ACTIVITIES_LIST: ActivityCard[] = [
  {
    id: "vrd",
    title: "Voirie et Réseaux divers (VRD)",
    shortDesc: "Études techniques et dimensionnement de voiries, réseaux d'eau, électricité et raccordements urbains.",
    description: "Conception complète et viabilisation de lotissements, zones industrielles et complexes immobiliers intégrant tous les réseaux enterrés et de surface.",
    icon: assetUrl('/images/activites/feuille-de-route.webp'),
    domaineRef: "tp",
    points: [
      "Études et dimensionnement de voiries et plateformes de terrassement",
      "Réseaux d'alimentation en eau potable et bouches d'incendie",
      "Réseaux d'assainissement des eaux pluviales et eaux usées",
      "Électrification basse/moyenne tension et éclairage public pérenne",
      "Réseaux de télécommunications souterrains et fourreaux fibre"
    ]
  },
  {
    id: "batiments",
    title: "Bâtiments & Génie Civil",
    shortDesc: "Conception structurelle, calculs béton armé, charpente métallique et réhabilitation d'ouvrages complexes.",
    description: "Calculs de structures de haute technicité pour édifices résidentiels, tertiaires et industriels jusqu'à R+14 selon les normes BAEL 91 modifiées 99 et Eurocodes.",
    icon: assetUrl('/images/activites/maison.webp'),
    domaineRef: "batiments",
    points: [
      "Calculs de structures béton armé (Immeubles R+1 à R+14)",
      "Dimensionnement de charpentes métalliques et hangars industriels",
      "Plans d'exécution, de coffrage et de ferraillage avec nomenclatures",
      "Fondations superficielles, radiers généraux et fondations profondes",
      "Expertises de fissures, diagnostic de pathologie et audits de stabilité"
    ]
  },
  {
    id: "electricite-gsm",
    title: "Électricité & Télécommunications GSM",
    shortDesc: "Lignes électriques MT/HT, postes de transformation et infrastructures de réseaux mobiles GSM.",
    description: "Ingénierie spécialisée pour réseaux électriques de distribution, postes de transformation 90 kV et massifs de fondation pour pylônes de téléphonie mobile.",
    icon: assetUrl('/images/activites/electricite.webp'),
    domaineRef: "gsm",
    points: [
      "Études et contrôle de travaux de lignes électriques MT/HT",
      "Génie civil de postes électriques et massifs de transformateurs",
      "Calculs structuraux de pylônes autoportants et haubanés",
      "Fondations spéciales et ancrages sous fortes sollicitations éoliennes",
      "Audits d'implantation (surveys techniques) pour opérateurs GSM"
    ]
  },
  {
    id: "assainissement",
    title: "Assainissement & Drainage",
    shortDesc: "Drainage des eaux pluviales, traitement des eaux usées et préservation de l'environnement urbain.",
    description: "Études hydrologiques, dimensionnement hydraulique de collecteurs primaires, caniveaux bétons et bassins de décantation contre les inondations.",
    icon: assetUrl('/images/activites/assainissement.webp'),
    domaineRef: "tp",
    points: [
      "Schémas directeurs d'assainissement pluvial",
      "Dimensionnement de caniveaux ouverts, dalots et buses",
      "Bassins de rétention, ouvrages d'écrêtement et déversoirs d'orage",
      "Stations d'épuration compactes et zones d'épandage contrôlé",
      "Protection des berges et contrôle anti-ravinement"
    ]
  },
  {
    id: "eau-potable",
    title: "Adduction d'Eau Potable (AEP)",
    shortDesc: "Châteaux d'eau, stations de pompage, conduites de refoulement et réseaux d'eau potable.",
    description: "Supervision complète des infrastructures d'approvisionnement en eau potable : réservoirs surélevés, captages, forages et distribution maillée.",
    icon: assetUrl('/images/activites/eau-potable.webp'),
    domaineRef: "tp",
    points: [
      "Dimensionnement et calculs BA de réservoirs et châteaux d'eau",
      "Stations de pompage et équipements hydrauliques de refoulement",
      "Réseaux de distribution d'eau potable en fonte et PEHD",
      "Contrôles d'épreuve hydrostatique et essais de pression",
      "Sécurisation de l'accès à l'eau potable en milieu urbain et rural"
    ]
  },
  {
    id: "routes",
    title: "Routes & Ouvrages d'Art",
    shortDesc: "Tracés routiers, reprofilage, pose de buses, ponts, dalots et voies d'accès stratégiques.",
    description: "Expertise complète en ingénierie routière, des pistes de désenclavement rural en terre aux voiries urbaines bitumées de fort trafic.",
    icon: assetUrl('/images/activites/route.webp'),
    domaineRef: "tp",
    points: [
      "Études topographiques, profils en long et profils en travers",
      "Reprofilage lourd avec compactage contrôlé",
      "Conception et suivi de réalisation de dalots cadres et buses",
      "Chaussées en enrobé bitumineux et pavés autobloquants",
      "Signalisation routière horizontale et verticale réglementaire"
    ]
  }
];

export interface DomaineDetail {
  id: 'tp' | 'batiments' | 'gsm';
  title: string;
  subtitle: string;
  image: string;
  description: string;
  services: string[];
  subActivities: string[];
}

export const DOMAINES_DATA: DomaineDetail[] = [
  {
    id: 'tp',
    title: "Travaux publics & VRD",
    subtitle: "Infrastructures & Aménagement du Territoire",
    image: assetUrl('/images/domaines/cabis_tp.webp'),
    description: "Créer et maintenir des infrastructures essentielles qui facilitent la mobilité, l'accès aux services et la qualité de vie des citoyens.",
    services: [
      "Études et suivi des travaux des VRD des promotions immobilières",
      "Études d’état des lieux topographique et implantations de précision",
      "Calculs et dimensionnement des réseaux de drainage des eaux pluviales",
      "Calculs et dimensionnement des réseaux d’assainissement des eaux usées",
      "Calculs et dimensionnement des réseaux d’alimentation électrique et éclairage",
      "Calculs et dimensionnement des réseaux de télécommunication et gaines fibre",
      "Tracé routier, dimensionnement des chaussées et ouvrages de franchissement (dalots)",
      "Adduction d’eau potable, calculs de châteaux d'eau et réseaux de refoulement",
      "Élaboration de Dossier d’Appel d’Offres (DAO) et CCTP",
      "Élaboration de plans d’exécution et contrôle rigoureux de conformité"
    ],
    subActivities: [
      "Études et suivi des travaux des VRD des promotions immobilières",
      "Études d’état des lieux topographique et implantations de précision",
      "Calculs et dimensionnement des réseaux de drainage des eaux pluviales",
      "Calculs et dimensionnement des réseaux d’assainissement des eaux usées",
      "Calculs et dimensionnement des réseaux d’alimentation électrique et éclairage",
      "Calculs et dimensionnement des réseaux de télécommunication et gaines fibre",
      "Tracé routier, dimensionnement des chaussées et ouvrages de franchissement (dalots)",
      "Adduction d’eau potable, calculs de châteaux d'eau et réseaux de refoulement",
      "Élaboration de Dossier d’Appel d’Offres (DAO) et CCTP",
      "Élaboration de plans d’exécution et contrôle rigoureux de conformité"
    ]
  },
  {
    id: 'batiments',
    title: "Bâtiments & Génie Civil",
    subtitle: "Structures, Béton Armé & Génie Civil",
    image: assetUrl('/images/domaines/cabis_batiments.webp'),
    description: "Le secteur des bâtiments englobe une large gamme d'activités liées à la conception, la réalisation, l'entretien et la réhabilitation des ouvrages complexes.",
    services: [
      "Calcul de structures en béton armé (Immeubles résidentiels et tertiaires R+1 à R+14)",
      "Calcul et dimensionnement de charpente métallique, passerelles et hangars industriels",
      "Dossier d’Appel d’Offres (DAO) complet avec quantitatifs estimatifs précis",
      "Dossier d’exécution, plans de coffrage et plans de ferraillage certifiés",
      "Ingénierie électrique des bâtiments (courants forts et courants faibles)",
      "Climatisation, froid industriel, ventilation mécanique et sécurité incendie",
      "Audits de stabilité, auscultation au scléromètre et expertises de pathologie du bâtiment"
    ],
    subActivities: [
      "Calcul de structures en béton armé (Immeubles résidentiels et tertiaires R+1 à R+14)",
      "Calcul et dimensionnement de charpente métallique, passerelles et hangars industriels",
      "Dossier d’Appel d’Offres (DAO) complet avec quantitatifs estimatifs précis",
      "Dossier d’exécution, plans de coffrage et plans de ferraillage certifiés",
      "Ingénierie électrique des bâtiments (courants forts et courants faibles)",
      "Climatisation, froid industriel, ventilation mécanique et sécurité incendie",
      "Audits de stabilité, auscultation au scléromètre et expertises de pathologie du bâtiment"
    ]
  },
  {
    id: 'gsm',
    title: "Télécommunications GSM & Énergie",
    subtitle: "Infrastructures Réseau, Pylônes & Postes HT",
    image: assetUrl('/images/domaines/cabis_telecom.webp'),
    description: "Les télécommunications GSM et les réseaux d'énergie jouent un rôle fondamental dans le développement économique et la connectivité moderne.",
    services: [
      "Calcul des structures métalliques de pylônes (autoportants, haubanés, monopôles)",
      "Calcul et vérification des fondations spéciales en béton armé sous charges dynamiques",
      "Survey technique pour l’implantation des équipements de téléphonie cellulaire",
      "Génie civil des postes électriques haute tension et massifs de transformateurs",
      "Expertise structurale, auscultation et diagnostic de solidité des infrastructures existantes",
      "Suivi et contrôle permanent des travaux de montage et d'installation des sites télécoms"
    ],
    subActivities: [
      "Calcul des structures métalliques de pylônes (autoportants, haubanés, monopôles)",
      "Calcul et vérification des fondations spéciales en béton armé sous charges dynamiques",
      "Survey technique pour l’implantation des équipements de téléphonie cellulaire",
      "Génie civil des postes électriques haute tension et massifs de transformateurs",
      "Expertise structurale, auscultation et diagnostic de solidité des infrastructures existantes",
      "Suivi et contrôle permanent des travaux de montage et d'installation des sites télécoms"
    ]
  }
];

export const CABIS_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Études, suivi et contrôle de travaux de construction de lignes électriques",
    category: "energie_hydro",
    categoryLabel: "Énergie & Électricité",
    location: "Côte d'Ivoire",
    client: "CI-ENERGIES / Direction Générale de l'Énergie",
    role: "Études techniques et contrôle d'exécution",
    year: "2019 - 2021",
    image: assetUrl('/images/projets/proj_1.webp'),
    description: "Mission complète d'études d'ingénierie, suivi et contrôle de conformité sur les chantiers d'extension de lignes électriques moyenne et haute tension.",
    scope: ["Études techniques MT/HT", "Contrôle d'exécution", "Suivi de conformité", "Sécurité électrique"]
  },
  {
    id: "p2",
    title: "Études, suivi et contrôle travaux de reprofilage de voie en terre et ouvrage de franchissement",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Zones rurales & périurbaines",
    client: "Conseils Régionaux & AGEROUTE",
    role: "Topographie, tracé & contrôle dalots béton",
    year: "2020",
    image: assetUrl('/images/projets/proj_2.webp'),
    description: "Aménagement d'itinéraires routiers en terre et réalisation d'ouvrages de franchissement hydrauliques (ponts cadres et dalots) pour le désenclavement.",
    scope: ["Levés topographiques", "Tracé géométrique", "Hydraulique routière", "Ouvrages d'art en BA"]
  },
  {
    id: "p3",
    title: "Études, suivi et contrôle de travaux de routes en terre et pose de buses",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Intérieur du pays",
    client: "Ministère des Équipements Routiers",
    role: "Études géotechniques et surveillance des travaux",
    year: "2019",
    image: assetUrl('/images/projets/proj_3.webp'),
    description: "Travaux de terrassement, reprofilage lourd et pose de buses métalliques et béton armé pour l'évacuation pérenne des eaux de ruissellement.",
    scope: ["Terrassement lourd", "Pose de buses béton armé", "Contrôle géotechnique", "Essais de compactage"]
  },
  {
    id: "p4",
    title: "Aménagement et viabilisation de plateformes logistiques et zones industrielles",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Zone Industrielle de Yopougon, Abidjan",
    client: "Opérateurs Industriels & Logistiques",
    role: "Nivellement, assainissement lourd et chaussées",
    year: "2021",
    image: assetUrl('/images/projets/proj_4.webp'),
    description: "Études d'exécution et maîtrise d'œuvre pour le nivellement, le drainage à grand débit et les chaussées renforcées pour poids lourds.",
    scope: ["Calculs de plateformes", "Drainage lourd", "Chaussées rigides", "Contrôle de portance"]
  },
  {
    id: "p5",
    title: "Études, suivi et contrôle de travaux d'adduction d'eau potable",
    category: "eau_assainissement",
    categoryLabel: "Eau & Assainissement",
    location: "Grand Abidjan & Régions",
    client: "ONEP (Office National de l'Eau Potable)",
    role: "Hydraulique urbaine et surveillance du réseau",
    year: "2020 - 2022",
    image: assetUrl('/images/projets/proj_5.webp'),
    description: "Conception et supervision de la pose des conduites maillées de distribution d'eau potable et raccordement sécurisé des ménages.",
    scope: ["Hydraulique urbaine", "Canalisations fonte & PEHD", "Essais d'étanchéité", "Stérilisation réseau"]
  },
  {
    id: "p6",
    title: "Études, suivi et contrôle de travaux d'assainissement et de drainage des eaux pluviales",
    category: "eau_assainissement",
    categoryLabel: "Eau & Assainissement",
    location: "District d'Abidjan",
    client: "District Autonome d'Abidjan",
    role: "Dimensionnement hydraulique et suivi de chantier",
    year: "2021",
    image: assetUrl('/images/projets/proj_6.webp'),
    description: "Dimensionnement hydraulique des collecteurs primaires et caniveaux à ciel ouvert pour la protection contre les inondations des quartiers urbains.",
    scope: ["Calculs hydrologiques", "Caniveaux béton armé", "Collecteurs primaires", "Contrôle qualité béton"]
  },
  {
    id: "p7",
    title: "Études de stabilité d'un immeuble R+5 à Grand Bassam",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Grand Bassam",
    client: "Promoteur Immobilier Privé",
    role: "Calculs de structures BA et plans d'armatures",
    year: "2021",
    image: assetUrl('/images/projets/proj_7.webp'),
    description: "Calculs de descente de charges, modélisation 3D et dimensionnement des éléments porteurs (poteaux, poutres, fondations sur semelles et radiers) en zone côtière.",
    scope: ["Modélisation structurelle 3D", "Ferraillage aux normes BAEL", "Diagnostic sol de fondation", "Plan de coffrage"]
  },
  {
    id: "p8",
    title: "Études, suivi et contrôle de travaux de construction de châteaux d'eau et d'adduction d'eau potable",
    category: "eau_assainissement",
    categoryLabel: "Eau & Assainissement",
    location: "Région des Lacs, Côte d'Ivoire",
    client: "Direction de l'Hydraulique Humaine",
    role: "Calculs de génie civil hydraulique et contrôle de coulage",
    year: "2020",
    image: assetUrl('/images/projets/proj_8.webp'),
    description: "Réalisation des calculs de structure pour réservoirs surélevés en béton armé et suivi rigoureux du coulage étanche et des raccordements.",
    scope: ["Calcul de cuve en béton armé", "Génie civil hydraulique", "Contrôle d'étanchéité", "Essais hydrostatiques"]
  },
  {
    id: "p9",
    title: "Études de stabilité d'un immeuble R+4 avec mezzanine à Daloa",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Daloa",
    client: "Investisseur Privé Commercial",
    role: "Calculs de structure béton armé et plans d'exécution",
    year: "2021",
    image: assetUrl('/images/projets/proj_9.webp'),
    description: "Audit structurel, dimensionnement des planchers corps creux et calcul des portiques pour un complexe immobilier commercial et résidentiel.",
    scope: ["Calculs béton armé", "Dimensionnement mezzanine", "Plans de recollement", "Contrôle des descentes de charges"]
  },
  {
    id: "p10",
    title: "Suivi et contrôle des travaux de réhabilitation de la cité ouvrière du projet d’aménagement hydro-électrique de Singrobo-Ahouaty",
    category: "energie_hydro",
    categoryLabel: "Hydroélectricité & Grands Travaux",
    location: "Singrobo-Ahouaty",
    client: "Ivoire Hydro Energy (IHE) / Eiffage",
    role: "Maîtrise d'œuvre et contrôle QSE",
    year: "2020 - 2022",
    image: assetUrl('/images/projets/proj_10.webp'),
    description: "Supervision des travaux de réhabilitation des logements et commodités pour les équipes de construction du barrage de Singrobo-Ahouaty.",
    scope: ["Maîtrise d'œuvre générale", "Génie civil du bâti", "Réseaux VRD & Assainissement", "Assurance qualité chantier"]
  },
  {
    id: "p11",
    title: "Suivi et contrôle des travaux de construction de la phase 1 de la cité d’exploitation du projet hydro-électrique de Singrobo-Ahouaty",
    category: "energie_hydro",
    categoryLabel: "Hydroélectricité & Grands Travaux",
    location: "Singrobo-Ahouaty",
    client: "Ivoire Hydro Energy (IHE)",
    role: "Supervision continue et validation des métrés",
    year: "2021 - 2023",
    image: assetUrl('/images/projets/proj_11.webp'),
    description: "Construction neuve des villas cadres, voiries internes, éclairage public et réseaux techniques de la cité d'exploitation du barrage.",
    scope: ["Suivi technique continu", "Contrôle des coulagess", "Validation des métrés", "Réception d'ouvrages"]
  },
  {
    id: "p12",
    title: "Mission de suivi et contrôle des travaux de construction de la cité d’exploitation et des bureaux de chantier du projet GRIBO POPOLI à Soubré",
    category: "energie_hydro",
    categoryLabel: "Hydroélectricité & Grands Travaux",
    location: "Soubré, Gribo Popoli",
    client: "CI-ENERGIES / Projet Barrage Soubré",
    role: "Surveillance générale et conformité technique",
    year: "2019 - 2022",
    image: assetUrl('/images/projets/proj_12.webp'),
    description: "Surveillance générale et contrôle de conformité des bâtiments administratifs et logements du grand projet de barrage de Gribo Popoli à Soubré.",
    scope: ["Bureaux de chantier", "Logements cadres", "Infrastructures d'accueil", "Audits techniques réguliers"]
  },
  {
    id: "p13",
    title: "Suivi et contrôle des travaux de génie civil et des bâtiments du poste électrique de 90KV du projet de Singrobo-Ahouaty",
    category: "energie_hydro",
    categoryLabel: "Hydroélectricité & Grands Travaux",
    location: "Singrobo-Ahouaty",
    client: "Eiffage Génie Civil / IHE",
    role: "Contrôle technique des fondations et massifs HT",
    year: "2021 - 2023",
    image: assetUrl('/images/projets/proj_13.webp'),
    description: "Travaux de fondations massives pour transformateurs, caniveaux pour câbles HTA/HTB, bâtiment de commande et clôtures sécurisées.",
    scope: ["Génie civil lourd", "Bâtiment de commande", "Massifs béton transformateurs", "Caniveaux techniques blindés"]
  },
  {
    id: "p14",
    title: "Suivi et contrôle des travaux de SCI AGODOU à Bingerville (Bâtiment R+3)",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Bingerville",
    client: "SCI AGODOU",
    role: "Contrôle gros-œuvre et dalles de compression",
    year: "2021",
    image: assetUrl('/images/projets/proj_14.webp'),
    description: "Contrôle de l'exécution du gros œuvre, des dalles précontraintes/corps creux et du respect scrupuleux des plans d'armatures.",
    scope: ["Contrôle gros-œuvre", "Essais béton sur éprouvettes", "Contrôle des dalles et poutres", "PV de réception"]
  },
  {
    id: "p15",
    title: "Études structurales et suivi d'exécution d'un complexe résidentiel de standing R+4 à Cocody",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Cocody, Abidjan",
    client: "Société Civile Immobilière Partenaire",
    role: "Études de structures BA & Suivi d'exécution",
    year: "2022",
    image: assetUrl('/images/projets/proj_15.webp'),
    description: "Conception structurelle complète avec sous-sol de stationnement, calculs de radiers et contrôle rigoureux des coulagess de dalles.",
    scope: ["Sous-sol étanche", "Calculs de dalles pleines", "Plans de ferraillage", "Supervision des bétons"]
  },
  {
    id: "p16",
    title: "Suivi et contrôle des travaux de construction de la Cité ADDOHA de Koumassi",
    category: "batiment",
    categoryLabel: "Bâtiment & VRD",
    location: "Koumassi, Abidjan",
    client: "Groupe ADDOHA Côte d'Ivoire",
    role: "Contrôle technique des immeubles et voiries",
    year: "2019 - 2021",
    image: assetUrl('/images/projets/proj_16.webp'),
    description: "Grand projet immobilier social et économique : contrôle technique des fondations et superstructures pour le groupe Addoha.",
    scope: ["Immeubles collectifs", "Supervision technique", "Contrôle qualité matériaux", "Validation des armatures"]
  },
  {
    id: "p17",
    title: "Suivi et contrôle des travaux de VRD pour Lawrence Immo à Grand Bassam",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Grand Bassam",
    client: "Lawrence Immobilier",
    role: "Viabilisation complète et voiries",
    year: "2020",
    image: assetUrl('/images/projets/proj_17.webp'),
    description: "Viabilisation complète d'un lotissement résidentiel : voirie bitumée, caniveaux préfabriqués, réseaux d'eau et basse tension.",
    scope: ["Viabilisation lotissement", "Caniveaux préfabriqués", "Pavage & bitumage", "Raccordement au réseau"]
  },
  {
    id: "p18",
    title: "Études techniques et calculs de fondations spéciales pour pylônes GSM autoportants",
    category: "telecom",
    categoryLabel: "Télécommunications & GSM",
    location: "Sites multiples en Côte d'Ivoire",
    client: "Opérateurs Télécoms & Tower Companies",
    role: "Calculs de fondations spéciales et tenue au vent",
    year: "2021 - 2023",
    image: assetUrl('/images/projets/proj_18.webp'),
    description: "Dimensionnement structural des massifs béton armé d'ancrage sous contraintes de vent extrême et résistance dynamique pour pylônes de 36m à 60m.",
    scope: ["Calculs de massifs béton", "Résistance au renversement", "Vérification des goujons d'ancrage", "Notes de calcul certifiées"]
  },
  {
    id: "p19",
    title: "Plan de structure d'un bâtiment R+5",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Abidjan",
    client: "Promoteur Résidentiel Privé",
    role: "Dossier d'exécution complet et calculs BAEL 91",
    year: "2022",
    image: assetUrl('/images/projets/proj_19.webp'),
    description: "Élaboration complète des plans de coffrage et d'armatures, notes de calculs certifiées conformes aux règles BAEL 91 modifiées 99 et Eurocodes.",
    scope: ["Notes de calculs certifiées", "Plans de coffrage détaillés", "Plans de ferraillage avec nomenclatures", "Validation bureau de contrôle"]
  },
  {
    id: "p20",
    title: "Études et dimensionnement de charpentes métalliques pour hangars et entrepôts",
    category: "batiment",
    categoryLabel: "Bâtiment & Industrie",
    location: "Zone Portuaire et Vridi, Abidjan",
    client: "Entreprises Industrielles & Logistiques",
    role: "Calculs structuraux selon Eurocode 3",
    year: "2021",
    image: assetUrl('/images/projets/proj_20.webp'),
    description: "Dimensionnement de portiques en profilés IPE/HEA, contreventements et calculs d'assemblages boulonnés et soudés pour grands entrepôts.",
    scope: ["Calcul de portiques acier", "Assemblages boulonnés", "Contreventements", "Plans de montage d'atelier"]
  },
  {
    id: "p21",
    title: "Études, suivi et contrôle travaux d'épandage à Abatta",
    category: "eau_assainissement",
    categoryLabel: "Eau & Assainissement",
    location: "Abatta, Bingerville",
    client: "District d'Abidjan / Partenaires Environnement",
    role: "Traitement des effluents et surveillance écologique",
    year: "2020",
    image: assetUrl('/images/projets/proj_21.webp'),
    description: "Aménagement d'une zone d'épandage et traitement des effluents avec respect scrupuleux des normes environnementales et sanitaires.",
    scope: ["Traitement des effluents", "Bassin d'épandage", "Suivi environnemental", "Contrôle des rejets"]
  },
  {
    id: "p22",
    title: "Diagnostic structurel et expertise de stabilité d'ouvrages existants",
    category: "batiment",
    categoryLabel: "Bâtiment",
    location: "Abidjan (Cocody, Plateau, Treichville)",
    client: "Syndics de copropriété & Maîtres d'ouvrages",
    role: "Auscultation non destructive et rapport d'expertise",
    year: "2022 - 2024",
    image: assetUrl('/images/projets/proj_22.webp'),
    description: "Inspections techniques approfondies, auscultation au scléromètre, détection des armatures corrodées et préconisations de renforcement structural.",
    scope: ["Auscultation au scléromètre", "Ferroscan des armatures", "Cartographie des fissures", "Préconisations de reprise en sous-œuvre"]
  },
  {
    id: "p23",
    title: "Études, suivi et contrôle travaux de terrassement",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Grand Abidjan",
    client: "Aménageurs Fonciers & Lotisseurs",
    role: "Contrôle de compactage et calcul des cubatures",
    year: "2021",
    image: assetUrl('/images/projets/proj_23.webp'),
    description: "Opérations de déblais/remblais, décapage et compactage contrôlé pour plateformes industrielles et résidences de standing.",
    scope: ["Essais Proctor & densitomètre", "Contrôle de compactage", "Calculs de cubatures Covadis", "Nivellement par station totale"]
  },
  {
    id: "p24",
    title: "Études, suivi et contrôle travaux de reprofilage de voie en terre et pose de caniveaux",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "District d'Abidjan",
    client: "Collectivités Locales & Municipalités",
    role: "Assainissement pluvial et réhabilitation de voiries",
    year: "2021",
    image: assetUrl('/images/projets/proj_24.webp'),
    description: "Amélioration des conditions de circulation et évacuation pérenne des eaux pluviales le long des axes périurbains en développement.",
    scope: ["Profils en long et en travers", "Caniveaux préfabriqués", "Dalots sous chaussée", "Mise en œuvre de graveleux latéritique"]
  },
  {
    id: "p25",
    title: "Études, suivi et contrôle travaux de voiries",
    category: "vrd_routes",
    categoryLabel: "VRD & Routes",
    location: "Côte d'Ivoire",
    client: "BNETD / Partenaires Travaux Publics",
    role: "Supervision des chantiers d'enrobé et bordures",
    year: "2022",
    image: assetUrl('/images/projets/proj_25.webp'),
    description: "Supervision des chantiers de pose de bordures, trottoirs, revêtements en enrobé bitumineux et signalisation routière de sécurité.",
    scope: ["Bordures T2/CS2 et caniveaux", "Enrobés bitumineux à chaud", "Signalisation horizontale et panneaux", "Essais de portance à la poutre Benkelman"]
  },
  {
    id: "p26",
    title: "Survey technique, audit de conformité et calculs d'infrastructures GSM",
    category: "telecom",
    categoryLabel: "Télécommunications & GSM",
    location: "Tout le territoire ivoirien",
    client: "Opérateurs Téléphoniques Mobiles",
    role: "Audit structural, géométrie et vérification d'ancrages",
    year: "2022 - 2024",
    image: assetUrl('/images/projets/proj_26.webp'),
    description: "Inspections complètes des stations de base cellulaires (BTS) : vérification de la verticalité, couple de serrage de la boulonnerie et état des massifs de fondation.",
    scope: ["Surveys techniques d'implantation", "Contrôle de verticalité au théodolite", "Audit de serrage dynamométrique", "Rapports de sécurité structurales"]
  }
];

export const TEAM_MEMBERS = [
  {
    id: "dg",
    name: "M. Kouakou Kouassi Daniel",
    role: "Directeur général",
    description: "Bureau d'études affilié à la CHANIE sous le N° 28/2018.",
    photo: assetUrl('/images/cabis_dg.webp')
  },
  {
    id: "team1",
    name: "Membres de l’équipe",
    role: "Cabinet CABIS",
    description: "Études de structures, conception et modélisation.",
    photo: assetUrl('/images/equipes/cabis_equipe1.webp')
  },
  {
    id: "team2",
    name: "Membres de l’équipe",
    role: "Cabinet CABIS",
    description: "Voiries, assainissement et infrastructures.",
    photo: assetUrl('/images/equipes/cabis_equipe2.webp')
  },
  {
    id: "team4",
    name: "Membres de l’équipe",
    role: "Cabinet CABIS",
    description: "Surveillance et contrôle de conformité sur chantiers.",
    photo: assetUrl('/images/equipes/cabis_equipe4.webp')
  },
  {
    id: "team5",
    name: "Membres de l’équipe",
    role: "Cabinet CABIS",
    description: "Infrastructures GSM et études techniques.",
    photo: assetUrl('/images/equipes/cabis_equipe5.webp')
  }
];

export const PARTNERS_LIST = [
  { id: 'p1', name: 'CHANIE N° 28/2018', logo: assetUrl('/images/partenaires/p1.jpg') },
  { id: 'p2', name: 'Addoha Côte d\'Ivoire', logo: assetUrl('/images/partenaires/p2.jpg') },
  { id: 'p3', name: 'Ministère de la Construction', logo: assetUrl('/images/partenaires/p3.jpg') },
  { id: 'p4', name: 'Bureau Veritas CI', logo: assetUrl('/images/partenaires/p4.jpg') },
  { id: 'p5', name: 'SOCOTEC Côte d\'Ivoire', logo: assetUrl('/images/partenaires/p5.jpg') },
  { id: 'p6', name: 'Ville d\'Abidjan - Cocody', logo: assetUrl('/images/partenaires/p6.jpg') },
  { id: 'p7', name: 'Barrage Singrobo-Ahouaty', logo: assetUrl('/images/partenaires/p7.jpg') },
  { id: 'p8', name: 'Aménagement Gribo-Popoli', logo: assetUrl('/images/partenaires/p8.jpg') },
  { id: 'p9', name: 'Promoteurs Immobiliers', logo: assetUrl('/images/partenaires/p9.jpg') },
  { id: 'p10', name: 'Opérateurs Télécom GSM', logo: assetUrl('/images/partenaires/p10.jpg') },
  { id: 'p11', name: 'Grands Chantiers BTP CI', logo: assetUrl('/images/partenaires/p11.jpg') },
  { id: 'p12', name: 'Laboratoires Géotechniques', logo: assetUrl('/images/partenaires/p12.jpg') },
  { id: 'p13', name: 'Grand Abidjan & Régions', logo: assetUrl('/images/partenaires/p13.jpg') },
  { id: 'p14', name: 'Ingénierie & BTP Afrique', logo: assetUrl('/images/partenaires/p14.jpg') }
];

export const STATS = [
  { value: "2018", label: "Agréé CHANIE N°28" },
  { value: "50+", label: "Grands projets livrés" },
  { value: "100%", label: "Conformité & Sécurité" },
  { value: "15+", label: "Ingénieurs & Experts" }
];
