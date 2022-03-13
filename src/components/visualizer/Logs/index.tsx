import './Logs.scss';

import { FC, useRef, useEffect } from 'react';

import { Log } from '../../index';

import { Step } from '../../../types';

interface LogsProps {
  title: string;
  steps: Step[];
  step: number;
}

const Logs: FC<LogsProps> = ({ title, steps, step }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [step]);

  return (
    <div className="logs">
      <div className="logs__title">{title} Logs:</div>
      {steps.length > 0 && steps[step].logs.length > 0 ? steps[step].logs.map(({ rank, log }, index) => (
        <Log
          key={log + index}
          rank={rank}
          text={log}
        />
      )) : (
        <div className="logs__empty">There are no logs at the moment. Generate points and press on the "Play" button.</div>
      )}
      <div ref={ref} className="logs__bottom" />
    </div>
  );
};

export default Logs;