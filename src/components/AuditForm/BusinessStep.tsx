import { memo, useCallback, type RefObject } from 'react';
import { businessTypes } from '../../data/content';
import { ChoiceTile } from '../ChoiceTile';
import { StepHeading } from './StepHeading';
import styles from './AuditForm.module.less';

interface BusinessStepProps {
  active: boolean;
  value: string;
  error?: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onChange: (value: string) => void;
  onPicked: () => void;
}

export const BusinessStep = memo(({ active, value, error, headingRef, onChange, onPicked }: BusinessStepProps) => {
  const handleSelect = useCallback(
    (next: string, fromPointer: boolean) => {
      onChange(next);
      if (fromPointer) onPicked();
    },
    [onChange, onPicked],
  );

  return (
    <fieldset className={styles.form__step} hidden={!active} aria-describedby={error ? 'business-error' : undefined}>
      <legend className="visually-hidden">Aký biznis máte?</legend>
      <StepHeading headingRef={headingRef}>Aký biznis máte?</StepHeading>
      <div className={styles.form__tiles}>
        {businessTypes.map((type, index) => (
          <ChoiceTile
            key={type}
            name="audit-business"
            value={type}
            label={type}
            checked={value === type}
            field={index === 0 ? 'business' : undefined}
            onSelect={handleSelect}
          />
        ))}
      </div>
      {error && (
        <p id="business-error" className={styles.form__error}>
          {error}
        </p>
      )}
      <div className={styles['form__nav--end']}>
        <button type="submit" className={styles.form__next}>
          Pokračovať
        </button>
      </div>
    </fieldset>
  );
});
