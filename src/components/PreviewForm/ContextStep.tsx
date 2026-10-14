import { memo, type RefObject } from 'react';
import { businessTypes, roleOptions, timelineOptions } from '../../data/content';
import { ChoiceChip } from '../ChoiceChip';
import { FieldGroup } from './FieldGroup';
import type { FieldErrors } from './PreviewForm.helpers';
import { StepHeading } from './StepHeading';
import { StepNav } from './StepNav';
import styles from './PreviewForm.module.less';

interface ContextStepProps {
  active: boolean;
  business: string;
  timeline: string;
  role: string;
  errors: FieldErrors;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  onBusinessChange: (value: string) => void;
  onTimelineChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onBack: () => void;
}

export const ContextStep = memo(
  ({
    active,
    business,
    timeline,
    role,
    errors,
    headingRef,
    onBusinessChange,
    onTimelineChange,
    onRoleChange,
    onBack,
  }: ContextStepProps) => (
    <fieldset className={styles.form__step} hidden={!active}>
      <legend className="visually-hidden">Ešte pár vecí o vás</legend>
      <StepHeading headingRef={headingRef}>Ešte pár vecí o vás</StepHeading>
      <FieldGroup id="business" legend="Čomu sa venujete?" error={errors.business}>
        {businessTypes.map((option, index) => (
          <ChoiceChip
            key={option}
            type="radio"
            name="preview-business"
            value={option}
            label={option}
            checked={business === option}
            field={index === 0 ? 'business' : undefined}
            onSelect={onBusinessChange}
          />
        ))}
      </FieldGroup>
      <FieldGroup id="timeline" legend="Kedy chcete nový web riešiť?" error={errors.timeline}>
        {timelineOptions.map((option, index) => (
          <ChoiceChip
            key={option.value}
            type="radio"
            name="preview-timeline"
            value={option.value}
            label={option.label}
            checked={timeline === option.value}
            field={index === 0 ? 'timeline' : undefined}
            onSelect={onTimelineChange}
          />
        ))}
      </FieldGroup>
      <FieldGroup id="role" legend="Rozhodujete o webe vy?" error={errors.role}>
        {roleOptions.map((option, index) => (
          <ChoiceChip
            key={option.value}
            type="radio"
            name="preview-role"
            value={option.value}
            label={option.label}
            checked={role === option.value}
            field={index === 0 ? 'role' : undefined}
            onSelect={onRoleChange}
          />
        ))}
      </FieldGroup>
      <StepNav onBack={onBack} />
    </fieldset>
  ),
);
