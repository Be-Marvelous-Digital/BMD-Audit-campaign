import { memo, useCallback, useState, type ChangeEvent, type FormEvent, type RefObject } from 'react';
import { WEEKLY_CAPACITY } from '../../data/content';
import { ArrowIcon } from '../ArrowIcon';
import { BeforeAfter } from '../BeforeAfter';
import { HeroCanvas } from '../HeroCanvas';
import styles from './Hero.module.less';

interface HeroProps {
  sectionRef: RefObject<HTMLElement | null>;
  onStart: (hasWeb: boolean, website: string) => void;
}

export const Hero = memo(({ sectionRef, onStart }: HeroProps) => {
  const [website, setWebsite] = useState('');
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value), []);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onStart(true, website);
    },
    [onStart, website],
  );
  const handleNoWeb = useCallback(() => onStart(false, ''), [onStart]);

  return (
    <section id="top" ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
      <HeroCanvas />
      <div className={styles.hero__wash} aria-hidden="true" />
      <div className={styles.hero__inner}>
        <div className={styles.hero__copy}>
          <p className={styles.hero__eyebrow}>Pre majiteľov malých a stredných firiem</p>
          <h1 id="hero-title" className={styles.hero__title}>
            <span className={styles['hero__line--1']}>Váš nový web.</span>{' '}
            <span className={styles['hero__line--2']}>Do 72 hodín.</span>{' '}
            <span className={styles['hero__line--3']}>Zadarmo na ukážku.</span>
          </h1>
          <p className={styles.hero__lead}>
            Pošlite mi adresu svojho webu a pár odpovedí. Navrhnem vám novú úvodnú stránku na mieru a pošlem odkaz,
            kde si ju pozriete. <strong>Páči sa vám? Dotiahneme ju. Nie? Nič nedlžíte.</strong>
          </p>
          <form className={styles.start} action="#formular" onSubmit={handleSubmit}>
            <label htmlFor="hero-website" className="visually-hidden">
              Adresa vášho webu
            </label>
            <div className={styles.start__field}>
              <input
                id="hero-website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="adresa vášho webu"
                value={website}
                onChange={handleChange}
                className={styles.start__input}
              />
              <button type="submit" className={styles.start__button}>
                Chcem náhľad
                <ArrowIcon />
              </button>
            </div>
            <button type="button" className={styles.start__alt} onClick={handleNoWeb}>
              Web ešte nemám, mám len Instagram alebo Google profil
            </button>
          </form>
          <p className={styles.hero__note}>
            Navrhujem sám, preto najviac {WEEKLY_CAPACITY} náhľadov týždenne.
          </p>
        </div>
        <BeforeAfter />
      </div>
    </section>
  );
});
