import { memo, useCallback, type ChangeEvent, type RefObject } from 'react';
import { MAILCHIMP } from '../../config/mailchimp';
import { SITE } from '../../config/site';
import { ArrowIcon } from '../ArrowIcon';
import { FormField } from '../FormField';
import type { FieldErrors } from './PreviewForm.helpers';
import type { SubmitStatus } from '../../hooks/usePreviewForm';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import { SubmitAlert, type SubmitAlertKind } from './SubmitAlert';
import styles from './PreviewForm.module.less';

interface ContactStepProps {
  active: boolean;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  errors: FieldErrors;
  status: SubmitStatus;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onConsentChange: (value: boolean) => void;
  onBack: () => void;
}

function isAlert(status: SubmitStatus): status is SubmitAlertKind {
  return status === 'error' || status === 'already-subscribed' || status === 'invalid-email' || status === 'rate-limited';
}

export const ContactStep = memo(
  ({
    active,
    name,
    phone,
    email,
    consent,
    errors,
    status,
    headingRef,
    onNameChange,
    onPhoneChange,
    onEmailChange,
    onConsentChange,
    onBack,
  }: ContactStepProps) => {
    const submitting = status === 'submitting';
    const handleConsent = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => onConsentChange(event.target.checked),
      [onConsentChange],
    );

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">Kam vám pošlem náhľad?</legend>
        <StepHeading headingRef={headingRef}>Kam vám pošlem náhľad?</StepHeading>
        <FormField
          label="Meno"
          field="name"
          name={MAILCHIMP.fields.firstName}
          autoComplete="given-name"
          placeholder="Ivana"
          value={name}
          error={errors.name}
          required
          onChange={onNameChange}
        />
        <div className={styles.form__pair}>
          <FormField
            label="E-mail"
            field="email"
            name={MAILCHIMP.fields.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ivana@salonivana.sk"
            value={email}
            error={errors.email}
            required
            onChange={onEmailChange}
          />
          <FormField
            label="Telefón / WhatsApp"
            field="phone"
            name={MAILCHIMP.fields.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+421 9xx xxx xxx"
            value={phone}
            error={errors.phone}
            required
            onChange={onPhoneChange}
          />
        </div>
        <div className={styles.consent}>
          <label className={[styles.consent__label, errors.consent && styles['consent__label--error']].filter(Boolean).join(' ')}>
            <input
              type="checkbox"
              name="preview-consent"
              checked={consent}
              data-field="consent"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              onChange={handleConsent}
              className={styles.consent__input}
            />
            <span className={styles.consent__box} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6.5l2.2 2.2 4.8-5" />
              </svg>
            </span>
            Rozumiem, že dostanem návrh úvodnej stránky na ukážku, nie hotový web.
          </label>
          {errors.consent && (
            <p id="consent-error" className={styles.form__error}>
              {errors.consent}
            </p>
          )}
        </div>
        {isAlert(status) && <SubmitAlert kind={status} />}
        <StepNav onBack={onBack}>
          <button type="submit" className={styles.form__submit} aria-disabled={submitting || undefined}>
            {submitting ? 'Odosielam…' : 'Chcem svoj náhľad'}
            <ArrowIcon />
          </button>
        </StepNav>
        <p className={styles.form__notice}>
          Údaje použijem len na prípravu náhľadu a komunikáciu o ňom. Žiadny newsletter, žiadny spam. Viac v{' '}
          <a href={SITE.privacyUrl} target="_blank" rel="noopener" className={styles.form__link}>
            zásadách ochrany osobných údajov
          </a>
          .
        </p>
      </fieldset>
    );
  },
);
