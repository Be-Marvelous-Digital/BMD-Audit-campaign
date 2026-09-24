import { memo, type ReactNode } from 'react';
import { Reveal } from '../Reveal';
import styles from './SectionIntro.module.less';

export type SectionTone = 'light' | 'dark';

interface SectionIntroProps {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: SectionTone;
  layout?: 'split' | 'stack';
}

export const SectionIntro = memo(
  ({ id, index, kicker, title, lead, tone = 'light', layout = 'split' }: SectionIntroProps) => (
    <Reveal
      as="header"
      className={[styles.intro, styles[`intro--${tone}`], styles[`intro--${layout}`]].join(' ')}
    >
      <div className={styles.intro__heading}>
        <p className={styles.intro__kicker}>
          <span className={styles.intro__index}>{index}</span>
          {kicker}
        </p>
        <h2 id={id} className={styles.intro__title}>
          {title}
        </h2>
      </div>
      {lead && <p className={styles.intro__lead}>{lead}</p>}
    </Reveal>
  ),
);
