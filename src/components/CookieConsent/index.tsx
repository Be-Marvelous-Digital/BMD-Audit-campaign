import { memo, useCallback, useId, useState } from 'react';
import { SITE } from '../../config/site';
import type { ConsentPreferences } from '../../utils/consent';
import styles from './CookieConsent.module.less';

interface CookieConsentProps {
  initial: ConsentPreferences | null;
  onSave: (prefs: ConsentPreferences) => void;
}

export const CookieConsent = memo(({ initial, onSave }: CookieConsentProps) => {
  const titleId = useId();
  const [customizing, setCustomizing] = useState(false);
  const [marketing, setMarketing] = useState(initial?.marketing ?? false);
  const analytics = initial?.analytics ?? false;

  const acceptAll = useCallback(() => onSave({ analytics, marketing: true }), [onSave, analytics]);
  const rejectAll = useCallback(() => onSave({ analytics, marketing: false }), [onSave, analytics]);
  const saveChoice = useCallback(() => onSave({ analytics, marketing }), [onSave, analytics, marketing]);
  const openCustomize = useCallback(() => setCustomizing(true), []);
  const toggleMarketing = useCallback(() => setMarketing((current) => !current), []);

  return (
    <section className={styles.consent} role="dialog" aria-labelledby={titleId} aria-modal="false">
      <h2 id={titleId} className={styles.consent__title}>
        Vaše súkromie je pre nás dôležité
      </h2>
      <p className={styles.consent__text}>
        Marketingové cookies (Meta Pixel) nám pomáhajú merať účinnosť kampaní. Zapneme ich len s vaším súhlasom.{' '}
        <a href={SITE.privacyUrl} className={styles.consent__link} target="_blank" rel="noopener">
          Ochrana osobných údajov
        </a>
      </p>

      {customizing && (
        <div className={styles.consent__options}>
          <label className={[styles.option, styles['option--locked']].join(' ')}>
            <span className={styles.option__info}>
              <span className={styles.option__name}>Nevyhnutné</span>
              <span className={styles.option__desc}>Potrebné pre fungovanie stránky. Nedajú sa vypnúť.</span>
            </span>
            <input type="checkbox" checked disabled className={styles.option__input} />
            <span className={[styles.option__switch, styles['option__switch--on']].join(' ')} aria-hidden="true" />
          </label>
          <label className={styles.option}>
            <span className={styles.option__info}>
              <span className={styles.option__name}>Marketingové</span>
              <span className={styles.option__desc}>Meranie účinnosti reklám a kampaní (Meta Pixel).</span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={marketing}
              onChange={toggleMarketing}
              className={styles.option__input}
            />
            <span
              className={[styles.option__switch, marketing && styles['option__switch--on']].filter(Boolean).join(' ')}
              aria-hidden="true"
            />
          </label>
        </div>
      )}

      <div className={styles.consent__actions}>
        {customizing ? (
          <button type="button" className={styles['consent__button--primary']} onClick={saveChoice}>
            Uložiť nastavenia
          </button>
        ) : (
          <>
            <button type="button" className={styles['consent__button--primary']} onClick={acceptAll}>
              Prijať všetky
            </button>
            <button type="button" className={styles['consent__button--secondary']} onClick={rejectAll}>
              Odmietnuť všetky
            </button>
            <button type="button" className={styles['consent__button--ghost']} onClick={openCustomize}>
              Prispôsobiť
            </button>
          </>
        )}
      </div>
    </section>
  );
});
