import { memo } from 'react';
import styles from './SkipLink.module.less';

export const SkipLink = memo(() => (
  <a href="#obsah" className={styles.skip}>
    Preskočiť na obsah
  </a>
));
