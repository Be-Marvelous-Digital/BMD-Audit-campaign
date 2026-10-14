import { memo, useCallback, useMemo, type CSSProperties } from 'react';
import { MAILCHIMP } from '../../config/mailchimp';
import { usePreviewForm, type PreviewPrefill } from '../../hooks/usePreviewForm';
import { buildMergeFields, isRefresh, STEP_COUNT, stepName } from './PreviewForm.helpers';
import { ContactStep } from './ContactStep';
import { ContextStep } from './ContextStep';
import { DirectionStep } from './DirectionStep';
import { FormSuccess } from './FormSuccess';
import { GoalStep } from './GoalStep';
import { PainStep } from './PainStep';
import { SourceStep } from './SourceStep';
import styles from './PreviewForm.module.less';

interface PreviewFormProps {
  prefill: PreviewPrefill | null;
}

export const PreviewForm = memo(({ prefill }: PreviewFormProps) => {
  const {
    step,
    values,
    errors,
    status,
    formRef,
    headingRef,
    setText,
    toggleItem,
    setHasWeb,
    setConsent,
    goBack,
    pickAndNext,
    handleSubmit,
  } = usePreviewForm(prefill);

  const mergeFields = useMemo(() => buildMergeFields(values), [values]);
  const setWebsite = useCallback((value: string) => setText('website', value), [setText]);
  const setGoal = useCallback((value: string) => setText('goal', value), [setText]);
  const pickGoal = useCallback((value: string) => pickAndNext('goal', value), [pickAndNext]);
  const setStyle = useCallback((value: string) => setText('style', value), [setText]);
  const toggleKeep = useCallback((value: string) => toggleItem('keep', value), [toggleItem]);
  const setInspiration = useCallback((value: string) => setText('inspiration', value), [setText]);
  const togglePain = useCallback((value: string) => toggleItem('pains', value), [toggleItem]);
  const setNote = useCallback((value: string) => setText('note', value), [setText]);
  const setBusiness = useCallback((value: string) => setText('business', value), [setText]);
  const setTimeline = useCallback((value: string) => setText('timeline', value), [setText]);
  const setRole = useCallback((value: string) => setText('role', value), [setText]);
  const setName = useCallback((value: string) => setText('name', value), [setText]);
  const setPhone = useCallback((value: string) => setText('phone', value), [setText]);
  const setEmail = useCallback((value: string) => setText('email', value), [setText]);

  if (status === 'success') {
    return (
      <div className={styles.form}>
        <FormSuccess name={values.name} website={values.website} hasWeb={values.hasWeb} />
      </div>
    );
  }

  const heading = (current: number) => (step === current ? headingRef : undefined);

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
      <div className={styles.progress}>
        <p className={styles.progress__text} aria-live="polite">
          <span>
            Krok {step} z {STEP_COUNT}
          </span>
          <span>{stepName(step, values.hasWeb)}</span>
        </p>
        <div className={styles.progress__track} aria-hidden="true">
          <div className={styles.progress__bar} style={{ '--progress': step / STEP_COUNT } as CSSProperties} />
        </div>
      </div>

      <SourceStep
        active={step === 1}
        hasWeb={values.hasWeb}
        website={values.website}
        error={errors.website}
        headingRef={heading(1)}
        onHasWebChange={setHasWeb}
        onWebsiteChange={setWebsite}
      />
      <GoalStep
        active={step === 2}
        hasWeb={values.hasWeb}
        value={values.goal}
        error={errors.goal}
        headingRef={heading(2)}
        onChange={setGoal}
        onPicked={pickGoal}
        onBack={goBack}
      />
      <DirectionStep
        active={step === 3}
        refresh={isRefresh(values.goal)}
        style={values.style}
        keep={values.keep}
        inspiration={values.inspiration}
        errors={errors}
        headingRef={heading(3)}
        onStyleChange={setStyle}
        onKeepToggle={toggleKeep}
        onInspirationChange={setInspiration}
        onBack={goBack}
      />
      <PainStep
        active={step === 4}
        hasWeb={values.hasWeb}
        pains={values.pains}
        note={values.note}
        error={errors.pains}
        headingRef={heading(4)}
        onPainToggle={togglePain}
        onNoteChange={setNote}
        onBack={goBack}
      />
      <ContextStep
        active={step === 5}
        business={values.business}
        timeline={values.timeline}
        role={values.role}
        errors={errors}
        headingRef={heading(5)}
        onBusinessChange={setBusiness}
        onTimelineChange={setTimeline}
        onRoleChange={setRole}
        onBack={goBack}
      />
      <ContactStep
        active={step === 6}
        name={values.name}
        phone={values.phone}
        email={values.email}
        consent={values.consent}
        errors={errors}
        status={status}
        headingRef={heading(6)}
        onNameChange={setName}
        onPhoneChange={setPhone}
        onEmailChange={setEmail}
        onConsentChange={setConsent}
        onBack={goBack}
      />

      {Object.entries(mergeFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {MAILCHIMP.tagId && <input type="hidden" name="tags" value={MAILCHIMP.tagId} />}
      <div className={styles.form__trap} aria-hidden="true">
        <input type="text" name={MAILCHIMP.honeypot} tabIndex={-1} defaultValue="" autoComplete="off" />
      </div>
    </form>
  );
});
