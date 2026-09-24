export type FormStep = 1 | 2 | 3;

export type FieldName = 'business' | 'website' | 'name' | 'email' | 'phone';

export interface AuditValues {
  business: string;
  hasWeb: boolean;
  website: string;
  social: string;
  name: string;
  phone: string;
  email: string;
}

export type FieldErrors = Partial<Record<FieldName, string>>;

export const STEP_NAMES: Record<FormStep, string> = {
  1: 'Váš biznis',
  2: 'Váš web',
  3: 'Kontakt',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s\-().]{7,20}$/;
const DOMAIN_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const EMPTY_VALUES: AuditValues = {
  business: '',
  hasWeb: true,
  website: '',
  social: '',
  name: '',
  phone: '',
  email: '',
};

export function validateStep(step: FormStep, values: AuditValues): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 1 && !values.business) {
    errors.business = 'Vyberte, aký biznis máte.';
  }

  if (step === 2 && values.hasWeb) {
    const website = values.website.trim();
    if (!website) errors.website = 'Napíšte adresu webu, ktorý mám pozrieť.';
    else if (!DOMAIN_PATTERN.test(website)) errors.website = 'Toto nevyzerá ako adresa webu. Skúste napr. salonivana.sk.';
  }

  if (step === 3) {
    if (!values.name.trim()) errors.name = 'Napíšte prosím svoje meno.';
    if (!values.email.trim()) errors.email = 'Nechajte mi e-mail, nech vám mám kam poslať výsledok.';
    else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Skontrolujte e-mail, chýba v ňom niečo.';
    if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
      errors.phone = 'Telefón zadajte v tvare +421 9xx xxx xxx.';
    }
  }

  return errors;
}

export function buildMessage(values: AuditValues): string {
  const lines = [
    values.hasWeb ? '[Audit zadarmo] Žiadosť o audit webu' : '[Audit zadarmo] Žiadosť o konzultáciu (bez webu)',
    `Biznis: ${values.business || 'neuvedené'}`,
    `Web: ${values.hasWeb ? values.website.trim() : 'nemá'}`,
    `Instagram / Google profil: ${values.social.trim() || 'neuvedené'}`,
  ];
  return lines.join('\n');
}

export function firstErrorField(errors: FieldErrors): FieldName | undefined {
  const order: FieldName[] = ['business', 'website', 'name', 'email', 'phone'];
  return order.find((field) => errors[field]);
}
