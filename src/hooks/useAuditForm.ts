import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type RefObject } from 'react';
import {
  EMPTY_VALUES,
  firstErrorField,
  validateStep,
  type AuditValues,
  type FieldErrors,
  type FieldName,
  type FormStep,
} from '../components/AuditForm/AuditForm.helpers';
import { MAILCHIMP } from '../config/mailchimp';
import { collectFields, subscribe, type SubscribeOutcome } from '../utils/mailchimp';
import { trackLead } from '../utils/metaPixel';

type EditableValues = Omit<AuditValues, 'hasWeb'>;
type TextField = keyof EditableValues;

export type SubmitStatus = 'idle' | 'submitting' | SubscribeOutcome;

interface AuditFormApi {
  step: FormStep;
  values: AuditValues;
  errors: FieldErrors;
  status: SubmitStatus;
  formRef: RefObject<HTMLFormElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  setText: (field: TextField, value: string) => void;
  goBack: () => void;
  goToStep: (step: FormStep) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useAuditForm(hasWeb: boolean): AuditFormApi {
  const [step, setStep] = useState<FormStep>(1);
  const [editable, setEditable] = useState<EditableValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepChanged = useRef(false);

  const values = useMemo<AuditValues>(() => ({ ...editable, hasWeb }), [editable, hasWeb]);

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

  const setText = useCallback((field: TextField, value: string) => {
    setEditable((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  const goBack = useCallback(() => changeStep(step === 3 ? 2 : 1), [changeStep, step]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const stepErrors = validateStep(step, values);
      if (firstErrorField(stepErrors)) {
        event.preventDefault();
        setErrors(stepErrors);
        focusField(firstErrorField(stepErrors));
        return;
      }
      event.preventDefault();
      if (step < 3) {
        changeStep(step === 1 ? 2 : 3);
        return;
      }
      if (status === 'submitting') return;
      setStatus('submitting');
      subscribe(MAILCHIMP.action, collectFields(event.currentTarget, 'audit-'))
        .then((outcome) => {
          setStatus(outcome);
          if (outcome === 'success') trackLead({ hasWeb: values.hasWeb, business: values.business });
        })
        .catch(() => setStatus('error'));
    },
    [step, values, status, focusField, changeStep],
  );

  return {
    step,
    values,
    errors,
    status,
    formRef,
    headingRef,
    setText,
    goBack,
    goToStep: changeStep,
    handleSubmit,
  };
}
