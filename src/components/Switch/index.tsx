import { FC } from 'react';
import { Switch as MUISwitch, SwitchProps as MUISwitchProps, styled, Theme } from '@mui/material';
import { COLOR_PRIMARY, COLOR_EXTRA_LIGHT } from '../../constants';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const StyledSwitch = styled((props: MUISwitchProps) => (
  <MUISwitch  disableRipple {...props} />
))(({ theme }: { theme: Theme }) => ({
  width: 34,
  height: 18,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: COLOR_PRIMARY,
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    color: 'white',
    width: 14,
    height: 14,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: COLOR_EXTRA_LIGHT,
    opacity: 0.15,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  return (
    <StyledSwitch
      checked={value}
      onChange={(_, value) => onChange(value)}
    />
  );
};

export default Switch;