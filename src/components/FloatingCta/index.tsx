import { memo } from 'react';
import { ArrowIcon } from '../ArrowIcon';
import styles from './FloatingCta.module.less';

interface FloatingCtaProps {
  visible: boolean;
}

export const FloatingCta = memo(({ visible }: FloatingCtaProps) => (
  <a
    href="#formular"
    className={[styles.floating, visible && styles['floating--visible']].filter(Boolean).join(' ')}
    aria-hidden={visible ? undefined : true}
    tabIndex={visible ? undefined : -1}
  >
    Audit zadarmo
    <ArrowIcon />
  </a>
));
