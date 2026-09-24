import { memo } from 'react';
import { leaks } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { staggerDelay } from '../Reveal/Reveal.helpers';
import { SectionIntro } from '../SectionIntro';
import styles from './Problem.module.less';

export const Problem = memo(() => (
  <section id="problem" className={styles.problem} aria-labelledby="problem-title">
    <div className={styles.problem__inner}>
      <SectionIntro
        id="problem-title"
        index="01"
        kicker="Problém"
        title="Máte tichý web."
        lead="Web máte. Vyzerá v poriadku. Ale telefón nezvoní a termíny sa neplnia. Nie je to smola. Je to 5 konkrétnych dier, cez ktoré vám každý deň odchádzajú zákazníci."
      />
      <ol className={styles.problem__grid}>
        {leaks.map((leak, index) => (
          <Reveal as="li" key={leak.number} delay={staggerDelay(index, 5)} className={styles.leak}>
            <span className={styles.leak__number} aria-hidden="true">
              {leak.number}
            </span>
            <h3 className={styles.leak__title}>{leak.title}</h3>
            <p className={styles.leak__text}>{leak.description}</p>
            <span className={styles.leak__tag}>{leak.tag}</span>
          </Reveal>
        ))}
      </ol>
      <Reveal className={styles.problem__cta}>
        <p className={styles['problem__cta-text']}>Ktoré z týchto 5 dier má váš web?</p>
        <CtaLink href="#formular" withArrow>
          Zistiť zadarmo
        </CtaLink>
      </Reveal>
    </div>
  </section>
));
