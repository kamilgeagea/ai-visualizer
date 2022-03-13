import './ControlPanel.scss';

import { FC, ReactNode, useCallback, useEffect } from 'react';

import { FlatButton, Logs, Info } from '../../index';

import { Info as InfoProps, PANEL_PAGES, Step } from '../../../types';

interface ControlPanelProps {
  currentPanelPage: PANEL_PAGES;
  setCurrentPanelPage: ({ panelPage }: { panelPage: PANEL_PAGES }) => void;
  children: ReactNode;
  logsTitle: string;
  steps: Step[];
  step: number;
  info: InfoProps;
}

const ControlPanel: FC<ControlPanelProps> = ({
  currentPanelPage,
  setCurrentPanelPage,
  children,
  steps,
  step,
  logsTitle,
  info
}) => {
  const mapPagesToComponents: { [key in PANEL_PAGES]: ReactNode } = {
    PARAMS: children,
    LOGS: <Logs title={logsTitle} steps={steps} step={step} />,
    INFO: <Info {...info} />
  };

  const onKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event;

    switch(code) {
      case 'Space':
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);

    return () => {
      document.removeEventListener('keypress', onKeyPress, false);
    };
  }, [onKeyPress]);

  return (
    <div className="control-panel">
      <div className="control-panel__menu">
        {Object.values(PANEL_PAGES).map(panelPage => (
          <FlatButton
            key={panelPage}
            className={`control-panel__menu__item${panelPage === currentPanelPage ? '__selected' : ''}`}
            onClick={() => setCurrentPanelPage({ panelPage })}
          >{panelPage}</FlatButton>
        ))}
      </div>
      <div className="control-panel__content">
        {mapPagesToComponents[currentPanelPage]}
      </div>
    </div>
  );
};

export default ControlPanel;