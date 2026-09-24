import { memo } from 'react';
import { CtaLink } from '../CtaLink';
import { Logo } from '../Logo';
import styles from './Header.module.less';

export type HeaderTone = 'clear' | 'dark' | 'light';

interface HeaderProps {
  tone: HeaderTone;
  hidden: boolean;
  ctaVisible: boolean;
}

export const Header = memo(({ tone, hidden, ctaVisible }: HeaderProps) => (
  <header className={[styles.header, styles[`header--${tone}`], hidden && styles['header--hidden']].filter(Boolean).join(' ')}>
    <div className={styles.header__inner}>
      <a href="#top" className={styles.header__brand} aria-label="Be Marvelous Digital, na začiatok stránky">
        <Logo size={36} decorative className={styles.header__logo} />
        <span className={styles.header__name}>Be Marvelous Digital</span>
      </a>
      <CtaLink
        href="#formular"
        size="sm"
        className={[styles.header__cta, ctaVisible && styles['header__cta--visible']].filter(Boolean).join(' ')}
      >
        Audit zadarmo
      </CtaLink>
    </div>
  </header>
));
