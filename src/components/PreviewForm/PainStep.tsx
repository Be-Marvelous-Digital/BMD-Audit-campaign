import { memo, useMemo, type RefObject } from 'react';
import { painOptions } from '../../data/content';
import { ChoiceChip } from '../ChoiceChip';
import { FormField } from '../FormField';
import { pluralizeCharacters } from '../../utils/format';
import { FieldGroup } from './FieldGroup';
import { NOTE_LIMIT } from './PreviewForm.helpers';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import styles from './PreviewForm.module.less';

interface PainStepProps {
  active: boolean;
  hasWeb: boolean;
  pains: string[];
  note: string;
  error?: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onPainToggle: (value: string) => void;
  onNoteChange: (value: string) => void;
  onBack: () => void;
}

export const PainStep = memo(
  ({ active, hasWeb, pains, note, error, headingRef, onPainToggle, onNoteChange, onBack }: PainStepProps) => {
    const options = useMemo(() => painOptions(hasWeb), [hasWeb]);
    const title = hasWeb ? 'Čo vám na súčasnom webe vadí?' : 'Prečo chcete web práve teraz?';

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">{title}</legend>
        <StepHeading headingRef={headingRef}>{title}</StepHeading>
        <FieldGroup id="pains" legend="Vyberte všetko, čo platí" error={error}>
          {options.map((option, index) => (
            <ChoiceChip
              key={option}
              type="checkbox"
              name="preview-pains"
              value={option}
              label={option}
              checked={pains.includes(option)}
              field={index === 0 ? 'pains' : undefined}
              onSelect={onPainToggle}
            />
          ))}
        </FieldGroup>
        <FormField
          label={hasWeb ? 'Čo konkrétne vás najviac hnevá?' : 'Čo má web hlavne dosiahnuť?'}
          field="note"
          name="preview-note"
          placeholder={
            hasWeb
              ? 'Napr. zákazníci mi stále volajú kvôli otváracím hodinám, lebo ich na webe nenájdu.'
              : 'Napr. chcem, aby si ľudia vedeli rezervovať termín bez telefonovania.'
          }
          hint={`Zostáva ${pluralizeCharacters(Math.max(0, NOTE_LIMIT - note.length))}`}
          value={note}
          maxLength={NOTE_LIMIT}
          multiline
          optional
          onChange={onNoteChange}
        />
        <StepNav onBack={onBack} />
      </fieldset>
    );
  },
);
