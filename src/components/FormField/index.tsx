import { memo, useCallback, useId, type ChangeEvent, type HTMLInputAutoCompleteAttribute } from 'react';
import styles from './FormField.module.less';

interface FormFieldProps {
  label: string;
  field: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
  inputMode?: 'text' | 'email' | 'tel' | 'url';
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
}

export const FormField = memo(
  ({
    label,
    field,
    value,
    onChange,
    name,
    type = 'text',
    inputMode,
    autoComplete,
    placeholder,
    hint,
    error,
    required = false,
    optional = false,
  }: FormFieldProps) => {
    const id = useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange]);

    return (
      <div className={[styles.field, error && styles['field--error']].filter(Boolean).join(' ')}>
        <label htmlFor={id} className={styles.field__label}>
          {label}
          {optional && <span className={styles.field__optional}> (nepovinné)</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          data-field={field}
          onChange={handleChange}
          className={styles.field__input}
        />
        {hint && (
          <span id={hintId} className={styles.field__hint}>
            {hint}
          </span>
        )}
        {error && (
          <span id={errorId} className={styles.field__error}>
            {error}
          </span>
        )}
      </div>
    );
  },
);
