import { memo, type CSSProperties } from 'react';
import { heroIssues } from '../../data/content';
import { useCountUp } from '../../hooks/useCountUp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './PhoneMockup.module.less';

const SCORE = 38;
const SKELETON_LINES = ['95', '88', '60'] as const;
const PRICE_LINES = ['70', '76', '52'] as const;

export const PhoneMockup = memo(() => {
  const reducedMotion = usePrefersReducedMotion();
  const score = useCountUp(SCORE, 1400, 1100, reducedMotion);
  const ringStyle = { '--score': score } as CSSProperties;

  return (
    <figure className={styles.mockup}>
      <figcaption className={styles.mockup__caption}>
        Ukážka auditu: mobilný web salónu so skóre {SCORE} zo 100. Nájdené chyby: pomalé načítanie 6,4 s, chýba
        tlačidlo Zavolať, bez online rezervácie, salón nie je v Mapách.
      </figcaption>
      <div className={styles.mockup__glow} aria-hidden="true" />
      <div className={styles.mockup__float} aria-hidden="true">
        <div className={styles.phone}>
          <div className={styles.phone__screen}>
            <div className={styles.phone__notch} />
            <div className={styles.phone__bar}>
              <span className={styles.phone__title}>Salón Ivana</span>
              <span className={styles.phone__menu}>
                <span />
                <span />
              </span>
            </div>
            <div className={styles.phone__photo}>foto_salon_2019.jpg</div>
            <div className={styles.phone__body}>
              <span className={styles['phone__line--heading']} />
              {SKELETON_LINES.map((width) => (
                <span key={width} className={[styles.phone__line, styles[`phone__line--w${width}`]].join(' ')} />
              ))}
              <span className={styles.phone__meta}>Cenník (platný od 2019)</span>
              {PRICE_LINES.map((width) => (
                <span key={width} className={[styles.phone__line, styles[`phone__line--w${width}`]].join(' ')} />
              ))}
            </div>
            <div className={styles.phone__scan} />
            <div className={styles.phone__score}>
              <div className={styles.phone__ring} style={ringStyle}>
                <span className={styles.phone__value}>{score}</span>
              </div>
              <div className={styles.phone__verdict}>
                <span className={styles.phone__label}>Skóre webu</span>
                <span>Stráca zákazníkov</span>
              </div>
            </div>
          </div>
        </div>
        {heroIssues.map((issue, index) => (
          <div key={issue.label} className={[styles.tag, styles[`tag--${index + 1}`]].join(' ')}>
            <span className={[styles.tag__dot, styles[`tag__dot--${issue.tone}`]].join(' ')} />
            {issue.label}
            {'detail' in issue && <span className={styles.tag__detail}>{issue.detail}</span>}
          </div>
        ))}
      </div>
    </figure>
  );
});
