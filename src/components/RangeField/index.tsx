import { memo, useCallback, useId, type ChangeEvent } from 'react';
import styles from './RangeField.module.less';

interface RangeFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  valueText: string;
  onChange: (value: number) => void;
}

export const RangeField = memo(({ label, value, min, max, step, valueText, onChange }: RangeFieldProps) => {
  const id = useId();
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value)), [onChange]);

  return (
    <div className={styles.range}>
      <div className={styles.range__head}>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className={styles.range__value}>
          {valueText}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className={styles.range__input}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={valueText}
        onChange={handleChange}
      />
    </div>
  );
});
