import './TextField.scss';

import { ChangeEventHandler, FC } from 'react';

import { Disabled } from '../index';

interface TextFieldProps {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value: string | number | readonly string[];
  onChange: ChangeEventHandler;
  tag?: 'input' | 'textarea';
  className?: string;
  disabled?: boolean;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  tag,
  className,
  disabled
}) => {
  const Tag = tag || 'input';

  return (
    <Disabled disabled={disabled}>
      <div className={`textfield ${className ? className : ''}`}>
        <Tag
          type={type}
          className="textfield__input"
          name={name}
          required
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={6}
        />
        <label htmlFor={name} className="textfield__label">
          <div className="textfield__label__content">{label}</div>
        </label>
      </div>
    </Disabled>
  );
};

TextField.defaultProps = {
  disabled: false,
  placeholder: '',
  type: 'text',
};

export default TextField;