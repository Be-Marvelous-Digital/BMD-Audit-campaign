import { memo } from 'react';
import { journey } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { staggerDelay } from '../Reveal/Reveal.helpers';
import { SectionIntro } from '../SectionIntro';
import styles from './Journey.module.less';

export const Journey = memo(() => (
  <section id="cesta-zakaznika" className={styles.journey} aria-labelledby="journey-title">
    <div className={styles.journey__inner}>
      <SectionIntro
        id="journey-title"
        index="04"
        kicker="Viac než web"
        title="Nerobím suché weby. Staviam cestu k zákazníkom."
        lead="Web je len jeden diel. Pozriem sa na to, ako k vám zákazník prichádza celý: od prvého hľadania až po to, či sa vráti. A navrhnem riešenia, ktoré dávajú zmysel pre váš biznis."
        tone="dark"
      />
      <ol className={styles.journey__steps}>
        {journey.map((step, index) => (
          <Reveal as="li" key={step.number} delay={staggerDelay(index)} className={styles.step}>
            <span className={[styles.step__rail, styles[`step__rail--${index + 1}`]].join(' ')} aria-hidden="true">
              <span className={styles.step__flow} />
            </span>
            <span className={styles.step__number} aria-hidden="true">
              {step.number}
            </span>
            <h3 className={styles.step__title}>{step.title}</h3>
            <p className={styles.step__text}>{step.description}</p>
            <ul className={styles.step__tools} aria-label="Nástroje">
              {step.tools.map((tool) => (
                <li key={tool} className={styles.step__tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
      <Reveal className={styles.journey__cta}>
        <p className={styles['journey__cta-text']}>
          Niekedy je riešením nový web. Niekedy len správne nastavený Google profil a online rezervácie.{' '}
          <span className={styles['journey__cta-accent']}>Poviem vám, čo z toho potrebujete vy.</span>
        </p>
        <CtaLink href="#formular" withArrow>
          Chcem audit zadarmo
        </CtaLink>
      </Reveal>
    </div>
  </section>
));
