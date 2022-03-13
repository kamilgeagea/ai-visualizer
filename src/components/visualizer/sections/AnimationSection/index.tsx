import './AnimationSection.scss';

import { FC } from 'react';

import { Section, Label, Slider, Switch } from '../../../index';

import { displayTime } from '../../../../utilities';
import { ANIMATION_SLIDER_STEP } from '../../../../constants';

interface AnimationSectionProps {
  animationDuration: number;
  detailed: boolean;
  onAnimationDurationChange: (value: number) => void;
  onDetailedChange: (value: boolean) => void;
}

const AnimationSection: FC<AnimationSectionProps> = ({
  animationDuration,
  detailed,
  onAnimationDurationChange,
  onDetailedChange
}) => {
  return (
    <Section label="Animation">
      <div className="animation-section">
        <div className="animation-section__duration">
          <Label name="Duration" />
          <div className="animation-section__duration__slider">
            <Slider
              value={animationDuration}
              onChange={onAnimationDurationChange}
              step={ANIMATION_SLIDER_STEP}
            />
            <div className="animation-section__duration__slider__value">
              {displayTime(animationDuration)}
            </div>
          </div>
        </div>
        <div className="animation-section__detailed">
          <Label name="Detailed" />
          <Switch
            value={detailed}
            onChange={onDetailedChange}
          />
        </div>
      </div>
    </Section>
  );
};

export default AnimationSection;