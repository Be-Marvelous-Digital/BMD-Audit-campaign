import { memo, useCallback, type CSSProperties } from 'react';
import type { StyleOption } from '../../data/content';
import styles from './StyleTile.module.less';

interface StyleTileProps {
  name: string;
  option: StyleOption;
  checked: boolean;
  field?: string;
  onSelect: (value: string) => void;
}

export const StyleTile = memo(({ name, option, checked, field, onSelect }: StyleTileProps) => {
  const handleChange = useCallback(() => onSelect(option.value), [onSelect, option.value]);
  const [base, ink, accent] = option.swatch;

  return (
    <label className={[styles.tile, checked && styles['tile--checked']].filter(Boolean).join(' ')}>
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        data-field={field}
        onChange={handleChange}
        className={styles.tile__input}
      />
      <span
        className={[styles.sample, styles[`sample--${option.sample}`]].join(' ')}
        style={{ '--s-base': base, '--s-ink': ink, '--s-accent': accent } as CSSProperties}
        aria-hidden="true"
      >
        <span className={styles.sample__type}>Aa</span>
        <span className={styles.sample__bar} />
        <span className={styles.sample__dot} />
      </span>
      <span className={styles.tile__text}>
        <span className={styles.tile__label}>{option.label}</span>
        <span className={styles.tile__description}>{option.description}</span>
      </span>
    </label>
  );
});
