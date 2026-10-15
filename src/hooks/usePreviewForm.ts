import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import {
  EMPTY_VALUES,
  firstErrorField,
  isWebsite,
  STEP_COUNT,
  validateStep,
  type FieldErrors,
  type FieldName,
  type FormStep,
  type ListField,
  type PreviewValues,
  type TextField,
} from '../components/PreviewForm/PreviewForm.helpers';
import { MAILCHIMP } from '../config/mailchimp';
import { collectFields, subscribe, type SubscribeOutcome } from '../utils/mailchimp';
import { trackLead } from '../utils/metaPixel';

export type SubmitStatus = 'idle' | 'submitting' | SubscribeOutcome;

const INVALID_EMAIL_MESSAGE =
  'Túto adresu nemôžem použiť, nedá sa na ňu doručiť e-mail. Skontrolujte ju alebo zadajte inú.';

export interface PreviewPrefill {
  id: number;
  hasWeb: boolean;
  website: string;
}

interface PreviewFormApi {
  step: FormStep;
  values: PreviewValues;
  errors: FieldErrors;
  status: SubmitStatus;
  formRef: RefObject<HTMLFormElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  setText: (field: TextField, value: string) => void;
  toggleItem: (field: ListField, item: string) => void;
  setHasWeb: (hasWeb: boolean) => void;
  setConsent: (consent: boolean) => void;
  goBack: () => void;
  pickAndNext: (field: TextField, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function usePreviewForm(prefill: PreviewPrefill | null): PreviewFormApi {
  const [step, setStep] = useState<FormStep>(1);
  const [values, setValues] = useState<PreviewValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepChanged = useRef(false);

  useEffect(() => {
    if (!stepChanged.current) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const focusField = useCallback((field: FieldName | undefined) => {
    if (!field) return;
    formRef.current?.querySelector<HTMLElement>(`[data-field="${field}"]`)?.focus();
  }, []);

  const changeStep = useCallback((next: FormStep) => {
    stepChanged.current = true;
    setErrors({});
    setStep(next);
  }, []);

  const clearError = useCallback((field: FieldName) => {
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  const setText = useCallback(
    (field: TextField, value: string) => {
      setValues((current) => ({ ...current, [field]: value }));
      clearError(field as FieldName);
    },
    [clearError],
  );

  const toggleItem = useCallback(
    (field: ListField, item: string) => {
      setValues((current) => {
        const list = current[field];
        return { ...current, [field]: list.includes(item) ? list.filter((x) => x !== item) : [...list, item] };
      });
      clearError(field);
    },
    [clearError],
  );

  const setHasWeb = useCallback((hasWeb: boolean) => {
    setValues((current) =>
      current.hasWeb === hasWeb ? current : { ...current, hasWeb, website: '', goal: '', pains: [] },
    );
    setErrors({});
  }, []);

  const setConsent = useCallback(
    (consent: boolean) => {
      setValues((current) => ({ ...current, consent }));
      clearError('consent');
    },
    [clearError],
  );

  useEffect(() => {
    if (!prefill) return;
    const website = prefill.website.trim();
    setValues((current) => ({
      ...current,
      hasWeb: prefill.hasWeb,
      website,
      ...(current.hasWeb === prefill.hasWeb ? {} : { goal: '', pains: [] }),
    }));
    setErrors({});
    stepChanged.current = true;
    if (prefill.hasWeb && isWebsite(website)) {
      setStep(2);
    } else {
      setStep(1);
      window.setTimeout(() => focusField('website'), 0);
    }
  }, [prefill, focusField]);

  const goBack = useCallback(() => changeStep(Math.max(1, step - 1) as FormStep), [changeStep, step]);

  const advance = useCallback(
    (current: PreviewValues) => {
      const stepErrors = validateStep(step, current);
      const field = firstErrorField(stepErrors);
      if (field) {
        setErrors(stepErrors);
        focusField(field);
        return false;
      }
      if (step < STEP_COUNT) changeStep((step + 1) as FormStep);
      return true;
    },
    [step, focusField, changeStep],
  );

  const pickAndNext = useCallback(
    (field: TextField, value: string) => {
      const next = { ...values, [field]: value };
      setValues(next);
      advance(next);
    },
    [values, advance],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (step < STEP_COUNT) {
        advance(values);
        return;
      }
      if (!advance(values) || status === 'submitting') return;
      setStatus('submitting');
      subscribe(MAILCHIMP.action, collectFields(event.currentTarget, 'preview-'))
        .then((outcome) => {
          setStatus(outcome);
          if (outcome === 'invalid-email') {
            setErrors({ email: INVALID_EMAIL_MESSAGE });
            focusField('email');
          }
          if (outcome === 'success') {
            trackLead({ hasWeb: values.hasWeb, business: values.business, goal: values.goal, timeline: values.timeline });
          }
        })
        .catch(() => setStatus('error'));
    },
    [step, values, status, advance, focusField],
  );

  return {
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
  };
}
