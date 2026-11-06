# Modifications (refonte animations & pages)

Nouveaux composants : PageLoader, HeroSlider, PageHero, Reveal, CountUp, SectionTitle,
TeamMosaic, PartnersMarquee, CtaBand (src/components) ; useInView (src/hooks) ;
homeContent.ts (src/data) ; images plein écran dans public/images/hero/.

Pages refaites : HomePage, AboutPage, ActivitiesPage, ProjectsPage, ContactsPage.
Modifiés : App.tsx, Header.tsx, Footer.tsx, index.css.

Carte : coordonnées 5.3936471, -3.9897869 (ContactsPage.tsx, constantes LAT/LNG).
Formulaire de contact : ouvre la messagerie (mailto) ou WhatsApp avec le message prérempli.

Installation : npm install puis npm run dev

Images sources originales non servies au navigateur : `source-assets/images/`.
Vérifications : `npm test`, `npm run lint` et `npm run build`.
