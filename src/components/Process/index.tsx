import { memo } from 'react';
import { processSteps } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Reveal } from '../Reveal';
import { staggerDelay } from '../Reveal/Reveal.helpers';
import { SectionIntro } from '../SectionIntro';
import styles from './Process.module.less';

export const Process = memo(() => (
  <section id="postup" className={styles.process} aria-labelledby="process-title">
    <div className={styles.process__inner}>
      <SectionIntro
        id="process-title"
        index="05"
        kicker="Ako to prebieha"
        title="Od formulára k jasnému plánu."
        layout="stack"
      />
      <ol className={styles.process__steps}>
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={staggerDelay(index)}
            className={[styles.step, styles[`step--${index + 1}`]].join(' ')}
          >
            <span className={styles.step__number} aria-hidden="true">
              {step.number}
            </span>
            <h3 className={styles.step__title}>{step.title}</h3>
            <p className={styles.step__text}>{step.description}</p>
            <span className={styles.step__time}>{step.time}</span>
          </Reveal>
        ))}
      </ol>
      <Reveal className={styles.process__cta}>
        <p className={styles['process__cta-text']}>Krok 01 zaberie 30 sekúnd. Zvyšok je na mne.</p>
        <CtaLink href="#formular" withArrow>
          Začať audit
        </CtaLink>
      </Reveal>
    </div>
  </section>
));
