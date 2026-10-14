import { MAILCHIMP } from '../../config/mailchimp';

export const STEP_COUNT = 6;

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6;

export type FieldName =
  | 'website'
  | 'goal'
  | 'style'
  | 'keep'
  | 'inspiration'
  | 'pains'
  | 'business'
  | 'timeline'
  | 'role'
  | 'name'
  | 'email'
  | 'phone'
  | 'consent';

export interface PreviewValues {
  hasWeb: boolean;
  website: string;
  goal: string;
  style: string;
  keep: string[];
  inspiration: string;
  pains: string[];
  note: string;
  business: string;
  timeline: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export type TextField = {
  [K in keyof PreviewValues]: PreviewValues[K] extends string ? K : never;
}[keyof PreviewValues];

export type ListField = 'keep' | 'pains';

export type FieldErrors = Partial<Record<FieldName, string>>;

export const REFRESH_GOALS = ['Vylepšiť súčasný web', 'Držať sa mojej značky'];

export function stepName(step: FormStep, hasWeb: boolean): string {
  const names: Record<FormStep, string> = {
    1: hasWeb ? 'Váš web' : 'Váš profil',
    2: 'Cieľ',
    3: 'Smer',
    4: hasWeb ? 'Čo vás trápi' : 'Prečo teraz',
    5: 'O vás',
    6: 'Kontakt',
  };
  return names[step];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s\-().]{7,20}$/;
const DOMAIN_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const PROFILE_PATTERN = /^(@[\w.]{2,}|(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?)$/i;

export const EMPTY_VALUES: PreviewValues = {
  hasWeb: true,
  website: '',
  goal: '',
  style: '',
  keep: [],
  inspiration: '',
  pains: [],
  note: '',
  business: '',
  timeline: '',
  role: '',
  name: '',
  email: '',
  phone: '',
  consent: false,
};

export function isWebsite(value: string): boolean {
  return DOMAIN_PATTERN.test(value.trim());
}

export function isRefresh(goal: string): boolean {
  return REFRESH_GOALS.includes(goal);
}

export function validateStep(step: FormStep, values: PreviewValues): FieldErrors {
  const errors: FieldErrors = {};
  const website = values.website.trim();

  if (step === 1) {
    if (values.hasWeb) {
      if (!website) errors.website = 'Napíšte adresu webu, ktorý mám prerobiť.';
      else if (!isWebsite(website)) errors.website = 'Toto nevyzerá ako adresa webu. Skúste napr. salonivana.sk.';
    } else if (!website) {
      errors.website = 'Pošlite mi odkaz na Instagram, Facebook alebo Google profil.';
    } else if (!PROFILE_PATTERN.test(website)) {
      errors.website = 'Napíšte @meno alebo celý odkaz na profil.';
    }
  }

  if (step === 2 && !values.goal) errors.goal = 'Vyberte, čo by ste chceli.';

  if (step === 3) {
    if (isRefresh(values.goal)) {
      if (values.keep.length === 0) errors.keep = 'Vyberte aspoň jednu vec, ktorú mám zachovať.';
    } else if (!values.style) {
      errors.style = 'Vyberte štýl, ktorý je vám najbližší.';
    }
    const inspiration = values.inspiration.trim();
    if (inspiration && !isWebsite(inspiration)) errors.inspiration = 'Skontrolujte odkaz, napr. pekny-web.sk.';
  }

  if (step === 4 && values.pains.length === 0) errors.pains = 'Vyberte aspoň jednu možnosť.';

  if (step === 5) {
    if (!values.business) errors.business = 'Vyberte, čomu sa venujete.';
    if (!values.timeline) errors.timeline = 'Vyberte, kedy to chcete riešiť.';
    if (!values.role) errors.role = 'Vyberte jednu možnosť.';
  }

  if (step === 6) {
    if (!values.name.trim()) errors.name = 'Napíšte prosím svoje meno.';
    if (!values.email.trim()) errors.email = 'Nechajte mi e-mail, nech vám mám kam poslať náhľad.';
    else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Skontrolujte e-mail, chýba v ňom niečo.';
    if (!values.phone.trim()) errors.phone = 'Nechajte mi číslo, ak budem potrebovať niečo upresniť.';
    else if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = 'Telefón zadajte v tvare +421 9xx xxx xxx.';
    if (!values.consent) errors.consent = 'Potvrďte prosím, že rozumiete, čo dostanete.';
  }

  return errors;
}

const FIELD_ORDER: FieldName[] = [
  'website',
  'goal',
  'style',
  'keep',
  'inspiration',
  'pains',
  'business',
  'timeline',
  'role',
  'name',
  'email',
  'phone',
  'consent',
];

export function firstErrorField(errors: FieldErrors): FieldName | undefined {
  return FIELD_ORDER.find((field) => errors[field]);
}

const MAILCHIMP_TEXT_LIMIT = 255;
const MESSAGE_PREFIX = '[Náhľad 72 h] ';

export const NOTE_LIMIT = MAILCHIMP_TEXT_LIMIT - MESSAGE_PREFIX.length;

const clip = (value: string) => value.slice(0, MAILCHIMP_TEXT_LIMIT);

export function buildMergeFields(values: PreviewValues): Record<string, string> {
  const { fields } = MAILCHIMP;
  const direction = isRefresh(values.goal) ? `Zachovať: ${values.keep.join(', ')}` : values.style;
  return {
    [fields.website]: clip(`${values.hasWeb ? '' : '[bez webu] '}${values.website.trim()}`),
    [fields.goal]: values.goal,
    [fields.style]: clip(direction),
    [fields.inspiration]: clip(values.inspiration.trim()),
    [fields.pains]: clip(values.pains.join(', ')),
    [fields.business]: values.business,
    [fields.timeline]: values.timeline,
    [fields.role]: values.role,
    [fields.message]: clip(`${MESSAGE_PREFIX}${values.note.trim()}`),
  };
}
