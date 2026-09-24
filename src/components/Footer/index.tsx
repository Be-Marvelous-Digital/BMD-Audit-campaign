import { memo } from 'react';
import { SITE } from '../../config/site';
import { Logo } from '../Logo';
import styles from './Footer.module.less';

interface FooterProps {
  onConsentSettings: () => void;
}

export const Footer = memo(({ onConsentSettings }: FooterProps) => (
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
        <button type="button" className={styles.footer__link} onClick={onConsentSettings}>
          Nastavenia cookies
        </button>
        <a href={SITE.mainSiteUrl} className={styles.footer__link}>
          bemarvelousdigital.sk
        </a>
      </nav>
      <p className={styles.footer__credit} suppressHydrationWarning>
        © {new Date().getFullYear()} {SITE.company.legalName}
      </p>
    </div>
    <div className={styles.footer__legal}>
      <p className={styles['footer__legal-text']}>
        {SITE.company.legalName}, {SITE.company.street}, {SITE.company.postalCode} {SITE.company.city} –{' '}
        {SITE.company.district} · IČO {SITE.company.ico} · DIČ {SITE.company.dic} · IČ DPH {SITE.company.icDph}
      </p>
    </div>
  </footer>
));
