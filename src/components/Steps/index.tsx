import { memo } from 'react';
import { steps } from '../../data/content';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './Steps.module.less';

export const Steps = memo(() => (
  <section id="ako-to-funguje" className={styles.steps} aria-labelledby="steps-title">
    <div className={styles.steps__inner}>
      <SectionIntro
        id="steps-title"
        title="Najprv uvidíte výsledok. Až potom cenu."
        lead="Väčšina webárov vám najprv pošle cenovú ponuku a vy hádate, čo za ňu dostanete. Ja to otáčam."
        layout="stack"
      />
      <ol className={styles.list}>
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={Math.min(index, 3) as 0 | 1 | 2 | 3} className={styles.item}>
            <span className={styles.item__time}>{step.time}</span>
            <h3 className={styles.item__title}>{step.title}</h3>
            <p className={styles.item__text}>{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
));
