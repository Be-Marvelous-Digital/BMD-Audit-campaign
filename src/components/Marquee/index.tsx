import { memo } from 'react';
import { industries } from '../../data/content';
import styles from './Marquee.module.less';

interface MarqueeTrackProps {
  hidden?: boolean;
}

const MarqueeTrack = memo(({ hidden = false }: MarqueeTrackProps) => (
  <ul className={styles.marquee__list} aria-hidden={hidden || undefined}>
    {industries.map((industry) => (
      <li key={industry} className={styles.marquee__item}>
        {industry}
        <span className={styles.marquee__dot} aria-hidden="true" />
      </li>
    ))}
  </ul>
));

export const Marquee = memo(() => (
  <aside className={styles.marquee} aria-label="Pre koho je audit určený">
    <div className={styles.marquee__track}>
      <MarqueeTrack />
      <MarqueeTrack hidden />
    </div>
  </aside>
));
