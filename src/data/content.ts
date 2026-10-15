import workPohoda from '../assets/images/work-pohoda.webp';
import workEyesOpen from '../assets/images/work-eyesopen.webp';
import workLeaderm from '../assets/images/work-leaderm.webp';
import workLeone from '../assets/images/work-leone.webp';
import workMnam from '../assets/images/work-mnam.webp';

export interface Step {
  time: string;
  title: string;
  description: string;
}

export interface WorkItem {
  image: string;
  name: string;
  category: string;
  alt: string;
  width: number;
  height: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Option {
  value: string;
  label: string;
  description?: string;
}

export interface StyleOption extends Option {
  swatch: [string, string, string];
  sample: 'clean' | 'bold' | 'warm' | 'elegant' | 'playful' | 'open';
}

export const WEEKLY_CAPACITY = 5;

export const steps: Step[] = [
  {
    time: '3 minúty',
    title: 'Vyplníte formulár',
    description: 'Adresa webu, čo chcete zmeniť a aký štýl sa vám páči. Čím presnejšie odpoviete, tým presnejší bude návrh.',
  },
  {
    time: 'Do 72 hodín',
    title: 'Navrhnem novú úvodnú stránku',
    description:
      'Na vašich textoch, fotkách a farbách, nie na šablóne s vymysleným textom. Ak web nemáte, vychádzam z Instagramu alebo Google profilu.',
  },
  {
    time: '1 odkaz',
    title: 'Pošlem vám náhľad',
    description: 'Otvoríte ho na mobile aj počítači a môžete ho ukázať partnerovi alebo kolegom.',
  },
  {
    time: 'Bez záväzkov',
    title: 'Rozhodnete sa vy',
    description: 'Ak sa vám páči, poviem vám cenu a termín celého webu. Ak nie, rozlúčime sa. Žiadne dotieranie.',
  },
];

export const work: WorkItem[] = [
  {
    image: workPohoda,
    name: 'Pizza Pohoda',
    category: 'Gastro',
    alt: 'Úvodná stránka webu pizzerie Pizza Pohoda',
    width: 1200,
    height: 753,
  },
  {
    image: workLeaderm,
    name: 'Leaderm',
    category: 'Kožná ambulancia',
    alt: 'Úvodná stránka webu kožnej ambulancie Leaderm v Galante',
    width: 1200,
    height: 753,
  },
  {
    image: workMnam,
    name: 'Mňam Mňam',
    category: 'Donáška jedla',
    alt: 'Úvodná stránka webu donášky pizze a burgrov Mňam Mňam Sabinov',
    width: 1200,
    height: 753,
  },
  {
    image: workLeone,
    name: 'Leone',
    category: 'Reštaurácia',
    alt: 'Úvodná stránka webu reštaurácie Leone Pub & Restaurant v Harichovciach',
    width: 1200,
    height: 880,
  },
  {
    image: workEyesOpen,
    name: 'Eyes Open',
    category: 'Služby',
    alt: 'Úvodná stránka webu optiky Eyes Open',
    width: 1200,
    height: 880,
  },
];

export const fitYes: string[] = [
  'Máte firmu alebo živnosť a o webe rozhodujete vy.',
  'Váš web je zastaraný, pomalý alebo vám nenosí dopyty.',
  'Web ešte nemáte a Instagram či Google profil už nestačia.',
  'Nový web chcete riešiť v najbližších mesiacoch.',
];

export const fitNo: string[] = [
  'Hľadáte e-shop so stovkami produktov.',
  'Chcete návrh len ako podklad pre iného dodávateľa.',
  'Web potrebujete hotový do zajtra.',
];

export const faqs: Faq[] = [
  {
    question: 'Naozaj je to zadarmo? Kde je háčik?',
    answer:
      'Áno, zadarmo. Háčik je férový: dúfam, že sa vám návrh zapáči a celý web vám potom dorobím. Náhľad vás k ničomu nezaväzuje.',
  },
  {
    question: 'Čo presne dostanem?',
    answer:
      'Návrh novej úvodnej stránky ako odkaz, ktorý si otvoríte v prehliadači na mobile aj počítači. Nie je to hotový web, ale presne uvidíte, ako by mohol vyzerať.',
  },
  {
    question: 'Prečo má formulár toľko otázok?',
    answer:
      'Bez nich by som navrhoval naslepo. Z odpovedí viem, čo zachovať, čo zmeniť a aký štýl vám sedí. Zaberie to asi 3 minúty.',
  },
  {
    question: 'Web nemám, len Instagram alebo Facebook. Môžem?',
    answer: 'Áno. Návrh pripravím podľa vášho profilu, fotiek a toho, čo napíšete do formulára.',
  },
  {
    question: 'Ako rýchlo náhľad dostanem?',
    answer: `Do 72 hodín od odoslania. Robím najviac ${WEEKLY_CAPACITY} náhľadov týždenne; ak je týždeň plný, hneď vám napíšem, kedy sa k vám dostanem.`,
  },
];

export const goalOptions = (hasWeb: boolean): Option[] => [
  hasWeb
    ? { value: 'Vylepšiť súčasný web', label: 'Vylepšiť to, čo mám', description: 'Zachovať logo a farby, len moderne a prehľadne' }
    : { value: 'Držať sa mojej značky', label: 'Držať sa mojej značky', description: 'Logo, farby a štýl z môjho profilu' },
  { value: 'Úplne nový dizajn', label: 'Úplne nový dizajn', description: 'Nový vzhľad od základu' },
  { value: 'Neviem, poraďte', label: 'Neviem, poraďte', description: 'Navrhnite, čo dáva zmysel' },
];

export const styleOptions: StyleOption[] = [
  { value: 'Čistý a minimalistický', label: 'Čistý', description: 'Veľa priestoru, málo farieb', swatch: ['#f4f3ef', '#1c1c1a', '#9a9a94'], sample: 'clean' },
  { value: 'Odvážny a výrazný', label: 'Odvážny', description: 'Veľké písmo, silné farby', swatch: ['#111111', '#ff5a1f', '#f2f2f2'], sample: 'bold' },
  { value: 'Teplý a prírodný', label: 'Teplý', description: 'Zemité tóny, mäkké tvary', swatch: ['#efe4d2', '#7a5a3a', '#5f7a52'], sample: 'warm' },
  { value: 'Elegantný a prémiový', label: 'Elegantný', description: 'Pokoj, detail, luxus', swatch: ['#16181d', '#c8a96a', '#e9e5dc'], sample: 'elegant' },
  { value: 'Hravý a farebný', label: 'Hravý', description: 'Farby, energia, úsmev', swatch: ['#ffd23f', '#3a86ff', '#ff4f8b'], sample: 'playful' },
  { value: 'Nechám na vás', label: 'Nechám na vás', description: 'Prekvapte ma', swatch: ['#2448ff', '#f7f4ee', '#0d0d0b'], sample: 'open' },
];

export const keepOptions: string[] = ['Logo', 'Farby', 'Texty', 'Fotky', 'Členenie stránok'];

export const painOptions = (hasWeb: boolean): string[] =>
  hasWeb
    ? [
        'Vyzerá zastarano',
        'Zle sa používa na mobile',
        'Je pomalý',
        'Nenosí dopyty ani telefonáty',
        'Ťažko sa upravuje',
        'Nesedí k našej značke',
        'Chýba online rezervácia',
        'Ľudia nenájdu, čo hľadajú',
      ]
    : [
        'Instagram už nestačí',
        'Konkurencia web má',
        'Chcem rezervácie online',
        'Chcem pôsobiť profesionálnejšie',
        'Chcem, aby ma našli v Google',
        'Chcem ukázať ponuku a cenník',
      ];

export const businessTypes: string[] = [
  'Beauty a starostlivosť',
  'Stavebníctvo a remeslá',
  'Auto a doprava',
  'Zdravie a fitness',
  'Gastro a ubytovanie',
  'Služby pre domácnosť',
  'Vzdelávanie a kurzy',
  'Iné služby',
];

export const timelineOptions: Option[] = [
  { value: 'Čo najskôr', label: 'Čo najskôr' },
  { value: 'Do 3 mesiacov', label: 'Do 3 mesiacov' },
  { value: 'Tento rok', label: 'Tento rok' },
  { value: 'Len sa rozhliadam', label: 'Len sa rozhliadam' },
];

export const roleOptions: Option[] = [
  { value: 'Rozhodujem sám/sama', label: 'Áno, rozhodujem ja' },
  { value: 'Rozhodujem s niekým', label: 'Rozhodujem s niekým' },
  { value: 'Nerozhodujem', label: 'Nie, posuniem to ďalej' },
];
