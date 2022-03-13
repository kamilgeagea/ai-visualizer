import './FlatButton.scss';

import { FC, ReactNode, MouseEventHandler } from 'react';

import { Disabled } from '../index';

interface FlatButtonProps {
  children: ReactNode | string;
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  className?: string;
}

const FlatButton: FC<FlatButtonProps> = ({ children, onClick, disabled, className }) => {
  return (
    <Disabled disabled={disabled}>
      <div className={`flat-button ${className}`} onClick={onClick}>{children}</div>
    </Disabled>
  );
};

FlatButton.defaultProps = {
  disabled: false
};

export default FlatButton;