import './Player.scss';

import { FC, ReactNode, useCallback, useEffect } from 'react';
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoStopSharp,
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPauseSharp
} from 'react-icons/io5';

import { PlayerButton } from '../../index';

import { COLOR_PRIMARY, COLOR_LIGHT, ICON_SIZE } from '../../../constants';
import { Step } from '../../../types';

interface PlayerProps {
  title: string;
  onPlay: Function;
  onPrevious: Function;
  onNext: Function;
  onStart: Function;
  onEnd: Function;
  onStop: Function;
  steps: Step[];
  step: number;
  play: boolean;
}

const Player: FC<PlayerProps> = ({
  title,
  onPlay,
  onPrevious,
  onNext,
  onStart,
  onEnd,
  onStop,
  steps,
  step,
  play  
}) => {
  const playerDisabled = steps.length <= 0;
  const startDisabled = play || playerDisabled || (step <= 0);
  const previousDisabled = play || playerDisabled || (step <= 0);
  const playDisabled = playerDisabled || (step >= steps.length - 1);
  const stopDisabled = play || playerDisabled;
  const nextDisabled = play || playerDisabled || (step >= steps.length - 1);
  const endDisabled = play || playerDisabled || (step >= steps.length - 1);

  const onKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event;

    switch(code) {
      case 'ArrowDown':
        !startDisabled && onStart();
        break;
      case 'ArrowLeft':
        !previousDisabled && onPrevious();
        break;
      case 'Space':
        !playDisabled && onPlay();
        break;
      case 'Escape':
        !stopDisabled && onStop();
        break;
      case 'ArrowRight':
        !nextDisabled && onNext();
        break;
      case 'ArrowUp':
        !endDisabled && onEnd();
        break;
      default: break;
    }
  }, [
    endDisabled,
    nextDisabled,
    onEnd,
    onNext,
    onPlay,
    onPrevious,
    onStart,
    onStop,
    playDisabled,
    previousDisabled,
    startDisabled,
    stopDisabled
  ]);

  const icons: { name: string; icon: ReactNode; onClick: Function; disabled: boolean; }[] = [
    {
      name: 'BEGINNING',
      icon: <IoPlaySkipBackSharp style={{ fill: COLOR_PRIMARY, fontSize: ICON_SIZE }} />,
      onClick: onStart,
      disabled: startDisabled
    },
    {
      name: 'PREVIOUS',
      icon: <IoPlayBackSharp style={{ fill: COLOR_LIGHT, fontSize: ICON_SIZE }} />,
      onClick: onPrevious,
      disabled: previousDisabled
    },
    {
      name: 'PLAY',
      icon: play ? (
        <IoPauseSharp style={{ fill: COLOR_PRIMARY, fontSize: ICON_SIZE }} />
        ) : (
        <IoPlaySharp style={{ fill: COLOR_PRIMARY, fontSize: ICON_SIZE }} />
      ),
      onClick: onPlay,
      disabled: playDisabled
    },
    {
      name: 'STOP',
      icon: <IoStopSharp style={{ fill: COLOR_LIGHT, fontSize: ICON_SIZE }} />,
      onClick: onStop,
      disabled: stopDisabled
    },
    {
      name: 'NEXT',
      icon: <IoPlayForwardSharp style={{ fill: COLOR_LIGHT, fontSize: ICON_SIZE }} />,
      onClick: onNext,
      disabled: nextDisabled
    },
    {
      name: 'END',
      icon: <IoPlaySkipForwardSharp style={{ fill: COLOR_PRIMARY, fontSize: ICON_SIZE }} />,
      onClick: onEnd,
      disabled: endDisabled
    }
  ];

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress, false);

    return () => {
      document.removeEventListener('keydown', onKeyPress, false);
    };
  }, [onKeyPress]);

  return (
    <div className="player">
      <div className="player__title">{title}</div>
      <div className="player__buttons">
        {icons.map(({ name, icon, onClick, disabled }) => (
          <PlayerButton
            key={name}
            icon={icon}
            onClick={onClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Player;