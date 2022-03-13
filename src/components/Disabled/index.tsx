import './Disabled.scss';

import { FC, ReactNode } from 'react';

interface DisabledProps {
  disabled?: boolean;
  children: ReactNode;
}

const Disabled: FC<DisabledProps> = ({ disabled, children }) => {
  return (
    <div className={`${disabled ? 'disabled' : ''}`}>
      <div>{children}</div>
    </div>
  );
};

export default Disabled;