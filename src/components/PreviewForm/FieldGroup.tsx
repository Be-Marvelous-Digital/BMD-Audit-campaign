import { memo, type ReactNode } from 'react';
import styles from './PreviewForm.module.less';

interface FieldGroupProps {
  id: string;
  legend: string;
  hint?: string;
  error?: string;
  layout?: 'chips' | 'tiles' | 'styles';
  children: ReactNode;
}

export const FieldGroup = memo(({ id, legend, hint, error, layout = 'chips', children }: FieldGroupProps) => (
  <fieldset className={styles.group} aria-describedby={error ? `${id}-error` : undefined}>
    <legend className={styles.group__legend}>
      {legend}
      {hint && <span className={styles.group__hint}> {hint}</span>}
    </legend>
    <div className={styles[`group__${layout}`]}>{children}</div>
    {error && (
      <p id={`${id}-error`} className={styles.form__error}>
        {error}
      </p>
    )}
  </fieldset>
));
