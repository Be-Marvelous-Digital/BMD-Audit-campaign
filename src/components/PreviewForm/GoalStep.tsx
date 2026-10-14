import { memo, useCallback, useMemo, type RefObject } from 'react';
import { goalOptions } from '../../data/content';
import { ChoiceTile } from '../ChoiceTile';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import styles from './PreviewForm.module.less';

interface GoalStepProps {
  active: boolean;
  hasWeb: boolean;
  value: string;
  error?: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onChange: (value: string) => void;
  onPicked: (value: string) => void;
  onBack: () => void;
}

export const GoalStep = memo(({ active, hasWeb, value, error, headingRef, onChange, onPicked, onBack }: GoalStepProps) => {
  const options = useMemo(() => goalOptions(hasWeb), [hasWeb]);
  const handleSelect = useCallback(
    (next: string, fromPointer: boolean) => (fromPointer ? onPicked(next) : onChange(next)),
    [onChange, onPicked],
  );
  const title = hasWeb ? 'Čo by ste s webom chceli urobiť?' : 'Aký by mal byť váš nový web?';

  return (
    <fieldset className={styles.form__step} hidden={!active} aria-describedby={error ? 'goal-error' : undefined}>
      <legend className="visually-hidden">{title}</legend>
      <StepHeading headingRef={headingRef}>{title}</StepHeading>
      <div className={styles['form__tiles--stack']}>
        {options.map((option, index) => (
          <ChoiceTile
            key={option.value}
            name="preview-goal"
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            field={index === 0 ? 'goal' : undefined}
            onSelect={handleSelect}
          />
        ))}
      </div>
      {error && (
        <p id="goal-error" className={styles.form__error}>
          {error}
        </p>
      )}
      <StepNav onBack={onBack} />
    </fieldset>
  );
});
