import React from 'react';
import { useField, Field, FieldAttributes } from 'formik';

type ISelectFieldProps = {
  label: string;
  options: string[];
} & FieldAttributes<{}>;

const SelectField: React.FC<ISelectFieldProps> = ({
  label,
  name,
  placeholder,
  options,
}) => {
  const [field, meta] = useField(name);
  return (
    <label htmlFor={name}>
      <div>{label}</div>
      <select {...field} name={name} placeholder={placeholder}>
        <option label="" value="" />
        {options.map((value) => (
          <option label={value} value={value} key={value} />
        ))}
      </select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </label>
  );
};

export default SelectField;
