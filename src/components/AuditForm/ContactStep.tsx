import { memo, useCallback, type ChangeEvent, type RefObject } from 'react';
import { MAILCHIMP } from '../../config/mailchimp';
import { SITE } from '../../config/site';
import { ArrowIcon } from '../ArrowIcon';
import { FormField } from '../FormField';
import type { FieldErrors } from './AuditForm.helpers';
import type { SubmitStatus } from '../../hooks/useAuditForm';
import { StepHeading } from './StepHeading';
import { SubmitAlert } from './SubmitAlert';
import styles from './AuditForm.module.less';

interface ContactStepProps {
  active: boolean;
  hasWeb: boolean;
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

export const ContactStep = memo(
  ({
    active,
    hasWeb,
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
    const handleConsent = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => onConsentChange(event.target.checked),
      [onConsentChange],
    );
    const submitLabel = hasWeb ? 'Poslať audit zadarmo' : 'Chcem konzultáciu';
    const submitting = status === 'submitting';

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">Kontaktné údaje</legend>
        <StepHeading headingRef={headingRef}>
          Kam vám pošlem {hasWeb ? 'audit' : 'termín konzultácie'}?
        </StepHeading>
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
            optional
            onChange={onPhoneChange}
          />
        </div>
        <div className={styles.form__consent}>
          <label className={styles['form__consent-label']}>
            <input
              type="checkbox"
              checked={consent}
              required
              data-field="consent"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              onChange={handleConsent}
              className={styles['form__consent-box']}
            />
            <span>
              Súhlasím so{' '}
              <a href={SITE.privacyUrl} target="_blank" rel="noopener" className={styles.form__link}>
                spracovaním osobných údajov
              </a>{' '}
              za účelom prípravy auditu. Žiadny newsletter, žiadny spam.
            </span>
          </label>
          {errors.consent && (
            <span id="consent-error" className={styles.form__error}>
              {errors.consent}
            </span>
          )}
        </div>
        {(status === 'error' || status === 'already-subscribed') && <SubmitAlert kind={status} />}
        <div className={styles['form__nav--wrap']}>
          <button type="button" className={styles.form__back} onClick={onBack}>
            Späť
          </button>
          <button type="submit" className={styles.form__submit} aria-disabled={submitting || undefined}>
            {submitting ? 'Odosielam…' : submitLabel}
            <ArrowIcon />
          </button>
        </div>
      </fieldset>
    );
  },
);
