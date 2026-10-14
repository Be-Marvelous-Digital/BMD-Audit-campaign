import { memo, useCallback, type RefObject } from 'react';
import { ChoiceTile } from '../ChoiceTile';
import { FormField } from '../FormField';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import styles from './PreviewForm.module.less';

interface SourceStepProps {
  active: boolean;
  hasWeb: boolean;
  website: string;
  error?: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onHasWebChange: (hasWeb: boolean) => void;
  onWebsiteChange: (value: string) => void;
}

export const SourceStep = memo(
  ({ active, hasWeb, website, error, headingRef, onHasWebChange, onWebsiteChange }: SourceStepProps) => {
    const handleSelect = useCallback((value: string) => onHasWebChange(value === 'yes'), [onHasWebChange]);

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">Kde nájdem vašu firmu?</legend>
        <StepHeading headingRef={headingRef}>Kde nájdem vašu firmu?</StepHeading>
        <div className={styles['form__tiles--pair']}>
          <ChoiceTile
            name="preview-has-web"
            value="yes"
            label="Mám web"
            description="Navrhnem jeho novú podobu"
            checked={hasWeb}
            onSelect={handleSelect}
          />
          <ChoiceTile
            name="preview-has-web"
            value="no"
            label="Web ešte nemám"
            description="Mám Instagram alebo Google profil"
            checked={!hasWeb}
            onSelect={handleSelect}
          />
        </div>
        {hasWeb ? (
          <FormField
            key="web"
            label="Adresa vášho webu"
            field="website"
            name="preview-website"
            inputMode="url"
            autoComplete="url"
            placeholder="napr. salonivana.sk"
            value={website}
            error={error}
            required
            onChange={onWebsiteChange}
          />
        ) : (
          <FormField
            key="profile"
            label="Instagram, Facebook alebo Google profil"
            field="website"
            name="preview-website"
            placeholder="@salonivana alebo odkaz na profil"
            hint="Z neho si zoberiem fotky, farby a štýl."
            value={website}
            error={error}
            required
            onChange={onWebsiteChange}
          />
        )}
        <StepNav />
      </fieldset>
    );
  },
);
