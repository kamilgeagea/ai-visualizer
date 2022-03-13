import { MouseEventHandler, FC } from 'react';
import './Button.scss';

import { Disabled } from '../index';

interface ButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

/**
 * Button component
 */

const Button: FC<ButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <Disabled disabled={disabled}>
      <div className="button" onClick={onClick}>{title}</div>
    </Disabled>
  );
};

Button.defaultProps = {
  disabled: false,
};

export default Button;