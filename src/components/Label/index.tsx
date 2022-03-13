import './Label.scss';

import { FC } from 'react';

interface LabelProps {
  name: string;
}

const Label: FC<LabelProps> = ({ name }) => {
  return (
    <div className="label">{name}</div>
  );
};

export default Label;