import workPohoda from '../assets/images/work-pohoda.webp';
import workKidsArena from '../assets/images/work-kidsarena.webp';
import workEyesOpen from '../assets/images/work-eyesopen.webp';

export interface Leak {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  tools: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  time: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface WorkItem {
  image: string;
  name: string;
  category: string;
  alt: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export type AuditTone = 'bad' | 'warn' | 'good';

export interface AuditScore {
  label: string;
  value: number;
  tone: AuditTone;
}

export const industries: string[] = [
  'Kaderníctva',
  'Barbershopy',
  'Kozmetické salóny',
  'Nechtové štúdiá',
  'Masáže',
  'Elektrikári',
  'Stolári',
  'Inštalatéri',
  'Autoservisy',
  'Maliari',
  'Fotografi',
  'Tetovacie štúdiá',
];

export const heroStats: Stat[] = [
  { value: '30\u00a0s', label: 'vyplnenie formulára' },
  { value: '48\u00a0h', label: 'osobné video' },
  { value: '10', label: 'auditov týždenne, robím ich sám' },
];

export const heroIssues = [
  { label: 'Načítanie', detail: '6,4 s', tone: 'bad' },
  { label: 'Chýba tlačidlo Zavolať', tone: 'bad' },
  { label: 'Bez online rezervácie', tone: 'warn' },
  { label: 'Nie ste v Mapách', tone: 'bad' },
] as const;

export const leaks: Leak[] = [
  {
    number: '01',
    title: 'Nenájdu vás.',
    description:
      'Zákazník hľadá „barbershop Nitra“. Vy ste na druhej strane Google a v Mapách chýbate. Tam sa nepozerá nikto.',
    tag: 'Nájditeľnosť',
  },
  {
    number: '02',
    title: 'Nedočkajú sa.',
    description:
      'Viac ako polovica ľudí na mobile odíde, ak sa stránka načítava dlhšie ako 3 sekundy. Kliknú na ďalší výsledok.',
    tag: 'Rýchlosť',
  },
  {
    number: '03',
    title: 'Neveria vám.',
    description: 'Cenník z roku 2019, žiadne recenzie, fotky z telefónu. Zákazník nevie, či ešte fungujete.',
    tag: 'Dôvera',
  },
  {
    number: '04',
    title: 'Nevedia, čo ďalej.',
    description: 'Číslo schované v pätičke, žiadna rezervácia. Každý klik navyše je zákazník, ktorý to vzdá.',
    tag: 'Akcia',
  },
  {
    number: '05',
    title: 'Zabudnú na vás.',
    description: 'Web vyzerá ako tisíc iných. Nič, čo by si zapamätali alebo poslali kamarátke.',
    tag: 'Prvý dojem',
  },
];

export const offerIncludes: string[] = [
  'Osobné video 10 až 15 minút, v ktorom prechádzam váš web ako zákazník',
  'Skóre v 5 oblastiach: nájditeľnosť, rýchlosť, dôvera, akcia, prvý dojem',
  '3 rýchle opravy, ktoré zvládnete aj sami ešte tento týždeň',
  'Porovnanie s 2 konkurentmi vo vašom meste',
  'Žiadny záväzok. Žiadny telefonát, ak ho nechcete',
];

export const auditScores: AuditScore[] = [
  { label: 'Nájditeľnosť', value: 42, tone: 'bad' },
  { label: 'Rýchlosť', value: 28, tone: 'bad' },
  { label: 'Dôvera', value: 71, tone: 'good' },
  { label: 'Akcia', value: 35, tone: 'warn' },
  { label: 'Prvý dojem', value: 64, tone: 'good' },
];

export const auditQuickFixes: string[] = [
  'Pridať tlačidlo Zavolať do hlavičky',
  'Doplniť otváracie hodiny do Google profilu',
  'Zmenšiť fotky na úvode (−4,1 s)',
];

export const journey: JourneyStep[] = [
  {
    number: '01',
    title: 'Nájdu vás.',
    description: 'Keď niekto hľadá vašu službu vo vašom meste, ste medzi prvými.',
    tools: ['Google profil', 'Mapy', 'Lokálne SEO'],
  },
  {
    number: '02',
    title: 'Uveria vám.',
    description: 'Za pár sekúnd pochopia, čo robíte, za koľko a prečo práve vy.',
    tools: ['Web', 'Recenzie', 'Skutočné fotky'],
  },
  {
    number: '03',
    title: 'Ozvú sa.',
    description: 'Zavolať, napísať alebo rezervovať termín je na jeden klik.',
    tools: ['Online rezervácie', 'WhatsApp', 'Dopytový formulár'],
  },
  {
    number: '04',
    title: 'Vrátia sa.',
    description: 'Spokojný zákazník príde znova a odporučí vás ďalej.',
    tools: ['Pripomienky', 'Žiadosť o recenziu', 'Stáli klienti'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Vyplníte formulár',
    description: 'Typ biznisu, adresa webu a kontakt. Nič viac.',
    time: '30 sekúnd',
  },
  {
    number: '02',
    title: 'Pozriem sa na váš web',
    description: 'Osobne, na mobile aj počítači. Skontrolujem aj Google profil a konkurenciu.',
    time: 'Do 24 hodín',
  },
  {
    number: '03',
    title: 'Dostanete video',
    description: 'Krátke, zrozumiteľné, s konkrétnymi krokmi. Pozriete si ho, kedy chcete.',
    time: 'Do 48 hodín',
  },
  {
    number: '04',
    title: 'Rozhodnete sa sami',
    description: 'Opravíte si to sami, dáte to svojmu webárovi, alebo mi napíšete. Žiadne dotieranie.',
    time: 'Bez záväzkov',
  },
];

export const aboutStats: Stat[] = [
  { value: '50+', label: 'projektov' },
  { value: '8+', label: 'rokov praxe' },
  { value: '100\u00a0%', label: 'priama komunikácia' },
  { value: '48\u00a0h', label: 'odozva' },
];

export const work: WorkItem[] = [
  { image: workPohoda, name: 'Pizza Pohoda', category: 'Gastro', alt: 'Úvodná stránka webu pizzerie Pizza Pohoda' },
  {
    image: workKidsArena,
    name: 'Kids Arena',
    category: 'Voľný čas',
    alt: 'Úvodná stránka webu detského centra Kids Arena',
  },
  { image: workEyesOpen, name: 'Eyes Open', category: 'Služby', alt: 'Úvodná stránka webu optiky Eyes Open' },
];

export const faqs: Faq[] = [
  {
    question: 'Naozaj je to zadarmo? Kde je háčik?',
    answer:
      'Áno, zadarmo. Háčik je jednoduchý a férový: časť ľudí, ktorým audit pošlem, si potom web alebo úpravy nechá urobiť u mňa. Ak nie, audit je aj tak váš a môžete ho dať komukoľvek.',
  },
  {
    question: 'Budete mi potom volať a niečo tlačiť?',
    answer:
      'Nie. Pošlem video a zhrnutie. Ďalší krok je čisto na vás. Ak sa neozvete, pošlem jednu pripomienku po týždni a to je všetko.',
  },
  {
    question: 'Nemám web, len Instagram alebo Facebook.',
    answer:
      'Presne pre vás je bezplatná 20-minútová konzultácia. Pozriem sa na vaše profily a Google a poviem vám, čo by mal web mať, aby sa vám zaplatil.',
  },
  {
    question: 'Ako rýchlo dostanem výsledok?',
    answer:
      'Formulár zaberie 30 sekúnd. Video posielam do 48 hodín v pracovných dňoch. Pri vysokom záujme vám dám vedieť presný termín.',
  },
  {
    question: 'Nerozumiem technike. Pochopím to?',
    answer:
      'Áno. Audit je v slovenčine, bez odborných skratiek. Ukážem vám to priamo na obrazovke, tak ako to vidí váš zákazník.',
  },
  {
    question: 'Robíte audit aj pre e-shopy?',
    answer:
      'Tento audit je navrhnutý pre lokálne služby: salóny, barbershopy, remeselníkov a prevádzky. Pre e-shopy by bol potrebný iný, hlbší rozbor.',
  },
];

export const businessTypes: string[] = [
  'Beauty a starostlivosť',
  'Stavebníctvo a remeslá',
  'Auto a doprava',
  'Zdravie a fitness',
  'Gastro a ubytovanie',
  'Služby pre domácnosť',
  'Vzdelávanie a kurzy',
  'Iné lokálne služby',
];
