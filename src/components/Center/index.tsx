import './Center.scss';

import { FC, ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
}

const Center: FC<CenterProps> = ({ children }) => {
  return (
    <div className="center">{children}</div>
  );
};

export default Center;