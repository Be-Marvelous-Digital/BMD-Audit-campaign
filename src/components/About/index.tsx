import { memo } from 'react';
import portraitUrl from '../../assets/images/peter-portrait.webp';
import { aboutStats } from '../../data/content';
import { CtaLink } from '../CtaLink';
import { Logo } from '../Logo';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import styles from './About.module.less';

export const About = memo(() => (
  <section id="o-mne" className={styles.about} aria-labelledby="about-title">
    <div className={styles.about__inner}>
      <Reveal as="figure" className={styles.portrait}>
        <img
          src={portraitUrl}
          alt="Peter Lehocky stojí pri stole s notebookom v svetlom ateliéri"
          width={720}
          height={900}
          loading="lazy"
          decoding="async"
          className={styles.portrait__image}
        />
        <figcaption className={styles.portrait__card}>
          <Logo size={36} decorative />
          <span className={styles.portrait__who}>
            <span className={styles.portrait__name}>Peter Lehocky</span>
            <span className={styles.portrait__role}>Webový vývojár, Slovensko</span>
          </span>
        </figcaption>
      </Reveal>
      <div className={styles.about__copy}>
        <SectionIntro
          id="about-title"
          index="06"
          kicker="Kto to robí"
          title="Audit nerobí robot. Robím ho ja."
          lead="Som Peter, web developer, nie agentúra. Nemám account manažérov ani predajcov, ktorí by vám potom volali. Nezaujíma ma len to, ako web vyzerá. Zaujíma ma, či vám nosí zákazníkov. Za 8 rokov som videl stovky webov lokálnych firiem a väčšina z nich stráca zákazníkov z rovnakých 5 dôvodov. Poviem vám, ktoré z nich platia pre vás."
          tone="dark"
          layout="stack"
        />
        <Reveal delay={1}>
          <dl className={styles.about__stats}>
            {aboutStats.map((stat) => (
              <div key={stat.label} className={styles.about__stat}>
                <dt className={styles['about__stat-label']}>{stat.label}</dt>
                <dd className={styles['about__stat-value']}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={2}>
          <CtaLink href="#formular" withArrow>
            Poslať mi svoj web
          </CtaLink>
        </Reveal>
      </div>
    </div>
  </section>
));
