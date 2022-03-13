import './Log.scss';

import { FC } from 'react';

import { LogRank } from '../../../types';

interface LogProps {
  text: string;
  rank: LogRank
}

const Log: FC<LogProps> = ({ text, rank }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: text }} className={`log ${rank.toLowerCase()}`} />
  );
};

export default Log;