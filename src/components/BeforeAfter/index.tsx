import { memo, useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import leadermAfter from '../../assets/images/leaderm-after.webp';
import leadermBefore from '../../assets/images/leaderm-before.webp';
import styles from './BeforeAfter.module.less';

const START = 50;
const SWEEP: [number, number][] = [
  [30, 700],
  [70, 1100],
  [START, 700],
];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export const BeforeAfter = memo(() => {
  const [position, setPosition] = useState(START);
  const [touched, setTouched] = useState(false);
  const compareRef = useRef<HTMLDivElement>(null);
  const inView = useInView(compareRef, { threshold: 0.6, once: true });
  const reducedMotion = usePrefersReducedMotion();

  const markTouched = useCallback(() => setTouched(true), []);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setPosition(Number(event.target.value));
  }, []);

  useEffect(() => {
    if (!inView || touched || reducedMotion) return;
    let frame = 0;
    let segment = 0;
    let from = START;
    let segmentStart = 0;
    const tick = (time: number) => {
      if (!segmentStart) segmentStart = time;
      const [to, duration] = SWEEP[segment];
      const progress = Math.min(1, (time - segmentStart) / duration);
      setPosition(from + (to - from) * easeInOut(progress));
      if (progress === 1) {
        if (++segment === SWEEP.length) return;
        from = to;
        segmentStart = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const delay = window.setTimeout(() => (frame = requestAnimationFrame(tick)), 900);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(frame);
    };
  }, [inView, touched, reducedMotion]);

  return (
    <figure className={styles.figure}>
      <span className={[styles.tag, styles['tag--before']].join(' ')} aria-hidden="true">
        Pôvodný web
      </span>
      <span className={[styles.tag, styles['tag--after']].join(' ')} aria-hidden="true">
        Nový web
      </span>
      <div className={styles.browser}>
        <div className={styles.browser__bar} aria-hidden="true">
          <span className={styles.browser__dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.browser__url}>Leaderm · kožná ambulancia</span>
        </div>
        <div
          ref={compareRef}
          className={styles.compare}
          style={{ '--pos': `${position}%` } as CSSProperties}
          onPointerDown={markTouched}
        >
          <img
            src={leadermAfter}
            alt="Nový web kožnej ambulancie Leaderm: veľký portrét lekárky, elegantný nadpis a tlačidlo na objednanie"
            width={1400}
            height={878}
            fetchPriority="high"
            decoding="async"
            className={styles.compare__image}
          />
          <img
            src={leadermBefore}
            alt="Pôvodný web Leaderm: slider so stockovou fotkou modelky a vodou, menu s farebnými tlačidlami"
            width={1400}
            height={878}
            decoding="async"
            className={[styles.compare__image, styles['compare__image--before']].join(' ')}
          />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.handle} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 5L2 10l5 5M13 5l5 5-5 5" />
            </svg>
          </span>
          <span className={[styles.hint, touched && styles['hint--hidden']].filter(Boolean).join(' ')} aria-hidden="true">
            Potiahnite a porovnajte
          </span>
          <input
            type="range"
            min={4}
            max={96}
            value={position}
            onChange={handleChange}
            onKeyDown={markTouched}
            className={styles.compare__range}
            aria-label="Porovnať pôvodný a nový web Leaderm"
          />
        </div>
      </div>
      <figcaption className={styles.caption}>
        Skutočný redizajn: kožná ambulancia Leaderm, Galanta.
      </figcaption>
    </figure>
  );
});
