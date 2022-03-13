import './Visualizer.scss';

import { ReactNode, FC, useEffect } from 'react';

import { Player, ControlPanel, Graph, Alert } from '../../index';

import { useInterval } from '../../../hooks';

import { DataPoint, Info, PANEL_PAGES, Step } from '../../../types';

interface VisualizerProps {
  title: string;
  currentPanelPage: PANEL_PAGES;
  setCurrentPanelPage: ({ panelPage }: { panelPage: PANEL_PAGES }) => void;
  dataset: DataPoint[];
  children: ReactNode;
  error: string | null;
  onErrorDismiss: () => void;
  onPlay: Function;
  onPrevious: Function;
  onNext: Function;
  onStart: Function;
  onEnd: Function;
  onStop: Function;
  steps: Step[];
  step: number;
  play: boolean;
  animationDuration: number;
  onUnmount: Function;
  info: Info;
  onPointClick?: ({ x, y }: { x: number; y: number }) => void;
}

const Visualizer: FC<VisualizerProps> = ({
  title,
  currentPanelPage,
  dataset,
  setCurrentPanelPage,
  children,
  error,
  onErrorDismiss,
  onPlay,
  onPrevious,
  onNext,
  onStart,
  onEnd,
  onStop,
  steps,
  step,
  play,
  animationDuration,
  onUnmount,
  info,
  onPointClick
}) => {
  useInterval(() => {
    onNext();
  }, [animationDuration, play]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => onUnmount(), []);

  return (
    <div className="visualizer">
      { error ? <Alert type="error" message={error} onDismiss={onErrorDismiss} /> : null }
      <div className="visualizer__content">
        <div className="visualizer__content__container">
          <Player
            title={title}
            steps={steps}
            step={step}
            onPlay={onPlay}
            onPrevious={onPrevious}
            onNext={onNext}
            onStart={onStart}
            onEnd={onEnd}
            onStop={onStop}
            play={play}
          />
        </div>
        <div className="visualizer__content__graph">
          <Graph
            dataset={dataset}
            steps={steps}
            step={step}
            onPointClick={onPointClick}
          />
        </div>
      </div>
      <ControlPanel
        currentPanelPage={currentPanelPage}
        setCurrentPanelPage={setCurrentPanelPage}
        steps={steps}
        step={step}
        logsTitle={title}
        info={info}
      >{children}</ControlPanel>
    </div>
  );
};

export default Visualizer;