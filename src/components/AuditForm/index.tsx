import { memo, useCallback, useMemo } from 'react';
import { MAILCHIMP } from '../../config/mailchimp';
import { useAuditForm } from '../../hooks/useAuditForm';
import { buildMessage, STEP_NAMES } from './AuditForm.helpers';
import { BusinessStep } from './BusinessStep';
import { ContactStep } from './ContactStep';
import { FormSuccess } from './FormSuccess';
import { WebsiteStep } from './WebsiteStep';
import styles from './AuditForm.module.less';

interface AuditFormProps {
  hasWeb: boolean;
  onHasWebChange: (hasWeb: boolean) => void;
}

export const AuditForm = memo(({ hasWeb, onHasWebChange }: AuditFormProps) => {
  const { step, values, errors, status, formRef, headingRef, setText, setConsent, goBack, goToStep, handleSubmit } =
    useAuditForm(hasWeb);

  const message = useMemo(() => buildMessage(values), [values]);
  const setBusiness = useCallback((value: string) => setText('business', value), [setText]);
  const setWebsite = useCallback((value: string) => setText('website', value), [setText]);
  const setSocial = useCallback((value: string) => setText('social', value), [setText]);
  const setName = useCallback((value: string) => setText('name', value), [setText]);
  const setPhone = useCallback((value: string) => setText('phone', value), [setText]);
  const setEmail = useCallback((value: string) => setText('email', value), [setText]);
  const goToWebsite = useCallback(() => goToStep(2), [goToStep]);

  if (status === 'success') {
    return (
      <div className={styles.form}>
        <div className={styles.form__rule} aria-hidden="true" />
        <FormSuccess name={values.name} hasWeb={hasWeb} />
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={MAILCHIMP.action}
      method="post"
      acceptCharset="UTF-8"
      noValidate
      onSubmit={handleSubmit}
      className={styles.form}
      aria-labelledby="form-title"
    >
      <div className={styles.form__rule} aria-hidden="true" />
      <div className={styles.progress}>
        <p className={styles.progress__text} aria-live="polite">
          <span>
            Krok {step} z 3
          </span>
          <span>{STEP_NAMES[step]}</span>
        </p>
        <div className={styles.progress__track} aria-hidden="true">
          <div className={[styles.progress__bar, styles[`progress__bar--${step}`]].join(' ')} />
        </div>
      </div>

      <BusinessStep
        active={step === 1}
        value={values.business}
        error={errors.business}
        headingRef={step === 1 ? headingRef : undefined}
        onChange={setBusiness}
        onPicked={goToWebsite}
      />
      <WebsiteStep
        active={step === 2}
        hasWeb={hasWeb}
        website={values.website}
        social={values.social}
        error={errors.website}
        headingRef={step === 2 ? headingRef : undefined}
        onHasWebChange={onHasWebChange}
        onWebsiteChange={setWebsite}
        onSocialChange={setSocial}
        onBack={goBack}
      />
      <ContactStep
        active={step === 3}
        hasWeb={hasWeb}
        name={values.name}
        phone={values.phone}
        email={values.email}
        consent={values.consent}
        errors={errors}
        status={status}
        headingRef={step === 3 ? headingRef : undefined}
        onNameChange={setName}
        onPhoneChange={setPhone}
        onEmailChange={setEmail}
        onConsentChange={setConsent}
        onBack={goBack}
      />

      <input type="hidden" name={MAILCHIMP.fields.message} value={message} />
      <div className={styles.form__trap} aria-hidden="true">
        <input type="text" name={MAILCHIMP.honeypot} tabIndex={-1} defaultValue="" autoComplete="off" />
      </div>
    </form>
  );
});
