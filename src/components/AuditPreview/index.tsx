import { memo, useRef, type CSSProperties } from 'react';
import { auditFinding, auditQuickFixes, auditScores } from '../../data/content';
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
      <div className={styles.report} aria-hidden="true">
        <div className={styles.report__head}>
          <span>{auditFinding.page}</span>
          <span className={styles.report__severity}>{auditFinding.severity}</span>
        </div>
        <span className={styles.report__area}>{auditFinding.area}</span>
        <p className={styles.report__title}>{auditFinding.title}</p>
        <div className={styles.report__block}>
          <span className={styles.report__label}>Diagnóza</span>
          <p className={styles.report__text}>{auditFinding.diagnosis}</p>
        </div>
        <div className={[styles.report__block, styles['report__block--fix']].join(' ')}>
          <span className={styles.report__label}>Riešenie</span>
          <ol className={styles.report__steps}>
            {auditFinding.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <dl className={styles.report__facts}>
          <div>
            <dt>Náročnosť</dt>
            <dd>{auditFinding.effort}</dd>
          </div>
          <div>
            <dt>Výsledok</dt>
            <dd>{auditFinding.impact}</dd>
          </div>
        </dl>
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
