import { FC } from 'react';
import { Slider as MUISlider, SliderProps as MUISliderProps, styled } from '@mui/material';

import { MAX_ANIMATION_DURATION, MIN_ANIMATION_DURATION, COLOR_PRIMARY, COLOR_LIGHT } from '../../constants';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

const iOSBoxShadow = '0 1px 1px rgba(0,0,0,0.1),0 1px 1px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const StyledSlider: FC<MUISliderProps> = styled(MUISlider)({
  color: COLOR_PRIMARY,
  height: 1,
  '& .MuiSlider-track': {
    border: 'none',
    color: COLOR_PRIMARY
  },
  '& .MuiSlider-rail': {
    color: COLOR_LIGHT
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: iOSBoxShadow,
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const Slider: FC<SliderProps> = ({ value, step, onChange }) => {
  return (
    <StyledSlider
      value={value}
      onChange={(_, value) => onChange(value as number)}
      min={MIN_ANIMATION_DURATION}
      max={MAX_ANIMATION_DURATION}
      step={step}
    />
  );
};

export default Slider;