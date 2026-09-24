import { memo, useCallback, type RefObject } from 'react';
import { ChoiceTile } from '../ChoiceTile';
import { FormField } from '../FormField';
import { StepHeading } from './StepHeading';
import styles from './AuditForm.module.less';

interface WebsiteStepProps {
  active: boolean;
  hasWeb: boolean;
  website: string;
  social: string;
  error?: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onHasWebChange: (hasWeb: boolean) => void;
  onWebsiteChange: (value: string) => void;
  onSocialChange: (value: string) => void;
  onBack: () => void;
}

export const WebsiteStep = memo(
  ({
    active,
    hasWeb,
    website,
    social,
    error,
    headingRef,
    onHasWebChange,
    onWebsiteChange,
    onSocialChange,
    onBack,
  }: WebsiteStepProps) => {
    const handleSelect = useCallback((value: string) => onHasWebChange(value === 'yes'), [onHasWebChange]);

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">Máte už web?</legend>
        <StepHeading headingRef={headingRef}>Máte už web?</StepHeading>
        <div className={styles['form__tiles--pair']}>
          <ChoiceTile
            name="audit-has-web"
            value="yes"
            label="Áno, mám"
            description="Chcem audit"
            checked={hasWeb}
            onSelect={handleSelect}
          />
          <ChoiceTile
            name="audit-has-web"
            value="no"
            label="Ešte nie"
            description="Chcem konzultáciu"
            checked={!hasWeb}
            onSelect={handleSelect}
          />
        </div>
        {hasWeb ? (
          <FormField
            label="Adresa webu"
            field="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="napr. salonivana.sk"
            value={website}
            error={error}
            required
            onChange={onWebsiteChange}
          />
        ) : (
          <p className={styles.form__note}>
            Nevadí. Dohodneme si 20-minútový hovor zadarmo: čo by mal váš web mať, aby vám nosil zákazníkov, a koľko
            by to reálne stálo.
          </p>
        )}
        <FormField
          label="Instagram alebo Google profil"
          field="social"
          placeholder="@salonivana"
          value={social}
          optional
          onChange={onSocialChange}
        />
        <div className={styles.form__nav}>
          <button type="button" className={styles.form__back} onClick={onBack}>
            Späť
          </button>
          <button type="submit" className={styles.form__next}>
            Pokračovať
          </button>
        </div>
      </fieldset>
    );
  },
);
