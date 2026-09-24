import { memo, useRef, type CSSProperties } from 'react';
import avatarUrl from '../../assets/images/peter-avatar.webp';
import { auditQuickFixes, auditScores } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import styles from './AuditPreview.module.less';

export const AuditPreview = memo(() => {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { threshold: 0.3, once: true });

  return (
    <figure ref={ref} className={[styles.preview, active && styles['preview--active']].filter(Boolean).join(' ')}>
      <figcaption className={styles.preview__head}>
        <span className={styles.preview__kicker}>Ukážka auditu</span>
        <span className={styles.preview__site}>barbershop-kings.sk</span>
        <span className={styles.preview__badge}>Doručené za 31 h</span>
      </figcaption>
      <div className={styles.video} aria-hidden="true">
        <div className={styles.video__grid} />
        <span className={styles.video__play}>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M5 3.5v9l7.5-4.5z" />
          </svg>
        </span>
        <div className={styles.video__meta}>
          <span className={styles.video__title}>Váš osobný video audit</span>
          <span className={styles.video__time}>12:48</span>
        </div>
        <img src={avatarUrl} alt="" width={84} height={84} loading="lazy" decoding="async" className={styles.video__avatar} />
      </div>
      <ul className={styles.scores}>
        {auditScores.map((score, index) => (
          <li key={score.label} className={styles.scores__row}>
            <span className={styles.scores__label}>{score.label}</span>
            <span className={styles.scores__track} aria-hidden="true">
              <span
                className={[styles.scores__fill, styles[`scores__fill--${score.tone}`]].join(' ')}
                style={{ '--value': score.value / 100, '--index': index } as CSSProperties}
              />
            </span>
            <span className={styles.scores__value}>
              {score.value}
              <span className="visually-hidden"> zo 100</span>
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.fixes}>
        <span className={styles.fixes__title}>3 rýchle opravy</span>
        <ol className={styles.fixes__list}>
          {auditQuickFixes.map((fix) => (
            <li key={fix}>{fix}</li>
          ))}
        </ol>
      </div>
    </figure>
  );
});
