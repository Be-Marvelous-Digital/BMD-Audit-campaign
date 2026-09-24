import { memo } from 'react';
import { SITE } from '../../config/site';
import { Logo } from '../Logo';
import styles from './Footer.module.less';

export const Footer = memo(() => (
  <footer className={styles.footer}>
    <div className={styles.footer__inner}>
      <a href={SITE.mainSiteUrl} className={styles.footer__brand}>
        <Logo size={28} decorative />
        Be Marvelous Digital
      </a>
      <address className={styles.footer__contact}>
        <a href={`mailto:${SITE.email}`} className={styles.footer__link}>
          {SITE.email}
        </a>
      </address>
      <nav aria-label="Pätička" className={styles.footer__nav}>
        <a href={SITE.privacyUrl} className={styles.footer__link}>
          Ochrana osobných údajov
        </a>
        <a href={SITE.mainSiteUrl} className={styles.footer__link}>
          bemarvelousdigital.sk
        </a>
      </nav>
      <p className={styles.footer__credit} suppressHydrationWarning>
        © {new Date().getFullYear()} {SITE.author}. Slovensko, pracujem aj na diaľku.
      </p>
    </div>
  </footer>
));
