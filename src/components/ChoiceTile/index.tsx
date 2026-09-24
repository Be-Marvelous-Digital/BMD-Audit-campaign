import { memo, useCallback, type MouseEvent } from 'react';
import styles from './ChoiceTile.module.less';

interface ChoiceTileProps {
  name: string;
  value: string;
  label: string;
  description?: string;
  checked: boolean;
  field?: string;
  onSelect: (value: string, fromPointer: boolean) => void;
}

export const ChoiceTile = memo(({ name, value, label, description, checked, field, onSelect }: ChoiceTileProps) => {
  const handleChange = useCallback(() => onSelect(value, false), [onSelect, value]);
  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (event.detail > 0) onSelect(value, true);
    },
    [onSelect, value],
  );

  return (
    <label className={[styles.tile, checked && styles['tile--checked']].filter(Boolean).join(' ')}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        data-field={field}
        onChange={handleChange}
        onClick={handleClick}
        className={styles.tile__input}
      />
      <span className={styles.tile__label}>{label}</span>
      {description && <span className={styles.tile__description}>{description}</span>}
    </label>
  );
});
