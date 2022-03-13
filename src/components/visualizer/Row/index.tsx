import './Row.scss';

import { FC, ReactNode } from 'react';

interface RowProps {
  children: ReactNode;
}

const Row: FC<RowProps> = ({ children }) => {
  return (
    <div className="row">{children}</div>
  );
};

export default Row;