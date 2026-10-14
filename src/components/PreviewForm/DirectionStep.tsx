import { memo, useCallback, type RefObject } from 'react';
import { keepOptions, styleOptions } from '../../data/content';
import { ChoiceChip } from '../ChoiceChip';
import { FormField } from '../FormField';
import { StyleTile } from '../StyleTile';
import { FieldGroup } from './FieldGroup';
import type { FieldErrors } from './PreviewForm.helpers';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import styles from './PreviewForm.module.less';

interface DirectionStepProps {
  active: boolean;
  refresh: boolean;
  style: string;
  keep: string[];
  inspiration: string;
  errors: FieldErrors;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onStyleChange: (value: string) => void;
  onKeepToggle: (value: string) => void;
  onInspirationChange: (value: string) => void;
  onBack: () => void;
}

export const DirectionStep = memo(
  ({
    active,
    refresh,
    style,
    keep,
    inspiration,
    errors,
    headingRef,
    onStyleChange,
    onKeepToggle,
    onInspirationChange,
    onBack,
  }: DirectionStepProps) => {
    const handleStyle = useCallback((value: string) => onStyleChange(value), [onStyleChange]);
    const title = refresh ? 'Čo má zostať tak, ako je?' : 'Ktorý štýl je vám najbližší?';

    return (
      <fieldset className={styles.form__step} hidden={!active}>
        <legend className="visually-hidden">{title}</legend>
        <StepHeading headingRef={headingRef}>{title}</StepHeading>
        {refresh ? (
          <FieldGroup id="keep" legend="Zachovám" hint="(vyberte všetko, čo platí)" error={errors.keep}>
            {keepOptions.map((option, index) => (
              <ChoiceChip
                key={option}
                type="checkbox"
                name="preview-keep"
                value={option}
                label={option}
                checked={keep.includes(option)}
                field={index === 0 ? 'keep' : undefined}
                onSelect={onKeepToggle}
              />
            ))}
          </FieldGroup>
        ) : (
          <FieldGroup id="style" legend="Vyberte jeden" error={errors.style} layout="styles">
            {styleOptions.map((option, index) => (
              <StyleTile
                key={option.value}
                name="preview-style"
                option={option}
                checked={style === option.value}
                field={index === 0 ? 'style' : undefined}
                onSelect={handleStyle}
              />
            ))}
          </FieldGroup>
        )}
        <FormField
          label="Web, ktorý sa vám páči"
          field="inspiration"
          name="preview-inspiration"
          inputMode="url"
          placeholder="napr. konkurencia alebo firma z iného mesta"
          hint="Hocijaký, aj z inej brandže. Veľmi mi pomôže."
          value={inspiration}
          error={errors.inspiration}
          maxLength={255}
          optional
          onChange={onInspirationChange}
        />
        <StepNav onBack={onBack} />
      </fieldset>
    );
  },
);
