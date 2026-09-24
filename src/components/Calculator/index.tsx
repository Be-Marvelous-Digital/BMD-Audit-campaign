import { memo, useMemo, useState } from 'react';
import { formatEur, formatNumber } from '../../utils/format';
import { CtaLink } from '../CtaLink';
import { RangeField } from '../RangeField';
import { Reveal } from '../Reveal';
import { SectionIntro } from '../SectionIntro';
import { estimateLoss } from './Calculator.helpers';
import styles from './Calculator.module.less';

export const Calculator = memo(() => {
  const [visits, setVisits] = useState(600);
  const [ticket, setTicket] = useState(45);
  const estimate = useMemo(() => estimateLoss(visits, ticket), [visits, ticket]);

  return (
    <section id="kalkulacka" className={styles.calc} aria-labelledby="calc-title">
      <div className={styles.calc__wash} aria-hidden="true" />
      <div className={styles.calc__inner}>
        <div className={styles.calc__intro}>
          <SectionIntro
            id="calc-title"
            index="02"
            kicker="Koľko to stojí"
            title="Tichý web nie je zadarmo."
            lead="Posuňte jazdce podľa seba. Stačí, aby web premenil o 2 ľudí zo 100 viac na telefonát alebo rezerváciu."
            tone="dark"
            layout="stack"
          />
          <Reveal delay={1} className={styles.calc__fields}>
            <RangeField
              label="Návštevy webu za mesiac"
              value={visits}
              min={100}
              max={3000}
              step={50}
              valueText={formatNumber(visits)}
              onChange={setVisits}
            />
            <RangeField
              label="Priemerná hodnota zákazníka"
              value={ticket}
              min={15}
              max={600}
              step={5}
              valueText={formatEur(ticket)}
              onChange={setTicket}
            />
          </Reveal>
        </div>
        <Reveal delay={2} className={styles.result}>
          <div className={styles.result__rule} aria-hidden="true" />
          <div className={styles.result__total}>
            <p className={styles.result__label}>Unikne vám ročne približne</p>
            <p className={styles.result__amount}>{formatEur(estimate.revenuePerYear)}</p>
          </div>
          <dl className={styles.result__split}>
            <div className={styles.result__cell}>
              <dt className={styles['result__cell-label']}>zákazníkov mesačne</dt>
              <dd className={styles['result__cell-value']}>+{formatNumber(estimate.clientsPerMonth)}</dd>
            </div>
            <div className={styles.result__cell}>
              <dt className={styles['result__cell-label']}>tržieb mesačne</dt>
              <dd className={styles['result__cell-value']}>{formatEur(estimate.revenuePerMonth)}</dd>
            </div>
          </dl>
          <CtaLink href="#formular" withArrow className={styles.result__cta}>
            Zistiť, kde presne unikajú
          </CtaLink>
          <p className={styles.result__note}>Orientačný výpočet. Presné čísla pre váš biznis nájdete v audite.</p>
        </Reveal>
      </div>
    </section>
  );
});
