import React from 'react';
import { useField, FieldAttributes } from 'formik';

type ISelectFieldOption = {
  label: string;
  value: string;
};

type ISelectFieldProps = {
  label: string;
  options: ISelectFieldOption[];
} & FieldAttributes<{}>;

const SelectField: React.FC<ISelectFieldProps> = ({ label, name, options }) => {
  const [field, meta] = useField(name);
  return (
    <label htmlFor={name}>
      <div>{label}</div>
      <select {...field} name={name}>
        <option label="" value="" />
        {options.map((option) => (
          <option
            label={option.label}
            value={option.value}
            key={option.value}
          />
        ))}
      </select>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </label>
  );
};

export default SelectField;
