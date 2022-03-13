import './InputField.scss';

import { FC, ChangeEventHandler, useRef, useState } from 'react';

import { Label } from '../index';

import { MAX_INPUT_DIGITS } from '../../constants';

interface InputFieldProps {
  label: string;
  value: number;
  onEmpty?: string;
  onChange: (value: number) => void;
  onBlur?: Function;
}

const InputField: FC<InputFieldProps> = ({ label, value, onEmpty = '', onChange, onBlur }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const isEmpty = value === 0;

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.currentTarget.value;

    if (value.split('').every(char => '0123456789'.includes(char)) && value.length <= MAX_INPUT_DIGITS) {
      onChange(Number(value));
    }
  };

  return (
    <div className="input-field">
      <Label name={label} />
      <input
        ref={ref}
        className="input-field__input"
        value={!isEmpty ? value : ''}
        placeholder={focused ? '' : onEmpty}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur && onBlur();
        }}
        onChange={handleChange}
        onKeyDown={e => e.stopPropagation()}
      />
    </div>
  );
};

export default InputField;