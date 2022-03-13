import { FC, ReactNode } from 'react';

import { Disabled, FlatButton } from '../../index';

interface PlayerButtonProps {
  icon: ReactNode;
  onClick: Function;
  disabled: boolean;
}

const PlayerButton: FC<PlayerButtonProps> = ({ icon, onClick, disabled }) => {
  return (
    <Disabled disabled={disabled}>
      <FlatButton onClick={() => onClick()}>
        {icon}
      </FlatButton>
    </Disabled>
  );
};

export default PlayerButton;