import { memo, useCallback, type MouseEvent, type SyntheticEvent } from 'react';
import type { Faq } from '../../data/content';
import { useCollapse } from '../../hooks/useCollapse';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './Faq.module.less';

const DURATION_MS = 450;

interface FaqItemProps {
  faq: Faq;
  index: number;
  open: boolean;
  onToggle: (index: number) => void;
  onOpen: (index: number) => void;
}

export const FaqItem = memo(({ faq, index, open, onToggle, onOpen }: FaqItemProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const { present, expanded } = useCollapse(open, reducedMotion ? 0 : DURATION_MS);

  const handleSummaryClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onToggle(index);
    },
    [onToggle, index],
  );

  const handleNativeToggle = useCallback(
    (event: SyntheticEvent<HTMLDetailsElement>) => {
      if (event.currentTarget.open && !open) onOpen(index);
    },
    [open, onOpen, index],
  );

  return (
    <details
      open={present}
      onToggle={handleNativeToggle}
      className={[styles.item, expanded && styles['item--expanded']].filter(Boolean).join(' ')}
    >
      <summary className={styles.item__question} onClick={handleSummaryClick}>
        <span className={styles.item__heading}>{faq.question}</span>
        <span className={styles.item__icon} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </summary>
      <div className={styles.item__panel}>
        <div className={styles['item__panel-inner']}>
          <p className={styles.item__answer}>{faq.answer}</p>
        </div>
      </div>
    </details>
  );
});
