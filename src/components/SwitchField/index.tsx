import { FC } from 'react';
import Label from '../Label';
import Switch from '../Switch';

interface SwitchFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const SwitchField: FC<SwitchFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="switch-field">
      <Label name={label} />
      <div className="switch-field__switch">
        <Switch value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default SwitchField;