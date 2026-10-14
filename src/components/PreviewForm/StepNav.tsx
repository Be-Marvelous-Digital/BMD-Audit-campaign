import { memo, type ReactNode } from 'react';
import styles from './PreviewForm.module.less';

interface StepNavProps {
  onBack?: () => void;
  children?: ReactNode;
}

export const StepNav = memo(({ onBack, children }: StepNavProps) => (
  <div className={onBack ? styles.form__nav : styles['form__nav--end']}>
    {onBack && (
      <button type="button" className={styles.form__back} onClick={onBack}>
        Späť
      </button>
    )}
    {children ?? (
      <button type="submit" className={styles.form__next}>
        Pokračovať
      </button>
    )}
  </div>
));
