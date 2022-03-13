import './Alert.scss';

import { FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import { FlatButton } from '../index';

import { ICON_SIZE } from '../../constants';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Alert: FC<AlertProps> = ({ message, type, onDismiss }) => {
  return (
    <div className={`alert alert__${type}`}>
      <div className="alert__message">{message}</div>
      <div className="alert__dismiss-button">
        <FlatButton onClick={onDismiss}>
          <IoCloseOutline style={{ fontSize: ICON_SIZE, stroke: 'white' }} />
        </FlatButton>
      </div>
    </div>
  );
};

export default Alert;