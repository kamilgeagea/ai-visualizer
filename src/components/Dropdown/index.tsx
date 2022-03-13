import './Dropdown.scss';

import { FC, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

import { Label, FlatButton, ClickOutSideDetector } from '../index';

import { COLOR_DARK, ICON_SIZE_EXTRA_SMALL } from '../../constants';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

interface DropdownMenuProps {
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ label, value, options, onChange }) => {
  const [opened, setOpened] = useState(false);
  
  return (
    <div className="dropdown">
      <Label name={label} />
      <ClickOutSideDetector onClick={() => setOpened(false)}>
        <div className="dropdown__content">
          <FlatButton onClick={() => setOpened(!opened)}>
            <div className="dropdown__content__toggle">
              <div className="dropdown__content__toggle__value">{value}</div>
              <div
                className={`dropdown__content__toggle__icon ${opened ? 'dropdown__content__toggle__icon__opened' : ''}`}
              >
                <BsChevronDown style={{ fill: COLOR_DARK, fontSize: ICON_SIZE_EXTRA_SMALL }} />
              </div>
            </div>
          </FlatButton>
          {opened && (
            <DropdownMenu
              options={options}
              onChange={value => {
                onChange(value);
                setOpened(false);
              }}
            />
          )}
        </div>
      </ClickOutSideDetector>
    </div>
  );
};

const DropdownMenu: FC<DropdownMenuProps> = ({ options, onChange }) => {
  return (
    <div className="dropdown-menu">
      {options.map(option => (
        <div
          key={option}
          className="dropdown-menu__item"
          onClick={() => onChange(option)}
        >{option}</div>
      ))}
    </div>
  );
};

export default Dropdown;