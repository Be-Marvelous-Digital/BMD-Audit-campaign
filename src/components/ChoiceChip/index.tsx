import { memo, useCallback } from 'react';
import styles from './ChoiceChip.module.less';

interface ChoiceChipProps {
  type: 'radio' | 'checkbox';
  name: string;
  value: string;
  label: string;
  checked: boolean;
  field?: string;
  onSelect: (value: string) => void;
}

export const ChoiceChip = memo(({ type, name, value, label, checked, field, onSelect }: ChoiceChipProps) => {
  const handleChange = useCallback(() => onSelect(value), [onSelect, value]);

  return (
    <label className={[styles.chip, checked && styles['chip--checked']].filter(Boolean).join(' ')}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        data-field={field}
        onChange={handleChange}
        className={styles.chip__input}
      />
      {type === 'checkbox' && (
        <span className={styles.chip__box} aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6.5l2.2 2.2 4.8-5" />
          </svg>
        </span>
      )}
      {label}
    </label>
  );
});
