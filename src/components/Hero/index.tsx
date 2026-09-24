import { memo, type MouseEventHandler, type RefObject } from 'react';
import { heroStats } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { HeroCanvas } from '../HeroCanvas';
import { PhoneMockup } from '../PhoneMockup';
import styles from './Hero.module.less';

interface HeroProps {
  sectionRef: RefObject<HTMLElement | null>;
  onNoWebClick: MouseEventHandler<HTMLAnchorElement>;
}

export const Hero = memo(({ sectionRef, onNoWebClick }: HeroProps) => (
  <section id="top" ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
    <HeroCanvas />
    <div className={styles.hero__wash} aria-hidden="true" />
    <div className={styles.hero__inner}>
      <div className={styles.hero__copy}>
        <p className={styles.hero__eyebrow}>Audit webu zadarmo pre malé, stredné firmy a živnostníkov</p>
        <h1 id="hero-title" className={styles.hero__title}>
          <span className={styles['hero__line--1']}>Hľadajú vás.</span>{' '}
          <span className={styles['hero__line--2']}>Nájdu</span>{' '}
          <span className={styles['hero__line--3']}>konkurenciu.</span>
        </h1>
        <p className={styles.hero__lead}>
          Osobne prejdem váš web aj Google profil tak, ako ho vidí váš zákazník na mobile. Do 48 hodín vám pošlem
          krátke video: čo vám berie zákazníkov a ako to opraviť.{' '}
          <strong>Zadarmo. Bez záväzkov. Bez predajcu.</strong>
        </p>
        <div className={styles.hero__actions}>
          <CtaLink href="#formular" size="lg" withArrow shine>
            Chcem audit zadarmo
          </CtaLink>
          <CtaLink href="#formular" size="lg" variant="outline-light" onClick={onNoWebClick}>
            Web ešte nemám
          </CtaLink>
        </div>
        <dl className={styles.hero__stats}>
          {heroStats.map((stat) => (
            <div key={stat.label} className={styles.hero__stat}>
              <dt className={styles['hero__stat-label']}>{stat.label}</dt>
              <dd className={styles['hero__stat-value']}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <PhoneMockup />
    </div>
    <span className={styles.hero__cue} aria-hidden="true" />
  </section>
));
